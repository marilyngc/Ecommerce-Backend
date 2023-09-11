import {Router} from "express";


const router = Router();

let carts = [];

router.use(function(req,res,next){
    console.log("petición recibida");
    next();
});

// verificamos que funciona la ruta de app.js
router.get("/",(req,res)=>{
    res.json({message:"Estado de cars"})
});

export {router as cartsRouter};