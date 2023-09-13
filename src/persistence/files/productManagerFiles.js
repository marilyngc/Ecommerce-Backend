import fs from "fs";

export class ProductManagerFiles {
  constructor(path) {
    // espacio para añadir el archivo
    this.path = path;
    // contador para generar id en cada producto
    this.productIdCount = 1;
    this.initializeProductIdCount(); // Método para inicializar el contador desde el archivo
  }

  // compruebo si existe el archivo
  fileExist() {
    return fs.existsSync(this.path);
  }

  // Método para inicializar el contador desde el archivo
  async initializeProductIdCount() {
    try {
      if (this.fileExist()) {
        const content = await fs.promises.readFile(this.path, "utf-8");
        const contentJSON = JSON.parse(content);
        const highestIdProduct = contentJSON.reduce(
          (maxId, product) => Math.max(maxId, product.id),
          0
        );
        this.productIdCount = highestIdProduct + 1;
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async getProduct(ProductInfo) {
    try {
      if (this.fileExist()) {
        // Leer archivo una vez encontrado en string
        const content = await fs.promises.readFile(this.path, "utf-8");

        // transformar string a json => JSON.parse(objetoJson)
        const contentJson = JSON.parse(content);

        return contentJson;
      } else {
        console.log("No es posible guardar el usuario");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async addProducts(title, description, price, thumbnail, stock) {
    try {
      if (this.fileExist()) {
        //leemos el archivo
        const content = await fs.promises.readFile(this.path, "utf-8");

        const contentJSON = JSON.parse(content);

        if (!title || !description || !price || !thumbnail || !stock) {
          return console.log("todos los campos son obligatorios");
        }

        // Verificamos si ya existe un producto con el mismo título
        const existingProduct = contentJSON.find(
          (product) => product.title === title
        );
        if (existingProduct) {
          return console.log("Ya existe ese producto con ese nombre");
        }

        // creamos los productos una vez verificado los campos
        const newProduct = {
          id: this.productIdCount++,
          title,
          description,
          price,
          thumbnail,
          stock,
        };
        // Agregamos el nuevo producto
        contentJSON.push(newProduct);
        console.log("Producto agregado");

        // tranformamos de json a string y sobreescribimos el archivo
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(contentJSON, null, "\t")
        );
        console.log("Archivo actualizado");

        // mostramos todos los productos
        const getProducts = contentJSON;
        console.log("todos los productos:", getProducts);
      } else {
        throw new Error("El archivo no existe");
      }
    } catch (error) {
      throw error; // Lanzamos el error en caso de problemas
    }
  }

  // función para determinar si existe o no un producto dentro del array
  async getProductsById(id) {
    try {
      // Leer archivo una vez encontrado
      const content = await fs.promises.readFile(this.path, "utf-8");
      // transformar string a json => JSON.parse(objetoJson)
      const contentJson = JSON.parse(content);

      const productId = contentJson.find((product) => product.id === id);
      // Lo mostramos en formato objeto
      if (productId) {
        return productId;
      } else {
        throw new Error("Not found");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  async updateProduct(id,title,description,price,thumbnail,stock) {
    try {
      // Leer el archivo
      const content = await fs.promises.readFile(this.path, "utf-8");
      // transformar string a json => JSON.parse(objetoJson)
      const contentJson = JSON.parse(content);
      // creamos un nuevo array que excluye el producto solicitado
      const productIndex = contentJson.findIndex((product) => product.id === id);

console.log(productIndex)
      if (!title || !description || !price || !thumbnail || !stock) {
        throw new Error("todos los campos son obligatorios");
      }
      if (productIndex !== -1) {

        // usamos  contentJson[productIndex] para acceder al producto existente
        const existingProduct = contentJson[productIndex];
        // creamos los productos actualizados una vez verificado los campos
        const newProduct = {
          id: existingProduct.id,
          title,
          description,
          price,
          thumbnail,
          stock,
        };

        

        // reemplazamos el producto existente con el producto actualizado
        contentJson[productIndex] = newProduct;

        //Sobreescribimos el archivo con el contenido actulizado
        await fs.promises.writeFile(this.path, JSON.stringify(contentJson, null, "\t"));

     
        console.log("Producto actualizado");
     
        return newProduct;
      } else {
        throw new Error("Not found");
      }
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };


  async deleteProduct(id){
    try {
      // Leer el archivo
      const content = await fs.promises.readFile(this.path, "utf-8");
      // transformar string a json => JSON.parse(objetoJson)
      const contentJson = JSON.parse(content);
     
      // Encontrar el índice del producto con el id proporcionado
      const productIndex = contentJson.filter((product) => product.id !== id);



   console.log("adsd",productIndex)
      if(productIndex !== -1){
   console.log(productIndex.length)
        // sobreescribimos el archivo con el contenido actualizado

        await fs.promises.writeFile(this.path, JSON.stringify(productIndex, null, "\t"));
      console.log(`producto con id ${id} eliminado`);
      // devuelve true si se eliminó con exito
      return true;
      }else {
        console.log(`producto con id ${id} no encontrado`);
        return false; // Devuelve false si el producto no se encontró
    }

   
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
};

//creamos instancia

/* const operations = async () => {
  try {
    const manager = new ProductManagerFiles("/products.json");
    const products = await manager.getProduct();
    console.log(products); 

    // Aqui para comprobar si completó todos los campos
    await manager.addProducts("comida", undefined);
    // aquí agregamos dos productos iguales para que solo agregue uno 
    await manager.addProducts("peliculas", "harry potter", 20, "gdfg", 2);
    await manager.addProducts("peliculas", "harry potter", 20, "gdfg", 2);

    await manager.addProducts("Libros", "el principito", 2000, "gdfg", 1);
    await manager.addProducts("Disco", "Musica de los 80", 10000, "gdfg", 5);

    console.log("manager:", manager);

    // Hardcodeamos el id para ver si existe
    manager.getProductsById(3);
  } catch (error) {
    throw error;
  } */
//};

//operations();
