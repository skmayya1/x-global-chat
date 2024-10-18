import GlobalChat from "./Pages/GlobalChat"
import { createBrowserRouter } from 'react-router-dom'
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const App = () => {
  
  return (
    <div className='h-screen w-full bg-black'> 
         <GlobalChat/>
    </div>
  )
}

export default App