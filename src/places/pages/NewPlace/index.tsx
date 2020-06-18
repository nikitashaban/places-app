import React from "react";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import Button from "../../../shared/components/UIElements/Button";
import Input from "../../../shared/components/UIElements/Input";
import styles from "./style.module.scss";
import { useForm } from "../../../shared/hooks/form-hook";

const NewPlace: React.FC = () => {
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
    },
    false
  );
  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };
  return (
    <form className={styles.placeForm} onSubmit={submitHandler}>
      <Input
        onInput={inputHandler}
        id="title"
        label="Title"
        element="input"
        type="text"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Input
        onInput={inputHandler}
        id="description"
        placeholder="hello"
        label="Description"
        element="textarea"
        errorText="Please enter a valid description(at least 5 characters)"
        validators={[VALIDATOR_MINLENGTH(5)]}
      />
      <Input
        onInput={inputHandler}
        id="address"
        label="Address"
        element="input"
        errorText="Please enter a valid address"
        validators={[VALIDATOR_REQUIRE()]}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
