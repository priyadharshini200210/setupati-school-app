import { Request, Response } from 'express';
import {
  addSubject,
  deleteSubject,
  getAllSubjectDetails,
  searchSubjectForGrade as searchSubjectApi,
  updateSubject
} from '../../api/subject/subject.js';
import { Subject } from '../../models/Subject.js';
// import type subject from '@setupati-school/setupati-types/models';
import logger from '../../utils/logger.js';
// type Subject = typeof subject;

export const createSubject = async (
  req: Request<{ Subject: Subject }>,
  res: Response
) => {
  try {
    const { body: data } = req ?? {};
    const id = await addSubject(data);
    res.status(201).json({ id });
  } catch (error) {
    logger.error('Error creating subject:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchSubject = async (
  req: Request<{ gradeName : string }>,
  res: Response
) => {
  try {
    const { gradeName } = req?.params || {};
    if (!gradeName) {
      res.status(400).json({ error: 'Grade name is required' });
    }
    const subjects = await searchSubjectApi(gradeName);
    res.status(200).json(subjects);
  } catch (error) {
    logger.error('Error searching for subjects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteSubjectDetails = async (
  req: Request<{ subject_name: string; grade_name: string }>,
  res: Response
): Promise<Response | void> => {
  try {
    const { subject_name: subjectName, grade_name: gradeName } = req?.params || {};
    if (!subjectName || !gradeName) {
      res.status(400).json({ error: 'Subject name and grade name are required' });
      return;
    }
    const deleted = await deleteSubject(subjectName, gradeName);
    if (!deleted) {
      res.status(404).json({ error: 'Subject not found' });
    }
    res.status(204).json({});
  } catch (error) {
    logger.error('Error deleting subject details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await getAllSubjectDetails();
    res.status(200).json(subjects);
  } catch (error) {
    logger.error('Error fetching all subjects:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateSubjectDetails = async (
  req: Request<{ subject_name: string; Subject: Partial<Subject> }>,
  res: Response
) => {
  try {
    const { subject_name: subjectName } = req?.params || {};
    const data = req?.body;
    if (!subjectName) {
      res.status(400).json({ error: 'Subject name is required' });
    }
    const updated = await updateSubject(subjectName, data);
    if (!updated) {
      res.status(404).json({ error: 'Subject not found' });
    }
    res.status(204).json({updated});
  } catch (error) {
    logger.error('Error updating subject details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
