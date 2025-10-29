import {
  createTeacher,
  searchTeacher,
  deleteTeacherDetails,
  getAllTeachers,
  updateTeacherDetails
} from '../service/teacher/teacher.js';
import { Router, Request, Response } from 'express';
import { Teacher } from '../models/Teacher.js';

const teacherRouter = Router();

teacherRouter.post(
  '/create',
  (req: Request<{ Teacher: Teacher }>, res: Response) => {
    createTeacher(req, res);
  }
);

teacherRouter.get(
  '/search/:teacher_id',
  (req: Request<{ teacher_id: string }>, res: Response) => {
    searchTeacher(req, res);
  }
);

teacherRouter.delete(
  '/delete/:teacher_id',
  (req: Request<{ teacher_id: string }>, res: Response) => {
    deleteTeacherDetails(req, res);
  }
);

teacherRouter.get('/all', (req: Request, res: Response) => {
  return getAllTeachers(req, res);
});

teacherRouter.put(
  '/update/:teacher_id',
  (
    req: Request<{ teacher_id: string; Teacher: Partial<Teacher> }>,
    res: Response
  ) => {
    console.log('In route');
    updateTeacherDetails(req, res);
  }
);

export default teacherRouter;
