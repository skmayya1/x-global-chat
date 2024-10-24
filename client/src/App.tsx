import GlobalChat from "./Pages/GlobalChat"
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

const App = () => {
  const { isAuthenticated, isLoading } = useKindeAuth();
  if (!isLoading) {
    if (!isAuthenticated) {
      window.location.href = '/signin';
    }
  }

  return (
    <div className='h-screen w-full bg-black'> 
     <GlobalChat />
    </div>
  )
}

export default App