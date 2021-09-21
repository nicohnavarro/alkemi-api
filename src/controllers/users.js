const express = require('express');
const userService = require('../services/userService');
const Success = require('../handlers/successHandler');

/**
 *
 * @params {express.Request} req
 * @params {express.Response} res
 */
const getAllUsers = async (req,res,next)=>{
  try{
    const users = await userService.findAll();
    res.status(200).json(new Success(users)); 
  }catch(err){
    next(err);
  }
}

const getUsersWithPagination = async (req,res,next) => {
  try{
    const users = await userService.findWithPagination(req.query.filter,req.query.options);
    res.status(200).json(new Success(users));
  }catch(err){
    next(err);
  }
}

const getUserById = async (req,res,next) => {
  try{
    const { id } =req.params;
    const user = await userService.findById(id);
    res.status(200).json(new Success(user));
  }catch(err){
    next(err);
  }
}

const createUser = async (req,res,next) =>{
  try{
    let user = req.body;
    user = await userService.save(user); 
    res.status(201).json(new Success(user));
  }catch(err){
    next(err);
  }
  
}

const updateUser = async (req,res,next)=>{
  try{
    const { id } =req.params;
    let user = req.body;
    user._id = id;
    user = await userService.update(id,user);
    res.json(new Success(user));
  }catch(err){
    next(err);
  }
  
}

const deleteUser = async (req,res,next)=>{
  try{
    const {id} = req.params;
    const user = await userService.remove(id);
    res.json(new Success(user));
  }catch(err){
    next(err);
  }
}

module.exports = {
  getAllUsers,
  getUsersWithPagination,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
