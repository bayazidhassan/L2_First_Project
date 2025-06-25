// 1. Create an interface representing a document in MongoDB.

export type userName = {
  firstName: string;
  lastName: string;
};

export type Student = {
  id: string;
  name: userName;
  gender: 'male' | 'female';
  address: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  isActive: 'active' | 'inactive';
};
