// representa la capa de servicio

//importamos la capa de persistencia
import { cartsDao } from "../dao/factory.js";



// accede a los metodos de los managers

export class CartsService {
      // usamos static para poder llamarlos directamente para no crear una instancia
     static getCart(){
        return cartsDao.getCart();
     };

     static getCarById(id){
        return cartsDao.getCarById(id);
     };

     static createCart(){
        return cartsDao.createCart(); 
     } ;

     static addProductToCart(cartId, productId){
        return cartsDao.addProductToCart(cartId, productId);
     };
     static deleteProduct(cartId,productId){
        return cartsDao.deleteProduct(cartId,productId);
     };
     static updateProductCart(cartId,productId,newQuantity){
        return cartsDao.updateProductCart(cartId,productId,newQuantity);
     };
}