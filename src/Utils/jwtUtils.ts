import { Request } from 'express';
import { findUser } from '../Db/userQueries';
var jwt = require('jsonwebtoken');


export function decodeJwt(auth: any) {
    const token = auth.split(" ")[1]
    return jwt.verify(token, process.env.PRIVATE_KEY);
}




//ritorna lo user dal codice jwt
export function getUserFromJwt (req: Request) {
    const jwtBearerToken = req.headers.authorization;
    const jwtDecode = jwtBearerToken != null ? decodeJwt(jwtBearerToken) : null;
    const user = findUser(jwtDecode.email);
    return user;
  };

