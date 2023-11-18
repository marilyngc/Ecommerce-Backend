import mongoose from "mongoose";

const chatCollection = "chat";


const chatSchema = new mongoose.Schema({
    user:{
        type:String,
        require:true,
        unique:true
    },
    message:{
        type:String,
        require:true
    }
});

export const chatModel = mongoose.model(chatCollection,chatSchema);