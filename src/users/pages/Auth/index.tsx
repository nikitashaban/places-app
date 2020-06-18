import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../../shared/util/validators";
import Input from "../../../shared/components/UIElements/Input";
import Button from "../../../shared/components/UIElements/Button";
import Card from "../../../shared/components/UIElements/Card";
import { useForm } from "../../../shared/hooks/form-hook";
import { setIsUserLogged } from "../../../ducks/users";
import styles from "./style.module.scss";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
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
  const authSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
    dispatch(setIsUserLogged(true));
  };
  return (
    <Card className={styles.authentication}>
      <h2>Login required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
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
          errorText="Please enter valid password (at least 5 characters)"
          validators={[VALIDATOR_MINLENGTH(5)]}
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
  );
};

export default Auth;
