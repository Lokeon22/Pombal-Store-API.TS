import { Router } from "express";

import { SessionsController } from "../controllers/SessionsController";

const sessionsRoutes = Router();

const sessionsController = new SessionsController();

sessionsRoutes.use("/login", sessionsController.create);

export { sessionsRoutes };
