import mongoose, { mongo } from "mongoose";

const usersCollections = "users";

const usersSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});

export  const usersModel = mongoose.model(usersCollections,usersSchema);