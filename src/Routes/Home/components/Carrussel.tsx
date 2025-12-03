import img1 from "../../../assets/process1.jpg";

interface CarouselProps {
  width?: number | string;
  height?: number | string;
}

const Carousel = ({ width = 628, height = 328 }: CarouselProps) => {
  const containerStyle: React.CSSProperties = {
    maxWidth: typeof width === "number" ? `${width}px` : width,
    margin: "0 auto",
  };
  const imgStyle: React.CSSProperties = {
    height: typeof height === "number" ? `${height}px` : height,
    objectFit: "cover",
    width: "100%",
  };

  return (
    <div
      style={containerStyle}
      id="carouselExampleIndicators"
      className="carousel slide"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={img1} style={imgStyle} className="d-block" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={img1} style={imgStyle} className="d-block" alt="..." />
        </div>
        <div className="carousel-item">
          <img src={img1} style={imgStyle} className="d-block" alt="..." />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
