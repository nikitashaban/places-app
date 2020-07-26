import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";

import ErrorModal from '../../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import { RootState } from '../../../reducers'
import { getPlacesByUserId, setError } from '../../../ducks/places'
import PlaceList from "../../components/PlaceList";

const UserPlaces: React.FC = () => {
  const dispatch = useDispatch()
  const userId = useParams<{ userId: string }>().userId;
  useEffect(() => {
    dispatch(getPlacesByUserId(userId))
  }, [dispatch, userId])
  const { placesList, error, isLoading } = useSelector((state: RootState) => state.places);
  return <>
    <ErrorModal error={error} onClear={() => dispatch(setError(null))} />;
    {isLoading && <LoadingSpinner asOverlay />}
    {!isLoading && placesList && <PlaceList placesList={placesList} error={error} />}
  </>;
};

export default UserPlaces;
