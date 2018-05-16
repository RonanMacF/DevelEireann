import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Insert the JwtToken in authorization for every HTTP Request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete authorization header upon logging out
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
