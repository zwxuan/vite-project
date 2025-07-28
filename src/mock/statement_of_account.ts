import Mock from "mockjs";
import { StatementOfAccountItemProps } from "@/types/settlement_center/cost_manage/statement_of_account";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const statementOfAccountItems: StatementOfAccountItemProps[] = [
  {
    "StatementNumber": "SH20080001D",
    "SettlementObject": "上海大洋行有限公司",
    "CounterpartyStatementNumber": "",
    "Creator": "解寅琨",
    "StatementType": "国内账单",
    "InvoiceTitle": "上海大洋行有限公司",
    "TransactionType": "应收",
    "ConfirmationStatus": "未确认",
    "InvoicingStatus": "全部开票",
    "StatementWriteoffStatus": "全部核销",
    "Currency": "USD",
    "Amount": 9034.96,
    "WrittenOffAmount": 9034.96,
    "InvoicingInfo": "上海大洋行有限公司,2020-09-11",
    "Remarks": "",
    "CurrencyTotal": 8000.00,
    "ConfirmationTime": "",
    "ConfirmationPerson": "",
    "BusinessReferenceNumber": "",
    "Carrier": "高丽海运株式会社",
    "PickupDeliveryLocation": "SHANGHAI",
    "ActualPickupTime": "",
    "ParentCompany": ""
  }
];

export default [
  // 对账单管理台账
  {
    url: "/api/statement_of_account",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: statementOfAccountItems,
      };
    },
  },
  {
    url: "/api/statement_of_account/save",
    method: "POST",
    response: ({ body }: { body: StatementOfAccountItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/statement_of_account/save/progress",
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