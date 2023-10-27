import { Router } from "express";
import { productsService } from "../dao/index.js";
const router = Router();

router.get("/",async (req,res) =>{
    const {limit = 3,page = 1} = req.body;
    const query = {
        // aqui hacemos filtros, ejemplo:
        // category = "deportes"
    };
    const options = {
        limit,
        page,
        // sort para ordenamiento
        //sort:{price:1},// ascendete (1) descendiente(-1)
        lean:true
        // lean para que el servidor lea el json
    };

    const products = await productsService.getProductsPaginate(query,options);
   // console.log(products)

   //                    htpp://localhost:8080
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status:"success",
        payload:products.docs,
        totalPages: products.totalPages,
        // si hay pagina anterior
        prevLink : products.hasPrevPage ? `${baseUrl.replace(`page = ${products.page}`, `page = ${products.prevPage}`)}` : null,
        nextLink: products.hasNextPage ? baseUrl.includes("page") ?baseUrl.replace(`page = ${products.page}`, `page = ${products.nextPage}`) :baseUrl.concat(`?page=${products.nextPage}`) : null
    }
    res.render("home",dataProducts);// nombre del archivo que  contiene la vista
});


router.get("/login", (req,res) => {
    res.render("users")
});

router.get("/realtimeproducts",(req,res) =>{
    res.render("realtime"); // nombre del archivo que  contiene la vista
});

router.get("/chat",(req,res) =>{
    res.render("chat"); // nombre del archivo que  contiene la vista
});

export {router as viewsRouter}