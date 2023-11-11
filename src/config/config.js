import dotenv from "dotenv";
dotenv.config();

export const config = {
   
    // dirrecion de mongoDB
    mongo:{
        url:process.env.MONGO_URL
    },

    tokenKey:{
        key:process.env.PRIVATE_KEY
    }
}