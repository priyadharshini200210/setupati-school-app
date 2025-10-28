import { Request, Response } from 'express';
import {
  addGrade,
  deleteGrade as deleteGradeApi,
  getAllGradeDetails as getAllGradeDetailsApi,
  searchGrade as searchGradeApi,
  updateGrade as updateGradeApi
} from '../../api/grade/grade.ts';
import { Grade } from '../../models/Grade.ts';
import logger from '../../utils/logger.ts';

export const createGrade = async (
  req: Request<{ grade: Grade }>,
  res: Response
) => {
  try {
    const data = req.body;
    const gradeId = await addGrade(data);
    res.status(201).send({ id: gradeId });
  } catch (error) {
    logger.error('Error creating grade', error);
    res.status(500).send({ message: 'Error creating grade', error });
  }
};
export const searchGrade = async (
  req: Request<{ grade_name: string }>,
  res: Response
) => {
  try {
    const grades = await searchGradeApi(req.params.grade_name);
    res.status(200).send(grades);
  } catch (error) {
    logger.error('Error searching grade', error);
    res.status(500).send({ message: 'Error searching grade', error });
  }
};
export const deleteGrade = async (
  req: Request<{ grade_name: string }>,
  res: Response
) => {
  try {
    const grade_name = req.params.grade_name;
    await deleteGradeApi(grade_name);
    res.status(204).send();
  } catch (error) {
    logger.error('Error deleting grade', error);
    res.status(500).send({ message: 'Error deleting grade', error });
  }
};
export const getAllGradeDetails = async (req: Request, res: Response) => {
  try {
    const grades = await getAllGradeDetailsApi();
    res.status(200).send(grades);
  } catch (error) {
    logger.error('Error fetching all grade details', error);
    res
      .status(500)
      .send({ message: 'Error fetching all grade details', error });
  }
};
export const updateGrade = async (
  req: Request<{ grade_name: string; gradeData: Partial<Grade> }>,
  res: Response
) => {
  try {
    const grade_name = req.params.grade_name;
    const gradeData = req.body;
    await updateGradeApi(grade_name, gradeData);
    res.status(204).send();
  } catch (error) {
    logger.error('Error updating grade', error);
    res.status(500).send({ message: 'Error updating grade', error });
  }
};
