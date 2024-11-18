import { IntegerDataType } from 'sequelize';
import { gameModel } from '../models/gameModel';
import { Request } from "express";


//crea una partita nella tabella game
export async function createGameDb(req: Request, user: IntegerDataType, draughts: any, diff: number ): Promise<any> {
    const stato: string = draughts.status;
    const newGameState = {
        data : draughts.engine.data,
        history: draughts.history
    }
    const storico = JSON.stringify(newGameState);
    return await gameModel.create({
        user_id: user,
        stato: stato,
        storico: storico,
        difficulty: diff
    })
};


//restituisce lo storico di una partita
export async function findHistory(userID: number): Promise<any> {
    const game = await gameModel.findAll({
        where: {
            user_id: userID, 
        },
        attributes: ['storico'],  
    });
    return game[0].dataValues.storico
};


//restituisce lo stato della partita
export async function findState(userID: number): Promise<any> {
    const partita = await gameModel.findOne({
        where: {
            user_id: userID, 
        },
        attributes: ['stato'],
        order: [['game_id', 'DESC']], 
        limit: 1 
    });
    return partita.dataValues.stato;
};

//restituisce la partita
export async function findGame(game_id: number): Promise<any> {

    return await gameModel.findAll({
        where: {
            game_id: game_id,
        }
    });
};

//restitusice l'ultima partita dell'utente 
export async function findGamesfromUser(user_id: number): Promise<any> {
    return await gameModel.findOne({
        where: { user_id: user_id },       
        order: [['game_id', 'DESC']],       
        limit: 1                            
    });
};


//aggiorna nella tabella game la colonna storico
export async function updateDb(game_id: number, draughts: any): Promise<any> {
    const newGameState = {
        data : draughts.engine.data,
        history: draughts.history
    }
    const storico = JSON.stringify(newGameState);
    return await gameModel.update({ storico: storico }, {
        where: {
            game_id: game_id
        }
    });
};


//aggiorna nella tabella game la colonna stato
export async function updateStatusDb(game_id: number, stato: string): Promise<any> {
    return await gameModel.update({ stato: stato }, {
        where: {
            game_id: game_id
        }
    });
};
