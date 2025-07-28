import { InvoiceIssuanceReceiptItemProps } from '@/types/settlement_center/cost_manage/invoice_issuance_receipt';
import request, { ApiRes, requestWithProgress } from '../../request';
import Mock from 'mockjs';

// 模拟开票收票台账数据
const invoiceIssuanceReceiptItems: InvoiceIssuanceReceiptItemProps[] = [
  {
    "BusinessId": "AFS2007004",
    "SettlementUnit": "上海大洋行有限公司",
    "MasterOrderNo": "KMTCSHAF703978",
    "SubOrderNo": "AFS2007004",
    "InvoiceTitle": "上海大洋行有限公司",
    "ReconciliationNo": "",
    "Customer": "上海大洋行有限公司",
    "BusinessType": "海运出口",
    "BusinessDate": "2020-08-07",
    "BargeSailingDate": "",
    "VesselVoyage": "KMTC QINGDAO/V.2008S",
    "PortOfLoading": "SHANGHAI",
    "PortOfDestination": "LOS ANGELES,CA",
    "Sales": "刘风彩",
    "Accrued": "否",
    "Operator": "刘风彩",
    "FinanceDate": "",
    "DomesticOrForeign": "国内",
    "PaymentType": "应收",
    "FeeStatus": "未提交",
    "ConfirmationStatus": "未确认",
    "FeeName": "拖车费",
    "Currency": "RMB",
    "CustomBusinessType": "",
    "Quantity": 1,
    "TaxInclusivePrice": 33,
    "TaxExclusivePrice": 33,
    "TaxRate": 0,
    "TaxAmount": 0,
    "ContactPerson": "",
    "WriteOffAmount": 0,
    "UnsettledAmount": 33,
    "FeeRemark": "",
    "ContractStatus": "合约失效",
    "CustomPosition1": "",
    "CustomPosition2": "",
    "Etd": "2020-08-07",
    "Eta": "",
    "Carrier": "高丽海运株式会社",
    "PickupDeliveryLocation": "SHANGHAI",
    "TruckPickupTime": "",
    "BusinessStatus": "正操作"
  },
  {
    "BusinessId": "AFS2007004",
    "SettlementUnit": "上海大洋行有限公司",
    "MasterOrderNo": "KMTCSHAF703978",
    "SubOrderNo": "AFS2007004",
    "InvoiceTitle": "上海大洋行有限公司",
    "ReconciliationNo": "",
    "Customer": "上海大洋行有限公司",
    "BusinessType": "海运出口",
    "BusinessDate": "2020-08-07",
    "BargeSailingDate": "",
    "VesselVoyage": "KMTC QINGDAO/V.2008S",
    "PortOfLoading": "SHANGHAI",
    "PortOfDestination": "LOS ANGELES,CA",
    "Sales": "刘风彩",
    "Accrued": "否",
    "Operator": "刘风彩",
    "FinanceDate": "",
    "DomesticOrForeign": "国内",
    "PaymentType": "应收",
    "FeeStatus": "未提交",
    "ConfirmationStatus": "未确认",
    "FeeName": "堆存费",
    "Currency": "RMB",
    "CustomBusinessType": "",
    "Quantity": 1,
    "TaxInclusivePrice": 222,
    "TaxExclusivePrice": 222,
    "TaxRate": 0,
    "TaxAmount": 0,
    "ContactPerson": "",
    "WriteOffAmount": 0,
    "UnsettledAmount": 222,
    "FeeRemark": "",
    "ContractStatus": "合约失效",
    "CustomPosition1": "",
    "CustomPosition2": "",
    "Etd": "2020-08-07",
    "Eta": "",
    "Carrier": "高丽海运株式会社",
    "PickupDeliveryLocation": "SHANGHAI",
    "TruckPickupTime": "",
    "BusinessStatus": "正操作"
  }
];

// 获取开票收票台账列表
export const getInvoiceIssuanceReceiptList = async (): Promise<InvoiceIssuanceReceiptItemProps[]> => {
  return invoiceIssuanceReceiptItems;
}

// 保存开票收票台账
export const saveInvoiceIssuanceReceipt = async (data: InvoiceIssuanceReceiptItemProps, onUploadProgress?: (progress: number) => void): Promise<InvoiceIssuanceReceiptItemProps> => {
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
// 获取开票收票台账列表
export const getInvoiceIssuanceReceiptList = async () : Promise<InvoiceIssuanceReceiptItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/invoice_issuance_receipt"
  });
  const responseData = response?.data as ApiRes<InvoiceIssuanceReceiptItemProps[]>;
  return responseData.data || [];
}

// 保存开票收票台账
export const saveInvoiceIssuanceReceipt = (data:InvoiceIssuanceReceiptItemProps, onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/invoice_issuance_receipt/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/