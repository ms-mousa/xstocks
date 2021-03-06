import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string().required('Please enter your username'),
  password: Yup.string().required('Please enter your password'),
});

export const passwordResetSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your email'),
});
