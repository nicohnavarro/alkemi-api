import { compare } from 'bcrypt';
import JWT  from 'jsonwebtoken';
import { auth } from '../config/index.js';
import { findByEmail, findById } from './userService.js';
import AppError from '../errors/appError.js';

const login = async(email,password) => {
  try{
    const user = await findByEmail(email);

    if(!user){
      throw new AppError('User not found!',401)
    }

    if(!user.enable){
      throw new AppError('User disabled!',401)
    }

    const validPassword = await compare(password, user.password);
    
    if(!validPassword){
      throw new AppError('Authentication failed, Password invalid',401);
    }

    const token = _encrypt(user.id);

    return { 
      token,
      user:user.name,
      role:user.role
    }
  }catch(err){
    throw err;
  }
}

const register = async(name,username,email,password) => {
  try{
    const user = await findByEmail(email);

    if(!user){
      throw new AppError('User not found!',401)
    }

    if(!user.enable){
      throw new AppError('User disabled!',401)
    }

    const validPassword = await compare(password, user.password);
    
    if(!validPassword){
      throw new AppError('Authentication failed, Password invalid',401);
    }

    const token = _encrypt(user.id);

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
      const obj =  JWT.verify(token,auth.secret);
      id = obj.id;
    }catch(verifyErr){
      throw new AppError('Authentication failed, Error token',402);
    }
    const user = await findById(id);
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

const _encrypt = (id) => {
  return JWT.sign({ id }, auth.secret,{ expiresIn:auth.ttl});
}

export {
  login,
  register,
  validToken,
  validRole
}
