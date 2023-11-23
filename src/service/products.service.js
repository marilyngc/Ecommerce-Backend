// representa la capa de servicio

//importamos la capa de persistencia
import {productsService} from "../dao/index.js"

// accede a los metodos de los managers
export class ProductsService  {

       // usamos static para poder llamarlos directamente para no crear una instancia
       static createProduct(productInfo){
        return productsService.createProduct(productInfo);//  entrega su return
       };

       static getProduct(){
        return productsService.getProduct();//  entrega su return
       };

       static getProductsPaginate(query, options){
        return productsService.getProductsPaginate(query, options);//  entrega su return
       };

       static getProductsById(id){
        return productsService.getProductsById(id);//  entrega su return
       };


       static updateProduct(id, newProductInfo){
        return productsService.updateProduct(id, newProductInfo);//  entrega su return
       };

       static deleteProduct(id) {
        return productsService.deleteProduct(id) //  entrega su return
       }
}