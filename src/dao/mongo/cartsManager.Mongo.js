import { cartsModel } from "./models/carts.model.js";

export class CartsManagerMongo {
  constructor() {
    this.model = cartsModel;
 
  }
  async getCart() {}
  async getCarById(id) {
    try {
      const result = await this.model.findById(id).populate("products.productId");
      if (!result) {
        throw new Error(`El carrito con el ID ${id} no existe`);
      }
  
    } catch (error) {
      throw new Error("no se pudo obtener el carrito");
    }
  }
  async createCart() {
    try {
      const newCart = {};
      const result = await this.model.create(newCart);
      if (!result) {
        throw new Error("el carrito no existe");
      }
      return result;
    } catch (error) {
      throw new Error("no se pudo crear el carrito");
    }
  }
  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getCarById(cartId);
      const existingProduct = cart.products.find(
        (product) => product.productId._id === productId
      );

      if (existingProduct) {
         // Actualizamos los productos una vez verificado los campos
        existingProduct.quantity++;
      }else{
        //si no encuentro un producto
        const newProductCart = {
            productId: productId,
            quantity: 1,
          };
          cart.products.push(newProductCart);
      }
     
      const result = await this.model.findByIdAndUpdate(cartId, cart, {
        new: true,
      });
      return result;
    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito");
    }
  }
  async deleteProduct(cartId,productId){
    try {
        // buscamos el id del carrito
        const cart = await this.model.getCarById(cartId);
        const productExist = cart.products.find(product => product.productId._id === productId);
        if (productExist) {
            // si el producto existe
            const newProduct = cart.products.filter(product => product.productId._id !== productId);
            cart.product = newProduct;

            // actualizamos el archivo
            const result = await this.model.findByIdAndUpdate(cartId,cart,{new:true});
            return result;
        }else{
            throw new Error("El producto no se puede eliminar porque no ha sido agregado");
        }
    } catch (error) {
        throw new Error("no se pudo obtener el carrito"); 
    }
  };
  async updateProductCart(cartId,productId,newQuantity){
    try {
          // buscamos el id del carrito
          const cart = await this.model.getCarById(cartId);
          const productExist = cart.products.findIndex(product => product._id == productId);
          if (productExist >= 0) {
            // si el producto existe
            cart.products[productExist] ={
              ...cart.products[productExist].quantity = newQuantity
      
            }
            const result = await this.model.findByIdAndUpdate(cartId,productId,{new:true});
            return result;
          }else{
            throw new Error("El producto no se puede actualizar porque no ha sido agregado");
          }
        
        
    } catch (error) {
      throw new Error("no se pudo actualizar el producto del carrito"); 
    }
  }
}
