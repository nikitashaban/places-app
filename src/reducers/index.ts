import { combineReducers } from "redux";

import users from "../ducks/users";
import places from "../ducks/places";
export default combineReducers({ users, places });
