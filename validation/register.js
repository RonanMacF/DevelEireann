const Validator = require("validator");
const isEmpty = require("./is-empty");

// This function ensures that any register user input is well formed and valid
module.exports = function validateRegisterInput(data) {
  let errors = {};

  // convert any null strings to an empty string as validator can only take strings
  data.name = isEmpty(data.name) ? "" : data.name;
  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;
  data.password2 = isEmpty(data.password2) ? "" : data.password2;

  // Ensures the name is of a valid length
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  // Ensures Email is well formed
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Ensure password is greater than 6 characters long
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  // Ensure both passwords match
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  // Iterates through the list and checks if any input is empty
  dataFields = ["name", "email", "password", "password2"];
  dataFields.forEach(field => {
    if (Validator.isEmpty(data[field])) {
      errors[field] = `${field} field is required`;
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
