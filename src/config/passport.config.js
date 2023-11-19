import passport from "passport";
import jwt from "passport-jwt";
import localStrategy from "passport-local"
import {usersService } from "../dao/index.js";
import { createHash, inValidPassword } from "../utils.js"; // Asegúrate de que la ruta sea correcta


import {config} from "../config/config.js";

const JWTStrategy = jwt.Strategy;
const extractJWT = jwt.ExtractJwt; // extraer el token(cookie,query params,body, headers)

export const initializePassport = () => {
       //Estrategia para registrar a los usuarios
       passport.use("signupLocalStrategy", new localStrategy(
        {
            passReqToCallback:true,
            usernameField:"email", //ahora el campo username es igual al campo email
        },
        async (req,username,password,done)=>{
            const {first_name,last_name,age} = req.body;
            try {
                const user = await usersService.getUserByEmail(username);
                console.log("usuario::::",user)
                if(user){
// el usuario ya está registrado, indicamos que el registro falló
return done(null, false, { message: "Ya existe un usuario con este correo electrónico. Por favor, inicie sesión.",
 });
                }
                //El usuario no esta registrado, procedemos a crearlo
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email:username,
                    password:createHash(password)
                };
               
                const userCreated = await usersService.createUser(newUser);
                return done(null,userCreated,{message:"Usuario creado"});
            } catch (error) {
                return done(error);
            }
        }
    ));


    
    //Estrategia para login a los usuarios
    passport.use("loginLocalStrategy", new localStrategy(
        {
            usernameField:"email", //ahora el campo username es igual al campo email
        },
        async (username,password,done)=>{
            try {
                const user = await usersService.getUserByEmail(username);
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

// perfil
    passport.use("jwtAuth", new JWTStrategy(
        {
            // extraer la información del token
            jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
            secretOrKey:config.tokenKey.key
        },
        async (jwtPayload,done) => {
            try {
                return done(null,jwtPayload); // req.user = información dentro del token
            } catch (error) {
                return done(error);
            }
        }
    ))
};


// función para extración el token del cookie

const cookieExtractor = (req) => { // req?.cookies
    if (req && req.cookies ) {
        token = req.cookies["cookieToken"]; // cookieToken está en utils.js
    }else{
        token: null;
    }

    return token; // pasa a initializePassport()
}