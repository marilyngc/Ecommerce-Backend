// representa la capa de servicio

//importamos la capa de persistencia
import { cartsService } from "../dao/index.js";


// accede a los metodos de los managers

export class CartsService {
      // usamos static para poder llamarlos directamente para no crear una instancia
     static getCart(){
        return cartsService.getCart();
     };

     static getCarById(id){
        return cartsService.getCarById(id);
     };

     static createCart(){
        return cartsService.createCart(); 
     } ;

     static addProductToCart(cartId, productId){
        return cartsService.addProductToCart(cartId, productId);
     };
     static deleteProduct(cartId,productId){
        return cartsService.deleteProduct(cartId,productId);
     };
     static updateProductCart(cartId,productId,newQuantity){
        return cartsService.updateProductCart(cartId,productId,newQuantity);
     };
}