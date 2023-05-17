"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const product_routes_1 = require("./product.routes");
const users_routes_1 = require("./users.routes");
const sessions_routes_1 = require("./sessions.routes");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.use("/", sessions_routes_1.sessionsRoutes);
routes.use("/", product_routes_1.productRoutes);
routes.use("/", users_routes_1.usersRoutes);