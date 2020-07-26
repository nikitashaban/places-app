import { RootState } from './../reducers/index';
import { ThunkAction } from 'redux-thunk'
import { FormStateType } from '../shared/hooks/form-hook'

import { sendRequest } from '../helpers/sendRequest'

// const

const SET_IS_LOADING = "SET_IS_LOADING"
const SET_ERROR = "SET_ERROR"
const SET_USERS = "SET_USERS"
const SET_CURRENT_USER = "SET_CURRENT_USER"
//initial state

export interface UsersInterface {
  id: string;
  name: string;
  image: string;
  places: Array<any>;
}

export interface ICurrentUser {
  email: string;
  token: string;
  userId: string;
  expiration: Date;
}
export type State = {
  usersList: Array<UsersInterface>;
  currentUser: ICurrentUser | null;
  isLoading: boolean;
  error: string | null
};


type Action = { type: typeof SET_IS_LOADING, payload: boolean } |
{ type: typeof SET_ERROR, payload: string | null } |
{ type: typeof SET_USERS, payload: Array<UsersInterface> } |
{ type: typeof SET_CURRENT_USER, payload: ICurrentUser }

const initialState: State = {
  usersList: [],
  currentUser: null,
  isLoading: false,
  error: null
};

//reducer
export default (state = initialState, action: Action): State => {
  switch (action.type) {
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
    case SET_USERS:
      return {
        ...state,
        usersList: action.payload
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }

    default: {
      return state;
    }
  }
};

//actions
export const setIsLoading = (payload: boolean) => ({
  type: SET_IS_LOADING,
  payload
})
export const setError = (payload: string | null) => ({
  type: SET_ERROR,
  payload
})
export const setUsers = (payload: Array<UsersInterface>) => ({ type: SET_USERS, payload })
export const setCurrentUser = (payload: ICurrentUser | null) => ({ type: SET_CURRENT_USER, payload })

//action creators

export const authSubmitHandler = (event: React.FormEvent, formState: FormStateType, isLoginMode: boolean): ThunkAction<void, RootState, unknown, any> => {
  return async (dispatch, getState) => {
    const { currentUser } = getState().users
    event.preventDefault();

    dispatch(setIsLoading(true))
    if (isLoginMode) {
      try {
        const response = await sendRequest("users/login", 'POST', JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value
        }), { 'Content-Type': 'application/json' })
        const responseData = await response?.json()
        if (!response?.ok) {
          throw new Error(responseData.message)
        }
        const expirationDate = currentUser?.expiration || new Date(new Date().getTime() + 1000 * 60 * 60)
        localStorage.setItem("userData", JSON.stringify({ ...responseData, expiration: expirationDate.toISOString() }))
        dispatch(setCurrentUser({ ...responseData, expiration: expirationDate }))
        dispatch(setIsLoading(false))
      } catch (err) {
        dispatch(setIsLoading(false))
        dispatch(setError(err.message))
      }
    } else {
      try {
        const formData = new FormData()
        formData.append('email', formState.inputs.email.value)
        formData.append('password', formState.inputs.password.value)
        formData.append('name', formState.inputs.name.value)
        formData.append('image', formState.inputs.image.value)

        const response = await sendRequest("users/signup", 'POST', formData)

        const responseData = await response?.json()
        if (!response?.ok) {
          throw new Error(responseData.message)
        }
        dispatch(setCurrentUser({ ...responseData }))
        dispatch(setIsLoading(false))
      } catch (err) {
        dispatch(setIsLoading(false))
        dispatch(setError(err.message))
      }
    }
  }
};

export const getUsers = (): ThunkAction<void, State, unknown, any> => {
  return async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await sendRequest("users")
      const responseData = await response?.json()
      if (!response?.ok) {
        throw new Error(responseData.message)
      }
      dispatch(setUsers(responseData.users))
    } catch (err) {
      dispatch(setError(err.message))
    }
    dispatch(setIsLoading(false))
  }
}



