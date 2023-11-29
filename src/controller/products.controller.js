// capa de control

import { ProductsService  } from "../service/products.service.js";

export class ProductsController {
      // usamos static para poder llamarlos directamente para no crear una instancia

      static getProducts = async(req,res) => {
        try {
          const result = await ProductsService.getProduct();
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };

      static getProductId = async(req,res) => {
        try {
          const productId = req.params.pid;
          const result = await ProductsService.getProductsById(productId);
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      }
      static postProduct = async (req,res) => {
        try {
          const product = req.body;
          const result = await ProductsService.createProduct(product);
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };

      static putProduct = async (req,res) => {
        try {
          const product = req.body;
          const productId = req.params.productId;
          const result = await ProductsService.updateProduct(productId,product,{new:true});
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };

      static deleteProduct = async (req,res) => {
        try {
       
          const productId = req.params.productId;
          const result = await ProductsService.deleteProduct(productId);
          console.log(result)
          res.json({status:"succes",data:result});
        } catch (error) {
          res.status(500).json({status:"error",message:error.message});
        }
      };
}