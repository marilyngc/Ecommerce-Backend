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
        const result = await this.model.findById(userId);
        if (!result) {
            
        }
        return result;
      } catch (error) {
        throw new Error("No se pudo encontrar el usuario solicitado");
      }
    };

    async getUserByEmail(userEmail) {
      try {
        const result = await this.model.findOne({email:userEmail});
        if (!result) {
            throw new Error("No se pudo encontrar el usuario solicitado");
        }
        return result;
      } catch (error) {
        throw new Error("No se produjo un eror al generar el usuario solicitado");
      }
    }
}
  