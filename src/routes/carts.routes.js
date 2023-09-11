import {Router} from "express";
import { carsService } from "../persistence/index.js";

const router = Router();



router.use(function(req,res,next){
    console.log("petición recibida");
    next();
});

// verificamos que funciona la ruta de app.js
router.get("/",async (req,res)=>{
   try {
    const carts = await carsService.getCart();
    res.json({data:carts});
   } catch (error) {
    res.json({error:error.message})
   }
});



router.post("/", async (req,res)=>{
    try {
       const newCart = await carsService.createCart();
    } catch (error) {
        res.json({error:error.message})
    }
})
export {router as cartsRouter};