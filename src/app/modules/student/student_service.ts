import { TStudent } from './student_interface';
import { Student } from './student_schema_model';

const createStudentIntoDB = async (studentData: TStudent) => {
  //const result = await Student.create(studentData); //built in static method

  /*
  //custom instance method
  const student = new Student(studentData); //create an instance of Student
  //student.isUserExists('studentData.id');
  if (await student.isUserExists(studentData.id)) {
    //throw new Error('User already exists!');
    throw new Error();
  }
  const result = await student.save(); //built in instance method
  */

  //custom static method
  if (await Student.isUserExists(studentData.id)) {
    //throw new Error();
    throw new Error(`An user already exists with this id: ${studentData.id}`); //send custom error message
  }
  const result = await Student.create(studentData); //built in static method

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  if (result.length === 0) {
    throw new Error('Student is not found');
  }
  return result;
};

const getAStudentFromDB = async (id: string) => {
  //const result = await StudentModel.findById(id);
  //const result = await Student.findOne({ id }); //es6
  //const result = await Student.findOne({ id: id });

  const result = await Student.aggregate([{ $match: { id: id } }]);
  console.log(result);
  //if (!result) {
  //for findOne
  if (result.length === 0) {
    //for aggregate
    throw new Error('Student is not found!');
  }
  return result;
};

const deleteAStudentFromDB = async (id: string) => {
  //const result = await Student.findOne({ id }, { isDeleted: true }); //es6
  const result = await Student.updateOne({ id: id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentFromDB,
  deleteAStudentFromDB,
};
