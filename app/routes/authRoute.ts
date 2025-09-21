import { Router, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  validateEmail
} from '../service/auth/auth.js';
import { User } from '../models/User.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin'] }),
  (req: Request<{ User: User }>, res: Response) => {
    createUser(req, res);
  }
);

authRouter.get(
  '/users/:uid',
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin', 'student', 'teacher'],
    allowSameUser: true
  }),
  (req: Request<{ uid: string }>, res: Response) => {
    getUserById(req, res);
  }
);

authRouter.post(
  '/validateEmail',
  (req: Request<{ email: string }>, res: Response) => {
    validateEmail(req, res);
  }
);

authRouter.delete(
  '/delete/:uid',
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin']
  }),
  (req: Request<{ uid: string }>, res: Response) => {
    deleteUser(req, res);
  }
);

export default authRouter;
