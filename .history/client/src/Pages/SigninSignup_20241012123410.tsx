import React from 'react'
import GlobalChat from './GlobalChat';

const SigninSignup = () => {
    const { isAuthenticated } = useKindeAuth();
    if (isAuthenticated) {
        return <GlobalChat />;
      }
  return (
      <div>
             
      </div>
  )
}

export default SigninSignup