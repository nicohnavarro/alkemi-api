const  { check, validationResult } = require('express-validator');
const AppError = require('../../errors/appError');
const userService = require('../../services/userService');
const { validJWT, hasRole } = require('../auth');
const { ADMIN_ROLE,USER_ROLE,ROLES } = require('../../constants');

const _nameRequired = check('name','Name required').not().isEmpty();

const _lastNameRequired = check('lastName','Last Name required').not().isEmpty();

const _emailRequired = check('email','Email required').not().isEmpty();
const _emailValid = check('email','Email invalid').isEmail();
const _emailExist = check('email').custom(
  async (email='') => {
    const userFound = await userService.findByEmail(email);
    if(userFound){
      throw new AppError('Email already exist',400);
    }
  }
);

const _passwordRequired = check('password','Password required').not().isEmpty();

const _roleValid = check('role').optional().custom(
  async (role='') =>{
    if(!ROLES.includes(role)){
      throw new AppError('Invalid Role',400);
    }
  }
);

const _dateValid = check('dateOfBirth').optional().isDate('MM-DD-YYYY');

const _validationResult = (req,res,next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    throw new AppError('Validation Error',400,errors.errors);
  }
  next();
}

const _idRequired = check('id').not().isEmpty();
const _idIsMongoDB = check('id','Invalid Id').isMongoId();
const _idExist = check('id').custom(
  async (id ='') => {
    const userFound = await userService.findById(id);
    if(!userFound){
      throw new AppError('User not exist',400);
    }
  }
);


const postRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _nameRequired,
  _lastNameRequired,
  _emailRequired,
  _emailValid,
  _emailExist,
  _passwordRequired,
  _roleValid,
  _dateValid,
  _validationResult,
]

const putRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE,USER_ROLE),
  _roleValid,
  _dateValid,
  _idRequired,
  _idIsMongoDB,
  _idExist,
  _validationResult
]

const deleteRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE),
  _idRequired,
  _idIsMongoDB,
  _idExist,
  _validationResult
]

const getRequestValidations = [
  validJWT,
  hasRole(ADMIN_ROLE,USER_ROLE),
  _validationResult
]

module.exports = {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getRequestValidations
}
