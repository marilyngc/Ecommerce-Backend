import { Router } from "express";
import { ViewsController } from "../controller/views.controller.js";
import { validateToken } from "../utils.js";
import { logger } from "../helpers/logger.js";

const router = Router();

router.get("/",ViewsController.getProductPaginate);


router.get("/login", ViewsController.getLogin); 
router.get("/signup", ViewsController.getSignup); 
router.get("/profile",validateToken,ViewsController.getProfile); 
router.get("/cart",ViewsController.getCart);
router.get("/realtimeproducts",ViewsController.getRealtimeproducts);

router.get("/chat",(req,res) =>{//la vista en main.hbs
    res.render("chat"); // nombre del archivo que  contiene la vista en chat.hbs
});

router.get("/testLogger", (req,res ) => {
    logger.error("log error");
    logger.advertence("log advertence");
    logger.debbug("log debbug");
    res.send("prueba logger");
})
export {router as viewsRouter}