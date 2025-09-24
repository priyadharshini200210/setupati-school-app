import { Router, Request, Response } from "express";
import { getAllGrades } from "../service/grade/grades";

const gradeRouter = Router();

gradeRouter.get('/all', (req: Request, res: Response) => {
  console.log('Fetching all grades');
  return getAllGrades(req, res);
});

export default gradeRouter;
