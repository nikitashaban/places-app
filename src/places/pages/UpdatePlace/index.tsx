import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "../../../reducers";
import Input from "../../../shared/components/UIElements/Input";
import Button from "../../../shared/components/UIElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import { useForm } from "../../../shared/hooks/form-hook";
import styles from "./style.module.scss";

const UpdatePlace: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams<{ placeId: string }>().placeId;
  const placesList = useSelector((state: RootState) => state.places.placesList);

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
  const currentPlace = placesList.find((place) => place.id === placeId);
  useEffect(() => {
    setFormData(
      {
        title: {
          value: currentPlace?.title,
          isValid: true,
        },
        description: {
          value: currentPlace?.description,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, currentPlace]);
  if (!currentPlace) {
    return (
      <div className="center">
        <Card style={{ padding: 10 }}>
          <h2>Place is not found</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  const placeUpdateSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <form className={styles.placeForm} onSubmit={placeUpdateSubmitHandler}>
      <Input
        type="text"
        element="input"
        id="title"
        label="Title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
        initialValid={formState.inputs.title.isValid}
        initialValue={formState.inputs.title.value}
      />
      <Input
        element="textarea"
        id="description"
        label="Description"
        errorText="Please enter a valid description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
        initialValid={formState.inputs.description.isValid}
        initialValue={formState.inputs.description.value}
      />

      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
