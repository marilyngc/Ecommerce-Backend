import mongoose, { mongo } from "mongoose";


const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema({

    code:{
        type:String,
        require:true
    },
    purchase_datetime:{
        type:date
    },
    amount:{
        type:Number,
        require:true
    },
    purcharse:{
        type:String,
        require:true
    }

});

export const ticketsModel = mongoose.model(ticketsCollection,ticketsModel);