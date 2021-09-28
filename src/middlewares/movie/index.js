import { check, validationResult } from "express-validator";
import AppError from "../../errors/appError.js";
import { findByTitle } from "../../services/movieService.js";
import { validJWT, hasRole } from "../auth/index.js";
import { ADMIN_ROLE, USER_ROLE, ROLES } from "../../constants/index.js";

const _titleRequired = check("title", "Title required").not().isEmpty();

const _calificationIsNumeric = check("calification", "Calification has to be a number").optional().isNumeric();

const _dateValid = check("creationDate","Creation date error format").isDate("MM-DD-YYYY");

const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Invalid Role", 400);
    }
  });

const _validationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation Error", 400, errors.errors);
  }
  next();
};

const _titleExist = check("title").custom(async (title = "") => {
  const movieFound = await findByTitle(title);
  if (movieFound) {
    throw new AppError("Movie already exist", 400);
  }
});

const _idRequired = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _titleRequired,
  _titleExist,
  _calificationIsNumeric,
  _dateValid,
  _roleValid,
  _validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE, USER_ROLE),
  _idIsNumeric,
  _titleRequired,
  _titleExist,
  _calificationIsNumeric,
  _dateValid,
  _roleValid,
  _validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _idIsNumeric,
  _validationResult,
];

const getRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE, USER_ROLE),
  _validationResult,
];

export {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getRequestValidations,
};
