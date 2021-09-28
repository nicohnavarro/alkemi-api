import { check, validationResult } from "express-validator";
import AppError from "../../errors/appError.js";
import { validToken, validRole } from "../../services/authService.js";

const _emailRequired = check("email", "Email required").not().isEmpty();
const _emailValid = check("email", "Email invalid").isEmail();

const _passwordRequired = check("password", "Password required")
  .not()
  .isEmpty();

const _validationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError("Validation Error", 401, errors.errors);
  }
  next();
};

const postLoginRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  _validationResult,
];

const postRegisterRequestValidations = [
  _emailRequired,
  _emailValid,
  _passwordRequired,
  _validationResult,
];

const validJWT = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const user = await validToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const hasRole = (...roles) => {
  return (req, res, next) => {
    try {
      validRole(req.user, ...roles);
      next();
    } catch (err) {
      next(err);
    }
  };
};

export {
  postLoginRequestValidations,
  postRegisterRequestValidations,
  validJWT,
  hasRole,
};
