//router/index.tsx
import { createBrowserRouter} from "react-router-dom";
import AppLayout from "@/layout/index";
import Home from "@/pages/home";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },

    ], // 如果需要子路由，可以在这里添加
  },
]); 
 
export default routers;