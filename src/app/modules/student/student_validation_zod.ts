import * as z from 'zod/v4';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(30)
    .regex(
      /^[A-Z][a-z]*$/,
      'Name must start with a capital letter and contain only alphabets.',
    ),
  lastName: z
    .string()
    .trim()
    .max(30)
    .regex(
      /^[A-Z][a-z]*$/,
      'Name must start with a capital letter and contain only alphabets.',
    ),
});

const zodStudentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female']),
  address: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  email: z.email(),
  contactNo: z.string(),
  isActive: z.enum(['active', 'inactive']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default zodStudentValidationSchema;
