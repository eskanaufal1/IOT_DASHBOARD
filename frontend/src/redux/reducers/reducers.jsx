import isLoggedReducer from "./isLogged";
import themeReducer from "./themeSet";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: isLoggedReducer,
  isDark: themeReducer,
});
export default allReducers;
