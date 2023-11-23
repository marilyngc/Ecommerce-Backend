// capa de control

import { productsService } from "../dao/index.js";

export class ProductsController {
      // usamos static para poder llamarlos directamente para no crear una instancia

      static getProducts = async(req,res) => {
        try {
          const result = await productsService.getProduct();
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };

      static postProduct = async (req,res) => {
        try {
          const product = req.body;
          const result = await productsService.createProduct(product);
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };

      static putProduct = async (req,res) => {
        try {
          const product = req.body;
          const productId = req.params.productId;
          const result = await productsService.updateProduct(productId,product,{new:true});
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };

      static deleteProduct = async (req,res) => {
        try {
       
          const productId = req.params.productId;
          const result = await productsService.deleteProduct(productId);
          console.log(result)
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };
}