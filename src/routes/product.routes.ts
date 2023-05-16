import { Router } from "express";

import { ProductController } from "../controllers/ProductController";
import { ensureAuth } from "../middleware";

import multer from "multer";
import { MULTER } from "../configs/upload";

const productRoutes = Router();
const productController = new ProductController();

const upload = multer(MULTER);

productRoutes.patch(
  "/createproduct",
  ensureAuth,
  upload.single("image"),
  productController.create
);
productRoutes.get("/allproducts", productController.index);
productRoutes.get("/product/details/:id", productController.showProduct);
productRoutes.patch(
  "/product/update/:product_id",
  ensureAuth,
  upload.single("image"),
  productController.update
);
productRoutes.delete(
  "/product/remove/:product_id",
  ensureAuth,
  productController.delete
);

export { productRoutes };
