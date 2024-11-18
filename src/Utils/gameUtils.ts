
import { Request, Response } from "express";
import { DraughtsPlayer, DraughtsStatus } from 'rapid-draughts';
import {
  EnglishDraughts as Draughts,
  EnglishDraughtsComputerFactory as ComputerFactory,
} from 'rapid-draughts/english';
import { updateStatusDb } from "../Db/gameQueries";
import { updatePointsDb } from "../Db/userQueries";


//inizia la logica di gioco
export async function playerMove(req: Request, res: Response, mossa: number, draughts: any, diff: number, game_id: number, user_id:number ): Promise<any> {
  if (draughts.player === DraughtsPlayer.LIGHT) {
    await humanTurn(req,res,mossa, draughts);
    await computerTurn(draughts, diff);
  }
  else {
    await computerTurn(draughts, diff);
    await humanTurn(req,res,mossa, draughts);
  }
  await updateStatusDb(game_id,draughts.status);
  if(draughts.status == "light_won"){
    await updatePointsDb(user_id,1);
  }
};

  
//gestisce le mosse del giocatore
  async function humanTurn(req: Request, res: Response, mossa: number, draughts: any): Promise<any> {
    if (draughts.moves[mossa]) {
      draughts.move(draughts.moves[mossa]);
    } else {
      return res.status(400).json({message: "mossa non valida"})
    }
  }
  
//gestisce le mosse del computer
  async function computerTurn(draughts:any, diff: number): Promise<void> {
    const AI = ComputerFactory.alphaBeta({maxDepth: diff}); //piu si mette un valore alto e più è difficile da 1 a 7
    const move = await AI(draughts);
    if (move) draughts.move(move);
  }