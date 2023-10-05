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
})

export { router as productsRouter };
