import { Router } from "express";
import {generateToken} from "../utils.js";
import passport from "passport" 

const router = Router();

router.post("/login", passport.authenticate("loginLocalStrategy", {
  session:false,
  failureRedirect:"/api/sessions/fail-login"
}) , (req,res)=>{
  console.log("login-user", req.user);
  //generamos el token del usuario
  const token = generateToken(req.user);
  //enviamos el token al cliente
  res.cookie("cookieToken",token).json({status:"success", message:"login exitoso"});
  // res.redirect("/profile")
});

router.get("/fail-login", (req,res)=>{
  res.render("login",{error:"No se pudo iniciar sesion para el usuario"});
});



router.post("/profile", passport.authenticate("jwtAuth", {
  session:false,
  failureRedirect:"/api/sessions/fail-auth"
}) , (req,res)=>{
  // console.log("profile-user",req.user);
  res.json({status:"success",message:"Peticion valida", data:req.user});
});

router.get("/profile", passport.authenticate("jwtAuth",{session:false}),(req,res) => {
  res.send("Welcome!!");
})
// por defecto passport usa session. le indicamos que no vamos a usar session con {session:false} 


router.post("/signup", passport.authenticate("signupLocalStrategy",{
  session:false,
  failureRedirect:"/api/session/fail-signup"
}), (req,res) => {
  res.redirect("/login");
})




router.get("/fail-signup", (req,res) => {
  res.render("/signup",{error:"No se pudo registrar al usuario"});
});


router.get("/fail-auth",(req,res)=>{
  res.json({status:"error", message:"token invalido"});
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
