import { useReducer, useCallback } from "react";

type FormStateType = {
  inputs: {
    [key: string]: {
      value: string;
      isValid: boolean;
    };
  };
  isValid: boolean;
};

type Action =
  | {
      type: "INPUT_CHANGE";
      inputId: string;
      isValid: boolean;
      value: string;
    }
  | { type: "SET_DATA"; inputs: FormStateType["inputs"]; isValid: boolean };

const formReducer = (state: FormStateType, action: Action): FormStateType => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (!state.inputs[inputId]) {
          continue;
        }
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default: {
      return state;
    }
  }
};
export const useForm = (
  initialInputs: FormStateType["inputs"],
  initialFormValidity: boolean
): [
  FormStateType,
  (id: string, value: string, isValid: boolean) => void,
  (inputData: any, formValidity: any) => void
] => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });
  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    [dispatch]
  );
  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({ type: "SET_DATA", inputs: inputData, isValid: formValidity });
  }, []);
  return [formState, inputHandler, setFormData];
};
