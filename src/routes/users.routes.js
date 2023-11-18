import { Router } from "express";
import passport from "passport" 
import { UsersControl } from "../controller/users.controller.js";
const router = Router();



// no ejecutamos los metodos del controlador (loginUse()) solo loginUse

router.post("/login", passport.authenticate("loginLocalStrategy", {
  session:false,
  failureRedirect:"/api/sessions/fail-login"
}), UsersControl.saveLogin);

router.get("/fail-login",UsersControl.failLogin);



router.post("/profile", passport.authenticate("jwtAuth", {
  session:false,
  failureRedirect:"/api/sessions/fail-auth"
}) , UsersControl.saveProfile);

router.get("/profile", passport.authenticate("jwtAuth",{session:false
}),UsersControl.getProfile);
// por defecto passport usa session. le indicamos que no vamos a usar session con {session:false} 


router.post("/signup", passport.authenticate("signupLocalStrategy",{
  session:false,
  failureRedirect:"/api/session/fail-signup"
}), UsersControl.getSignup);




router.get("/fail-signup", UsersControl.failSignup);


router.get("/fail-auth",UsersControl.failAuth);

router.get("/logout", UsersControl.getLogout);

export { router as usersRouter };
