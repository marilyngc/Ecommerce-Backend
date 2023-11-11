
import { __dirname } from "../utils.js";

import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo} from "./mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./mongo/chatManagerMongo.js";
import { UsersManagerMongo } from "./mongo/usersManagerMongo.js"

// ruta de donde podemos encontrar los archivos json en local
// const productsUrl = path.join(__dirname,"/files/products.json");
// const cartsUrl = path.join(__dirname,"/files/carts.json");

// aqi podemos acceder a los modelos
export const productsService = new  ProductsManagerMongo();
export const cartsService = new  CartsManagerMongo();
export const chatService = new ChatManagerMongo();
export const userService = new UsersManagerMongo();