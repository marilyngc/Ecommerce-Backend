// capa de control

import {generateToken} from "../utils.js";


// importar la capa de servicio
import { UsersService } from "../service/users.service.js";

export class UsersControl {
     // usamos static para poder llamarlos directamente para no crear una instancia
     static saveLogin =  (req,res)=>{
        console.log("login-user", req.user);
        //generamos el token del usuario
        const token = generateToken(req.user);
        //enviamos el token al cliente
        res.cookie("cookieToken",token).json({status:"success", message:"login exitoso"});
        // res.redirect("/profile")
      };


      static failLogin =  (req,res)=>{
        res.render("login",{error:"No se pudo iniciar sesion para el usuario"});
      };


      static saveProfile = (req,res)=>{
        // console.log("profile-user",req.user);
        res.json({status:"success",message:"Peticion valida", data:req.user});
      };

      static getProfile = (req,res) => {
        res.send("Welcome!!");
      };

      static getSignup = (req,res) => {
        res.redirect("/login");
      };

      static failSignup = (req,res) => {
        res.render("/signup",{error:"No se pudo registrar al usuario"});
      };

      static failAuth = (req,res)=>{
        res.json({status:"error", message:"token invalido"});
      };

      static getLogout = async (req, res) => {

        try {
            req.session.destroy((error) => {
                if (error) {
                  return res.render("profile",{error:"can't log out"});
                } else {
                  res.redirect("/login");
                }
              });
        } catch (error) {
            
        }
    
    };
};