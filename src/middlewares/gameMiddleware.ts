import { Request, Response, NextFunction } from "express";
import {findGamesfromUser} from "../Db/gameQueries"
import { getUserFromJwt } from "../Utils/jwtUtils";

//controlla che la difficolta sia un numero intero tra 0 e 7
export const checkDiff = (req: Request, res: Response, next: NextFunction) => {
    const diff = req.body.difficulty;
    if (diff === undefined || diff === null) {
        return res.status(400).json({ message: "Inserire il campo 'difficulty'" });
    }
    if (Number.isInteger(diff) && diff > 0) {
        next();
    } else {
        return res.status(400).json({ message: "La difficoltà deve essere un numero intero maggiore di 0" });
    }
};


//contolla che esista la partita partendo dal codice jwt
export const checkGame = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserFromJwt(req);
    const user_id= user[0].dataValues.user_id
    const game = await findGamesfromUser(user_id);
    if (game) {
        next();
    } else {
        return res.status(400).json({message: "Partita non trovata"});
    }
};

//controlla se l'utente non è in partita
export const checknotinGame = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserFromJwt(req)
    const user_id= user[0].dataValues.user_id
    const game = await findGamesfromUser(user_id);
    if (!game || game.dataValues.stato != "playing"){
        next()
    }
    else {
        return res.status(500).json({message : "partita gia in corso"})
    }
};

//controlla che la mossa sia inserita e sia un numero intero positivo, puo essere anche stringa perchè lo converte
export const checkMove = (req: Request, res: Response, next: NextFunction) => {
    const move = req.body.move;
    if (move === undefined || move === null) {
        return res.status(400).json({ message: "Inserire il campo move" });
    }
    const moveAsNumber = Number(move);
    if (moveAsNumber >= 0) {
        next();
    } else {
        return res.status(400).json({ message: "Il campo move deve essere un numero intero positivo" });
    }
};

//controlla se l'utente è in partita
export const checkinGame = async (req: Request, res: Response, next: NextFunction) => {
    const user = await getUserFromJwt(req)
    const user_id= user[0].dataValues.user_id
    const game = await findGamesfromUser(user_id);
    if (game.dataValues.stato == "playing"){
        next()
    }
    else {
        return res.status(500).json({message : "La partita è gia terminata"})
    }
};