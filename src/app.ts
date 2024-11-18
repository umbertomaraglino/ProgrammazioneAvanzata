var express = require('express');
import { NextFunction, Request, Response } from "express";
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
import dotenv from 'dotenv';
import {createUser, getUsers, login, updateTokens } from './controllers/userController';
import { checkEmail, checkPassword, checkUserNotRegistered, checkUserRegistered, checkPasswordMatch, checkToken, checkCredits } from "./middlewares/userMiddleware";
import {checkJwt, checkIsAdmin} from "./middlewares/jwtMiddleware"
import { playGame, getHistory, getState, Move, updateStatus } from "./controllers/gameController";
import { checkDiff, checkGame, checknotinGame, checkMove, checkinGame } from "./middlewares/gameMiddleware";


dotenv.config();
const app = express();
const port = process.env.DB_PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        console.error('Errore di parsing JSON!');
        return res.status(400).send({ message: 'JSON malformato!' });
    }
    next(err);
});


app.get("/", (req: Request, res: Response) => {
  res.send("Effettua il login o la registrazione per usare l'applicazione");
});

app.post("/register", jsonParser, checkEmail, checkPassword, checkUserNotRegistered, (req: Request, res: Response) => {
  createUser(req, res);
});

app.get("/users",checkJwt, checkIsAdmin, (req: Request, res: Response) => {
  getUsers(req, res);
});

app.post("/login", jsonParser, checkEmail, checkPassword, checkUserRegistered, checkPasswordMatch, (req: Request, res: Response) => {
  login(req, res);
});

app.put('/refreshtoken', jsonParser, checkIsAdmin, checkEmail, checkUserRegistered, checkCredits, (req: Request, res: Response) => {
  updateTokens(req, res);
});


app.post("/play", jsonParser, checkJwt, checkToken, checkDiff,checknotinGame, (req: Request, res: Response) => {
  playGame(req, res);
});


app.get("/state", jsonParser, checkJwt, checkGame, (req: Request, res: Response) => {;
  getState(req,res);
});


app.get("/history", jsonParser, checkJwt, checkGame, (req: Request, res: Response) => {
  getHistory(req,res);
});


app.post("/move", jsonParser, checkJwt, checkGame,checkinGame, checkMove, checkToken,  (req: Request, res: Response) => {
  Move(req,res);
});

app.put('/quit', jsonParser, checkJwt, checkGame, checkinGame, (req: Request, res: Response) => {
  updateStatus(req, res);
});



//avvia il server
app.listen(port, () => {
  console.log(`Server in esecuzione su http://localhost:${port}`);
});