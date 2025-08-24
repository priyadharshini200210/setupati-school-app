import {
  createStudent,
  searchStudent,
  deleteStudentDetails,
  getAllStudents
} from '../service/student.js';
import { Router, Request, Response } from 'express';
import { Student } from '../models/Student.js';

const router = Router();

router.post('/create', (req: Request<{ Student: Student }>, res: Response) => {
  createStudent(req, res);
});

router.get(
  '/search/:student_rollno',
  (req: Request<{ student_rollno: string }>, res: Response) => {
    searchStudent(req, res);
  }
);

router.delete(
  '/delete/:student_rollno',
  (req: Request<{ student_rollno: string }>, res: Response) => {
    deleteStudentDetails(req, res);
  }
);

router.get('/all', (req: Request, res: Response) => {
  console.log('Fetching all students');
  return getAllStudents(req, res);
});

export default router;
