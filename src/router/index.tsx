//router/index.tsx
import { createBrowserRouter} from "react-router-dom";
import AppLayout from "@/layout/index";
 
const routers = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [], // 如果需要子路由，可以在这里添加
  },
]); 
 
export default routers;