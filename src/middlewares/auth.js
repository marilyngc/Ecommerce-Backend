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
export const checkRole = (roles)=>{
    return (req,res,next)=>{
        console.log(req.user);
        if(!roles.includes(req.user.role)){
            res.json({status:"error", message:"No tienes accesso"});
        } else {
            next();
        }
    }
};