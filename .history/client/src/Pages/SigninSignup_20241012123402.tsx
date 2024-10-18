import React from 'react'
import GlobalChat from './GlobalChat';

const SigninSignup = () => {
    if (isAuthenticated) {
        return <GlobalChat />;
      }
  return (
      <div>
             
      </div>
  )
}

export default SigninSignup