import { ProductManagerFiles} from "./files/productManagerFiles.js";
import {CartsManagerFiles} from "./files/cartsManagerFiles.js";
import { __dirname } from "../utils.js";
import path from "path";

const productsUrl = path.join(__dirname,"/files/products.json");
const cartsUrl = path.join(__dirname,"/files/carts.json");


export const productsService = new  ProductManagerFiles(productsUrl);
export const carsService = new  CartsManagerFiles(cartsUrl);