import { InvoiceItemProps } from '@/types/invoice/invoice';
import request, { ApiRes, requestWithProgress } from '../request';
import Mock from 'mockjs';

// 模拟发票数据
const invoiceItems: InvoiceItemProps[] = [
  {
    "InvoiceNumber": "1111",
    "BillingTitle": "上海四海仓库",
    "BusinessNumber": "AFS2007004",
    "Mbl": "KMTCSHAF703978",
    "SettlementUnit": "上海四海仓库",
    "InvoiceCreator": "周文轩",
    "InvoiceCreateTime": "2025-02-21 15:19:53",
    "ReviewStatus": "已复核",
    "Reviewer": "周文轩",
    "ReviewDate": "2025-02-21",
    "InvoiceType": "电子发票",
    "PaymentTerm": "2025-02-28",
    "CustomerDownloadCount": 0,
    "BillingDate": "2025-02-21",
    "PaymentNoticeNumber": "FK25020001",
    "Etd": "2020-08-07",
    "Eta": "",
    "DestinationPort": "",
    "WriteOffStatus": "全部核销",
    "RedCreditStatus": "未红冲",
    "IsPrinted": "是",
    "IsVoided": "是",
    "VesselVoyage": "V.2008S",
    "PortOfDeparture": "",
    "IsExported": "是",
    "InvoiceCategory": "普通发票",
    "BillingMethod": "单票开票",
    "PaymentType": "应付",
    "BillingCurrency": "RMB",
    "InvoiceExchangeRate": 1.00,
    "Amount": 800.00,
    "WriteOffAmount": 800.00,
    "TaxRate": 6.00,
    "TaxAmount": 45.28,
    "TaxExcludedAmount": 754.72,
    "BillingApplicant": "徐伟力",
    "CurrencyTotal": 800.00,
    "Operation": "刘风彩",
    "Sales": "刘风彩",
    "SalesUnit": "",
    "DeliveryLocation": "LOS ANGELES,CA",
    "OurBank": "",
    "OurBankCurrency": "",
    "EInvoiceSendStatus": "未发送",
    "EInvoiceEmailStatus": "未发送",
    "SpecificConstraintType": "",
    "RedCreditReason": "",
    "TaxControlRequest": "",
    "BillingSettlementType": "",
    "InvoiceId": "10",
    "WriteOffSerialNumber": "SHP25020002",
    "PaymentDate": "2025-02-21",
    "CurrencyRate1": "",
    "CurrencyRate2": ""
  },
  {
    "InvoiceNumber": "",
    "BillingTitle": "上海大洋行有限公司",
    "BusinessNumber": "AFS2007004",
    "Mbl": "KMTCSHAF703978",
    "SettlementUnit": "上海大洋行有限公司",
    "InvoiceCreator": "平台客服",
    "InvoiceCreateTime": "2020-09-11 14:48:55",
    "ReviewStatus": "未复核",
    "Reviewer": "",
    "ReviewDate": "2025-02-21",
    "InvoiceType": "纸质发票",
    "PaymentTerm": "2020-10-11",
    "CustomerDownloadCount": 0,
    "BillingDate": "2020-09-11",
    "PaymentNoticeNumber": "FK25020001",
    "Etd": "2020-08-07",
    "Eta": "",
    "DestinationPort": "LOS ANGELES,CA",
    "WriteOffStatus": "全部核销",
    "RedCreditStatus": "未红冲",
    "IsPrinted": "否",
    "IsVoided": "否",
    "VesselVoyage": "KMTC QINGDAO/V.2008S",
    "PortOfDeparture": "SHANGHAI",
    "IsExported": "否",
    "InvoiceCategory": "增值税普通发票",
    "BillingMethod": "单票开票",
    "PaymentType": "应收",
    "BillingCurrency": "RMB",
    "InvoiceExchangeRate": 1.00,
    "Amount": 7400.00,
    "WriteOffAmount": 7400.00,
    "TaxRate": 0.00,
    "TaxAmount": 0.00,
    "TaxExcludedAmount": 7400.00,
    "BillingApplicant": "徐伟力",
    "CurrencyTotal": 7400.00,
    "Operation": "刘风彩",
    "Sales": "刘风彩",
    "SalesUnit": "",
    "DeliveryLocation": "LOS ANGELES,CA",
    "OurBank": "",
    "OurBankCurrency": "",
    "EInvoiceSendStatus": "未发送",
    "EInvoiceEmailStatus": "未发送",
    "SpecificConstraintType": "",
    "RedCreditReason": "",
    "TaxControlRequest": "",
    "BillingSettlementType": "",
    "InvoiceId": "7",
    "WriteOffSerialNumber": "SHR20080001",
    "PaymentDate": "2020-08-21",
    "CurrencyRate1": "",
    "CurrencyRate2": ""
  }
];

// 获取发票列表
export const getInvoiceList = async (): Promise<InvoiceItemProps[]> => {
  return invoiceItems;
}

// 保存发票
export const saveInvoice = async (data: InvoiceItemProps, onUploadProgress?: (progress: number) => void): Promise<InvoiceItemProps> => {
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
// 获取发票列表
export const getInvoiceList = async () : Promise<InvoiceItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/invoice"
  });
  const responseData = response?.data as ApiRes<InvoiceItemProps[]>;
  return responseData.data || [];
}

// 保存发票
export const saveInvoice = (data:InvoiceItemProps, onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/invoice/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/