import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

import {Command} from "commander";


const program = new Command();

//especificamos los argumentos
program
.option("--mode <modo>","entorno de trabajo","development");
program.parse();
const args = program.opts(); //valores de los argumentos
console.log("arg", args);
const envMode = args.mode; // recibe valor de development o producción


const __dirname = path.dirname(fileURLToPath(import.meta.url));

// aqui le decimos que .env utilizar
const pathEnv = envMode === "production"
? path.join(__dirname,"../../.env.production")
: path.join(__dirname,"../../.env.development");

dotenv.config({
    path:pathEnv  // archivos que vamos a usar (production o development)

}); // process.env


export const config = {
   server:{
    env:process.env.NODE_EMVIRONMENT || "development",
    port:process.env.PORT,
     persistence: process.env.PERSISTENCE
   },
    // dirrecion de mongoDB
    mongo:{
        url:process.env.MONGO_URL
    },

    tokenKey:{
        key:process.env.PRIVATE_KEY
    }
}

