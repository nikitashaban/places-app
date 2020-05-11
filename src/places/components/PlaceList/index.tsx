import React from "react";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import { State } from "../../../ducks/places";
import Card from "../../../shared/components/UIElements/Card";
import PlaceItem from "../PlaceItem";
import styles from "./style.module.scss";

interface CurrentState {
  places: State;
}

const PlaceList: React.FC = () => {
  const typedUseSelector: TypedUseSelectorHook<CurrentState> = useSelector;

  const placesList = typedUseSelector((state) => state.places.placesList);

  if (placesList.length === 0) {
    return (
      <div className={`${styles.placeList} center`}>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share place</button>
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
          location={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
