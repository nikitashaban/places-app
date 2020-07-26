import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ErrorModal from '../../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import { RootState } from "../../../reducers";
import Modal from "../../../shared/components/UIElements/Modal";
import Map from "../../../shared/components/UIElements/Map";
import Card from "../../../shared/components/UIElements/Card";
import { PlacesInterface, deletePlace, setError } from "../../../ducks/places";
import Button from "../../../shared/components/UIElements/Button";
import styles from "./style.module.scss";

const PlaceItem: React.FC<PlacesInterface> = ({
  id,
  title,
  image,
  description,
  address,
  creator,
  coordinates,
}) => {
  const dispatch = useDispatch()
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.users);
  const { error, isLoading } = useSelector((state: RootState) => state.places);
  const confirmDeleteHandler = (placeId: string) => {
    setShowConfirmModal(false);
    dispatch(deletePlace(placeId))
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => dispatch(setError(null))} />
      <Modal
        show={showMap}
        onCancel={() => setShowMap(false)}
        header={address}
        footer={<Button onClick={() => setShowMap(false)}>CLOSE</Button>}
        footerClass={styles.placeItem__modalActions}
      >
        <div className={styles.mapContainer}>
          <Map center={coordinates} zoom={10} />
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
            <Button onClick={() => confirmDeleteHandler(id)} danger>
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
          {isLoading && <LoadingSpinner asOverlay />}
          <div className={styles.placeItem__image}>
            <img src={`${process.env.REACT_APP_ASSET_URL}${image}`} alt={title} />
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
            {creator === currentUser?.userId && <Button to={`/places/${id}`}>EDIT</Button>}
            {creator === currentUser?.userId && (
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
