"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const knex_1 = require("../database/knex");
const DiskStorage_1 = require("../providers/DiskStorage");
const AppError_1 = require("../utils/AppError");
class ProductController {
    async create(req, res) {
        const user_id = req.user.id;
        const { name, description, price, category, stock_amount } = req.body;
        const image = req.file?.filename;
        const diskStorage = new DiskStorage_1.DiskStorage();
        if (!name || !description || !price || !category || !stock_amount) {
            throw new AppError_1.AppError("Preencha todos os campos");
        }
        const user = await (0, knex_1.connection)("users").where({ id: user_id }).first();
        if (!user) {
            throw new AppError_1.AppError("Usuário não encontrado");
        }
        if (user && user.is_admin === 0) {
            throw new AppError_1.AppError("Usuário sem permissão");
        }
        const product = await (0, knex_1.connection)("products").where({ name }).first();
        if (product) {
            throw new AppError_1.AppError("Produto já existe no estoque");
        }
        if (!image) {
            throw new AppError_1.AppError("Insira uma imagem");
        }
        const filename = await diskStorage.saveFile(image);
        await (0, knex_1.connection)("products").insert({
            name,
            description,
            price,
            category,
            image: filename,
            stock_amount,
        });
        return res.json({ message: "Produto adicionado" });
    }
    async index(req, res) {
        const { category } = req.query;
        if (category) {
            const productFiltered = await (0, knex_1.connection)("products").where({
                category,
            });
            return res.json(productFiltered);
        }
        const getAllProducts = await (0, knex_1.connection)("products");
        return res.json(getAllProducts);
    }
    async showProduct(req, res) {
        const { id } = req.params;
        const product = await (0, knex_1.connection)("products").where({ id }).first();
        return res.json(product);
    }
    async update(req, res) {
        const { product_id } = req.params;
        const user_id = req.user.id;
        const image = req.file?.filename;
        const diskStorage = new DiskStorage_1.DiskStorage();
        const { name, description, price, category, stock_amount } = req.body;
        const product = await (0, knex_1.connection)("products")
            .where({ id: product_id })
            .first();
        const user = await (0, knex_1.connection)("users").where({ id: user_id }).first();
        if (user.is_admin === 0) {
            throw new AppError_1.AppError("Usuário sem permissão");
        }
        if (image && product.image) {
            await diskStorage.deleteFile(product.image);
        }
        if (image) {
            const filename = await diskStorage.saveFile(image);
            await (0, knex_1.connection)("products").where({ id: product_id }).update({
                image: filename,
            });
        }
        await (0, knex_1.connection)("products")
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
    async delete(req, res) {
        const { product_id } = req.params;
        const user_id = req.user.id;
        const user = await (0, knex_1.connection)("users").where({ id: user_id }).first();
        if (user.is_admin === 0) {
            throw new AppError_1.AppError("Usuário sem permissão");
        }
        await (0, knex_1.connection)("products").where({ id: product_id }).del();
        return res.json({ message: "Produto deletado com sucesso" });
    }
}
exports.ProductController = ProductController;
