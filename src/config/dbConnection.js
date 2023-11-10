import mongoose from "mongoose";
import { config } from "./config";


export const connectDB = async () => {
    try {
        await mongoose.connect(config.mongo.url);
        console.log("Base de datos conectada correctamente ");
    } catch (error) {
        console.log(`Hubo un error al conectar la base de datos ${error.message}`);
    }
};