
import { __dirname } from "../utils.js";
import path from "path";
import { ProductsManagerMongo } from "./mongo/productsManagerMongo.js";
import { CartsManagerMongo} from "./mongo/cartsManagerMongo.js";

const productsUrl = path.join(__dirname,"/files/products.json");
const cartsUrl = path.join(__dirname,"/files/carts.json");


export const productsService = new  ProductsManagerMongo(productsUrl);
export const cartsService = new  CartsManagerMongo(cartsUrl);