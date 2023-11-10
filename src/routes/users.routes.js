import { Router } from "express";
import { usersModel } from "../dao/mongo/models/users.model.js";
import {generateToken} from "./utils.js";
 
const router = Router();

router.post("/login", async (req, res) => {
  try {
    const loginForm = req.body;
    const token = generateToken(loginForm)

    // guardar la cookie en su almacenamiento de cookie
    res.cookie("cookieToken",token).json({status:"success", message:"login Exitoso"});

    // comprobar que existe el usuario
    const user = await usersModel.findOne({ email: loginForm.email });
    if (!user) {
      return res.render("login", { error: "Este usuario no está registrado" });
    }
    // verificar contraseña
    if (user.password !== loginForm) {
      return res.render("login", { error: "Credenciales invalidas" });
    }
    // si el usuario existe y contraseña valida, entonces creamos la session del usuario

    req.session.name = user.name;
    res.redirect("/profile");
  } catch (error) {
    res.render("login", {
      error: "no se pudo iniciar sesioón para este usuario",
    });
  }

  console.log(req.session);

  res.send("peticion login");
});


router.get("/profile", password.authenticate("jwtAuth",{session:false}),(req,res) => {
  res.send("Welcome!!");
})
// por defecto passport usa session. le indicamos que no vamos a usar session con {session:false} 
router.get("/profile", (req, res) => {
  console.log(req.session);
  req.session.name
    ? res.send(`Welcome ${req.session.name}!!`)
    : res.send("you need to login");
});

router.get("singUp", async (req, res) => {
  try {
    const signUpForm = req.body;
    const result = await usersModel.create(signUpForm);
    res.render("login", { message: "usuario conectado" });
  } catch (error) {
    res.render("signupView", { error: "no se pudo registrar el usuario" });
  }
});

router.get("/logout", async (req, res) => {

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

});

export { router as usersRouter };
