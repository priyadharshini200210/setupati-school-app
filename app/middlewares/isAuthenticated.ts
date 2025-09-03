import { NextFunction, Request, Response } from 'express';
import { auth } from '../firebase.js';
import logger from '../utils/logger.js';

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ message: 'Unauthorized' });

  if (!authorization.startsWith('Bearer'))
    return res.status(401).send({ message: 'Unauthorized' });

  const split = authorization.split('Bearer ');
  if (split.length !== 2)
    return res.status(401).send({ message: 'Unauthorized' });

  const token = split[1];

  try {
    const decodedToken: auth.DecodedIdToken = await auth.verifyIdToken(token);
    logger.info('decodedToken', JSON.stringify(decodedToken));
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email
    };
    return next();
  } catch (err) {
    logger.error(`${err.code} -  ${err.message}`);
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
