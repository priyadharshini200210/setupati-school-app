import { Request, Response } from 'express';
import logger from '../../utils/logger.js';
import { getAllGradeDetails } from '../../api/grade/grade.js';
export const getAllGrades = async (
  req: Request,
  res: Response
) => {
  try {
    const grades = await getAllGradeDetails();
    console.log('Fetched all grades:', grades);
    res.status(200).json(grades);
  } catch (error) {
    logger.error('Error fetching all grades:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};