"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const knex_1 = require("../database/knex");
const bcrypt_1 = require("bcrypt");
const AppError_1 = require("../utils/AppError");
class UsersController {
    async create(req, res) {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new AppError_1.AppError("Preencha todos os campos");
        }
        const user_email = await (0, knex_1.connection)("users").where({ email }).first();
        if (user_email) {
            throw new AppError_1.AppError("Email já existe");
        }
        const hashPassword = await (0, bcrypt_1.hash)(password, 8);
        await (0, knex_1.connection)("users").insert({
            name,
            email,
            password: hashPassword,
        });
        return res.json({ message: "Usuario cadastrado" });
    }
    async index(req, res) {
        const getAllUsers = await (0, knex_1.connection)("users");
        return res.json(getAllUsers);
    }
}
exports.UsersController = UsersController;
