import path from 'path';
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken";
import { config } from './config/config.js';

export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// VENTAJA => evita muchos errores sobre las rutas de los archivos cuando trabajamos con otros programadores


// generar token
export const generateToken = (user) => {
    const token = jwt.sign({name:user.name, email:user.email},config.tokenKey.key,{expiresIn:"24h"});
    return token;
};


// validar token
export const validateToken = (req,res,next) => {
    // lo vemos en el headers de postMan
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);

    // comprobamos si se recibió un header ("Bearer <token>")
    if (!authHeader) return res.sendStatus(401);

    //se hace el split ya que el token viene en el header de la siguiente manera:
    // "Bearer <token>", y solo nos interesa el token
    const token = authHeader.split(" ")[1];
    // console.log(token);    
    
    // si el token está vacio
    if (token === null) return res.sendStatus(401);

    // jwt.verify toma como argumentos;
    //1. El token recibido
    //2. La clave privada, que es la que usamos antes para firmar el token
    //3. un callback que se ejecutará cuando el token sea verificado.
    // De esta manera verificamos que el token sea válido y que no haya sido modificado externamente, y lo agregamos el objeto request para que pueda ser usado en las rutas.
    jwt.verify(token.config.tokenKey.key,(err,payload) => {
        if (err) return res.sendStatus(403);
        req.user = payload;
        next();
            
        
    });    
    
};