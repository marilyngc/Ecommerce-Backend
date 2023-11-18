// representa la capa de servicio

//importamos la capa de persistencia
import { UsersManagerMongo } from "../dao/managers/mongo/usersManagerMongo.js";

// accede a los metodos de los managers
export class UsersService{
        // usamos static para poder llamarlos directamente para no crear una instancia
    static createUser(userInfo){
        return UsersManagerMongo.createUser(userInfo);//  entrega su return
    };
        // usamos static para poder llamarlos directamente para no crear una instancia
    static getUsersById(userId){
        return UsersManagerMongo.getUsersById(userId);//  entrega su return
    };
        // usamos static para poder llamarlos directamente para no crear una instancia
    static getUserByEmail(userEmail){
        return UsersManagerMongo.getUserByEmail(userEmail);//  entrega su return
    };

   
    
}