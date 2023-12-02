import path from 'path';
import { fileURLToPath } from 'url';

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from './config/config.js';


export const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
    const token = jwt.sign({name:user.name, email:user.email},config.tokenKey.key);
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
    if (!authHeader) return res.sendStatus(401).json({error:"authHeader missing  or invalid"});

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
            return res.sendStatus(403)};
            console.log(config.tokenKey.key)
        req.user = payload;
        next();
            
        
    });   
    console.log(decodedToken);
     // si el token está vacio
     if (!token || decodedToken.id) return res.sendStatus(401).json({error:"authHeader missing  or invalid"});

 
    
};