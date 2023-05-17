"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsController = void 0;
const knex_1 = require("../database/knex");
const bcrypt_1 = require("bcrypt");
const auth_1 = require("../configs/auth");
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../utils/AppError");
class SessionsController {
    async create(req, res) {
        const { email, password } = req.body;
        const user = await (0, knex_1.connection)("users").where({ email }).first();
        if (!user) {
            throw new AppError_1.AppError("Email e/ou senha incorreta");
        }
        const verifyPassword = await (0, bcrypt_1.compare)(password, user.password);
        if (!verifyPassword) {
            throw new AppError_1.AppError("Email e/ou senha incorreta");
        }
        const { secret, expiresIn } = auth_1.authConfigs.jwt;
        const token = (0, jsonwebtoken_1.sign)({}, secret, {
            subject: String(user.id),
            expiresIn,
        });
        return res.json({ user, token });
    }
}
exports.SessionsController = SessionsController;
