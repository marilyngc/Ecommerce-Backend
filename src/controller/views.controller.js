// capa de control


// importar la capa de servicio
import { ProductsService } from "../service/products.service.js";

export class ViewsController {

    static getProductPaginate = async (req,res) =>{
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
    
        const products = await ProductsService.getProductsPaginate(query,options);
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
    };

    static getLogin =(req,res) => { //la vista en main.hbs
        res.render("login")
    };

    static getSignup = (req,res) => { //la vista en main.hbs
        res.render("signupView")
    };

    static getProfile = (req,res) => {//la vista en main.hbs
        res.render("profile");
  
};

    static getRealtimeproducts = (req,res) =>{//la vista en main.hbs
        res.render("realtime"); // nombre del archivo que  contiene la vista en realTime.hbs
    };
}