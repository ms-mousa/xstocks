import { useState } from 'react';
import { Axios } from '../lib/axios';

interface IUseAuth {
  error: string | null;
  loginUser: (username: string, password: string) => any;
  forgotPassword: (email: string) => any;
}

export function useAuth(): IUseAuth {
  const [error, setError] = useState(null);
  const loginUser = (username: string, password: string) => {
    setError(null);
    return Axios.post('/auth/local', {
      identifier: username,
      password,
    })
      .then((res) => res.data)
      .catch((err) => {
        const errorData = err.response.data;
        setError(
          errorData.message
            ? errorData.message[0].messages[0].message
            : process.env.GLOBAL_ERROR_MESSAGE,
        );
      });
  };

  const forgotPassword = (email: string) => {
    setError(null);
    return Axios.post('/auth/forgot-password', {
      email,
    })
      .then((res) => res.data)
      .catch((err) => {
        const errorData = err.response.data;
        setError(
          errorData.message
            ? errorData.message[0].messages[0].message
            : process.env.GLOBAL_ERROR_MESSAGE,
        );
      });
  };

  return {
    loginUser,
    forgotPassword,
    error,
  };
}
