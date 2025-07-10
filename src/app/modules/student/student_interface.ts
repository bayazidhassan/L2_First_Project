// 1. Create an interface representing a document in MongoDB.

import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: 'male' | 'female';
  address: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  isActive: 'active' | 'inactive';
  isDeleted: boolean;
};

//for custom instance method
/*
//shown by PH video for custom instance method
export type studentModel = Model<
  TStudent,
  Record<string, never>,
  studentMethods
>;
*/
/*
export type studentMethods = {
  isUserExists(id: string): Promise<TStudent | null>;
};
*/

//for custom static method
export interface studentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}
