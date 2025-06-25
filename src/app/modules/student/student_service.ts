import { Student } from './student_interface';
import { StudentModel } from './student_schema_model';

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getAStudentFromDB = async (studentId: string) => {
  //const result = await StudentModel.findById(studentId)
  const result = await StudentModel.findOne({ studentId });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentFromDB,
};
