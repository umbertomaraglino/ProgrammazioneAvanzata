import { Request, Response } from "express";
import { createGameDb } from '../Db/gameQueries';
import { DraughtsPlayer, DraughtsStatus } from 'rapid-draughts';
import {
  EnglishDraughts as Draughts,
  EnglishDraughtsComputerFactory as ComputerFactory,
} from 'rapid-draughts/english';
import { findHistory, findState, findGamesfromUser, updateDb, updateStatusDb} from "../Db/gameQueries"
import { minusTokens, updatePointsDb} from "../Db/userQueries"
import { playerMove } from "../Utils/gameUtils";
import {getUserFromJwt} from "../Utils/jwtUtils"


//Crea la partita e salva nel db
export const playGame = async (req: Request, res: Response) => {
    const diff = req.body.difficulty;
    const draughts = Draughts.setup();
    const user = await getUserFromJwt(req);
    const result = await createGameDb(req, user[0].dataValues.user_id, draughts, diff);
    if (result) {
      res.status(200).json({ message: "Gioco creato con successo" });
    } else {
      res.status(500).json({ message: "Errore durante la creazione del gioco" });
    }
    await minusTokens(user[0].dataValues.email, 0.25);
  };

//stampa lo storico di una partita 
export const getHistory = async (req: Request,res: Response) => {
  const user = await getUserFromJwt(req);
  const storico = await findHistory(user[0].dataValues.user_id);
  const history = JSON.parse(storico)
  if(history){
    return res.status(200).json(history.history.moves);
  }
  else {
    res.status(500).json({ message: "impossibile avere lo storico" });
  }
};

//restituisce lo stato di una partita
export const getState = async (req: Request,res: Response) => {
  const user = await getUserFromJwt(req);
  const stato = await findState(user[0].dataValues.user_id);
  if(stato){
    return res.status(200).json(stato);
  }
  else {
    res.status(500).json({ message: "impossibile avere lo stato" });
  }
};
 
/*
Recupera la partita dal jwt e se la mossa inserita è valida allora esegue la mossa e aggiorna il db con la nuova history
e scala i token. Se la mossa non è valida restitusice la lista delle mosse valide
*/
export const Move = async (req: Request, res: Response) => {
  const move = req.body.move;
  const user = await getUserFromJwt(req);
  const user_id= user[0].dataValues.user_id;
  const game = await findGamesfromUser(user_id);
  const history = JSON.parse(game.dataValues.storico);
  const draughts =Draughts.setup(history.data,history.history);
  const mosseDispo = Object.keys(draughts.moves).length;
  if (move >= 0 && Number.isInteger(move) && move < mosseDispo){
    await playerMove(req,res,move,draughts, game.dataValues.difficulty, game.dataValues.game_id, user_id);
    await updateDb(game.dataValues.game_id,draughts)
    await minusTokens(user[0].dataValues.email, 0.0125);
    return res.status(200).json({message: "mossa effettuata"})
  }
  else {
    const movesList = draughts.moves.map((m: any, index: number) => ({
      numMossa: index,
      origin: m.origin,
      destination: m.destination,
    }));

    return res.status(500).json({
      message: "Non è stato possibile fare la mossa, scegliere tra queste: ",
      moves: movesList,
    });
  }
};

//aggiorna lo stato della partita in interrupted
export const updateStatus = async (req: Request, res: Response) => {
  const user = await getUserFromJwt(req);
  const user_id= user[0].dataValues.user_id
  const game = await findGamesfromUser(user_id);
  try{
    await updateStatusDb(game.dataValues.game_id, "interrupted");
    await updatePointsDb(user_id,-0.25);
    return res.status(200).json({message: "partita abbandonata"})
  }
  catch{
    return res.status(500).json({message: "non è stato possibile interrompere la partita"})
  }
  }



