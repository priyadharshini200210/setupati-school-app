import { NextFunction, Request, Response } from 'express';

export function isAuthorized(opts: {
  hasRole: Array<'admin' | 'student' | 'teacher'>;
  allowSameUser?: boolean;
}) {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    const { role, uid } = res.locals;
    const id = req.params.uid;

    if (opts.allowSameUser && id && uid === id)
      if (opts.hasRole.includes(role)) return next();

    if (!role)
      return res.status(403).send({ message: 'Forbidden - No role found' });

    return res.status(403).send({ message: 'Forbidden - Access' });
  };
}
