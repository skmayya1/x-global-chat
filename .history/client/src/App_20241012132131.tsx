import GlobalChat from "./Pages/GlobalChat"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { redirect } from "react-router-dom";

const App = () => {
  const { isAuthenticated } = useKindeAuth();
  if (!isAuthenticated) {
  }
  return (
    <div className='h-screen w-full bg-black'> 
     <GlobalChat />
    </div>
  )
}

export default App