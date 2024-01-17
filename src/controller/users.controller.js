// capa de control
import { UsersService } from "../service/users.service.js";
import { createHash, generateToken, inValidPassword } from "../utils.js";
import { generateEmailToken, sendChangePasswordEmail, verifyEmailToken } from "../helpers/email.js";


// importar la capa de servicio

export class UsersControl {
  // usamos static para poder llamarlos directamente para no crear una instancia
static redirectProfile = (req, res) => {
  try {
      console.log("login-user", req.user);

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

  static modifyRole = async(req,res) => {
    try {
      const userId = req.params.uid;
      const user = await UsersService.getUsersById(userId);
      console.log(user);

      // validar que el usuario haya subido todos los documentos
      if (user.status !== "completo") {
        return res.json({status:"error", message: "el usuario no ha subido todos los documentos"});

      }
      if (user.role === "premium") {
        user.role = "user";
      }else if(user.role === "user"){
        user.role = "premium"
      }else{
        res.json({status:"error", message:"No se puede cambiar el role del usuario"});
      }
    } catch (error) {
      res.json({status:"error", message:error.message});
    }
  }

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
   console.log(req.user);
   const user ={ ...req.user}; // hacemos una copia
   user.last_connection = new Date();
   await UsersService.updateUser(user._id, user); // actualizamos el tiempo

   // cerramos session
   req.session.destroy((error)=>{
    res.send("session finalizada");
   });
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
  

  static uploadUserDocuments = async (req,res)=> {
    try {
      const userId = req.params.uid;
      const user = await UsersService.getUsersById(userId);
      console.log("documentos,", req.files);
      // variables para guardar los objetos
      const identification= req.files["identification"] ?.[0] || null;
      const domicilio= req.files["domicilio"] ?.[0] || null;
      const estadoDeCuenta= req.files["estadoDeCuenta"] ?.[0] || null;
    
      // guardamos todos los objetos
      const docs = []
      if (identification) {
        docs.push({
          name: "identification",
          reference: identification.filename
        })
      };
      if (domicilio) {
        docs.push({
          name: "domicilio",
          reference: domicilio.filename
        })
      };
      if (estadoDeCuenta) {
        docs.push({
          name: "estadoDeCuenta",
          reference: estadoDeCuenta.filename
        })
      };
    // console.log("docs", docs);

    // comprobar si se completó todos kos documentos
    user.documents = docs;
    if (docs.length < 3) {
        user.status = "incompleto";
    }else{
      user.status = "completo";
    }

    // console.log("user", user);

    await UsersService.updateUser(user._id, user);
    res.json({status:"success", messages:"documentos actualizados"});
    } catch (error) {
      res.json({status:"error",message:error.message});
    }
  };
}
