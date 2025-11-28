


// interface PropsForTheCard {
//   cardTitle: string;
//   descriptionText: string;
//   value: string;
//   imageURL: string;
//   linkButton: string;
//   imgSize?: number; // ⬅ tamaño controlable
// }

// const SensorCard = ({
//   cardTitle,
//   descriptionText,
//   value,
//   imageURL,
//   linkButton,
//   imgSize = 80, // tamaño por default
// }: PropsForTheCard) => {
//   return (
//     <div className="card text-center p-3">
//       <img
//         src={imageURL}
//         alt="sensor"
//         className="mx-auto d-block sensor-img"
//         style={{
//           height: imgSize,
//           width: imgSize,
//           objectFit: "contain",
//         }}
//       />

//       <div className="card-body">
//         <h5 className="card-title">{cardTitle}</h5>
//         <p className="card-text">
//           {descriptionText}: {value}
//         </p>
//         <a href={linkButton} className="btn btn-primary">
//           More details
//         </a>
//       </div>
//     </div>
//   );
// };

// export default SensorCard;


import React from "react";
import { Link } from "react-router-dom";

interface PropsForTheCard {
  cardTitle: string;
  descriptionText: string;
  value: string;
  imageURL: string;
  linkButton: string;
  imgSize: number;   // ⬅ control del tamaño
}

const SensorCard = ({
  cardTitle,
  descriptionText,
  value,
  imageURL,
  linkButton,
  imgSize
}: PropsForTheCard) => {
  return (
    <div className="card text-center p-3">

      {/* Imagen con tamaño controlado */}
      <img
        src={imageURL}
        alt="sensor"
        className="mx-auto d-block"
        style={{
          height: imgSize,
          width: "auto",
          objectFit: "contain"
        }}
      />

      <div className="card-body">
        <h5 className="card-title">{cardTitle}</h5>
        <p className="card-text">
          {descriptionText}: <strong>{value}</strong>
        </p>

        {/* Botón con React Router */}
        <Link to={linkButton} className="btn btn-primary">
          More details
        </Link>
      </div>

    </div>
  );
};

export default SensorCard;
