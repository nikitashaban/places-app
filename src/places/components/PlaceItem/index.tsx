import React, { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../reducers";
import Modal from "../../../shared/components/UIElements/Modal";
import Map from "../../../shared/components/UIElements/Map";
import Card from "../../../shared/components/UIElements/Card";
import { PlacesInterface } from "../../../ducks/places";
import Button from "../../../shared/components/UIElements/Button";
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
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.users.isLoggedIn);
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("...deleting");
  };
  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={() => setShowMap(false)}
        header={address}
        footer={<Button onClick={() => setShowMap(false)}>CLOSE</Button>}
        footerClass={styles.placeItem__modalActions}
      >
        <div className={styles.mapContainer}>
          <Map center={location} zoom={10} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={() => setShowConfirmModal(false)}
        footerClass={styles.placeItem__modalActions}
        header="Are you sure?"
        footer={
          <React.Fragment>
            <Button onClick={() => setShowConfirmModal(false)} inverse>
              CANCEL
            </Button>
            <Button onClick={confirmDeleteHandler} danger>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter
        </p>
      </Modal>
      <li className={styles.placeItem}>
        <Card>
          <div className={styles.placeItem__image}>
            <img src={image} alt={title} />
          </div>
          <div className={styles.placeItem__info}>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className={styles.placeItem__actions}>
            <Button inverse={true} onClick={() => setShowMap(true)}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && <Button to={`/places/${id}`}>EDIT</Button>}
            {isLoggedIn && (
              <Button onClick={() => setShowConfirmModal(true)} danger={true}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
