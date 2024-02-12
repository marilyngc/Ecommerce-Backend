import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import multer from "multer";


import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from './config/config.js';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// VENTAJA => evita muchos errores sobre las rutas de los archivos cuando trabajamos con otros programadores


//Cuando se almacena una contraseña, en lugar de almacenar la contraseña directamente, se almacena su hash junto con la sal utilizada. La sal se genera aleatoriamente para cada contraseña, lo que significa que aunque dos usuarios tengan la misma contraseña, sus hashes serán diferentes debido a las sales únicas.

export const createHash = (password)=>{
    const saltRounds = 10; // Número de rondas de hashing
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password,salt);
};

export const inValidPassword = (password,user)=>{
    return bcrypt.compareSync(password,user.password);
};



// generar token
export const generateToken = (user) => {
    const token = jwt.sign({name:user.name, email:user.email},config.tokenKey.key,{expiresIn:"24h"});
    // console.log("generatetoken",token);
    return token;
};


// validar token
export const validateToken = (req,res,next) => {
    // lo vemos en el headers de postMan
    console.log("req.headers",req.headers)
    
    const authHeader = req.headers["Authorization"];


    console.log("headers",authHeader);

    // token
    let token = null;

        if (authHeader && authHeader.toLowerCase().startsWith(`bearer`)) {
            token = authHeader.split(" ")[1];
console.log("authHeader", authHeader);   
        }

    // comprobamos si se recibió un header ("Bearer <token>")
if (!authHeader) {
    return res.status(401).json({ error: "authHeader missing or invalid" });
}

    //se hace el split ya que el token viene en el header de la siguiente manera:
    // "Bearer <token>", y solo nos interesa el token
   
    
   
    // jwt.verify toma como argumentos;
    //1. El token recibido
    //2. La clave privada, que es la que usamos antes para firmar el token
    //3. un callback que se ejecutará cuando el token sea verificado.
    // De esta manera verificamos que el token sea válido y que no haya sido modificado externamente, y lo agregamos el objeto request para que pueda ser usado en las rutas.
    const decodedToken = jwt.verify(token,config.tokenKey.key,(err,payload) => {
        if (err) {
            console.error("Error verificando el token:", err);
            // return res.sendStatus(401)
               // Continuar con la ejecución incluso si hay un error en la verificación del token
               req.user = null; // O podrías establecer req.user en algo que indique que no hay un usuario válido
        }
            ;
            console.log(config.tokenKey.key)
        req.user = payload;
        next();
            
        
    });   
    console.log(decodedToken);
     // si el token está vacio
     if (!token || !decodedToken.id) return res.sendStatus(401).json({error:"authHeader missing  or invalid"});

 
    
};


// MULTER
// validar los campos obligatorios
const checkValidFields = (user)=> {
    const {first_name,email,password} =  user;
    if (!first_name|| !email || !password) {
        return false
    }else{
        return true
    }
};
//filtros para subir las imagnes de usuarios
const profileFilterMulter = (req,file,callback) => {
    if (!checkValidFields(req.body)) {
        callback(null,false); // lo utilizamos para cuando multer haga filtros y que multer no suba las fotos

    }else{
        callback(null,true); // multer sube las imagenes
    }
};


// configrar multer para guardar las imagenes de los usuarios

// donde se guarda las imagenes
const profileStorage = multer.diskStorage({
    // donde vamos a guardar las iamgenes
    destination: function(req,file,callback){
        callback(null,path.join(__dirname,"/multer/users/img"))
    },

    // con que nombre vamos a guardar la imagen
    filename: function(req,file,callback){
        callback(null, `${req.body.email}-perfil-${file.originalname}`)
    }
});


// creamos el uploader de las imagenes de perfil
const uploadProfile = multer({storage:profileStorage});



// configrar multer para guardar los documentos de los usuarios

// donde se guarda las imagenes
const documentStorage = multer.diskStorage({
    // donde vamos a guardar las iamgenes
    destination: function(req,file,callback){
        callback(null,path.join(__dirname,"/multer/users/documents"))
    },

    // con que nombre vamos a guardar la imagen
    filename: function(req,file,callback){
        callback(null, `${req.body.email}-documents-${file.originalname}`)
    }
});


// creamos el uploader de las imagenes de perfil
const uploadDocuments = multer({storage:documentStorage, fileFilter:profileFilterMulter});



// configrar multer para guardar las imagenes de los productos 

// donde se guarda las imagenes
const imgProductsStorage = multer.diskStorage({
    // donde vamos a guardar las iamgenes
    destination: function(req,file,callback){
        callback(null,path.join(__dirname,"/multer/products/img"))
    },

    // con que nombre vamos a guardar la imagen
    filename: function(req,file,callback){
        callback(null, `${req.body.code}-products-${file.originalname}`)
    }
});


// creamos el uploader de las imagenes de perfil
const uploadProducts = multer({storage:imgProductsStorage });

export {uploadDocuments,uploadProfile, uploadProducts};