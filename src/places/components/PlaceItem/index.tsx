import React from "react";

import { PlacesInterface } from "../../../ducks/places";
import styles from "./style.module.scss";

const PlaceItem: React.FC<PlacesInterface> = ({
  id,
  title,
  image,
  description,
  address,
  creator,
  location,
}) => {
  return (
    <li className={styles.placeItem}>
      <div className={styles.placeItem__image}>
        <img src={image} alt={title} />
      </div>
      <div></div>
    </li>
  );
};

export default PlaceItem;
