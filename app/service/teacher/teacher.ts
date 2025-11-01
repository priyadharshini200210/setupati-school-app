import { Request, Response } from 'express';
import {
  addTeacher,
  deleteTeacher,
  getAllTeacherDetails,
  searchTeacher as searchTeacherApi,
  updateTeacher
} from '../../api/teacher/teacher.js';
import { Teacher } from '../../models/Teacher.js';
import logger from '../../utils/logger.js';

export const createTeacher = async (
  req: Request<{ Teacher: Teacher }>,
  res: Response
) => {
  try {
    const { body: data } = req ?? {};
    const id = await addTeacher(data);
    res.status(201).json({ id });
  } catch (error) {
    logger.error('Error creating teacher:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchTeacher = async (
  req: Request<{ teacher_id: string }>,
  res: Response
) => {
  try {
    const { teacher_id: teacherId } = req.params;
    if (!teacherId) {
      res.status(400).json({ error: 'Teacher ID is required' });
    }
    const teachers = await searchTeacherApi(teacherId);
    res.status(200).json(teachers);
  } catch (error) {
    logger.error('Error searching for teachers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTeacherDetails = async (
  req: Request<{ teacher_id: string }>,
  res: Response
): Promise<Response | void> => {
  try {
    const { teacher_id: teacherId } = req.params;
    if (!teacherId) {
      res.status(400).json({ error: 'Teacher ID is required' });
    }
    const deleted = await deleteTeacher(teacherId);
    logger.info('deleted teacher data', deleted);
    if (!deleted) {
      res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(204).json({});
  } catch (error) {
    logger.error('Error deleting teacher details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllTeachers = async (req: Request, res: Response) => {
  try {
    const teachers = await getAllTeacherDetails();
    res.status(200).json(teachers);
  } catch (error) {
    logger.error('Error fetching all teachers:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTeacherDetails = async (
  req: Request<{ teacher_id: string; Teacher: Partial<Teacher> }>,
  res: Response
) => {
  try {
    const { teacher_id: teacherId } = req.params;
    if (!teacherId) {
      res.status(400).json({ error: 'Teacher ID is required' });
    }
    const data = req?.body;
    const updated = await updateTeacher(teacherId, data);
    if (!updated) {
      res.status(404).json({ error: 'Teacher not found' });
    }
    res.status(204).json({});
  } catch (error) {
    logger.error('Error updating teacher details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
