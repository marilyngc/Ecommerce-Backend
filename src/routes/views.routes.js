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


router.get("/login", (req,res) => { //la vista en main.hbs
    res.render("login")
}); 
router.get("/signUp", (req,res) => { //la vista en main.hbs
    res.render("signupView")
}); 
router.get("/profile", (req,res) => {//la vista en main.hbs

    const userName = req.session.name;
    if (userName) {
        res.render("profile",{userName});
    }else{
        res.redirect("/login");
    }

}); 

router.get("/realtimeproducts",(req,res) =>{//la vista en main.hbs
    res.render("realtime"); // nombre del archivo que  contiene la vista en realTime.hbs
});

router.get("/chat",(req,res) =>{//la vista en main.hbs
    res.render("chat"); // nombre del archivo que  contiene la vista en chat.hbs
});

export {router as viewsRouter}