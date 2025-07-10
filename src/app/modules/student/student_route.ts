import express from 'express';
import { StudentControllers } from './student_controller';

const router = express.Router();

//call the controller function
router.post('/createStudent', StudentControllers.createStudent);
router.get('/getAllStudents', StudentControllers.getAllStudents);
router.get('/getAStudent/:studentId', StudentControllers.getAStudent);
router.delete('/deleteAStudent/:studentId', StudentControllers.deleteAStudent);

export const studentRoutes = router;
