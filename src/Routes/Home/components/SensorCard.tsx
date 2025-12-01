import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface PropsForTheCard {
  cardTitle: string;
  value: string;
  imageURL: string;
  linkButton: string;
  children?: ReactNode;
}

const SensorCard = ({
  cardTitle,
  value,
  imageURL,
  linkButton,
  children,
}: PropsForTheCard) => {
  return (
    <div className="card text-center p-3">
      {/* Imagen con tamaño controlado */}
      <img
        src={imageURL}
        alt="sensor"
        className="mx-auto d-block"
        style={{
          width: "auto",
          objectFit: "contain",
          height: "100px",
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text">
          {!children ? <strong>{value}</strong> : null}
        </p>

        {/* If a child component is provided (e.g. MqttComp), render it here */}
        {children ? <div className="mt-2">{children}</div> : null}

        {/* Botón con React Router */}
        <Link to={linkButton} className="btn btn-primary">
          More details
        </Link>
      </div>
    </div>
  );
};

export default SensorCard;
