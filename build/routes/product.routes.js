"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const middleware_1 = require("../middleware");
const multer_1 = __importDefault(require("multer"));
const upload_1 = require("../configs/upload");
const productRoutes = (0, express_1.Router)();
exports.productRoutes = productRoutes;
const productController = new ProductController_1.ProductController();
const upload = (0, multer_1.default)(upload_1.MULTER);
productRoutes.patch("/createproduct", middleware_1.ensureAuth, upload.single("image"), productController.create);
productRoutes.get("/allproducts", productController.index);
productRoutes.get("/product/details/:id", productController.showProduct);
productRoutes.patch("/product/update/:product_id", middleware_1.ensureAuth, upload.single("image"), productController.update);
productRoutes.delete("/product/remove/:product_id", middleware_1.ensureAuth, productController.delete);
