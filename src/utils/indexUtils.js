// src/utils/indexUtils.js

const { response } = require("./response");
const { catchAsync } = require("./catchAsync");
const { ClientError } = require("./clientError");
const { validateName, validateEmail, validateText, validateNumber, validateDate, removeTimeFromDate, generateUniqueSKU, calculateTotalPrice } = require("./utils");
const resError = require("./resError");
const { hashPassword } = require("./passwordUtils");



module.exports = {
  response,
  resError,
  catchAsync,
  ClientError,
  validateName,
  validateEmail,
  validateText,
  validateNumber,
  validateDate,
  removeTimeFromDate,
  hashPassword,
  generateUniqueSKU,
  calculateTotalPrice,
};
