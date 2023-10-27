import { Router } from "express";

const router = Router();


router.post("/login", (req,res)  => {
    const loginForm = req.body;
    req.session.email = loginForm.email;
    req.session.name = loginForm.name;

    console.log(req.session);

    res.send("peticion login")
});


router.get("/profile", (req,res) => {
    console.log(req.session);
    req.session.name
     ?   res.send(`Welcome ${req.session.name}!!`)
    : res.send("you need to login");
    
});


router.get("/logout", (req,res) => {
    req.session.destroy(error => {
        if (error) {
            return res.send("can't log out")
        }else{
            res.send("session ended ");
        }
       
    })
});

export {router as usersRouter}
