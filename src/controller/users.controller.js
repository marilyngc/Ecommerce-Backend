// capa de control
import { UsersService } from "../service/users.service.js";
import { createHash, generateToken, inValidPassword } from "../utils.js";
import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js";


// importar la capa de servicio

export class UsersControl {
  // usamos static para poder llamarlos directamente para no crear una instancia
static redirectProfile = (req, res) => {
  try {
      // console.log("login-user", req.user);

      //generamos el token del usuario
      const token = generateToken(req.user);
     
      
      //enviamos el token al cliente
      return res
          .cookie("cookieToken", token,{httpOnly:true, secure: true})
          .json({ status: "success", message: "login exitoso" });
  } catch (error) {
      console.error("Error al generar el token:", error);
      return res.status(500).json({ status: "error", message: "Error al generar el token" });
  }
};



  static saveProfile = (req, res) => {
    // console.log("profile-user",req.user);
    
    res.json({ status: "success", message: "Peticion valida", data: req.user });
  };


  static getProfile = (req, res) => {
    // console.log("Usuario en getProfile:", req.user);
    const userName = req.user.email ;
    res.render("/profile", { userName });
    res.json({status:"success",message:"Peticion valida", data:req.user});
};

  static redirectLogin = (req, res) => {
    res.render("profile",{user:req.user});
 
    // res.render("/login",{message:"Usuario registrado correctamente"});
      // res.redirect("/profile");
    
  
  };


  static failLogin = (req, res) => {
    res.render("login", { error: "No se pudo iniciar sesion para el usuario" });
  };
  static failSignup = (req, res) => {
    //  renderiza la vista de fallo en el registro
    res.render("signupView", { error: "No se pudo registrar al usuario" });
  };

  static failAuth = (req, res) => {
    res.json({ status: "error", message: "token invalido" });
  };

  static getLogout = async (req, res) => {
    try {
      req.session.destroy((error) => {
        if (error) {
          return res.render("profile", { error: "can't log out" });
        } else {
          res.redirect("/login");
        }
      });
    } catch (error) {
      res.json({status:"error",message:error.message})
    }
  };


  static forgotPassword = async (req,res) => {

    try {
       //capturamos el emial
    const {email} = req.body;

          // verificar que el usuario exista
    const user = await UsersService.getUserByEmail(email);
    //generamos el token
    const emailToken = generateEmailToken(email,5 * 60);//5min
      //enviamos correo
    await sendChangePasswordEmail(req,email,emailToken);
    res.send(`se envio un enlace a su correo, <a href="/> volver a la pagina login </a>`)
    } catch (error) {
      res.json({status:"error",message:error.message});
    }
  };

  static resetPassword = async(req,res) => {
    try {
      //leemos la variable del token
      const token = req.query.token;
      const {newPaswword} = req.body;
      // obtenemos el correo
      const validEmail = verifyEmailToken(token);
      if (!validEmail) {
        return res.send(`el enlace ya no es valido, genera un nuevo <a href="/ forgot-password">enlace </a>`)
      };
      //validamos el usuario 
      const user = await UsersService.getUserByEmail(validEmail);
      if (!user) {
        return res.send(`esta operacion no es valida`);
      };

      // si son iguales las contraseñas
      if (inValidPassword(newPaswword,user)) {
        return res.render("resetPassView",{error:"contraseña invalida",token});
      };

      // si son diferentes generamos la nueva contraseña
      const userData = {
        ...user,
        password:createHash.apply(newPaswword)
      };

      // actualizamos el usario
      await UsersService.updateUser(user._id,userData);
      return res.render("login",{message:"contraseña actualizada"});

    } catch (error) {
      res.json({status:"error",message:error.message});
    }
  }
  
}
