import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../reducers'
import { useHistory } from 'react-router-dom'

import ImageUpload from '../../../shared/components/UIElements/ImageUpload'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import Button from "../../../shared/components/UIElements/Button";
import Input from "../../../shared/components/UIElements/Input";
import styles from "./style.module.scss";
import { useForm } from "../../../shared/hooks/form-hook";
import { sendRequest } from '../../../helpers/sendRequest'
import ErrorModal from '../../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import { setError, setIsLoading } from '../../../ducks/users'

const NewPlace: React.FC = () => {
  const { currentUser, error, isLoading } = useSelector((state: RootState) => state.users)
  const history = useHistory()
  const dispatch = useDispatch()
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: "", isValid: false }
    },
    false
  );
  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setIsLoading(true))
    try {
      const formData = new FormData()
      formData.append('title', formState.inputs.title.value)
      formData.append('description', formState.inputs.description.value)
      formData.append('address', formState.inputs.address.value)
      formData.append('image', formState.inputs.image.value)

      const response = await sendRequest('places', 'POST', formData, {
        'Authorization': `Bearer ${currentUser?.token}`
      })
      const responseData = await response?.json()
      if (!response?.ok) {
        throw new Error(responseData.message)
      }
      history.push('/')
    } catch (err) {
      dispatch(setError(err.message))
    }
    dispatch(setIsLoading(false))
  };
  console.log(isLoading)
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => dispatch(setError(null))} />
      {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload id="image" center onInput={inputHandler} errorText="Please upload correct file" />
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
    </React.Fragment>
  );
};

export default NewPlace;
