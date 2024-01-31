import { Eerror } from "../enum/Eerror.js";

export const errorHandler = (error, req, res, next) => {
    console.log(Eerror);

    // Bandera para verificar si se ha enviado una respuesta
    let responseSent = false;

      // Asegúrate de que error.code tenga un valor antes de utilizarlo en el switch
      const errorCode = error.code || Eerror.UNKNOWN_ERROR;

    switch (Eerror) {
        case Eerror.DATABASE_ERROR:
            res.json({ status: "error", error: error.cause });
            responseSent = true;  // Marca que se ha enviado una respuesta
            break;

        case Eerror.INVALID_BODY_JSON:
            res.json({ status: "error", error: error.message, cause: error.cause });
            responseSent = true;  // Marca que se ha enviado una respuesta
            break;

        case Eerror.INVALID_PARAM:
            res.json({ status: "error", message: error.message, cause: error.cause });
            responseSent = true;  // Marca que se ha enviado una respuesta
            break;

        default:
                // Verifica si ya se ha enviado una respuesta y si error.message no es undefined
                if (!responseSent && error.message !== undefined) {
                    res.json({ status: "error de prueba", error: error.message });
                } else {
                    // Si error.message es undefined, puedes proporcionar un mensaje predeterminado
                    res.json({ status: "error de prueba", error: "Mensaje de error no definido" });
                }
                break;
    }
};
