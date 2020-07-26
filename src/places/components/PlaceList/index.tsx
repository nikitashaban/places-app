import React from "react";

import Button from "../../../shared/components/UIElements/Button";
import { RootState } from "../../../reducers";
import Card from "../../../shared/components/UIElements/Card";
import PlaceItem from "../PlaceItem";
import styles from "./style.module.scss";


interface IPlacesList {
  error: RootState['places']['error'],
  placesList: RootState['places']['placesList']
}


const PlaceList: React.FC<IPlacesList> = ({ placesList, error }) => {
  if (placesList.length === 0) {
    return (
      <div className={`${styles.placeList} center`}>
        <Card style={{ padding: "1rem" }}>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>

    );
  }

  return (

    <ul className={styles.placeList}>
      {placesList.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.image}
          description={place.description}
          address={place.address}
          creator={place.creator}
          coordinates={place.coordinates}
        />
      ))}
    </ul>

  );
};

export default PlaceList;
