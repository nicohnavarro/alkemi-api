import { findAll, findById, save, update, remove } from '../services/movieService.js';
import Success from '../handlers/successHandler.js';

/**
 *
 * @params {express.Request} req
 * @params {express.Response} res
 */
const getAllMovies = async (req,res,next)=>{
  try{
    const movies = await findAll();
    res.status(200).json(new Success(movies)); 
  }catch(err){
    next(err);
  }
}

const getMovieById = async (req,res,next) => {
  try{
    const { id } =req.params;
    const movie = await findById(id);
    res.status(200).json(new Success(movie));
  }catch(err){
    next(err);
  }
}

const createMovie = async (req,res,next) =>{
  try{
    let movie = req.body;
    movie = await save(movie); 
    res.status(201).json(new Success(movie));
  }catch(err){
    next(err);
  }
}

const updateMovie = async (req,res,next)=>{
  try{
    const { id } =req.params;
    let movie = req.body;
    movie.id = id;
    movie = await update(id,movie);
    res.json(new Success(movie));
  }catch(err){
    next(err);
  }
  
}

const deleteMovie = async (req,res,next)=>{
  try{
    const {id} = req.params;
    const movie = await remove(id);
    res.json(new Success(movie));
  }catch(err){
    next(err);
  }
}

export {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
}
