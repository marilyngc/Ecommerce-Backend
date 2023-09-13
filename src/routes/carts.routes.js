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


router.get("/:cid", async (req,res)=>{
    try {
     const id = parseInt(req.params.cid);
        const cartId = await carsService.getCarById(id);
        console.log(cartId)
        if(cartId){
          return  res.json({data:cartId});
        }else{
            res.json({message:`No existe el ${id} solicitado`})
        }
       
     } catch (error) {
         res.json({error:error.message})
     }
});


router.post("/", async (req,res)=>{
    try {

       const newCart = await carsService.createCart();
       res.json({data:newCart});
    } catch (error) {
        res.json({error:error.message})
    }
});

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        // validamos si los dos sirven
          const cartId = parseInt(req.params.cid);
          const productId = parseInt(req.params.pid);




          res.json({message:"peticion recibida"});
   
     } catch (error) {
         res.json({error:error.message})
     }
});
export {router as cartsRouter};