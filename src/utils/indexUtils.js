// src/utils/indexUtils.js

const { response } = require("./response");
const { catchAsync } = require("./catchAsync");
const { ClientError } = require("./clientError");
const { validateName, validateEmail, validateText, validateDateOfBirth, removeTimeFromDate } = require("./utils");
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
  validateDateOfBirth,
  removeTimeFromDate,
  hashPassword
};
