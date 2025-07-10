import { model, Schema } from 'mongoose';
//import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';
import {
  //studentMethods,
  studentModel,
  //studentModel, //shown by PH video for custom instance method
  TStudent,
  TUserName,
} from './student_interface';

// 2. Create a Schema corresponding to the document interface.
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    //trim: true, //Mongoose mutates the value before saving to MongoDB. It automatically strips leading/trailing whitespace from the string.
    /*
    //it is validated by validator library
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid name type.',
    },
    */
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    //trim: true, //Mongoose mutates the value before saving to MongoDB. It automatically strips leading/trailing whitespace from the string.
    /*
    //it is validated by the validator library
    validate: {
      validator: (value: string) => validator.isAlphanumeric(value),
      message: '{VALUE} is not valid name type.',
    },
    */
  },
});

//const studentSchema = new Schema<TStudent, studentModel, studentMethods>({ //shown by PH video for custom instance method
//const studentSchema = new Schema<TStudent, Model<TStudent>, studentMethods>({ //I have learnt it from mongoose official website for create a custom instance method
const studentSchema = new Schema<TStudent, studentModel>(
  {
    //I have learnt it from mongoose official website for create a custom static method
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true, //it will automatically create an index for id in mongodb
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      //maxlength: [20, 'Password can not be more than 20 characters'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
      required: [true, 'Blood group is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true, //it will automatically create an index for email in mongodb
      //trim: true, //Mongoose mutates the value before saving to MongoDB. It automatically strips leading/trailing whitespace from the string.
      /*
    //it is validated by the validator library
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email type.',
    },
    */
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'inactive'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  //return this.name.firstName + ' ' + this.name.lastName;
  return `${this.name.firstName} ${this.name.lastName}`;
});

//document middleware/hook
studentSchema.pre('save', async function (next) {
  //here 'this' refers the current document
  //console.log(this, 'pre hook: we will save this data');

  //hashing password
  /*
  const student = this as TStudent;
  student.password = await bcrypt.hash(
    student.password,
    Number(config.salt_rounds),
  );
  */
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));

  next();
});

//document middleware/hook
studentSchema.post('save', function (doc, next) {
  //here 'this' or 'doc' refers the after saved document
  //console.log(this, 'post hook: we have already saved this data');

  //after saving the document into mongodb, for security purpose we will replace the password field with an empty string. So that user can't see the hash password.
  doc.password = '';

  next();
});

//Query middleware/hook
studentSchema.pre('find', function (next) {
  //here 'this' refers the current query
  //console.log(this);

  //chaining with the current query of getAllStudentsFromDB, at first filter then find
  this.where({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('findOne', function (next) {
  //here 'this' refers the current query
  //console.log(this);

  //chaining with the current query of getAStudentFromDB, at first filter then find
  this.where({ isDeleted: { $ne: true } });

  next();
});
studentSchema.pre('aggregate', function (next) {
  //here 'this' refers the current query
  //console.log(this);

  //chaining with the current query of getAStudentFromDB, at first filter then find
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });

  next();
});

//for custom instance method
/*
//shown by PH video for custom instance method
studentSchema.methods.isUserExists = async function (id: string) {
  //const existingUser = await Student.findOne({ id }); //es6
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};
*/

/*
//I have learnt it from mongoose official website for create a custom instance method
studentSchema.method('isUserExists', async function isUserExists(id: string) {
  //const existingUser = await Student.findOne({ id }); //es6
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
});
*/

//I have learnt it from mongoose official website for create a custom static method
studentSchema.static('isUserExists', async function isUserExists(id: string) {
  //const existingUser = await Student.findOne({ id }); //es6
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
});

// 3. Create a Model.
//export const Student = model<TStudent>('student', studentSchema);
//export const Student = model<TStudent, studentModel>('student', studentSchema); //shown by PH video for custom instance method
//export const Student = model('student', studentSchema); //I have learnt it from mongoose official website for create a custom instance method
export const Student = model<TStudent, studentModel>('student', studentSchema); //I have learnt it from mongoose official website for create a custom static method
//model receive a name(database collection name, it will be plural automatically) and a schema as a parameter
