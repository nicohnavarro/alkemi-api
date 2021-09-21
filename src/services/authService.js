const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const userService = require('./userService');
const AppError = require('../errors/appError');

const login = async(email,password) => {
  try{
    const user = await userService.findByEmail(email);

    if(!user){
      throw new AppError('Authentication failed!',400)
    }

    const validPassword = await bcrypt.compare(password, user.password);
    
    if(!validPassword){
      throw new AppError('Authentication failed',401);
    }

    const token = _encrypt(user._id);

    return { 
      token,
      user:user.name,
      role:user.role
    }
  }catch(err){
    throw err;
  }
}

const validToken = async(token) => {
  try{
    if(!token){
      throw new AppError('Authentication failed, token required',401);
    }
    let id;
    try{
      const obj = jwt.verify(token,config.auth.secret);
      id = obj.id;
    }catch(verifyErr){
      throw new AppError('Authentication failed, Error token',402);
    }
    const user = await userService.findById(id);
    if(!user){
      throw new AppError('Authentication failed, Invalid token',401);
    }
    if(!user.enable){
      throw new AppError('Authentication failed, User is not enable',401);
    }
    return user
  }
  catch(err){
    throw err;
  }
}

const validRole = (user, ...roles) => {
  if(!roles.includes(user.role)){
    throw new AppError('Authorization failed, User without permision',403);
  }
  return true;
}

_encrypt = (id) => {
  return jwt.sign({ id }, config.auth.secret,{ expiresIn:config.auth.ttl});
}

module.exports = {
  login,
  validToken,
  validRole
}
