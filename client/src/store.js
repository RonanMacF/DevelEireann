import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

const middleware = [thunk];
const initialState = {};

// This const is necessary to remove some chrom redux dev tools that appeared
const composeEnhancer =
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: "App",
        actionBlacklist: ["REDUX_STORAGE_SAVE"]
      })
    : compose;

// Create enhance with middleware + redux chrome tools
const enhancer = composeEnhancer(applyMiddleware(...middleware));

//Create the store
const store = createStore(rootReducer, initialState, enhancer);

export default store;
