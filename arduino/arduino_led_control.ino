#include <Servo.h>
#include <Wire.h>
#include <VL53L0X.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "SparkFunBME280.h"
#include "WiFiS3.h"
#include <ArduinoMqttClient.h>

// ---------------- WIFI + MQTT ----------------
char ssid[] = "Tec-IoT";
char pass[] = "spotless.magnetic.bridge";

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "test.mosquitto.org";
int port = 1883;

// TOPICS
const char topicTemp[] = "TEAM2/HomeX/temp";
const char topicDist[] = "TEAM2/HomeX/dist";
const char topicPress[] = "TEAM2/HomeX/pres";
const char topicLight[] = "TEAM2/HomeX/light";
const char topicRain[] = "TEAM2/HomeX/rain";
const char topicButton[] = "TEAM2/HomeX/button";
const char topicUltrasonic[] = "TEAM2/HomeX/ultra";
// control topic
const char topicLedCmd[] = "TEAM2/HomeX/cmd/led";

// ---------------- OLED ----------------
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_ADDR 0x3C
Adafruit_SSD1306 screen(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// ---------------- SENSORS ----------------
VL53L0X tofSensor;
BME280 mySensor;

#define LIGHT_PIN A0
#define RAIN_PIN A1
#define LM35_PIN A2
#define LED_PIN 8
#define SERVO_PIN 9
#define BUZZER_PIN 6
#define BUTTON_PIN 3

// HC-SR04 pins
#define TRIG_PIN 4
#define ECHO_PIN 5

Servo mainServo; // 360° fan
Servo servo2;    // 180° door

int lightValue = 0;
int rainValue = 0;
float bmpTemp = 0;
float bmpPress = 0;
uint16_t lastDistanceMM = 0;
long hcsr04DistanceCM = 0;

// ---------------- BUZZER MELODY ----------------
void playAlertMelody()
{
    tone(BUZZER_PIN, 880, 150);
    delay(180);
    tone(BUZZER_PIN, 988, 150);
    delay(180);
    tone(BUZZER_PIN, 1047, 200);
    delay(250);
    noTone(BUZZER_PIN);
}

// ---------------- HC-SR04 FUNCTION ----------------
long readUltrasonicCM()
{
    digitalWrite(TRIG_PIN, LOW);
    delayMicroseconds(2);

    digitalWrite(TRIG_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIG_PIN, LOW);

    long duration = pulseIn(ECHO_PIN, HIGH, 25000);
    if (duration == 0)
        return -1;

    long distance = duration * 0.034 / 2;
    return distance;
}

// MQTT incoming message handler
void handleMqttMessage(int messageSize)
{
    // messageTopic and available/read come from ArduinoMqttClient
    String topic = mqttClient.messageTopic();
    String payload = "";
    while (mqttClient.available())
    {
        char c = (char)mqttClient.read();
        payload += c;
    }

    Serial.print("MQTT msg topic=");
    Serial.print(topic);
    Serial.print(" payload=");
    Serial.println(payload);

    if (topic == String(topicLedCmd))
    {
        // accept values: "1","0","on","off"
        payload.trim();
        payload.toLowerCase();
        if (payload == "1" || payload == "on")
        {
            digitalWrite(LED_PIN, HIGH);
            Serial.println("LED -> ON (via MQTT)");
        }
        else
        {
            digitalWrite(LED_PIN, LOW);
            Serial.println("LED -> OFF (via MQTT)");
        }
    }
}

// ======================================================
//                        SETUP
// ======================================================
void setup()
{
    Serial.begin(9600);
    Wire.begin();

    pinMode(LIGHT_PIN, INPUT);
    pinMode(RAIN_PIN, INPUT);
    pinMode(LED_PIN, OUTPUT);
    pinMode(BUZZER_PIN, OUTPUT);
    pinMode(BUTTON_PIN, INPUT_PULLUP);

    pinMode(TRIG_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);

    mainServo.attach(SERVO_PIN);
    mainServo.write(90);

    servo2.attach(10);
    servo2.write(0);

    if (!screen.begin(SSD1306_SWITCHCAPVCC, OLED_ADDR))
    {
        Serial.println("OLED NOT FOUND");
    }

    if (!tofSensor.init())
    {
        Serial.println("VL53L0X NOT FOUND");
        while (1)
            ;
    }
    tofSensor.startContinuous(100);

    mySensor.settings.I2CAddress = 0x76;
    if (!mySensor.begin())
    {
        Serial.println("BMP280 NOT FOUND");
        while (1)
            ;
    }

    // WIFI
    Serial.println("Connecting WiFi...");
    while (WiFi.begin(ssid, pass) != WL_CONNECTED)
    {
        Serial.print(".");
        delay(1000);
    }
    Serial.println("WiFi connected");

    // MQTT
    Serial.println("Connecting MQTT...");
    while (!mqttClient.connect(broker, port))
    {
        Serial.println("MQTT FAILED");
        delay(1000);
    }
    Serial.println("MQTT Connected OK");

    // subscribe to control topic and set message handler
    mqttClient.subscribe(topicLedCmd);
    mqttClient.onMessage(handleMqttMessage);
}

// ======================================================
//                        LOOP
// ======================================================
void loop()
{

    // process incoming MQTT messages (ArduinoMqttClient uses poll())
    if (mqttClient.connected())
    {
        mqttClient.poll(); // ensure incoming messages are processed
    }

    // -------- READ SENSORS --------
    lightValue = analogRead(LIGHT_PIN);
    rainValue = analogRead(RAIN_PIN);

    uint16_t d = tofSensor.readRangeContinuousMillimeters();
    if (!tofSensor.timeoutOccurred())
        lastDistanceMM = d;

    bmpTemp = mySensor.readTempC();
    bmpPress = mySensor.readFloatPressure() / 100.0;

    bool buttonPressed = (digitalRead(BUTTON_PIN) == LOW);

    hcsr04DistanceCM = readUltrasonicCM();

    // -------- LED CONTROL --------
    if (buttonPressed)
        digitalWrite(LED_PIN, HIGH);
    else
        digitalWrite(LED_PIN, LOW);

    // <<<<< AGREGADO: CONTROL DE LLUVIA >>>>>
    // Rain sensors return LOW values when water is detected
    if (rainValue < 300)
    {
        // lluvia fuerte → prende el LED también
        digitalWrite(LED_PIN, HIGH);
        Serial.println("LLUVIA DETECTADA (Alerta)");
    }
    // <<<<< FIN AGREGADO >>>>>

    // -------- SERVO #1 (360° FAN) --------
    if (lightValue > 200 || bmpTemp > 28)
        mainServo.write(180);
    else
        mainServo.write(90);

    // -------- SERVO #2 (180° DOOR) --------
    if (hcsr04DistanceCM < 10 || buttonPressed)
        servo2.write(180);
    else
        servo2.write(0);

    // -------- BUZZER --------
    if (lastDistanceMM < 30)
    {
        playAlertMelody();
    }

    // -------- SEND MQTT --------
    mqttClient.beginMessage(topicTemp);
    mqttClient.print(bmpTemp);
    mqttClient.endMessage();

    mqttClient.beginMessage(topicPress);
    mqttClient.print(bmpPress);
    mqttClient.endMessage();

    mqttClient.beginMessage(topicDist);
    mqttClient.print(lastDistanceMM);
    mqttClient.endMessage();

    mqttClient.beginMessage(topicLight);
    mqttClient.print(lightValue);
    mqttClient.endMessage();

    mqttClient.beginMessage(topicRain);
    mqttClient.print(rainValue);
    mqttClient.endMessage();

    mqttClient.beginMessage(topicButton);
    mqttClient.print(buttonPressed ? 1 : 0);
    mqttClient.endMessage();

    mqttClient.beginMessage(topicUltrasonic);
    mqttClient.print(hcsr04DistanceCM);
    mqttClient.endMessage();

    // -------- OLED DISPLAY --------
    screen.clearDisplay();
    screen.setTextSize(1);
    screen.setTextColor(SSD1306_WHITE);

    screen.setCursor(0, 0);
    screen.println("IoT Dashboard");

    screen.setCursor(0, 12);
    screen.print("Light: ");
    screen.println(lightValue);

    screen.setCursor(0, 22);
    screen.print("Rain: ");
    screen.println(rainValue);

    screen.setCursor(0, 32);
    screen.print("Temp: ");
    screen.print(bmpTemp);
    screen.println(" C");

    screen.setCursor(0, 42);
    screen.print("Press: ");
    screen.print(bmpPress);
    screen.println(" hPa");

    screen.setCursor(0, 52);
    screen.print("Dist: ");
    screen.print(lastDistanceMM);
    screen.println(" mm");

    screen.display();

    // -------- SERIAL DEBUG --------
    Serial.print("Light=");
    Serial.print(lightValue);

    Serial.print(" | Rain=");
    Serial.print(rainValue);

    Serial.print(" | Temp=");
    Serial.print(bmpTemp);

    Serial.print(" | Ultra=");
    Serial.print(hcsr04DistanceCM);

    Serial.print(" | VL53=");
    Serial.print(lastDistanceMM);

    Serial.print(" | Button=");
    Serial.println(buttonPressed ? "PRESSED" : "NOT");

    delay(500);
}
