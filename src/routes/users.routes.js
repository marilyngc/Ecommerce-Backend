import { Router } from "express";
import passport from "passport" 
import { UsersControl } from "../controller/users.controller.js";
import { uploadDocuments, uploadProfile } from "../utils.js";
import { isAuth } from "../middlewares/auth.js";

const router = Router();



// no ejecutamos los metodos del controlador (loginUse()) solo loginUse


router.post("/signup",uploadProfile.single("avatar"), passport.authenticate("signupLocalStrategy",{
  session:false,
  failureRedirect:"/api/users/fail-signup"
}), UsersControl.redirectLogin);

router.post("/:uid/documents",isAuth,uploadDocuments.fields([
  {name:"identification", maxCount:1},
  {name:"domicilio", maxCount:1},
  {name:"estadoDeCuenta", maxCount:1},
]), UsersControl.uploadUserDocuments)


router.post("/login", passport.authenticate("loginLocalStrategy", {
  session:false,
  failureRedirect:"/api/users/fail-login"
}), UsersControl.redirectProfile);

router.get("/fail-login",UsersControl.failLogin);




router.get("/profile", passport.authenticate("jwtAuth",{session:false,
  failureRedirect:"/api/users/fail-auth"
}),UsersControl.getProfile);
// por defecto passport usa session. le indicamos que no vamos a usar session con {session:false} 




router.get("/fail-signup", UsersControl.failSignup);


router.get("/fail-auth",UsersControl.failAuth);

router.get("/logout", UsersControl.getLogout);

router.post("/forgot-password",UsersControl.forgotPassword);
router.post("/reset-password?token",UsersControl.resetPassword)

export { router as usersRouter };
