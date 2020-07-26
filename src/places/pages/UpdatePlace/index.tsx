import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { sendRequest } from '../../../helpers/sendRequest'
import { RootState } from "../../../reducers";
import { setError, setIsLoading } from '../../../ducks/places'
import Input from "../../../shared/components/UIElements/Input";
import Button from "../../../shared/components/UIElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import ErrorModal from '../../../shared/components/UIElements/ErrorModal'
import styles from "./style.module.scss";

const UpdatePlace: React.FC = () => {
  const dispatch = useDispatch()
  const [loadedPlace, setLoadedPlace] = useState({ title: '', description: '' })
  const history = useHistory()
  const placeId = useParams<{ placeId: string }>().placeId;
  const { isLoading, error } = useSelector((state: RootState) => state.places);
  const { currentUser } = useSelector((state: RootState) => state.users);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );



  useEffect(() => {
    const fetchPlace = async (id: string) => {
      setIsLoading(true);
      try {
        const response = await sendRequest(`places/${id}`)
        const responseData = await response?.json()
        if (!response?.ok) {
          throw new Error(responseData.message)
        }
        setLoadedPlace(responseData.place)
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.title,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        dispatch(setError(err.message))
      }
    }
    fetchPlace(placeId)
    setIsLoading(false);
  }, [dispatch, placeId, setFormData]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card style={{ padding: 10 }}>
          <h2>Place is not found</h2>
        </Card>
      </div>
    );
  }


  const placeUpdateSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setIsLoading(true))
    try {
      await sendRequest(`places/${placeId}`, 'PATCH', JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }), { 'Content-Type': 'application/json', 'Authorization': `Bearer ${currentUser?.token}` })
      history.push(`/${currentUser?.userId}/places`)
    } catch (err) {
      dispatch(setError(err.message))
    }
    dispatch(setIsLoading(false))
  };
  return (
    <>
      <ErrorModal error={error} onClear={() => dispatch(setError(null))} />
      {!isLoading && loadedPlace.title && <form className={styles.placeForm} onSubmit={placeUpdateSubmitHandler}>
        <Input
          type="text"
          element="input"
          id="title"
          label="Title"
          errorText="Please enter a valid title"
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
          initialValid={true}
          initialValue={loadedPlace.title}
        />
        <Input
          element="textarea"
          id="description"
          label="Description"
          errorText="Please enter a valid description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
          initialValid={true}
          initialValue={loadedPlace.description}
        />

        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
      </Button>
      </form>}
    </>
  );
};

export default UpdatePlace;
