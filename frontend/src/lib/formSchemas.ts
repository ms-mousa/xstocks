import * as Yup from 'yup';

const schemaFactory = (shape: { [key: string]: any }) => Yup.object().shape(shape);

export const loginSchema = schemaFactory({
  username: Yup.string().required('Please enter your username'),
  password: Yup.string().required('Please enter your password'),
});

export const passwordResetSchema = schemaFactory({
  email: Yup.string().required('Please enter your email'),
});

export const signUpSchema = schemaFactory({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password has to be longer than 8 characters'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Required'),
});
