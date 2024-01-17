import mongoose from "mongoose";
import { config } from "./config.js";
import {logger} from "../helpers/logger.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.url);
     
        logger.info("Base de datos conectada correctamente ");
    } catch (error) {
        logger.error(`Hubo un error al conectar la base de datos ${error.message}`);
    }
};