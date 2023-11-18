import { productsModel } from "./models/products.model.js";

export class ProductsManagerMongo {
  constructor() {
    this.model = productsModel;
  }

  async createProduct(productInfo) {
    try {
      const result = await this.model.create(productInfo);
      return result;
    } catch (error) {
      throw new Error("No se pudo crear el producto");
    }
  }

  async getProduct() {
    try {
      // lean() es para convertir a archivo  json para ser leido por la plnatilla de handlebars
      const result = await this.model.find().lean();
      return result;
    } catch (error) {
      throw new Error("No se pudo capturar los productos");
    }
  };
  async getProductsPaginate(query, options) {
    try {
      const result = await this.model.paginate(
        {},
        {query,
          options
    }
      );
      return result;
    } catch (error) {
      throw new Error("No se pudo capturar los productos");
    }
  };
  async addProducts(objetArray) {}
  async getProductsById(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      throw new Error("No se pudo encontrar el producto solicitado");
    }
  }
  async updateProduct(id, newProductInfo) {
    try {
      // const result = await this.model.updateOne({_id:id},newProductInfo);
      const result = await this.model.findByIdAndUpdate(id, newProductInfo, {
        new: true,
      });
      if (!result) {
        throw new Error("No se pudo encontrar el producto a actualizar");
      }
      return result;
    } catch (error) {
      throw new Error("No se pudo actualizar los productos");
    }
  }
  async deleteProduct(id) {
    try {
     
      const result = await this.model.findByIdAndDelete(id);

  
      if (!result) {
      throw new Error("No se pudo encontrar el producto a eliminar");
      }
      return result;
    } catch (error) {
      throw new Error("No se pudo eliminar el producto solicitado");
    }
  }
}
