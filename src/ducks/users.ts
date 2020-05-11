// const

//initial state

export interface UsersInterface {
  id: string;
  name: string;
  image: string;
  places: number;
}
export type State = {
  usersList: Array<UsersInterface>;
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
};

//reducer
export default (state = initialState, action: any): State => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

//actions

//action creators
