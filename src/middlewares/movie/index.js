import { check, validationResult } from "express-validator";
import AppError from "../../errors/appError.js";
import { validJWT, hasRole } from "../auth/index.js";
import { ADMIN_ROLE, USER_ROLE, ROLES } from "../../constants/index.js";

import ContentTypeRepository from "../../repositories/contentTypeRepository.js";
import GenderTypeRepository from "../../repositories/genderTypeRepository.js";
import MovieRepository from "../../repositories/movieRepository.js";

import { imageRequired } from "../common.js";
import multer from "multer";

const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();
const movieRepository = new MovieRepository();
const upload = multer();

const _titleOptional = check("title").optional();
const _titleRequired = check("title", "Title required").not().isEmpty();
const _titleNotExist = check("title").custom(async (title = "") => {
  const mFound = await movieRepository.findByTitle(title);
  if (mFound) {
    throw new AppError("The title exist in DB", 400);
  }
});

const _calificationIsNumericAndOptional = check("calification")
  .optional()
  .isNumeric();

const _calificationIsNumeric = check(
  "calification",
  "Calification has to be a number"
)
  .optional()
  .isNumeric();

const _dateValid = check("creationDate", "Creation date error format").isDate(
  "MM-DD-YYYY"
);

const _creationDateIsDateAndOptional = check("creationDate")
  .optional()
  .isDate();
const _creationDateRequired = check("creationDate").not().isEmpty();
const _creationDateIsDate = check("creationDate").isDate();

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
  const movieFound = await movieRepository.findByTitle(title);
  if (movieFound) {
    throw new AppError("Movie already exist", 400);
  }
});

const _idRequired = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();

const _contentTypeExistValidation = async (contentType = "") => {
  try {
    const contentTypeFound = await contentTypeRepository.findByDescription(
      contentType
    );
    if (!contentTypeFound) {
      throw new AppError("The content type does not exist in DB", 400);
    }
  } catch (err) {
    throw new AppError("The content type does not exist in DB", 400);
  }
};

const _idExist = check("id").custom(async (id = "") => {
  const mFound = await movieRepository.findById(id);
  if (!mFound) {
    throw new AppError("The id does not exist in DB", 400);
  }
});

const _genderTypeExistValidation = async (genderType = "") => {
  try {
    const genderTypeFound = await genderTypeRepository.findByDescription(
      genderType
    );
    if (!genderTypeFound) {
      throw new AppError("The gender type does not exist in DB", 400);
    }
  } catch (err) {
    throw new AppError("The gender type does not exist in DB", 400);
  }
};

const _contentTypeExist = check("contentType").custom(
  _contentTypeExistValidation
);
const _genderTypeExist = check("genderType").custom(_genderTypeExistValidation);
const _contentTypeOptional = check("contentType")
  .optional()
  .custom(_contentTypeExistValidation);
const _genderTypeOptional = check("genderType")
  .optional()
  .custom(_genderTypeExistValidation);

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _titleRequired,
  _titleExist,
  _calificationIsNumeric,
  _dateValid,
  _roleValid,
  _contentTypeExist,
  _genderTypeExist,
  _validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE, USER_ROLE),
  _idIsNumeric,
  _titleOptional,
  _titleNotExist,
  _calificationIsNumeric,
  _creationDateIsDateAndOptional,
  _roleValid,
  _contentTypeOptional,
  _genderTypeOptional,
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

const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single("image"),
  _idRequired,
  _idIsNumeric,
  _idExist,
  imageRequired,
  _validationResult,
];

export {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getRequestValidations,
  postImageRequestValidations
};
