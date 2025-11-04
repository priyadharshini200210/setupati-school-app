import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/studentRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import './firebase.js';
import logger from './utils/logger.js';
import authRouters from './routes/authRoute.js';
import teacherRouter from './routes/teacherRoute.js';
import attendanceRouter from './routes/attendanceRoute.js';
import gradeRouter from './routes/gradeRoute.js';
import circularRouter from './routes/circularRoute.js';
import timeTableRouter from './routes/timetableRoute.js';
import parentRouter from './routes/parentRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.json());
app.use(cors({ origin: true }));

app.use('/students', studentRoutes);
app.use('/attendance', attendanceRouter);
app.use('/grades', gradeRouter);
app.use('/circulars', circularRouter);
app.use('/teachers', teacherRouter);
app.use('/timetables', timeTableRouter);
app.use('/parents', parentRouter);
app.use('/api/v1/auth', authRouters);

app.get('/alive', (req, res) => {
  res.status(200).send('OK Backend alive');
});

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
