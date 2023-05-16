import { connection as knex } from "../database/knex";
import { Request, Response } from "express";
import { hash } from "bcrypt";

import { AppError } from "../utils/AppError";
import { User } from "../@types";

type UserCreate = Pick<User, "name" | "email" | "password">;

class UsersController {
  async create(req: Request, res: Response) {
    const { name, email, password }: UserCreate = req.body;

    if (!name || !email || !password) {
      throw new AppError("Preencha todos os campos");
    }

    const user_email: User = await knex("users").where({ email }).first();

    if (user_email) {
      throw new AppError("Email já existe");
    }

    const hashPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashPassword,
    });

    return res.json({ message: "Usuario cadastrado" });
  }

  async index(req: Request, res: Response) {
    const getAllUsers: User[] = await knex("users");

    return res.json(getAllUsers);
  }
}

export { UsersController };
