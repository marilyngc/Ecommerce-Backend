import passport from "passport";
import jwt from "passport-jwt";
import {config} from "../config/config.js";

const JWTStrategy = jwt.Strategy;
const extractJWT = jwt.ExtractJwt; // extraer el token(cookie,query params,body, headers)

export const initializePassport = () => {
    passport.use("jwtAuth", new JWTStrategy(
        {
            // extraer la información del token
            jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
            secretOrKey:config.tokenKey.key
        },
        async (jwtPayload,done) => {
            try {
                return done(null,jwtPayload); // req.user = información dentro del token
            } catch (error) {
                return done(error);
            }
        }
    ))
};


// función para extración el token del cookie

const cookieExtractor = (req) => { // req?.cookies
    if (req && req.cookies ) {
        token = req.cookies["cookieToken"]; // cookieToken está en utils.js
    }else{
        token: null;
    }

    return token; // pasa a initializePassport()
}