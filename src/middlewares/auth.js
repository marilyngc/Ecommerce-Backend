

export const isAuth = (req,res,next) => {
    console.log("peticion recibida");
    // console.log(req);
    next(); // objeto que da la continuidad de la ejecucion  => si no lo ponemos, se queda procesando 
};


// recibe los roles para acceder a una ruta
export const checkRole = (roles) => {
    return (req,res,next) => {
        console.log("middleware",res.user);
        if(!roles.includes(req.user.role)) {
            return res.json({status:"error",message:"you don´t have access"})
        }else{
            next();
        }
       
    }
}