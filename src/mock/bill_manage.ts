import Mock from "mockjs";
import { BillManageItemProps } from "@/types/settlement_center/cost_manage/bill_manage";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
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
  },
  {
    "BillNumber": "SH20080004C",
    "StatementNumber": "SH20080001D",
    "CounterpartBillNumber": "",
    "BillType": "国内账单",
    "PaymentType": "应付",
    "BillDate": "2020-08-10",
    "DueDate": "",
    "InvoiceTitle": "高丽海运株式会社",
    "InvoiceRequirements": "",
    "SettlementParty": "高丽海运株式会社",
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
    "BillStatus": "未确认",
    "InvoiceStatus": "未开票",
    "WriteOffStatus": "未核销",
    "Currency": "RMB",
    "Amount": 5000.0,
    "AgingDays": 1663,
    "WriteOffAmount": 0.0,
    "CurrencyTotal": "RMB:5000.00",
    "Remarks": "",
    "BookingNumber": "",
    "MarkTime": "",
    "MarkedBy": "",
    "MarkStatus": "未标记",
    "UnwriteOffAmount": 5000,
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
    "BillNumber": "SH20080003C",
    "StatementNumber": "SH20080001D",
    "CounterpartBillNumber": "",
    "BillType": "国内账单",
    "PaymentType": "应付",
    "BillDate": "2020-08-10",
    "DueDate": "",
    "InvoiceTitle": "上海四海仓库",
    "InvoiceRequirements": "",
    "SettlementParty": "上海四海仓库",
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
    "Currency": "RMB",
    "Amount": 800.0,
    "AgingDays": 1663,
    "WriteOffAmount": 800.0,
    "CurrencyTotal": "RMB:800.00",
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
  },
  {
    "BillNumber": "SH20080005C",
    "StatementNumber": "SH20080001D",
    "CounterpartBillNumber": "",
    "BillType": "国内账单",
    "PaymentType": "应付",
    "BillDate": "2020-08-10",
    "DueDate": "",
    "InvoiceTitle": "上海麟泽国际物流有限公司",
    "InvoiceRequirements": "",
    "SettlementParty": "上海麟泽国际物流有限公司",
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
    "BillStatus": "未确认",
    "InvoiceStatus": "未开票",
    "WriteOffStatus": "全部核销",
    "Currency": "USD",
    "Amount": 5000.0,
    "AgingDays": 1663,
    "WriteOffAmount": 5000.0,
    "CurrencyTotal": "USD:5000.00",
    "Remarks": "",
    "BookingNumber": "",
    "MarkTime": "",
    "MarkedBy": "",
    "MarkStatus": "未标记",
    "UnwriteOffAmount": 0,
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
    "BillNumber": "SH20080002C",
    "StatementNumber": "SH20080001D",
    "CounterpartBillNumber": "",
    "BillType": "国内账单",
    "PaymentType": "应付",
    "BillDate": "2020-08-10",
    "DueDate": "",
    "InvoiceTitle": "上海伟达物流运输有限公司",
    "InvoiceRequirements": "",
    "SettlementParty": "上海伟达物流运输有限公司",
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
    "BillStatus": "未确认",
    "InvoiceStatus": "未开票",
    "WriteOffStatus": "未核销",
    "Currency": "RMB",
    "Amount": 800.0,
    "AgingDays": 1663,
    "WriteOffAmount": 0.0,
    "CurrencyTotal": "RMB:800.00",
    "Remarks": "",
    "BookingNumber": "",
    "MarkTime": "",
    "MarkedBy": "",
    "MarkStatus": "未标记",
    "UnwriteOffAmount": 800,
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
  }
]

export default [
  // 账单管理台账
  {
    url: "/api/bill_manage",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: billManageItems,
      };
    },
  },
  {
    url: "/api/bill_manage/save",
    method: "POST",
    response: ({ body }: { body: BillManageItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/bill_manage/save/progress",
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