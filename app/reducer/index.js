import { combineReducers } from "redux";
import { AuthReducer } from "./authReducer";

export const reducers = combineReducers({
    auth : AuthReducer
})