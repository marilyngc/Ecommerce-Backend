
import { __dirname } from "../utils.js";

import { ProductsManagerMongo } from "./mongo/productsManager.Mongo.js";
import { CartsManagerMongo} from "./mongo/cartsManager.Mongo.js";
import { ChatManagerMongo } from "./mongo/chatManager.Mongo.js";

// ruta de donde podemos encontrar los archivos json en local
// const productsUrl = path.join(__dirname,"/files/products.json");
// const cartsUrl = path.join(__dirname,"/files/carts.json");


export const productsService = new  ProductsManagerMongo();
export const cartsService = new  CartsManagerMongo();
export const chatService = new ChatManagerMongo();