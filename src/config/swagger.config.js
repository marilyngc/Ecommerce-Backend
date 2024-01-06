import { __dirname } from "../utils.js";

import swaggerJsDoc from "swagger-jsdoc";

import path from "path";


const swaggerOptions = {

    definition:{
        //vesion
        openapi:"3.0.1",
        // define una parte descriptiva de la documentacion
        info:{

            title: "Documentacion api de e-commerce",

            version:"1.0.0",

            description:"Definición de endpoints para la API de e-commerce"

        },

    },
    // IMPORTANTE => definir donde estan los archivos que van a tener la descripcion de cada una de las rutas
    apis:[`${path.join(__dirname,"/docs/**/*.yaml")}`],//archivos que contienen la documentación de las rutas

};

 

//crear una variable que interpreta las opciones para trabajar con swagger

export const swaggerSpecs = swaggerJsDoc(swaggerOptions);