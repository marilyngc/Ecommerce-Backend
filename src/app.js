import  express, { request, response }  from "express";
import  ProductManagerFiles  from "./persistence/productManajerFiles.js";

// instancia
const managerService = new ProductManagerFiles("./src/files/products.json");
console.log(managerService)

const port = 8080;

const app = express();


// para indicar al servidar que vaa estar ejecutandose en el puerto 8080
app.listen(port,()=> console.log("Servidor funcionando"));


// Rutas del servidor

app.get("/products",async (req,res)=>{
  try {
    const limit = req.query.limit; // este dato llega como string
    const limitNumber = parseInt(limit) // lo convertimos en numero
    const products = await managerService.getProduct();
    console.log(products); 
    //Aqui mostramos los productos limitados
    if (limit) {
       /*   [1,2,3,4,5] => slice [1,2,3]*/
       const productsLimit = products.slice(0,limitNumber);
       res.send(productsLimit);
    }else{
        // si no recibimos el parametro limit, que nos devuelva todos los archivos
    // una vez que se cumpla la promesa
    res.send(products);
    }
   
 
  } catch (error) {
    res.send(error.message);
  }
});




app.get("/products/:productsId",async(request,response) =>{

    try {
        const id = parseInt(request.params.productsId);
    
    const product = await managerService.getProductsById(id);
    console.log("productooos",product);

    if (product) {
        response.send(product);
        
    }else{
        response.send("El id solicitado no existe");
    }

    
    } catch (error) {
        response.send(error.message);
    }
    


});