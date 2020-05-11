// const

//initial state

export interface PlacesInterface {
  id: string;
  title: string;
  image: string;
  description: string;
  address: string;
  creator: string;
  location: [number, number];
}
export type State = {
  placesList: Array<PlacesInterface>;
};
const initialState: State = {
  placesList: [
    {
      id: "p1",
      title: "forest",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
      creator: "1",
      description: "Interesting place",
      address: "Simferopol",
      location: [321, 321],
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
