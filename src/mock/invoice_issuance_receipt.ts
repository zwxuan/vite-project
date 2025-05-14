import Mock from "mockjs";
import { InvoiceIssuanceReceiptItemProps } from "@/types/cost_manage/invoice_issuance_receipt/invoice_issuance_receipt";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
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
    "FeeName": "拖车费",
    "Currency": "RMB",
    "CustomBusinessType": "",
    "Quantity": 1,
    "TaxInclusivePrice": 22,
    "TaxExclusivePrice": 22,
    "TaxRate": 0,
    "TaxAmount": 0,
    "ContactPerson": "",
    "WriteOffAmount": 0,
    "UnsettledAmount": 22,
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
  },

];

export default [
  // 开票收票台账
  {
    url: "/api/invoice_issuance_receipt",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: invoiceIssuanceReceiptItems,
      };
    },
  },
  {
    url: "/api/invoice_issuance_receipt/save",
    method: "POST",
    response: ({ body }: { body: InvoiceIssuanceReceiptItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/invoice_issuance_receipt/save/progress",
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