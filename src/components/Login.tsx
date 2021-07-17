import React from 'react';
import { useAuth } from '@hooks/use-auth';

interface LoginProps {}

export const Login = ({}: LoginProps) => {
  const auth = useAuth();

  return (
    <>
      <button
        onClick={() => auth.signin()}
        type="button"
        className="bg-green-400 hover:bg-green-500 rounded p-2"
      >
        Sign in with Google
      </button>
    </>
  );
};

export default Login;
