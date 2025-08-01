import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/student.js';
import path from 'path';
import { fileURLToPath } from 'url';
import './firebase.js';
import logger from './utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);

app.get('/alive', (req, res) => {
  res.status(200).send('OK Backend alive');
});

app.listen(PORT, () => {
  logger.info(`Server running at http://localhost:${PORT}`);
});
