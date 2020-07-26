import { ThunkAction } from 'redux-thunk'
import { sendRequest } from '../helpers/sendRequest'
import { RootState } from '../reducers'
// const

const SET_PLACES = "SET_PLACES"
const SET_IS_LOADING = "SET_IS_LOADING"
const SET_ERROR = "SET_ERROR"
//initial state

export interface PlacesInterface {
  id: string;
  title: string;
  image: string;
  description: string;
  address: string;
  creator: string;
  coordinates: [number, number];
}


type Action =
  { type: typeof SET_PLACES, payload: Array<PlacesInterface> } | { type: typeof SET_IS_LOADING, payload: boolean } |
  { type: typeof SET_ERROR, payload: string | null }

export type State = {
  placesList: Array<PlacesInterface>;
  isLoading: boolean;
  error: string | null

};
const initialState: State = {
  placesList: [],
  isLoading: false,
  error: null
};

//reducer
export default (state = initialState, action: Action): State => {
  switch (action.type) {
    default: {
      return state;
    }
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
    case SET_PLACES:
      return {
        ...state,
        placesList: action.payload
      }
  }
};

//actions
export const setPlaces = (payload: Array<PlacesInterface>) => ({ type: SET_PLACES, payload })
export const setIsLoading = (payload: boolean) => ({
  type: SET_IS_LOADING,
  payload
})
export const setError = (payload: string | null) => ({
  type: SET_ERROR,
  payload
})
//action creators


export const getPlacesByUserId = (userId: string): ThunkAction<void, State, unknown, any> => {
  return async dispatch => {
    dispatch(setIsLoading(true))
    try {
      const response = await sendRequest(`places/user/${userId}`,)
      const responseData = await response?.json()
      if (!response?.ok && response?.status !== 404) {
        throw new Error(responseData.message)
      }
      if (response?.status === 404) {
        dispatch(setPlaces([]))
      } else {
        dispatch(setPlaces(responseData.places))
      }
    } catch (err) {
      dispatch(setError(err.message))
    }
    dispatch(setIsLoading(false))
  }
}

export const deletePlace = (placeId: string): ThunkAction<void, RootState, unknown, any> => {
  return async (dispatch, getState) => {
    const placesList = getState().places.placesList
    const { currentUser } = getState().users
    dispatch(setIsLoading(true))
    try {
      const response = await sendRequest(`places/${placeId}`, 'DELETE', null, { 'Authorization': `Bearer ${currentUser?.token}` })
      const responseData = await response?.json()
      if (!response?.ok) {
        throw new Error(responseData.message)
      }
      const filteredPlace = placesList.filter(place => place.id !== placeId)
      dispatch(setPlaces(filteredPlace))
    } catch (err) {
      dispatch(setError(err.message))
    }
    dispatch(setIsLoading(false))
  }
}
