import { Router } from "express";

import {
  getAllCharacters,
  getCharacterById,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/character.js";

import {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getRequestValidations,
} from "../middlewares/character/index.js";

const routes = Router();

routes.get("/", getRequestValidations, getAllCharacters);
routes.get("/:id(\\d+)/", getRequestValidations, getCharacterById);
routes.post("/", postRequestValidations, createCharacter);
routes.put("/:id(\\d+)/", putRequestValidations, updateCharacter);
routes.delete("/:id(\\d+)/", deleteRequestValidations, deleteCharacter);

export default routes;
