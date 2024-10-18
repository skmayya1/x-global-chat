import GlobalChat from "./Pages/GlobalChat"
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import SigninSignup from "./Pages/SigninSignup";

const App = () => {
  const { isAuthenticated } = useKindeAuth();
 if()
  return (
    <div className='h-screen w-full bg-black'> 
     <GlobalChat />
    </div>
  )
}

export default App