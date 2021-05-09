import { combineReducers, compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import { userReducer } from "./reducers/userReducer";
import { LOGOUT_USER } from "./consts/userConsts";

const appReducer = combineReducers({
  user: userReducer,
});

const middlewares = [thunk];

const rootReducer = (state, action) => {
  if (LOGOUT_USER) {
    state = undefined;
  }

  return appReducer(state, action);
};

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export default createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares))
);
