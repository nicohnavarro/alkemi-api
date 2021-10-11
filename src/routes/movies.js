import { Router } from 'express';

import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.js";

import {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  deleteRequestValidations
}
from '../middlewares/movie/index.js'

const routes = Router();

routes.get("/",getRequestValidations,getAllMovies);
routes.get("/:id(\\d+)/",getRequestValidations,getMovieById);
routes.post("/",postRequestValidations, createMovie);
routes.put("/:id(\\d+)/",putRequestValidations,updateMovie);
routes.delete("/:id(\\d+)/",deleteRequestValidations,deleteMovie);

export default routes;
