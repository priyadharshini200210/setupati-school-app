import { Request, Response } from 'express';
import {
  addStudent,
  getStudent,
  deleteStudent,
  searchStudent as searchStudentApi
} from '../api/student';
import { Student } from '../models/Student';
import logger from '../utils/logger.js';

export const createStudent = async (
  req: Request<{ Student: Student }>,
  res: Response
) => {
  try {
    const data = req.body.Student;
    const id = await addStudent(data);
    res.status(201).json({ id });
  } catch (error) {
    logger.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getStudentDetails = async (
  req: Request<{ student_rollno: string }>,
  res: Response
) => {
  try {
    const studentRollNo = req.params.student_rollno;
    const student = await getStudent(studentRollNo);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    logger.error('Error fetching student details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteStudentDetails = async (
  req: Request<{ student_rollno: string }>,
  res: Response
): Promise<Response | void> => {
  try {
    const studentRollNo = req.params.student_rollno;
    const deleted = await deleteStudent(studentRollNo);
    logger.info('deleted', deleted);
    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(204).json({});
  } catch (error) {
    logger.error('Error deleting student details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const searchStudent = async (
  req: Request<{ student_rollno: string }>,
  res: Response
) => {
  try {
    const studentRollNo = req.params.student_rollno;
    if (!studentRollNo) {
      return res.status(400).json({ error: 'Student roll number is required' });
    }
    const students = await searchStudentApi(studentRollNo);
    res.status(200).json(students);
  } catch (error) {
    logger.error('Error searching for students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
