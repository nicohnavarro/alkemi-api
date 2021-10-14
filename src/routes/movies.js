import { Router } from 'express';

import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadImage
} from "../controllers/movie.js";

import {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  deleteRequestValidations,
  postImageRequestValidations
}
from '../middlewares/movie/index.js'

const routes = Router();

routes.get("/",getAllMovies);
routes.get("/:id(\\d+)/",getRequestValidations,getMovieById);
routes.post("/",postRequestValidations, createMovie);
routes.put("/:id(\\d+)/",putRequestValidations,updateMovie);
routes.delete("/:id(\\d+)/",deleteRequestValidations,deleteMovie);
routes.post("/image",postImageRequestValidations, uploadImage);

export default routes;
