import { usersModel } from "./models/users.model.js";;


export class UsersManagerMongo {
    constructor() {
      this.model = usersModel;
    }
  
    async createUser(userInfo) {
      try {
        const result = await this.model.create(userInfo);
        return result;
      } catch (error) {
        throw new Error("No se pudo crear el usuario");
      }
    }
  
 
   
    async getUsersById(userId) {
      try {
        const result = await this.model.findById(userId)  ;
        if (!result) {
          throw new Error("No existe el usuario solicitado");
        }
        return result;
      } catch (error) {
        throw new Error("No se pudo encontrar el usuario solicitado");
      }
    };

    async getUserByEmail(userEmail) {
      try {
        const result = await this.model.findOne({ email: userEmail });
  
        if (result === null) {
          return console.log("No se encontró un usuario con ese correo electrónico");
        }
        return result
      } catch (error) {
        console.error(`Error en getUserByEmail: ${error.message}`);
        throw new Error("Se produjo un error al generar el usuario solicitado");
      }
    }
}
  