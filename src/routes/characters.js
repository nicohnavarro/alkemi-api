import { Router } from "express";
import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  uploadImage,
} from "../controllers/character.js";

import {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getRequestValidations,
  postImageRequestValidations,
} from "../middlewares/character/index.js";

const routes = Router();

routes.get("/", getRequestValidations, getAllCharacters);
routes.get("/:id(\\d+)/", getRequestValidations, getCharacterById);
routes.post("/", postRequestValidations, createCharacter);
routes.put("/:id(\\d+)/", putRequestValidations, updateCharacter);
routes.delete("/:id(\\d+)/", deleteRequestValidations, deleteCharacter);
routes.post("/image", postImageRequestValidations, uploadImage);

export default routes;
