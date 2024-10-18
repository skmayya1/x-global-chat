import GlobalChat from "./Pages/GlobalChat"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const App = () => {
  return (
    <div className='h-screen w-full bg-black'> 
         <GlobalChat/>
    </div>
  )
}

export default App