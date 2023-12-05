import { config } from "../config/config.js";


import { __dirname } from "../utils.js";


import { ProductsManagerMongo } from "./managers/mongo/productsManagerMongo.js"
import { CartsManagerMongo} from "./managers/mongo/cartsManagerMongo.js";
import { ChatManagerMongo } from "./managers/mongo/chatManagerMongo.js";
import { UsersManagerMongo } from "./managers/mongo/usersManagerMongo.js"

// ruta de donde podemos encontrar los archivos json en local
// const productsUrl = path.join(__dirname,"/files/products.json");
// const cartsUrl = path.join(__dirname,"/files/carts.json");

// aqi podemos acceder a los modelos
// export const productsDao = new  ProductsManagerMongo();
// export const cartsDao = new  CartsManagerMongo();
// export const chatDao = new ChatManagerMongo();
// export const usersDao = new UsersManagerMongo();

let usersDao;
let productsDao;
let cartsDao;
const persistence = config.server.persistence

switch (persistence) {
    //primer caso
    case "memory":{
          //importamos la clase
          const {UsersManagerMemory} = await import("./managers/memory/");

          // asignamos una nueva instancia a base de la clase
          usersDao = new UsersManagerMemory();
          break;
    }
      

        //segundo caso
        case "mongo":{
            const {connectDB} = await import("../config/dbConnection.js");
            connectDB();

            //importamos la clase
            const {UsersManagerMongo} = await import("./managers/mongo/usersManagerMongo.js");
            const {ProductsManagerMongo} = await import("./managers/mongo/productsManagerMongo.js");
            const {CartsManagerMongo} = await import("./managers/mongo/cartsManagerMongo.js");


            //asignamos una nueva instancia a base de la clase
            usersDao = new UsersManagerMongo();
            productsDao = new ProductsManagerMongo();
            cartsDao = new CartsManagerMongo();

            break;
           
        }
        default:
       
}

export {usersDao,productsDao,cartsDao}