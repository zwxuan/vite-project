import Mock from "mockjs";
import { ChargingStandardItemProps } from "@/types/system_manage/charging_standard";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const chargingStandardItems:ChargingStandardItemProps[] = [
  {
      "Id": "1",
      "PaymentMethod": "应收",
      "FeeName": "单证费",
      "IsControlled": "否",
      "SettlementUnitType": "客户",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 2000,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "2",
      "PaymentMethod": "应收",
      "FeeName": "查验费",
      "IsControlled": "否",
      "SettlementUnitType": "客户",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 600,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "3",
      "PaymentMethod": "应付",
      "FeeName": "机场杂费",
      "IsControlled": "否",
      "SettlementUnitType": "承运人",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 200,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "4",
      "PaymentMethod": "应付",
      "FeeName": "查验费",
      "IsControlled": "否",
      "SettlementUnitType": "订舱代理/换单代理",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 500,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "5",
      "PaymentMethod": "应付",
      "FeeName": "装箱费",
      "IsControlled": "否",
      "SettlementUnitType": "承运人",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 200,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "6",
      "PaymentMethod": "应收",
      "FeeName": "空运费",
      "IsControlled": "否",
      "SettlementUnitType": "客户",
      "FixedSettlementUnit": "",
      "Currency": "USD",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 1000,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  }
];
 
export default [
  // 计费标准台账
  {
    url: "/api/charging_standard",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: chargingStandardItems,
      };
    },
  },
  {
    url: "/api/charging_standard/save",
    method: "POST",
    response: ({ body }: { body: ChargingStandardItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/charging_standard/save/progress",
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