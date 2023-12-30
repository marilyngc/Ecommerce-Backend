import { config } from "../config/config.js";
import { jwt } from "jsonwebtoken";
import { transporter } from "../config/email.js";



export const generateEmailToken = (email,expireTime) => {
    //generamos token
    const token = jwt.sign({email},config.gmail.token,{expiresIn:expireTime});
    return token;
};


export const sendChangePasswordEmail = async (req,userEmail,token) => {
    // enlace que le enviamos al usuario
    const domain = `${req.protocol}://${req.get('host')}`;// crea la ruta base
    const link =`${domain}/reset-password?token=${token}`;// enlace con el token

    // enviamos correo con enlace
    await transporter.sendMail({
    
        from:"ecoomerce pepito",
        to:userEmail,
        //asunto
        subject:"restablecer contraseña",
        html:`
        <div> 
        <h2> Hola!!  </h2>
        <p> Solicitaste restablecer contraseña, da click en el siguiente boton </p>
        <a href="${link}">  
          <button>
              restablecer contraseña
          </button>
        </a>
        </div>`
    })
};


//validar token
export const verifyEmailToken = async (token) => {
  try {
      //extraemos la informacion
      const info = jwt.verify(token,config.gmail.token);
      return info.email;
  } catch (error) {
    return null;
  }
};