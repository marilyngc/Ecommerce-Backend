import Router from "express";
import { ProductsController } from "../controller/products.controller.js";


const router = Router();

router.get("/",ProductsController.getProducts);

router.post("/",ProductsController.postProduct);

router.put("/:productId", ProductsController.putProduct);
router.delete("/:productId",ProductsController.deleteProduct);


export { router as productsRouter };
