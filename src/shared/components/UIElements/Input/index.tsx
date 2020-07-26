import React, { useReducer, useEffect } from "react";

import { validate } from "../../../util/validators";
import styles from "./style.module.scss";

type InputProps = {
  id: string;
  type?: string;
  placeholder?: string;
  label: string;
  element: "input" | "textarea";
  rows?: number;
  errorText: string;
  validators: { type: string; val?: number }[];
  onInput: (id: string, value: string, isValid: boolean) => void;
  initialValue?: string;
  initialValid?: boolean;
};

type InputStateType = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

type Action =
  | {
    payload: string;
    type: "CHANGE" | "TOUCH";
    validators: { type: string; val?: number }[];
  }
  | { type: "TOUCH" };

const inputReducer = (
  state: InputStateType,
  action: Action
): InputStateType => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.payload,
        isValid: validate(action.payload, action.validators),
      };
    }
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default: {
      return state;
    }
  }
};

const Input: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  label,
  element,
  rows,
  errorText,
  validators,
  onInput,
  initialValid,
  initialValue,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue || "",
    isValid: initialValid || false,
    isTouched: false,
  });

  const changeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({ type: "CHANGE", payload: event.target.value, validators });
  };
  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const inputElement =
    element === "input" ? (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
        <textarea
          id={id}
          onBlur={touchHandler}
          rows={rows || 3}
          onChange={changeHandler}
          value={inputState.value}
        />
      );
  return (
    <div
      className={`${styles.formControl} ${
        !inputState.isValid && inputState.isTouched && styles.formControlInvalid
        }`}
    >
      <label htmlFor={id}>{label}</label>
      {inputElement}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
