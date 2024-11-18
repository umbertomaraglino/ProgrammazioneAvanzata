import { Request, Response, NextFunction } from "express";
import { findUser } from "../Db/userQueries";
import { getUserFromJwt } from "../Utils/jwtUtils";
import { findGamesfromUser } from "../Db/gameQueries";

const isEmailValid = (email: string): boolean => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);

//controlla se l'email è nel formato valido
export const checkEmail = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email mancante'});
    }
    if (isEmailValid(email)) {
        next();
    } else {
        return res.status(400).json({ message: 'Email non valida'});
    }
};

//controlla che la password sia inserita
export const checkPassword = (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;
    if (!password) {
        return res.status(400).json({ message: "Inserire password" });
    }
    if (typeof password !== "string") {
        return res.status(400).json({ message: "La password deve essere una stringa" });
    }
    next();
};

//controlla che l'utente non esista nel database
export const checkUserNotRegistered = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = await findUser(req.body.email);
    if (user.length === 0) {
        next();
    } else {
        return res.status(400).json({message: "Utente già registrato"});
    }
};

//controlla che l'utente esista nel database
export const checkUserRegistered = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = await findUser(req.body.email);
    if (user.length !== 0) {
        next();
    } else {
        return res.status(400).json({message: "Utente non registrato"});
    }
};

//controlla che la password sia giusta
export const checkPasswordMatch = async (req: Request, res: Response, next: NextFunction) => {
    const user: any = await findUser(req.body.email);
    if (user[0].password == req.body.password) {
        next();
    } 
    else {
        return res.status(400).json({message: "Password sbagliata"})
    }
    
};


//controllo se i token sono sufficenti per creare la partita o fare la mossa
export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserFromJwt(req);
    const tokens = user[0].dataValues.tokens;
    if (req.path === '/play') {
        if (tokens >= 0.25) {
            next();
        } else {
            return res.status(400).json({ message: "Credito non sufficiente per giocare." });
        }
    } else if (req.path === '/move') {
        const game = await findGamesfromUser(user[0].dataValues.user_id);
        const status = game.dataValues.stato;
        if (tokens >= 0.0125) {
            next();
        }
        else if(status == "playing"){
            next()
        }
        else {
            return res.status(401).json({ message: "Credito non sufficiente per la mossa." });
        }
    }
}

//controlla se i token inseriti nel body della richiesta siano positivi
export const checkCredits = async (req: Request, res: Response, next: NextFunction) => {
    const tokens = req.body.tokens;
    if (tokens > 0 && typeof tokens === 'number'){
        next()
    }
    else if(tokens === undefined || tokens === null){
        return res.status(400).json({message: "Inserire numero token"})
    }
    else return res.status(400).json({message: "I token devono essere un numero positivo"});
}





