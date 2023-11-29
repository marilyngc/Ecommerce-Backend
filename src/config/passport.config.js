import passport from "passport";
import jwt from "passport-jwt";
import LocalStrategy from "passport-local"
import {UsersService } from "../service/users.service.js";
import { createHash, inValidPassword } from "../utils.js"; // Asegúrate de que la ruta sea correcta


import { config } from "./config.js";

const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt; //Extraer el token (cookie,query params, body, headers)

export const initializePassport = ()=>{
    //Estrategia para registrar a los usuarios
    passport.use("signupLocalStrategy", new LocalStrategy(
        {
            passReqToCallback:true,
            usernameField:"email", //ahora el campo username es igual al campo email
        },
        async (req,username,password,done)=>{
            const {first_name,last_name,age} = req.body;
            try {
                const user = await UsersService.getUserByEmail(username);
                if(user){
                    //el usuario ya esta registrado
                    return done(null,false);
                }
                //El usuario no esta registrado
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email:username,
                    password:createHash(password)
                };
                console.log(newUser);
                const userCreated = await UsersService.createUser(newUser);
                return done(null,userCreated);
            } catch (error) {
                return done(error);
            }
        }
    ));

    //Estrategia para login a los usuarios
    passport.use("loginLocalStrategy", new LocalStrategy(
        {
            usernameField:"email", //ahora el campo username es igual al campo email
        },
        async (username,password,done)=>{
            try {
                const user = await UsersService.getUserByEmail(username);
                if(!user){
                    //el usuario no esta registrado
                    return done(null,false);
                }
                if(!inValidPassword(password,user)){
                    return done(null,false);
                }
                //validamos que el usuario esta registrado y que la contraseña es correcta
                return done(null,user);//req.user
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use("jwtAuth", new JWTStrategy(
        {
            //Extraer la informacion del token
            jwtFromRequest:extractJwt.fromExtractors([cookieExtractor]),
            secretOrKey:config.tokenKey.key
        },
        async (jwtPayload,done)=>{
            // console.log("jwtPayload",jwtPayload);
            try {
                return done(null,jwtPayload); //req.user = info del token
            } catch (error) {
                return done(error);
            }
        }
    ));
};

//funcion para extraer el token de la cookie
export const cookieExtractor = (req)=>{
    let token;
    if(req && req.cookies){ //req?.cookies
        token = req.cookies["cookieToken"];
    } else {
        token = null;
    }
    return token;
};


passport.serializeUser((user,done)=>{
    done(null, user._id);
});

passport.deserializeUser(async(id,done)=>{
    const user = await UsersService.getUserById(id);
    done(null,user);//req.user = informacion del usuario que traemos de la base de datos
});