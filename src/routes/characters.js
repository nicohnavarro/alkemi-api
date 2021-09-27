import { Router } from 'express';

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

routes.get("/", getAllCharacters);
routes.get("/:id",getCharacterById);
routes.post("/",postRequestValidations ,createCharacter);
routes.put("/:id",updateCharacter);
routes.delete("/:id",deleteCharacter);

export default routes;
