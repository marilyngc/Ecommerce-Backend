
import { __dirname } from "../utils.js";
import path from "path";
import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo} from "./mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";

// ruta de donde podemos encontrar los archivos json en local
// const productsUrl = path.join(__dirname,"/files/products.json");
// const cartsUrl = path.join(__dirname,"/files/carts.json");


export const productsService = new  ProductsManagerMongo();
export const cartsService = new  CartsManagerMongo();
export const chatService = new ChatManagerMongo();