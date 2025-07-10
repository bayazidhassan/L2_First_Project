import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { studentRoutes } from './app/modules/student/student_route';
const app: Application = express();

//parsers
app.use(express.json());
//cors
app.use(cors());

//application routes
app.use('/api/v1/student', studentRoutes);

//if no matching route is found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

const controllerFunction = (req: Request, res: Response) => {
  res.send('Hello World!');
};
app.get('/', controllerFunction);

export default app;
