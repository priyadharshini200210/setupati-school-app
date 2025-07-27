import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/student';
import path from 'path';
import { fileURLToPath } from 'url';
import './firebase';
import logger from '../app/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
