import { findAll, findWithPagination, findById, save, update, remove } from '../services/userService.js';
import Success from '../handlers/successHandler.js';

/**
 *
 * @params {express.Request} req
 * @params {express.Response} res
 */
const getAllUsers = async (req,res,next)=>{
  try{
    const users = await findAll();
    res.status(200).json(new Success(users)); 
  }catch(err){
    next(err);
  }
}

const getUsersWithPagination = async (req,res,next) => {
  try{
    const users = await findWithPagination(req.query.filter,req.query.options);
    res.status(200).json(new Success(users));
  }catch(err){
    next(err);
  }
}

const getUserById = async (req,res,next) => {
  try{
    const { id } =req.params;
    const user = await findById(id);
    res.status(200).json(new Success(user));
  }catch(err){
    next(err);
  }
}

const createUser = async (req,res,next) =>{
  try{
    let user = req.body;
    user = await save(user); 
    res.status(201).json(new Success(user));
  }catch(err){
    next(err);
  }
}

const updateUser = async (req,res,next)=>{
  try{
    const { id } =req.params;
    let user = req.body;
    user.id = id;
    user = await update(id,user);
    res.json(new Success(user));
  }catch(err){
    next(err);
  }
  
}

const deleteUser = async (req,res,next)=>{
  try{
    const {id} = req.params;
    const user = await remove(id);
    res.json(new Success(user));
  }catch(err){
    next(err);
  }
}

export {
  getAllUsers,
  getUsersWithPagination,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
