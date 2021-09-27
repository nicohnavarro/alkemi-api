import { check, validationResult } from "express-validator";
import AppError from "../../errors/appError.js";
import { findById } from "../../services/userService.js";
import { validJWT, hasRole } from "../auth/index.js";
import { ADMIN_ROLE, USER_ROLE, ROLES } from "../../constants/index.js";

const _nameRequired = check("name", "Name required").not().isEmpty();

const _historyRequired = check("history", "History required")
  .not()
  .isEmpty();

const _ageIsNumeric = check("age","Age required").isNumeric();

const _weightIsNumeric = check("weight","Weight required").isNumeric();

const _roleValid = check("role")
  .optional()
  .custom(async (role = "") => {
    if (!ROLES.includes(role)) {
      throw new AppError("Invalid Role", 400);
    }
  });

const _dateValid = check("dateOfBirth").optional().isDate("MM-DD-YYYY");

const _validationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation Error", 400, errors.errors);
  }
  next();
};

const _idRequired = check("id").not().isEmpty();
const _idExist = check("id").custom(async (id = "") => {
  const userFound = await findById(id);
  if (!userFound) {
    throw new AppError("User not exist", 400);
  }
});

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _ageIsNumeric,
  _weightIsNumeric,
  _historyRequired,
  _roleValid,
  _validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE, USER_ROLE),
  _roleValid,
  _dateValid,
  _idRequired,
  _idExist,
  _validationResult,
];

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _idExist,
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
