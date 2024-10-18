import React from 'react'
import GlobalChat from './GlobalChat';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const SigninSignup = () => {
    const { isAuthenticated } = useKindeAuth();
    if (isAuthenticated) {
        return <GlobalChat />;
      }
  return (
      <div>
             <LoginL
      </div>
  )
}

export default SigninSignup