import { Request, Response } from 'express';
import {
  addUser,
  deleteUser as deleteUserApi,
  getUserById as getUserByIdApi,
  validateEmail as validateEmailApi
} from '../../api/auth/auth.js';
import { User } from '../../models/User.js';
import logger from '../../utils/logger.js';

export const createUser = async (
  req: Request<{ User: User }>,
  res: Response
) => {
  try {
    const data = req?.body;
    const id = await addUser(data);
    res.status(201).json({ id, message: 'User created successfully' });
  } catch (err) {
    logger.error('Error in creating account: ', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserById = async (
  req: Request<{ uid: string }>,
  res: Response
) => {
  try {
    const uid = req.params?.uid;
    const user: User = await getUserByIdApi(uid);
    res.status(200).json({ user: user });
  } catch (err) {
    logger.error('Error in fetching user: ', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const validateEmail = async (
  req: Request<{ email: string }>,
  res: Response
) => {
  try {
    const email = req.body?.email;
    const isValid = await validateEmailApi(email);
    res.status(200).json({ isValid: isValid });
  } catch (err) {
    logger.error('Error in validating email: ', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (
  req: Request<{ uid: string }>,
  res: Response
) => {
  try {
    const uid = req.params?.uid;
    await deleteUserApi(uid);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    logger.error('Error in deleting user: ', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
