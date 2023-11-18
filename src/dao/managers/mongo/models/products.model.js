import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

// creamos la coleccion 
 const  productsCollection = "products";


 // creamos esquema
 const productSchema = new mongoose.Schema({
    
		title: {
            type:String,
            require:true,
        },
        
		description: {
            type:String,
            require:true,
        },
		price:{
            type:Number,
            require:true,
        },
        
            code:{
                type:String,
                require:true,
                unique:true
            },
      
		thumbnail: {
            type:String,
           
        },
        category:{
            type:String,
            require:true,
            enum:["Clothe","technology","sports"]
        },
		stock:{
            type:Number,
            require:true,
        } 
	
 });

// el modelo nos sirve para realizar operaciones sobre la coleccion users


productSchema.plugin(mongoosePaginate);
 export const productsModel = mongoose.model(productsCollection,productSchema);