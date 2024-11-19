import { Request, Response } from "express";
import { createUserDb, findAllUsers, updateTokensDb } from '../Db/userQueries';


const PRIVATE_KEY = process.env.PRIVATE_KEY;
var jwt = require('jsonwebtoken');

//crea l'utente nella tabella users
export const createUser = async (req: Request, res: Response) => {
  try {
      await createUserDb(req);
      return res.status(201).json({message: 'Utente registrato con sucesso'}); 
  } catch (e) {
      return res.status(403).json({message: 'Registrazione fallita'});
  }
};

//restituisce la lista con tutti gli utenti
export const getUsers = async (req: Request,res: Response) => {
  try {
      const users: any = await findAllUsers();
      let message = JSON.parse(JSON.stringify({ users: users }));
      return res.status(200).json({data: message });

  } catch (error) {
      return res.status(403).json({message: 'Impossibile restituire la lista degli utenti'});
  }
};

//effettua il login restituendo il jwt da usare in tutte le chiamate successive
export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
      const payload = {
          email: email,
          password: password,
      };
      const jwtBearerToken = jwt.sign(payload, PRIVATE_KEY);
      let message = JSON.parse(JSON.stringify({ jwt: jwtBearerToken }));
      return res.status(200).json({ message: 'Login effettuto con successo', data: message });


  } catch (e) {
      return res.status(400).json({ message: 'Login non effettuato'});


  }
};

//imposta i token a 100 di un utente
export const updateTokens = async (req: Request, res: Response) => {
  try {
      await updateTokensDb(req.body.email,req.body.tokens);
      return res.status(200).json({ message: 'Token aggiornati con successo'});

  } catch (e) {
    return res.status(200).json({ message: 'Errore' });
  }
};
