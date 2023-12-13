import { Eerror } from "../enum/Eerror.js";

export const errorHandler = (error,req,res,next) => {
    console.log(error.coder);
    switch (error.code){
        case Eerror.DATABASE_ERROR:
            res.json({status:"error", error:error.cause});
            break;
        
        case Eerror.INVALID_BODY_JSON:
            res.json({status:"error", error:error.message,cause:error.cause});
            break;

        case Eerror.INVALID_PARAM:
            res.json({status:"error", error:error.cause,error:error.message});
            break;

            default:
                res.json({status:"error de prueba",error:error.message});
                break;
    }
}