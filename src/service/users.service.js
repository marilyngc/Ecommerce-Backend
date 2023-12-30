// representa la capa de servicio

//importamos la capa de persistencia
import { usersDao } from "../dao/factory.js";

// accede a los metodos de los managers
export class UsersService{
        // usamos static para poder llamarlos directamente para no crear una instancia
    static createUser(userInfo){
        return usersDao.createUser(userInfo);//  entrega su return
    };
        // usamos static para poder llamarlos directamente para no crear una instancia
    static getUsersById(userId){
        return usersDao.getUsersById(userId);//  entrega su return
    };
        // usamos static para poder llamarlos directamente para no crear una instancia
    static getUserByEmail(userEmail){
        return usersDao.getUserByEmail(userEmail);//  entrega su return
    };
    
    static updateUser(id,user) {
        return usersDao.updateUser(id,user);
    };

   
    
}