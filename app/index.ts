import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/student';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
