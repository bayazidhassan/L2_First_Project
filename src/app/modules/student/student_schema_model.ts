import { model, Schema } from 'mongoose';
import { Student, userName } from './student_interface';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<userName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameSchema,
  gender: ['male', 'female'],
  address: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  isActive: ['active', 'inactive'],
});

// 3. Create a Model.
export const StudentModel = model<Student>('student', studentSchema);
//model receive a name(database collection name, it will be plural automatically) and a schema as a parameter
