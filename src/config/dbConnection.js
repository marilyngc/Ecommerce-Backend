import mongoose from "mongoose";
import { config } from "./config.js";
import { logger } from "../helpers/logger.js";
export class connectDB {
  static #instance;

  static async #getConnection() {
    let URL;
  
    if (config.enviroment.persistence === 'test') {
      URL = config.mongo.url_test;
    } else {
      URL = config.mongo.url;
    }
  
    try {
      const connection = await mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
      logger.info("Conectado a la base de datos");
      return connection;
    } catch (error) {
      logger.error("Error al conectar a la base de datos:", error);
      throw error; // Puedes decidir cómo manejar el error aquí
    }
  }

  static getInstance() {
    if (this.#instance) {
      logger.info("La conexion a la base de datos ya existe");
      return this.#instance;
    } else {
      this.#instance = this.#getConnection();
      return this.#instance;
    }
  }
}
