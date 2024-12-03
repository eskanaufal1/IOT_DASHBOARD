import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import isLoggedpersistedReducer from "../reducers/isLogged";
import themePersistedReducer from "../reducers/themeSet";
import { saveState, loadState } from "../../storage/localStorage";
const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = configureStore(
  {
    reducer: {
      isLogged: isLoggedpersistedReducer,
      isDark: themePersistedReducer,
    },

    preloadedState: persistedState,
  },

  composeEnhancers()
);

store.subscribe(() => saveState(store.getState()));

export default store;
