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
routes.get("/:id",getMovieById);
routes.post("/", createMovie);
routes.put("/:id",updateMovie);
routes.delete("/:id",deleteMovie);

export default routes;
