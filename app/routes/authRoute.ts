import { Router, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getUserById,
  validateEmail
} from '../service/auth/auth.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { isAuthorized } from '../middlewares/isAuthorized.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  isAuthenticated,
  isAuthorized({ hasRole: ['admin'] }),
  (req, res) => {
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
  (req, res) => {
    getUserById(req, res);
  }
);

authRouter.post('/validateEmail', (req, res) => {
  validateEmail(req, res);
});

authRouter.delete(
  '/delete/:uid',
  isAuthenticated,
  isAuthorized({
    hasRole: ['admin']
  }),
  (req, res) => {
    deleteUser(req, res);
  }
);

export default authRouter;
