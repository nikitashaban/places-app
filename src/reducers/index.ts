import { combineReducers } from "redux";

import users from "../ducks/users";
import places from "../ducks/places";
const rootReducer = combineReducers({ users, places });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
