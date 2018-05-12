const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Checks Email is well formed
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Checks if any of the fields are empty
  dataFields = ["email", "password"];
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
