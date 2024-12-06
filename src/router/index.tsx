//router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layout/index";
import Currency from "@/pages/currency";
import Login from "@/pages/login";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/currency",
        element: <Currency />,
      },
    ], // 如果需要子路由，可以在这里添加
  },
  {
    path: "/login",
    element: <Login />,
  },
]); 
 
export default routers;