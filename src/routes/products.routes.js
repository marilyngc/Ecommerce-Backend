import Router from "express";
import { productsService } from "../persistence/index.js";
const router = Router();




// middleware de routes
router.use(function(req,res,next){
    console.log("peticion recibida");
    // console.log(req);
    next(); // objeto que da la continuidad de la ejecucion  => si no lo ponemos, se queda procesando 
});

// verificamos que funciona la ruta de app.js
router.get("/",async (req,res)=>{
    //res.json({message:"Estado de productos"});
    try {
        const limit = req.query.limit; // este dato llega como string
        //Lo convertimos en number
        const limitNumber = parseInt(limit);
        // aqui buscamos la funcion que recibe el producto ingresado
        const products = await productsService.getProduct();

        // aquí mostramos los productos limitados
        if(limit){
           /*   [1,2,3,4,5] => slice [1,2,3]*/
           const productsLimit = products.slice(0,limitNumber); // aquí el usuario elige el limite
           res.send(`El limite de productos es: ${limitNumber} ${productsLimit}`);

        }else{
            // si no recibimos el parametro limit, que nos devuelva todod los archivos
            // una vez que se cumpla la promesa
            res.json({data:products});
        }
    } catch (error) {
        res.json({status:"error",message:error.message});
        
    }
});

router.get("/:productsId", async (req,res)=>{
 try {
    const id = parseInt(req.params.productsId);
    // aqui solicitamos la funcion que busca el id
    const product = await productsService.getProductsById(id);

    if (product) {
        res.json({data:product});
        
    }else{
        res.send("El id solicitado no existe");
    }
 } catch (error) {
    res.json({status:"error",message:error.message});
 }
});
  

router.post("/", async(req,res)=>{
try {
    const productsInfo = req.body;
    console.log(productsInfo)
    const product = await productsService.addProducts(  productsInfo.title,
        productsInfo.description,
        productsInfo.price,
        productsInfo.thumbnail,
        productsInfo.stock
        );

console.log(product)
    if (!product) {
        return res.json({message:"Informacion incompleta"});
    }

    
    res.json({message:"Producto creado"});
    //return product
} catch (error) {
    res.json({status:"error",message:error.message});
}
});
    



export {router as productsRouter};