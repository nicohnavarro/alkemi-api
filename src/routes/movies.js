import { Router } from "express";

import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  uploadImage,
  associateCharacter,
} from "../controllers/movie.js";

import {
  postRequestValidations,
  putRequestValidations,
  getRequestValidations,
  deleteRequestValidations,
  postImageRequestValidations,
  asociationRequestValidations,
} from "../middlewares/movie/index.js";

const routes = Router();

routes.get("/", getAllMovies);
routes.get("/:id(\\d+)/", getRequestValidations, getMovieById);
routes.post("/", postRequestValidations, createMovie);
routes.put("/:id(\\d+)/", putRequestValidations, updateMovie);
routes.delete("/:id(\\d+)/", deleteRequestValidations, deleteMovie);
routes.post("/image", postImageRequestValidations, uploadImage);

routes.put(
  "/:idMovie(\\d+)/characters/:idCharacter(\\d+)/",
  asociationRequestValidations,
  associateCharacter
);

export default routes;
