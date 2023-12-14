import winston from "winston";
import {__dirname} from "../utils.js";
import path from "path";
import { config } from "../config/config.js";


const currentEnv =config.server.env;
//  console.log(process.env);

// variables personalizadas
const customLevels = {
    levels:{
        error:0,
        abvertence:1,
        info:2,
        debbug:3
    },
    colors:{
        error:red,
        abvertence:yellow,
        info:blue,
        debbug:magenta
    }

}
// antes de comenzar a crear nuestros loggers, ponemos los colores
winston.addColors(customLevels.colors);


// logger para dev
const devLogger = winston.createLogger({
    levels:customLevels.levels,
    // definimos transportes: sistemas de nuestra o almacenamiento de logs

    transports:[
        new winston.transports.Console({level:"debbug"}),
    ]
});


// logger para prod
const prodLogger = winston.createLogger({
    levels:customLevels.levels,
    // definimos transportes: sistemas de nuestra o almacenamiento de logs

    transports:[
        new winston.transports.File({filename:path.join(__dirname,"/log/prod.log"),
    level:"abvertence"}),
    ]
});


let logger;

if (currentEnv === "development") {
    logger = devLogger;

}else{
    logger = prodLogger;
}

export {logger};