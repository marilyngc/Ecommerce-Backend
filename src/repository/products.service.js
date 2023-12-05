// representa la capa de servicio

//importamos la capa de persistencia
import {productsDao} from "../dao/factory.js"

// accede a los metodos de los managers
export class ProductsService  {

       // usamos static para poder llamarlos directamente para no crear una instancia
       static createProduct(productInfo){
        return productsDao.createProduct(productInfo);//  entrega su return
       };

       static getProduct(){
        return productsDao.getProduct();//  entrega su return
       };

       static getProductsPaginate(query, options){
        return productsDao.getProductsPaginate(query, options);//  entrega su return
       };

       static getProductsById(id){
        return productsDao.getProductsById(id);//  entrega su return
       };


       static updateProduct(id, newProductInfo){
        return productsDao.updateProduct(id, newProductInfo);//  entrega su return
       };

       static deleteProduct(id) {
        return productsDao.deleteProduct(id) //  entrega su return
       }
}