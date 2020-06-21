import { ThunkAction } from 'redux-thunk'
import { FormStateType } from '../shared/hooks/form-hook'

// const
const SET_IS_USER_LOGGED = "SET_IS_USER_LOGGED";
const SET_IS_LOADING = "SET_IS_LOADING"
const SET_ERROR = "SET_ERROR"
//initial state

export interface UsersInterface {
  id: string;
  name: string;
  image: string;
  places: number;
}
export type State = {
  usersList: Array<UsersInterface>;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null
};


type Action = {
  type: typeof SET_IS_USER_LOGGED;
  payload: boolean;
} | { type: typeof SET_IS_LOADING, payload: boolean } | { type: typeof SET_ERROR, payload: string | null }
const initialState: State = {
  usersList: [
    {
      id: "1",
      name: "Vasiliy",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      places: 3,
    },
  ],
  isLoggedIn: false,
  isLoading: false,
  error: null
};

//reducer
export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case SET_IS_USER_LOGGED:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default: {
      return state;
    }
  }
};

//actions
export const setIsUserLogged = (payload: boolean) => ({
  type: SET_IS_USER_LOGGED,
  payload,
});
export const setIsLoading = (payload: boolean) => ({
  type: SET_IS_LOADING,
  payload
})
export const setError = (payload: string | null) => ({
  type: SET_ERROR,
  payload
})
//action creators

export const authSubmitHandler = (event: React.FormEvent, formState: FormStateType, isLoginMode: boolean): ThunkAction<void, State, unknown, any> => {
  return async dispatch => {
    event.preventDefault();
    dispatch(setIsLoading(true))
    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        })
        const responseData = await response.json()
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        dispatch(setIsUserLogged(true));
        dispatch(setIsLoading(false))
      } catch (err) {
        dispatch(setIsLoading(false))
        dispatch(setError(err.message))
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        })
        const responseData = await response.json()

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        dispatch(setIsUserLogged(true));
        dispatch(setIsLoading(false))
      } catch (err) {
        dispatch(setIsLoading(false))
        dispatch(setError(err.message))
      }
    }
  }
};
