import {Router} from "express";
import { cartsService, productsService } from "../dao/index.js";

const router = Router();



router.use(function(req,res,next){
    console.log("petición recibida");
    next();
});

// verificamos que funciona la ruta de app.js
router.get("/",async (req,res)=>{
   try {
    const carts = await cartsService.getCart();
    res.json({data:carts});
   } catch (error) {
    res.json({error:error.message})
   }
});


router.get("/:cid", async (req,res)=>{
    try {
     const id = req.params.cid;
        const cartId = await cartsService.getCarById(id);
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

       const newCart = await cartsService.createCart();
       res.json({status:"succes",data:newCart});
    } catch (error) {
        res.json({status:"error",error:error.message})
    }
});

router.post("/:cid/product/:pid", async(req,res)=>{
    try {
        // validamos si los dos sirven
          const cartId = parseInt(req.params.cid);
          const productId = parseInt(req.params.pid);
          const cart = await cartsService.getCarById(cartId);
          const product = await productsService.getProductsById(productId)
          const newProduct = await cartsService.addProductToCart(cart,product);

          res.json({message: "Agregando producto al carrito...",newProduct});
       



        
   
     } catch (error) {
         res.json({error:error.message})
     }
});
router.delete("/:cid/product/:pid", async(req,res)=>{
    try {
        // validamos si los dos sirven
          const cartId = parseInt(req.params.cid);
          const productId = parseInt(req.params.pid);
          const cart = await cartsService.getCarById(cartId);
          const product = await productsService.getProductsById(productId)
          const newProduct = await cartsService.deleteProduct(cart,product);

          res.json({message: "Eliminando producto del carrito...",newProduct});
   
     } catch (error) {
         res.json({error:error.message})
     }
});
router.put("/:cid/product/:pid", async(req,res)=>{
    try {
        // validamos si los dos sirven
          const cartId = parseInt(req.params.cid);
          const productId = parseInt(req.params.pid);
          const {newQuantity} = req.body;
          const cart = await cartsService.getCarById(cartId);
          const product = await productsService.getProductsById(productId)
          const newProduct = await cartsService.updateProductCart(cart,product,newQuantity)

          res.json({message: "Eliminando producto del carrito...",newProduct});
   
     } catch (error) {
         res.json({error:error.message})
     }
});
export {router as cartsRouter};