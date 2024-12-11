import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import isLoggedpersistedReducer from "../reducers/isLoggedReducer";
import themePersistedReducer from "../reducers/themeSetReducer";
import realtimeDataPersistedReducer from "../reducers/realtimeDataReducer";
import { saveState, loadState } from "../../storage/localStorage";

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
  {
    reducer: {
      isLogged: isLoggedpersistedReducer,
      isDark: themePersistedReducer,
      realtimeData: realtimeDataPersistedReducer,
    },
    preloadedState: persistedState,
  },

  composeEnhancers()
);

store.subscribe(() => saveState(store.getState()));

export default store;
