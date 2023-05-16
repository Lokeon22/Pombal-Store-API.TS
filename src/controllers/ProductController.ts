import { Request, Response } from "express";
import { connection as knex } from "../database/knex";
import { DiskStorage } from "../providers/DiskStorage";

import { AppError } from "../utils/AppError";
import { User, Product } from "../@types";

class ProductController {
  async create(req: Request, res: Response) {
    const user_id = req.user.id;
    const { name, description, price, category, stock_amount }: Product =
      req.body;

    const image = req.file?.filename;

    const diskStorage = new DiskStorage();

    if (!name || !description || !price || !category || !stock_amount) {
      throw new AppError("Preencha todos os campos");
    }

    const user: User = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    if (user && user.is_admin === 0) {
      throw new AppError("Usuário sem permissão");
    }

    const product: Product = await knex("products").where({ name }).first();

    if (product) {
      throw new AppError("Produto já existe no estoque");
    }

    if (!image) {
      throw new AppError("Insira uma imagem");
    }

    const filename = await diskStorage.saveFile(image);

    await knex("products").insert({
      name,
      description,
      price,
      category,
      image: filename,
      stock_amount,
    });

    return res.json({ message: "Produto adicionado" });
  }

  async index(req: Request, res: Response) {
    const { category } = req.query;

    if (category) {
      const productFiltered: Product[] = await knex("products").where({
        category,
      });

      return res.json(productFiltered);
    }

    const getAllProducts: Product[] = await knex("products");

    return res.json(getAllProducts);
  }

  async showProduct(req: Request, res: Response) {
    const { id } = req.params;

    const product: Product = await knex("products").where({ id }).first();

    return res.json(product);
  }

  async update(req: Request, res: Response) {
    const { product_id } = req.params;
    const user_id = req.user.id;

    const image = req.file?.filename;

    const diskStorage = new DiskStorage();

    const { name, description, price, category, stock_amount }: Product =
      req.body;

    const product: Product = await knex("products")
      .where({ id: product_id })
      .first();

    const user: User = await knex("users").where({ id: user_id }).first();

    if (user.is_admin === 0) {
      throw new AppError("Usuário sem permissão");
    }

    if (image && product.image) {
      await diskStorage.deleteFile(product.image);
    }

    if (image) {
      const filename = await diskStorage.saveFile(image);

      await knex("products").where({ id: product_id }).update({
        image: filename,
      });
    }

    await knex("products")
      .where({ id: product_id })
      .update({
        name: name ?? product.name,
        description: description ?? product.description,
        price: price ?? product.price,
        category: category ?? product.category,
        stock_amount: stock_amount ?? product.stock_amount,
      });

    return res.json({ message: "Produto atualizado" });
  }

  async delete(req: Request, res: Response) {
    const { product_id } = req.params;
    const user_id = req.user.id;

    const user: User = await knex("users").where({ id: user_id }).first();

    if (user.is_admin === 0) {
      throw new AppError("Usuário sem permissão");
    }

    await knex("products").where({ id: product_id }).del();

    return res.json({ message: "Produto deletado com sucesso" });
  }
}

export { ProductController };
