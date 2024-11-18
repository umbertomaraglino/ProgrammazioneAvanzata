import { UserModel } from '../models/userModels';
import { Request } from "express";
import sequelize from "sequelize";


//crea l'utente nel db
export async function createUserDb(req: Request): Promise<any> {
    return await UserModel.create({
        email: req.body.email,
        password: req.body.password,
        tokens: 100.0,
        points: 0,
        isadmin: false
    });

}

//trova tutti gli utenti
export async function findAllUsers(): Promise<any> {

    return await UserModel.findAll();

};

//trova un utente dando l'email
export async function findUser(email: string): Promise<any> {

    return await UserModel.findAll({
        where: {
            email: email,
        }
    });

};

//controlla che la password colegata alla mail sia giusta
export async function checkPassword(email: string, password: string): Promise<any> {

    return await UserModel.findAll({
        where: {
            email: email,
            password: password
        }
    });

};

//aggiorna i token di un utente per mail a 100
export async function updateTokensDb(email: string, tokens: number): Promise<any> {
    return await UserModel.update({ tokens: tokens }, {
        where: {
            email: email
        }
    });
};

//toglie token all'utente di quanto specificato
export async function minusTokens(email: string, tokens: number): Promise<any> {
    return await UserModel.update(
        { tokens: sequelize.literal(`tokens - ${tokens}`) },
        { where: { email: email } }
    );
};

export async function updatePointsDb(user_id: number, points: number): Promise<any> {
    return await UserModel.update(
        { points: sequelize.literal(`points + ${points}`) }, 
        { where: { user_id: user_id } }
    );
};

