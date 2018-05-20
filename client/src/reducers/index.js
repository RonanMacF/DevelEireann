import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

// Root Reducer
export default combineReducers({
  auth: authReducer, // Contains userData and whether are authenticated or not
  errors: errorReducer, // Contains all the errors for form validation
  profile: profileReducer
});
