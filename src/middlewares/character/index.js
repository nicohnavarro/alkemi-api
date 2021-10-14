import { check, validationResult } from "express-validator";
import AppError from "../../errors/appError.js";
import { findByName } from "../../services/characterService.js";
import { validJWT, hasRole } from "../auth/index.js";
import { ADMIN_ROLE, USER_ROLE, ROLES } from "../../constants/index.js";
import { imageRequired } from "../common.js";
import multer from "multer";
const upload = multer();

const _nameRequired = check("name", "Name required").not().isEmpty();

const _historyRequired = check("history", "History required").not().isEmpty();

const _ageIsNumeric = check("age", "Age required").isNumeric();

const _weightIsNumeric = check("weight", "Weight required").isNumeric();

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

const _idExist = check('id').custom(
  async (id = '') => {
      const cFound = await characterService.findById(id);
      if(!cFound) {
          throw new AppError('The id does not exist in DB', 400);
      }
  }
);

const _nameExist = check("name").custom(async (name = "") => {
  const characterFound = await findByName(name);
  if (characterFound) {
    throw new AppError("Character already exist", 400);
  }
});

const _idRequired = check("id").not().isEmpty();
const _idIsNumeric = check("id").isNumeric();

const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _nameExist,
  _ageIsNumeric,
  _weightIsNumeric,
  _historyRequired,
  _roleValid,
  _validationResult,
];

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE, USER_ROLE),
  _idIsNumeric,
  _nameExist,
  _ageIsNumeric,
  _weightIsNumeric,
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

const postImageRequestValidations = [
  validJWT,
  hasRole(USER_ROLE, ADMIN_ROLE),
  upload.single('image'),
  _idRequired,
  _idIsNumeric,
  _idExist,
  imageRequired,
  validationResult
]

export {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getRequestValidations,
  postImageRequestValidations
};
