import { Request, Response } from 'express';

export function isAuthorized(opts: {
  hasRole: Array<'admin' | 'student' | 'teacher'>;
  allowSameUser?: boolean;
}) {
  return (req: Request, res: Response, next: Function) => {
    const { role, email, uid } = res.locals;
    const { id } = req.params;

    if (opts.allowSameUser && id && uid === id) return next();

    if (!role)
      return res.status(403).send({ message: 'Forbidden - No role found' });

    if (opts.hasRole.includes(role)) return next();

    return res.status(403).send({ message: 'Forbidden - No role found' });
  };
}
