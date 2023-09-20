import { Router } from "express";
import { productsService } from "../persistence/index.js";
const router = Router();

router.get("/",async (req,res) =>{
    const products = await productsService.getProduct();
    //console.log(products)
    res.render("home",{products});// nombre del archivo que  contiene la vista
});




router.get("/realtimeproducts",(req,res) =>{
    res.render("realtime"); // nombre del archivo que  contiene la vista
});

export {router as viewsRouter}