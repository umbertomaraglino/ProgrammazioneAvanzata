import { Request, Response, NextFunction } from "express";
import { decodeJwt, getUserFromJwt } from "../Utils/jwtUtils";


//controlla se il codice jwt è giusto e ben formato
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const jwtBearerToken = req.headers.authorization;
    if (!jwtBearerToken) {
        return res.status(401).json({ message: "Token JWT mancante" });
    }
    try {
        const jwtDecode = decodeJwt(jwtBearerToken);

        if (jwtDecode && jwtDecode.email && jwtDecode.password) {
            next();
        } else {
            return res.status(400).json({ message: "Codice JWT sbagliato" });
        }
    } catch (error) {
        return res.status(400).json({ message: "Token JWT malformato o invalido" });
    }
};

//controlla se sei un admin
export const checkIsAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserFromJwt(req);
    if (user[0].dataValues.isadmin) {
        next();
    } else {
        return res.status(400).json({message: "Non sei un admin"});
    }
};

