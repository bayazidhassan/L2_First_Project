import { Request, Response } from 'express';
import { StudentServices } from './student_service';
//import joiStudentValidationSchema from './student_validation_joi';
import zodStudentValidationSchema from './student_validation_zod';

const createStudent = async (req: Request, res: Response) => {
  try {
    //const { student } = req.body; //destructuring
    //const { student: studentData } = req.body; //destructuring+name alias
    const studentData = req.body.student;

    /*
    //data validation by using joi
    const { error, value } = joiStudentValidationSchema.validate(studentData, {
      convert: true,
    });
    //console.log(error);
    if (error) {
      res.status(400).json({
        success: false,
        message: 'Something went wrong.',
        //error: error, //show full message
        error: error.details[0].message,
      });
      return;
    }
    */

    //data validation by using zod
    const zodResult = await zodStudentValidationSchema.parseAsync(studentData);
    /*
    const zodResult =
      await zodStudentValidationSchema.safeParseAsync(studentData);
    if (!zodResult.success) {
      res.status(400).json({
        success: false,
        message: 'Something went wrong.',
        error: zodResult.error.message,
      });
      return;
    }
    */

    //call the service function to send this data
    //const result = await StudentServices.createStudentIntoDB(studentData);
    //const result = await StudentServices.createStudentIntoDB(value); //value of joi
    const result = await StudentServices.createStudentIntoDB(zodResult); //zod
    //const result = await StudentServices.createStudentIntoDB(zodResult.data); //data of zod

    //send response to client
    res.status(200).json({
      success: true,
      message: 'Student is created successfully.',
      data: result,
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      //error: err,
      error: err.message,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    //call the service function to send this data
    const result = await StudentServices.getAllStudentsFromDB();

    //send response to client
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully.',
      data: result,
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      //error: err,
      error: err.message,
    });
  }
};

const getAStudent = async (req: Request, res: Response) => {
  try {
    //const { studentId: id } = req.params; //destructuring+name alias
    const id = req.params.studentId;

    //call the service function to send this data
    const result = await StudentServices.getAStudentFromDB(id);

    //send response to client
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully.',
      data: result,
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      //error: err,
      error: err.message,
    });
  }
};

const deleteAStudent = async (req: Request, res: Response) => {
  try {
    //const { studentId: id } = req.params; //destructuring+name alias
    const id = req.params.studentId;

    //call the service function to send this data
    const result = await StudentServices.deleteAStudentFromDB(id);

    //send response to client
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully.',
      data: result,
    });
  } catch (err) {
    //console.log(err);
    res.status(500).json({
      success: false,
      message: 'Something went wrong.',
      error: err,
      //error: err.message,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getAStudent,
  deleteAStudent,
};
