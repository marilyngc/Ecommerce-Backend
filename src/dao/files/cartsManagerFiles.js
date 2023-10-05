import fs from "fs";

export class CartsManagerFiles {
  constructor(path) {
    this.path = path;
    // contador para generar id en cada producto
    this.cartIdCount = 1;
    this.productIdCount = 1;
    this.productQuantityCount = 1;
    
    this.initializecartIdCount(); // Método para inicializar el contador desde el archivo
  }

  fileExist() {
    return fs.existsSync(this.path);
  }
  // Método para inicializar el contador desde el archivo
  async initializecartIdCount() {
    try {
      if (this.fileExist()) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const contentJSON = JSON.parse(content);
        const highestIdCart = contentJSON.reduce(
          (maxId, cart) => Math.max(maxId, cart.id),
          0
        );
        const highestIdProduct = contentJSON.products.reduce(
          (maxId, product) => Math.max(maxId, product.id),
          0
        );
console.log(highestIdProduct)
        const highestQuantityProduct = contentJSON.products.reduce(
          (maxQuantity, product) => Math.max(maxQuantity, product.quantity),
          0
        );

        this.cartIdCount = highestIdCart + 1;
        this.productIdCount = highestIdProduct + 1;
        this.productQuantityCount = highestQuantityProduct + 1;
 
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async getCart() {
    try {
      if (this.fileExist()) {
        // Leer archivo una vez encontrado en string
        const content = await fs.promises.readFile(this.path, "utf-8");

        // transformar string a json => JSON.parse(objetoJson)
        const contentJson = JSON.parse(content);

        return contentJson;
      } else {
        console.log("No es posible guardar el producto");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getCarById(id) {
    try {
      if (this.fileExist()) {
        // Leer archivo una vez encontrado en string
        const content = await fs.promises.readFile(this.path, "utf-8");

        // transformar string a json => JSON.parse(objetoJson)
        const contentJson = JSON.parse(content);

        const cartId = contentJson.find((cart) => cart.id === id);
        // Lo mostramos en formato objeto
        if (!cartId) {
          throw new Error("No se encontró carrito con el id indicado");
        }
        return cartId;
      } else {
        throw new Error("Not found");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
  async createCart() {
    try {
      if (this.fileExist()) {
        // Leer archivo una vez encontrado en string
        const content = await fs.promises.readFile(this.path, "utf-8");

        // transformar string a json => JSON.parse(objetoJson)
        const contentJson = JSON.parse(content);

        // creamos los productos actualizados una vez verificado los campos
        const newCart = {
          id: this.cartIdCount++,
          products: [],
        };
        contentJson.push(newCart);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(contentJson, null, "\t")
        );
        return contentJson;
      } else {
        console.log("No es posible guardar el producto");
      }
    } catch (error) {
      console.log(error.message);
      throw error.message;
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      if (this.fileExist()) {
       const cart = await this.getCarById(cartId);

          if (cart) {
            const product= cart.products.find((product) => product.id === productId);
          
            if (product) {
          
              // Actualizamos los productos una vez verificado los campos
              product.quantity++;
           
        
            }else{

            // Si eno encuntro un producto
            
            const newProduct ={
              id: productId,
              quantity: 1,
            };
            
            cart.products.push(newProduct);
            }
            
          }
      
        await fs.promises.writeFile(
          this.path,
          JSON.stringify([cart], null, "\t")
        );
        return cart;
      } else {
        console.log("No es posible sumar el producto");
      }
    } catch (error) {
      console.log(error.message);
      throw error.message;
    }
  }
}
