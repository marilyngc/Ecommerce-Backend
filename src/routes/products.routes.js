import Router from "express";
import { productsService } from "../dao/index.js";
const router = Router();

router.get("/",async(req,res) => {
  try {
    const result = await productsService.getProduct();
    res.json({status:"succes",data:result});
  } catch (error) {
    res.status(500).json({status:"error",message:error.message});
  }
});

router.post("/",async (req,res) => {
  try {
    const product = req.body;
    const result = await productsService.createProduct(product);
    res.json({status:"succes",data:result});
  } catch (error) {
    res.status(500).json({status:"error",message:error.message});
  }
});

router.put("/:productId",async (req,res) => {
  try {
    const product = req.body;
    const productId = req.params.productId;
    const result = await productsService.updateProduct(productId,product,{new:true});
    res.json({status:"succes",data:result});
  } catch (error) {
    res.status(500).json({status:"error",message:error.message});
  }
});
router.delete("/:productId",async (req,res) => {
  try {
 
    const productId = req.params.productId;
    const result = await productsService.deleteProduct(productId);
    console.log(result)
    res.json({status:"succes",data:result});
  } catch (error) {
    res.status(500).json({status:"error",message:error.message});
  }
});


export { router as productsRouter };
