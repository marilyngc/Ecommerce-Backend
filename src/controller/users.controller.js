// capa de control
import { UsersService } from "../service/users.service.js";
import { generateToken } from "../utils.js";

// importar la capa de servicio

export class UsersControl {
  // usamos static para poder llamarlos directamente para no crear una instancia
static redirectProfile = (req, res) => {
  try {
      console.log("login-user", req.user);

      //generamos el token del usuario
      const token = generateToken(req.user);
      console.log("token",token)
      
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
    // const userName = req.user.email ;
    // res.render("/profile", { userName });
    res.json({status:"success",message:"Peticion valida", data:req.user});
};

  static redirectLogin = (req, res) => {

  
   
      res.redirect("/login");
    
  
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
    } catch (error) {}
  };
}
