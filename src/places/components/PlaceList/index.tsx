import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

import Button from "../../../shared/components/UIElements/Button";
import { RootState } from "../../../reducers";
import Card from "../../../shared/components/UIElements/Card";
import PlaceItem from "../PlaceItem";
import styles from "./style.module.scss";

const PlaceList: React.FC = () => {
  const userId = useParams<{ userId: string }>().userId;
  const placesList = useSelector((state: RootState) => state.places.placesList);
  const currentUserPlaces = placesList.filter(
    (place) => place.creator === userId
  );
  if (currentUserPlaces.length === 0) {
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
      {currentUserPlaces.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.image}
          description={place.description}
          address={place.address}
          creator={place.creator}
          location={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
