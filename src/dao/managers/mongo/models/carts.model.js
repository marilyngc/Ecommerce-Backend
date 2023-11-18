import mongoose from "mongoose";

const cartsCollection = "carts";
const carSchema = new mongoose.Schema({
    products:{
        type:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"products" // nombre de la coleccion que vamos a usar
                },
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