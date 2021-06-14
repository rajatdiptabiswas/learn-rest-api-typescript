import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import log from '../logger';
import config from '../config/config';

const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  log.info('Validating token...');

  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    log.error('Token unavailable');
    return response.status(401).send('Unauthorized');
  }

  jwt.verify(token, config.token.secret, (error, decoded) => {
    if (error) {
      log.error('Cannot verify token');
      return response.status(403).send(error.message);
    }

    response.locals.jwt = decoded;
    next();
  });
};

export default verifyJWT;
