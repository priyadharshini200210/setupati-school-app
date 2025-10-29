import {
  createStudent,
  searchStudent,
  deleteStudentDetails
} from '../service/student/student.js';
import { Router, Request, Response } from 'express';
import { Student } from '../models/Student.js';

const studentRouter = Router();

studentRouter.post(
  '/create',
  (req: Request<{ Student: Student }>, res: Response) => {
    createStudent(req, res);
  }
);

studentRouter.get(
  '/search/:student_rollno',
  (req: Request<{ student_rollno: string }>, res: Response) => {
    searchStudent(req, res);
  }
);

studentRouter.delete(
  '/delete/:student_rollno',
  (req: Request<{ student_rollno: string }>, res: Response) => {
    deleteStudentDetails(req, res);
  }
);

export default studentRouter;
