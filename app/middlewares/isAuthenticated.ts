import { NextFunction, Request, Response } from 'express';
import { auth } from '../firebase.js';
import logger from '../utils/logger.js';

type DecodedToken = { uid: string; role?: string; email?: string } & Record<
  string,
  unknown
>;

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const authorization = req.headers?.authorization;

  if (!authorization || !authorization.startsWith('Bearer '))
    return res.status(401).send({ message: 'Unauthorized' });

  const token = authorization.split('Bearer ')[1];

  try {
    const decodedToken = (await auth!.verifyIdToken(token)) as DecodedToken;
    logger.info('decodedToken', JSON.stringify(decodedToken));
    res.locals = {
      ...res.locals,
      uid: decodedToken.uid,
      role: decodedToken.role,
      email: decodedToken.email
    };
    return next();
  } catch (err: unknown) {
    const e = err as { code?: string; message?: string };
    logger.error(`${e?.code ?? 'ERR'} - ${e?.message ?? String(err)}`);
    return res.status(401).send({ message: 'Unauthorized' });
  }
}
