import isLoggedReducer from "./isLoggedReducer";
import themeReducer from "./themeSetReducer";
import realtimeDataReducer from "./realtimeData";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: isLoggedReducer,
  isDark: themeReducer,
  realtimeData: realtimeDataReducer,
});
export default allReducers;
