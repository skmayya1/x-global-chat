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
        <button onClick={() => register({
              authUrlParams: {
                  connectionId: 'conn_01927f6172ecca222ba18b79864f6ca6'
              }
          })} type="button">Sign up</button>
          <button onClick={() => {
              
          }} type="button">Sign In</button>
      </div>
  )
}

export default SigninSignup