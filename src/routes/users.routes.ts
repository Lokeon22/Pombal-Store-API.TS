import { Router } from "express";

import { UsersController } from "../controllers/UsersController";

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/users/create", usersController.create);
usersRoutes.get("/users", usersController.index);

export { usersRoutes };
