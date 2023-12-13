import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

export const isAuth = (req,res,next) => {
    if (!req.user) {
      return   res.json({status:"error", message:"debes estar autenticado"})
    }
    console.log("peticion recibida");
    // console.log(req);
    next(); // objeto que da la continuidad de la ejecucion  => si no lo ponemos, se queda procesando 
};


// optional chainning
// if (req.user?.role) {
    
// }else{

// }


// recibe los roles para acceder a una ruta
export const checkRole = (roles) => {
    return (req,res,next) => {
        jwt.verify(req.cookies.accessToken,config.tokenKey.key,(err,user) =>{
            if (err) {
                console.log(err);
            }
            console.log("middleware",res.user);
            if(!roles.includes(req.user.role)) {
                return res.json({status:"error",message:"you don´t have access"})
            }else{
                next();
            }
        })
      
       
    }
}