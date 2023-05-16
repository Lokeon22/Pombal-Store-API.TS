import { Router } from "express";

import { productRoutes } from "./product.routes";
import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";

const routes = Router();

routes.use("/", sessionsRoutes);
routes.use("/", productRoutes);
routes.use("/", usersRoutes);

export { routes };
