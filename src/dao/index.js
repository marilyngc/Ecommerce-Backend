
import { __dirname } from "../utils.js";

import { ProductsManagerMongo } from "./managers/mongo/productsManagerMongo.js"
import { CartsManagerMongo} from "./managers/mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./managers/mongo/chatManagerMongo.js";
import { UsersManagerMongo } from "./managers/mongo/usersManagerMongo.js"

// ruta de donde podemos encontrar los archivos json en local
// const productsUrl = path.join(__dirname,"/files/products.json");
// const cartsUrl = path.join(__dirname,"/files/carts.json");

// aqi podemos acceder a los modelos
export const productsDao = new  ProductsManagerMongo();
export const cartsDao = new  CartsManagerMongo();
export const chatDao = new ChatManagerMongo();
export const usersDao = new UsersManagerMongo();