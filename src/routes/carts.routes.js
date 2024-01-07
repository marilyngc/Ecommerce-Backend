import { Router } from "express";
import { CartsController } from "../controller/carts.controller.js";
import {checkRole, isAuth} from "../middlewares/auth.js"


const router = Router();

router.use(function (req, res, next) {
  console.log("petición recibida");
  next();
});

// verificamos que funciona la ruta de app.js
router.get("/", CartsController.getCart);

router.get("/:cid", CartsController.getCartById);

router.post("/", CartsController.postCart);

router.post("/:cid/product/:pid", CartsController.postCartProductId);
router.delete("/:cid/product/:pid", CartsController.deleteCartProductId);
router.put("/:cid/product/:pid",CartsController.putCartProductId );
router.post("/:cid:purchase",isAuth,checkRole(["user","premium"]), CartsController.purcharseCart); 
export { router as cartsRouter };
