import mongoose from "mongoose";

const cartsCollection = "carts";
const carSchema = new mongoose.Schema({
    products:{
        type:[
            {
                productId:String,
                quantity:{
                    type:Number,
                    required:true
                }
            }
        ],
        default:[] // por si el carrito no tiene productos
    }
});


export const cartsModel = mongoose.model(cartsCollection,carSchema);