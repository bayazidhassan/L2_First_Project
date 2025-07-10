import Joi from 'Joi';

//creating a schema validation using joi

/*
Joi validates and returns the trimmed string in value, but it does NOT mutate
the original input (like req.body) directly.
You must explicitly use the trimmed version(value) returned by Joi.
{convert: true}
*/
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim() //remove whitespace from start and end
    .max(30)
    .required()
    .pattern(
      /^[A-Z][a-z]*$/,
      'Name must start with a capital letter and contain only alphabets.',
    ),
  lastName: Joi.string()
    .trim() //remove whitespace from start and end
    .max(30)
    .required()
    .pattern(
      /^[A-Z][a-z]*$/,
      'Name must start with a capital letter and contain only alphabets.',
    ),
});

// Student Schema
const joiStudentValidationSchema = Joi.object({
  id: Joi.string().required(),
  password: Joi.string().max(20).required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required(),
  address: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .required(),
  email: Joi.string().trim().email().required(),
  contactNo: Joi.string().required(),
  isActive: Joi.string().valid('active', 'inactive').default('active'),
  isDeleted: Joi.boolean().default(false),
});

export default joiStudentValidationSchema;
