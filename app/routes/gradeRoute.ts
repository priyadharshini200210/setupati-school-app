import {
  createGrade,
  searchGrade,
  deleteGrade,
  getAllGradeDetails,
  updateGrade
} from '../service/grade/grade.ts';
import { Router, Request, Response } from 'express';
import { Grade } from '../models/Grade.ts';
import logger from 'app/utils/logger.ts';

const gradeRouter = Router();
gradeRouter.post('/create', (req: Request<{ grade: Grade }>, res: Response) => {
  logger.info('Received request to create grade');
  createGrade(req, res);
});
gradeRouter.get(
  '/search/:grade_name',
  (req: Request<{ grade_name: string }>, res: Response) => {
    logger.info('Received request to search grade:', req.params.grade_name);
    searchGrade(req, res);
  }
);
gradeRouter.delete(
  '/delete/:grade_name',
  (req: Request<{ grade_name: string }>, res: Response) => {
    logger.info('Received request to delete grade:', req.params.grade_name);
    deleteGrade(req, res);
  }
);
gradeRouter.get('/all', (req: Request, res: Response) => {
  logger.info('Received request to get all grades');
  return getAllGradeDetails(req, res);
});
gradeRouter.put(
  '/update/:grade_name',
  (
    req: Request<{ grade_name: string; gradeData: Partial<Grade> }>,
    res: Response
  ) => {
    logger.info('Received request to update grade:', req.params.grade_name);
    return updateGrade(req, res);
  }
);

export default gradeRouter;
