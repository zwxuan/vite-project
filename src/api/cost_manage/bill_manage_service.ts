
import request, { ApiRes, requestWithProgress } from '../request'
import { BillManageItemProps } from "@/types/cost_manage/bill_manage";
import Mock from "mockjs";

// 模拟账单管理台账数据
const billManageItems: BillManageItemProps[] = [
  {
    "BillNumber": "SH25020002D",
    "StatementNumber": "",
    "CounterpartBillNumber": "",
    "BillType": "国内账单",
    "PaymentType": "应收",
    "BillDate": "2025-02-19",
    "DueDate": "",
    "InvoiceTitle": "上海大洋行有限公司",
    "InvoiceRequirements": "",
    "SettlementParty": "上海大洋行有限公司",
    "CargoType": "自揽货",
    "Etd": "2020-08-07",
    "Eta": "",
    "BillConfirmationTime": "",
    "BusinessNumber": "AFS2007004",
    "MasterBillNumber": "KMTCSHAF703978",
    "VesselVoyage": "KMTC QINGDAO V.2008S",
    "PortOfLoading": "CNSHA",
    "PortOfDischarge": "USLAX",
    "CreatedBy": "周文轩",
    "BillStatus": "未确认",
    "InvoiceStatus": "未开票",
    "WriteOffStatus": "未核销",
    "Currency": "RMB",
    "Amount": 222.0,
    "AgingDays": 1663,
    "WriteOffAmount": 0.0,
    "CurrencyTotal": "RMB:222.00",
    "Remarks": "",
    "BookingNumber": "",
    "MarkTime": "",
    "MarkedBy": "",
    "MarkStatus": "未标记",
    "UnwriteOffAmount": 222,
    "Operation": "刘风彩",
    "BillConfirmedBy": "",
    "IsVoid": "0",
    "IsConfirmed": "0",
    "BusinessReferenceNumber": "",
    "BillReviewedBy": "",
    "BillReviewTime": "",
    "Carrier": "高丽海运株式会社",
    "ShippingLocation": "SHANGHAI",
    "TrailerPickupTime": "",
    "OperationDate": "",
    "ProjectNumber": "",
    "DeliveryCompletionTime": "",
    "BillSettlementType": "票结",
    "ParentCompany": "",
    "BusinessDate": "2020-08-07"
  },
  {
    "BillNumber": "SH20080001D",
    "StatementNumber": "SH20080001D",
    "CounterpartBillNumber": "",
    "BillType": "国内账单",
    "PaymentType": "应收",
    "BillDate": "2020-08-10",
    "DueDate": "",
    "InvoiceTitle": "上海大洋行有限公司",
    "InvoiceRequirements": "",
    "SettlementParty": "上海大洋行有限公司",
    "CargoType": "自揽货",
    "Etd": "2020-08-07",
    "Eta": "",
    "BillConfirmationTime": "",
    "BusinessNumber": "AFS2007004",
    "MasterBillNumber": "KMTCSHAF703978",
    "VesselVoyage": "KMTC QINGDAO V.2008S",
    "PortOfLoading": "CNSHA",
    "PortOfDischarge": "USLAX",
    "CreatedBy": "徐伟力",
    "BillStatus": "已确认",
    "InvoiceStatus": "全部开票",
    "WriteOffStatus": "全部核销",
    "Currency": "USD",
    "Amount": 9034.96,
    "AgingDays": 1663,
    "WriteOffAmount": 9034.96,
    "CurrencyTotal": "USD:8000.00;RMB:7400.00",
    "Remarks": "",
    "BookingNumber": "",
    "MarkTime": "",
    "MarkedBy": "",
    "MarkStatus": "未标记",
    "UnwriteOffAmount": 0,
    "Operation": "刘风彩",
    "BillConfirmedBy": "",
    "IsVoid": "0",
    "IsConfirmed": "1",
    "BusinessReferenceNumber": "",
    "BillReviewedBy": "",
    "BillReviewTime": "",
    "Carrier": "高丽海运株式会社",
    "ShippingLocation": "SHANGHAI",
    "TrailerPickupTime": "",
    "OperationDate": "",
    "ProjectNumber": "",
    "DeliveryCompletionTime": "",
    "BillSettlementType": "票结",
    "ParentCompany": "",
    "BusinessDate": "2020-08-07"
  }
];

// 获取账单管理台账列表
export const getBillManageList = async (): Promise<BillManageItemProps[]> => {
  return billManageItems;
}

// 保存账单管理
export const saveBillManage = async (data: BillManageItemProps, onUploadProgress?: (progress: number) => void): Promise<BillManageItemProps> => {
  // 模拟上传进度
  if (onUploadProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  }
  return data;
}

// 原有API接口代码（已注释）
/*
// 获取账单管理台账列表
export const getBillManageList = async () : Promise<BillManageItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/bill_manage"
  });
  const responseData = response?.data as ApiRes<BillManageItemProps[]>;
  return responseData.data || [];
}

// 保存账单管理
export const saveBillManage = (data:BillManageItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/bill_manage/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

