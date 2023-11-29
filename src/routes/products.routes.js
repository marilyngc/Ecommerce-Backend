import Router from "express";
import { ProductsController } from "../controller/products.controller.js";
import { isAuth,checkRole } from "../middlewares/auth.js";

const router = Router();

router.get("/",ProductsController.getProducts);
router.get("/:productId",ProductsController.getProductId)
router.post("/",isAuth,  checkRole(["admin"]), ProductsController.postProduct);

router.put("/:productId", ProductsController.putProduct);
router.delete("/:productId",ProductsController.deleteProduct);


export { router as productsRouter };
