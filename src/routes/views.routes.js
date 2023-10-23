import { Router } from "express";
import { productsService } from "../dao/index.js";
const router = Router();

router.get("/",async (req,res) =>{
    const products = await productsService.getProduct();
    //console.log(products)
    res.render("home",{products});// nombre del archivo que  contiene la vista
});




router.get("/realtimeproducts",(req,res) =>{
    res.render("realtime"); // nombre del archivo que  contiene la vista
});

router.get("/chat",(req,res) =>{
    res.render("chat"); // nombre del archivo que  contiene la vista
});

export {router as viewsRouter}