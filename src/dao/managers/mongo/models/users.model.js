import mongoose from "mongoose";

const usersCollections = "users";

const usersSchema = mongoose.Schema({
    firts_name:{
        type:String,
        require:true
    },
    last_name:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    age:Number,
    password:{
        type:String,
        require:true
    },
    cart:{
        //lo encontramos en carts.model.js
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },
    role:{
        type:String,
        //definimos los unicos roles a elegir
        enum:["user","admin","premium"],
        default:"user"
    },
    documents:{
        type:[
            {
                name:{type:String, require:true},
                reference:{type:String, require:true}
            }
        ],
        default:[]
    },
    last_connection:{
        type: Date,
        default:null
    },
    status:{
        type: String,
        required:true,
        enum:["pendiente","incompleto","completo"],//posibles valores
        default: "pendiente"
    },
    avatar:{
        type:String,
        default:""
    }
 
});

export  const usersModel = mongoose.model(usersCollections,usersSchema);