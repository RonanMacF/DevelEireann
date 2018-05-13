const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  // Validator only accepts Strings so convert null values to an empty String
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  // Checks Email is well formed
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email Field is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.email = "Password Field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
