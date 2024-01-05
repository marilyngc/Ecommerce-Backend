
import { Eerror } from "../enum/Eerror.js";
import { CustomError } from "../service/errors/customError.service.js";
import {productCreateError} from "../service/errors/productCreateError.service.js"

// capa de control

import { ProductsService  } from "../service/products.service.js";

export class ProductsController {
      // usamos static para poder llamarlos directamente para no crear una instancia

      static getProducts = async(req,res) => {
        try {
          const result = await ProductsService.getProduct();
          res.status(200).json({status:"succes",data:result});
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
      static postProduct = async (req,res,next) => {
        try {
          const product = req.body;
          const {title} = product;
          // throw new Error("error de prueba");
          if (!title) {
            CustomError.createError({
              name:"Create product error",
              cause:productCreateError(product),
              message:"Datos invalidos para crear el producto",
              errorCode: Eerror.INVALID_BODY_JSON
            })
          }
          const result = await ProductsService.createProduct(product);
          res.json({status:"succes",data:result});
        } catch (error) {
          // res.status(500).json({status:"error",message:error.message});
          next(error);
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