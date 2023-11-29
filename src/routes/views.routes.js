import { Router } from "express";
import { ViewsController } from "../controller/views.controller.js";
import { validateToken } from "../utils.js";

const router = Router();

router.get("/",ViewsController.getProductPaginate);


router.get("/login", ViewsController.getLogin); 
router.get("/signup", ViewsController.getSignup); 
router.get("/profile",ViewsController.getProfile); 

router.get("/realtimeproducts",ViewsController.getRealtimeproducts);

router.get("/chat",(req,res) =>{//la vista en main.hbs
    res.render("chat"); // nombre del archivo que  contiene la vista en chat.hbs
});

export {router as viewsRouter}