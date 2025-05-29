
import request, { ApiRes, requestWithProgress } from '../request'
import { OrderBillItemProps } from "@/types/business_manage/order_bill";
import Mock from "mockjs";

// 模拟账单数据
const orderBillItems: OrderBillItemProps[] = [
  {
    BillNumber: Mock.mock({ 'regexp': /BN\d{5,10}/ }).regexp,
    SettlementObject: `${Object.values(Mock.mock({ "object|1": { "现代商船（中国）有限公司": "现代商船（中国）有限公司", "中国东方航空公司": "中国东方航空公司", "阿拉伯联合国家轮船公司": "阿拉伯联合国家轮船公司", "长锦商船船务有限公司": "长锦商船船务有限公司" } }).object)[0]}`,
    SettlementAgent: `${Object.values(Mock.mock({ "object|1": { "现代商船（中国）有限公司": "现代商船（中国）有限公司", "中国东方航空公司": "中国东方航空公司", "阿拉伯联合国家轮船公司": "阿拉伯联合国家轮船公司", "长锦商船船务有限公司": "长锦商船船务有限公司" } }).object)[0]}`,
    InvoiceTitle: `${Object.values(Mock.mock({ "object|1": { "现代商船（中国）有限公司": "现代商船（中国）有限公司", "中国东方航空公司": "中国东方航空公司", "阿拉伯联合国家轮船公司": "阿拉伯联合国家轮船公司", "长锦商船船务有限公司": "长锦商船船务有限公司" } }).object)[0]}`,
    Currency: `${Object.values(Mock.mock({ "object|1": { "人民币": "人民币", "美元": "美元", "欧元": "欧元", "日元": "日元" } }).object)[0]}`,
    Amount: Mock.mock('@float(60, 100, 0, 2)'),
    CurrencyTotal: `${Object.values(Mock.mock({ "object|1": { "USD:14080.00;RMB:8680.00;": "USD:14080.00;RMB:8680.00;", "RMB:9080.00;USD:13200.00;": "RMB:9080.00;USD:13200.00;", "RMB:1000.00;": "RMB:1000.00;" } }).object)[0]}`,
    IncomeExpenseType: `${Object.values(Mock.mock({ "object|1": { "收入": "收入", "支出": "支出" } }).object)[0]}`,
    Status: `${Object.values(Mock.mock({ "object|1": { "未提交": "未提交", "已提交": "已提交", "未审核": "未审核", "已审核": "已审核", "已归档": "已归档" } }).object)[0]}`,
    InvoiceStatus: `${Object.values(Mock.mock({ "object|1": { "未开票": "未开票", "已开票": "已开票", "部分开票": "部分开票" } }).object)[0]}`,
    VerificationStatus: `${Object.values(Mock.mock({ "object|1": { "未核销": "未核销", "已核销": "已核销", "部分核销": "部分核销" } }).object)[0]}`,
    ReconciliationNumber: Mock.mock({ 'regexp': /BN\d{5,10}D/ }).regexp,
    CounterpartBillNumber: Mock.mock({ 'regexp': /C\d{5,10}/ }).regexp,
    InvoiceType: `${Object.values(Mock.mock({ "object|1": { "增值税专用发票": "增值税专用发票", "增值税普通发票": "增值税普通发票" } }).object)[0]}`,
    InvoiceCategory: `${Object.values(Mock.mock({ "object|1": { "纸质发票": "纸质发票", "电子发票": "电子发票" } }).object)[0]}`,
    Creator: Mock.mock('@cname()'),
    BillConfirmationTime: Mock.mock('@date()'),
    BillDueDate: Mock.mock('@date()'),
    BillConfirmer: Mock.mock('@cname()'),
    IsConfirmed: `${Object.values(Mock.mock({ "object|1": { "是": "是", "否": "否" } }).object)[0]}`,
    BillReviewStatus: `${Object.values(Mock.mock({ "object|1": { "未复核": "未复核", "已复核": "已复核" } }).object)[0]}`,
    BillReviewer: Mock.mock('@cname()'),
    BillReviewTime: Mock.mock('@date()'),
    BillSettlementType: `${Object.values(Mock.mock({ "object|1": { "票结": "票结", "月结": "月结", "半月结": "半月结", "周结": "周结" } }).object)[0]}`,
    ApprovalStatus: `${Object.values(Mock.mock({ "object|1": { "未审核": "未审核", "已审核": "已审核" } }).object)[0]}`,
    IsVoid: `${Object.values(Mock.mock({ "object|1": { "是": "是", "否": "否" } }).object)[0]}`,
  }
];

// 获取账单列表
export const getOrderBillList = async (): Promise<OrderBillItemProps[]> => {
  return orderBillItems;
}

// 原有API接口代码（已注释）
/*
export const getOrderBillList = async (): Promise<OrderBillItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/order_bill"
  });
  const responseData = response?.data as ApiRes<OrderBillItemProps[]>;
  return responseData.data || [];
}
*/

export const saveOrderBill = (data:OrderBillItemProps,onUploadProgress: (progress: number) => void) => {
  // 模拟保存成功
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: '保存成功' });
    }, 1000);
  });
}

// 原有API接口代码（已注释）
/*
export const saveOrderBill = (data:OrderBillItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/order_bill/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

