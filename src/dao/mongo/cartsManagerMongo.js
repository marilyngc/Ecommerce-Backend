import {cartsModel} from "./models/carts.model.js"


export class CartsManagerMongo{
    constructor(){
        this.model= cartsModel;
        //contador para la cantidad de productos
        this.productQuantity = 1;
    };
    async getCart() {};
    async getCarById(id) {
        try {
         const result =   await this.model.findById(id);
         if (!result) {
            throw new Error(`El carrito con el ID ${id} no existe`);
         };
         return result;
        } catch (error) {
            throw new Error("no se pudo obtener el carrito");
        }
    };
    async createCart() {
        try {
            const newCart = {};
            const result =   await this.model.create(newCart);
            if (!result) {
               throw new Error("el carrito no existe");
            };
            return result;
           } catch (error) {
               throw new Error("no se pudo crear el carrito");
           }
    };
    async addProductToCart(cartId, productId) {
        try {
            const cart = await this.getCarById(cartId);
            const existingProduct = cart.products.find(
                (product) => product.productId === productId
            );

            if (existingProduct) {
                const updateProduct = {
                    productId: productId,
                    quantity:this.productQuantity++
                }
            cart.products.push(updateProduct);
    
                 
            }
            const newProductCart = {
                productId: productId,
                quantity:1
            }
            cart.products.push(newProductCart);
           const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
           return result;

        } catch (error) {
            throw new Error("No se pudo agregar el producto al carrito")
        }
    };
    

}