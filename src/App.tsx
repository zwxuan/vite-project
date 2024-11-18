import { RouterProvider } from "react-router-dom";
import routers from '@/router';
import './App.less'

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  )
}

export default App
