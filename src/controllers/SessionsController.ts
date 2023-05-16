import { Request, Response } from "express";
import { connection as knex } from "../database/knex";
import { compare } from "bcrypt";

import { authConfigs } from "../configs/auth";
import { sign } from "jsonwebtoken";

import { AppError } from "../utils/AppError";
import { User } from "../@types";

type Login = Pick<User, "email" | "password">;

class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password }: Login = req.body;

    const user: User = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Email e/ou senha incorreta");
    }

    const verifyPassword = await compare(password, user.password);

    if (!verifyPassword) {
      throw new AppError("Email e/ou senha incorreta");
    }

    const { secret, expiresIn } = authConfigs.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }
}

export { SessionsController };
