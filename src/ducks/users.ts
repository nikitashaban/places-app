// const
const SET_IS_USER_LOGGED = "SET_IS_USER_LOGGED";
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
};

type Action = {
  type: "SET_IS_USER_LOGGED";
  payload: boolean;
};
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
};

//reducer
export default (state = initialState, action: Action): State => {
  switch (action.type) {
    case SET_IS_USER_LOGGED:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
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
//action creators
