import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Input from "../../../shared/components/UIElements/Input";
import Button from "../../../shared/components/UIElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner'
import { useForm } from "../../../shared/hooks/form-hook";
import { authSubmitHandler, setError } from "../../../ducks/users";
import { RootState } from '../../../reducers'
import styles from "./style.module.scss";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.users);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const switchLoginMode = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        true
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const clearErrorHandler = () => dispatch(setError(null))

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearErrorHandler} />
      <Card className={styles.authentication}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login required</h2>
        <hr />
        <form onSubmit={(event) => dispatch(authSubmitHandler(event, formState, isLoginMode))}>
          {!isLoginMode && (
            <Input
              label="Name"
              id="name"
              type="text"
              element="input"
              errorText="Please enter your name"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
            />
          )}
          <Input
            label="E-mail"
            id="email"
            type="email"
            element="input"
            errorText="Please enter valid email address"
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            element="input"
            errorText="Please enter valid password (at least 6 characters)"
            validators={[VALIDATOR_MINLENGTH(6)]}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isLoginMode ? "LOGIN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={switchLoginMode}>
          SWITCH TO {isLoginMode ? "SIGN UP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
