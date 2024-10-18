import GlobalChat from "./Pages/GlobalChat"
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import SigninSignup from "./Pages/SigninSignup";

const App = () => {
  const { isAuthenticated } = useKindeAuth();
  const BrowserRouter = createBrowserRouter([
    {
      path: '/',
      element: isAuthenticated ? <GlobalChat /> : <> {redirect('/signin')} </>,
    },
    {
      path: '/signin',
      element: <SigninSignup />,
    }
  ]);
  return (
    <div className='h-screen w-full bg-black'> 
      <RouterProvider router={BrowserRouter} />
    </div>
  )
}

export default App