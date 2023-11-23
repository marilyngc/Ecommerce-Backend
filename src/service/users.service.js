// representa la capa de servicio

//importamos la capa de persistencia
import { usersService } from "../dao/index.js";

// accede a los metodos de los managers
export class UsersService{
        // usamos static para poder llamarlos directamente para no crear una instancia
    static createUser(userInfo){
        return usersService.createUser(userInfo);//  entrega su return
    };
        // usamos static para poder llamarlos directamente para no crear una instancia
    static getUsersById(userId){
        return usersService.getUsersById(userId);//  entrega su return
    };
        // usamos static para poder llamarlos directamente para no crear una instancia
    static getUserByEmail(userEmail){
        return usersService.getUserByEmail(userEmail);//  entrega su return
    };

   
    
}