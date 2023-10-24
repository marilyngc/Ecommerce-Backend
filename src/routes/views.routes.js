import { Router } from "express";
import { productsService } from "../dao/index.js";
const router = Router();

router.get("/",async (req,res) =>{
    const products = await productsService.getProductsPaginate();
   // console.log(products)

    const dataProducts = {
        status:"success",
        payload:products.docs,
        totalPages: products.totalPages,
       // prePage
    }
    res.render("home",dataProducts);// nombre del archivo que  contiene la vista
});




router.get("/realtimeproducts",(req,res) =>{
    res.render("realtime"); // nombre del archivo que  contiene la vista
});

router.get("/chat",(req,res) =>{
    res.render("chat"); // nombre del archivo que  contiene la vista
});

export {router as viewsRouter}