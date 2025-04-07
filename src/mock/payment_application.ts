import Mock from "mockjs";
import { PaymentApplicationItemProps } from "@/types/payment_application/payment_application";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const paymentApplicationItems:PaymentApplicationItemProps[] = [
  {
      "PaymentNotificationNumber": "FK25020001",
      "SettlementObject": "上海四海仓库",
      "SettlementAgent": "",
      "EntrustingUnit": "上海大洋行有限公司",
      "ModificationTime": "2025-02-21T16:28:20",
      "Modifier": "周文轩",
      "InvoiceTitle": "上海四海仓库",
      "BusinessNumber": "AFS2007004",
      "ApplicationDate": "2025-02-21",
      "Applicant": "周文轩",
      "ApplicantDepartment": "管理部",
      "PaymentDeadline": "2025-02-28",
      "PaymentMethod": "银行转账",
      "InvoiceNumber": "1111.0",
      "CurrencyCode": "RMB",
      "Amount": 800.0,
      "ReconciliationAmountByCurrency": "RMB:800.00",
      "ApprovalStatus": "已财务审批",
      "ReconciliationStatus": "全部核销",
      "Remarks": "",
      "ProcessNumber": "",
      "TotalByCurrency": "RMB:800.00",
      "VoucherNumber": "",
      "VoucherCreationDate": "",
      "Carrier": "高丽海运株式会社",
      "ShippingLocation": "SHANGHAI",
      "ActualTrailerPickupTime": "",
      "DocumentDate": "",
      "FinancialPayableStatus": ""
  },
  {
      "PaymentNotificationNumber": "FK20050001",
      "SettlementObject": "长锦商船船务有限公司",
      "SettlementAgent": "",
      "EntrustingUnit": "苏州永翔五金塑胶有限公司",
      "ModificationTime": "2020-05-20T15:15:36",
      "Modifier": "周文轩",
      "InvoiceTitle": "长锦商船船务有限公司",
      "BusinessNumber": "SHSE20040001A",
      "ApplicationDate": "2020-05-20",
      "Applicant": "周文轩",
      "ApplicantDepartment": "管理部",
      "PaymentDeadline": "2020-05-20",
      "PaymentMethod": "银行转账",
      "InvoiceNumber": "9.0",
      "CurrencyCode": "USD",
      "Amount": 15.37,
      "ReconciliationAmountByCurrency": "USD:0.00",
      "ApprovalStatus": "已业务审批",
      "ReconciliationStatus": "未核销",
      "Remarks": "",
      "ProcessNumber": "",
      "TotalByCurrency": "USD:15.37",
      "VoucherNumber": "",
      "VoucherCreationDate": "",
      "Carrier": "长锦商船船务有限公司",
      "ShippingLocation": "SHANGHAI",
      "ActualTrailerPickupTime": "",
      "DocumentDate": "",
      "FinancialPayableStatus": ""
  },
  {
      "PaymentNotificationNumber": "FK20030001",
      "SettlementObject": "新西兰航空公司",
      "SettlementAgent": "",
      "EntrustingUnit": "上海苍鹭实业有限公司",
      "ModificationTime": "2020-03-12T14:43:34",
      "Modifier": "肖宝珠",
      "InvoiceTitle": "长锦商船船务有限公司",
      "BusinessNumber": "SHSE20020015",
      "ApplicationDate": "2020-03-12",
      "Applicant": "肖宝珠",
      "ApplicantDepartment": "管理部",
      "PaymentDeadline": "2020-03-19",
      "PaymentMethod": "银行转账",
      "InvoiceNumber": "9.0",
      "CurrencyCode": "RMB",
      "Amount": 2000.0,
      "ReconciliationAmountByCurrency": "RMB:0.00",
      "ApprovalStatus": "已提交",
      "ReconciliationStatus": "未核销",
      "Remarks": "",
      "ProcessNumber": "",
      "TotalByCurrency": "RMB:2000.00",
      "VoucherNumber": "",
      "VoucherCreationDate": "",
      "Carrier": "上海市锦江航运有限公司",
      "ShippingLocation": "SHANGHAI",
      "ActualTrailerPickupTime": "",
      "DocumentDate": "",
      "FinancialPayableStatus": ""
  },
  {
      "PaymentNotificationNumber": "FK20020002",
      "SettlementObject": "澳大利亚航空公司",
      "SettlementAgent": "",
      "EntrustingUnit": "上海沃行信息技术有限公司",
      "ModificationTime": "2020-02-19T21:00:53",
      "Modifier": "王乾",
      "InvoiceTitle": "长锦商船船务有限公司",
      "BusinessNumber": "SHSE20020002",
      "ApplicationDate": "2020-02-19",
      "Applicant": "王乾",
      "ApplicantDepartment": "管理部",
      "PaymentDeadline": "2020-02-28",
      "PaymentMethod": "银行转账",
      "InvoiceNumber": "9.0",
      "CurrencyCode": "RMB",
      "Amount": 2000.0,
      "ReconciliationAmountByCurrency": "RMB:0.00",
      "ApprovalStatus": "已财务审批",
      "ReconciliationStatus": "未核销",
      "Remarks": "",
      "ProcessNumber": "",
      "TotalByCurrency": "RMB:2000.00",
      "VoucherNumber": "",
      "VoucherCreationDate": "",
      "Carrier": "上海市锦江航运有限公司",
      "ShippingLocation": "SHANGHAI",
      "ActualTrailerPickupTime": "",
      "DocumentDate": "",
      "FinancialPayableStatus": ""
  },
  {
      "PaymentNotificationNumber": "FK20020001",
      "SettlementObject": "新西兰航空公司",
      "SettlementAgent": "",
      "EntrustingUnit": "上海沃行信息技术有限公司",
      "ModificationTime": "2020-02-12T19:21:29",
      "Modifier": "张雷",
      "InvoiceTitle": "长锦商船船务有限公司",
      "BusinessNumber": "SHSE20020002",
      "ApplicationDate": "2020-02-12",
      "Applicant": "张雷",
      "ApplicantDepartment": "管理部",
      "PaymentDeadline": "2020-02-28",
      "PaymentMethod": "银行转账",
      "InvoiceNumber": "9.0",
      "CurrencyCode": "RMB",
      "Amount": 5000.0,
      "ReconciliationAmountByCurrency": "RMB:0.00",
      "ApprovalStatus": "已提交",
      "ReconciliationStatus": "未核销",
      "Remarks": "",
      "ProcessNumber": "",
      "TotalByCurrency": "RMB:5000",
      "VoucherNumber": "",
      "VoucherCreationDate": "",
      "Carrier": "上海市锦江航运有限公司",
      "ShippingLocation": "SHANGHAI",
      "ActualTrailerPickupTime": "",
      "DocumentDate": "",
      "FinancialPayableStatus": ""
  }
];
 
export default [
  // 付款申请台账
  {
    url: "/api/payment_application",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: paymentApplicationItems,
      };
    },
  },
  {
    url: "/api/payment_application/save",
    method: "POST",
    response: ({ body }: { body: PaymentApplicationItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/payment_application/save/progress",
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