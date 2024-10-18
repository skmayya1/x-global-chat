import GlobalChat from "./Pages/GlobalChat"
import { createBrowserRouter } from 'react-router-dom'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const App = () => {
  const { isAuthenticated } = useKindeAuth();
  const BrowserRouter = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <GlobalChat /> : <SigninSignup />,
    }
  ]);
  return (
    <div className='h-screen w-full bg-black'> 
         <GlobalChat/>
    </div>
  )
}

export default App