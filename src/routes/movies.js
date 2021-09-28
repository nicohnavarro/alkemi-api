import { Router } from 'express';

import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.js";

const routes = Router();

routes.get("/", getAllMovies);
routes.get("/:id(\\d+)/",getMovieById);
routes.post("/", createMovie);
routes.put("/:id(\\d+)/",updateMovie);
routes.delete("/:id(\\d+)/",deleteMovie);

export default routes;
