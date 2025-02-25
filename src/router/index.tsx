//router/index.tsx
import { createBrowserRouter,createMemoryRouter } from "react-router-dom";
import AppLayout from "@/layout/index";
import { Currency, Orders, FeeReconciliation, OrderDetail, PermissionManagement, ExportLog, ImportLog, Login } from "./imports";
import RouterGuard from "@/components/router_guard";
const routers = createMemoryRouter([
  {
    path: "/",
    element: (
      <RouterGuard>
        <AppLayout />
      </RouterGuard>),
    children: [
      {
        path: "/currency",
        handle: { title: '币制管理' },
        element: (
          <RouterGuard>
            <Currency />
          </RouterGuard>),
      },
      {
        path: "/orders",
        handle: { title: '订单管理' },
        element: (
          <RouterGuard>
            <Orders />
          </RouterGuard>),
      },
      {
        path: "/orders/detail",
        handle: { title: '订单明细' },
        element: (
          <RouterGuard>
            <OrderDetail />
          </RouterGuard>),
      },
      {
        path: "/fee_reconciliation",
        handle: { title: '费用对账' },
        element: (
          <RouterGuard>
            <FeeReconciliation />
          </RouterGuard>),
      },
      {
        path: "/identity/permission",
        handle: { title: '权限分配' },
        element: (
          <RouterGuard>
            <PermissionManagement />
          </RouterGuard>),
      },
      {
        path: "/exportlog",
        handle: { title: '导出日志' },
        element: (
          <RouterGuard>
            <ExportLog />
          </RouterGuard>),
      },
      {
        path: "/importlog",
        handle: { title: '导入日志' },
        element: (
          <RouterGuard>
            <ImportLog />
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