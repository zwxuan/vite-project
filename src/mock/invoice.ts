import Mock from "mockjs";
import { InvoiceItemProps } from "@/types/invoice/invoice";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
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
    "IsExported": "是",
    "InvoiceCategory": "增值税普通发票",
    "BillingMethod": "单票开票",
    "PaymentType": "应收",
    "BillingCurrency": "RMB",
    "InvoiceExchangeRate": 1.00,
    "Amount": 56000.00,
    "WriteOffAmount": 56000.00,
    "TaxRate": 0.00,
    "TaxAmount": 0.00,
    "TaxExcludedAmount": 56000.00,
    "BillingApplicant": "徐伟力",
    "CurrencyTotal": 8000.00,
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
    "InvoiceId": "6",
    "WriteOffSerialNumber": "SHR20080001",
    "PaymentDate": "2020-08-21",
    "CurrencyRate1": "7.00",
    "CurrencyRate2": ""
  }
];

export default [
  // 发票管理台账
  {
    url: "/api/invoice",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: invoiceItems,
      };
    },
  },
  {
    url: "/api/invoice/save",
    method: "POST",
    response: ({ body }: { body: InvoiceItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/invoice/save/progress",
    method: "GET",
    rawResponse: async (req: IncomingMessage, res: ServerResponse) => {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      let progress = 0;

      const sendProgress = () => {
        const data = {
          code: 200,
          success: true,
          message: progress >= 100 ? "保存成功" : "处理中...",
          data: {
            progress: progress,
            status: progress >= 100 ? 'completed' : 'processing',
            result: progress >= 100 ? null : null
          }
        };

        res.write(`data: ${JSON.stringify(data)}\n\n`);
        console.log('Sending progress:', progress);

        if (progress >= 100) {
          res.end();
          return;
        }

        progress += 10;
        setTimeout(sendProgress, 1000);
      };

      sendProgress();
    }
  }
];