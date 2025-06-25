import { Request, Response } from 'express';
import { StudentServices } from './student_service';

const createStudent = async (req: Request, res: Response) => {
  try {
    //const { student: studentData } = req.body; //destructuring+name alias
    const studentData = req.body.student;

    //call the service function to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);

    //send response to client
    res.status(200).json({
      success: true,
      message: 'Student is created successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    //call the service function to send this data
    const result = await StudentServices.getAllStudentsFromDB();

    //send response to client
    res.status(200).json({
      success: true,
      message: 'Students are retrieve successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAStudent = async (req: Request, res: Response) => {
  try {
    //const { studentId } = req.params //destructuring
    const studentId = req.params.id;

    //call the service function to send this data
    const result = await StudentServices.getAStudentFromDB(studentId);

    //send response to client
    res.status(200).json({
      success: true,
      message: 'Student is retrieve successfully.',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getAStudent,
};
