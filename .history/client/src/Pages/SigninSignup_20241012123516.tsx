import React from 'react'
import GlobalChat from './GlobalChat';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const SigninSignup = () => {
    const { isAuthenticated ,register , login } = useKindeAuth();
    if (isAuthenticated) {
        return <GlobalChat />;
      }
  return (
      <div>
          <button onClick={register} type="button">Sign up</button>
          <button onClick={login} type="button">Sign In</button>
      </div>
  )
}

export default SigninSignup