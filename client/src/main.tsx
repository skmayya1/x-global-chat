import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { SocketProvider } from './Context/SocketProvider.tsx'
import { KindeProvider } from '@kinde-oss/kinde-auth-react'
import SigninSignup from './Pages/SigninSignup.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'



const router = createBrowserRouter([
  {
    path: '/global-chat',
    element: <App />,
  },
  {
    path: '/signin',
    element: <SigninSignup />,
  }]);
  

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <KindeProvider
      clientId="097fc0d80fb1476489fa87fcd13ee3f7"
      domain="https://globalchat.kinde.com"
      logoutUri={window.location.origin}
      redirectUri={window.location.origin}
    >
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </KindeProvider>
  </StrictMode>,
)
