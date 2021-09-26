import { Router } from 'express';

import {
  getAllUsers,
  getUsersWithPagination,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.js";

import {
  postRequestValidations,
  putRequestValidations,
  deleteRequestValidations,
  getRequestValidations,
} from "../middlewares/users/index.js";

const routes = Router();

routes.get("/", getAllUsers);
routes.get("/pag", getRequestValidations, getUsersWithPagination);
routes.get("/:id", getRequestValidations, getUserById);
routes.post("/", postRequestValidations, createUser);
routes.put("/:id", putRequestValidations, updateUser);
routes.delete("/:id", deleteRequestValidations, deleteUser);

export default routes;
