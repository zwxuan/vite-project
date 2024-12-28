//router/index.tsx
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "@/layout/index";
import Currency from "@/pages/currency";
import ExportLog from "@/pages/log/export_log";
import Login from "@/pages/login";
import RouterGuard from "@/components/router_guard";
const routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <RouterGuard>
        <AppLayout />
      </RouterGuard>),
    children: [
      {
        path: "/currency",
        element: (
          <RouterGuard>
            <Currency />
          </RouterGuard>),
      },
      {
        path: "/exportlog",
        element: (
          <RouterGuard>
            <ExportLog />
          </RouterGuard>),
      },
    ], // 如果需要子路由，可以在这里添加
  },
  {
    path: "/login",
    element: <Login />,
  },
]); 
 
export default routers;