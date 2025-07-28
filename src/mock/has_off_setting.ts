import Mock from "mockjs";
import { HasOffSettingItemProps } from "@/types/settlement_center/finance_manage/has_off_setting";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const hasOffSettingItems:HasOffSettingItemProps[] = [
  {
    "Writeoffserialnumber": "SHP25030001",
    "Settlementobject": "澳大利亚航空公司",
    "Businessnumber": "SE2011011",
    "Settlementagent": "",
    "Counterparty": "",
    "Ourbank": "",
    "Paymentnoticenumber": "",
    "Vouchernumber": "",
    "Bankslipnumber": "",
    "Writeoffperson": "周文轩",
    "Writeoffdate": "2025-03-18",
    "Receiptpaymentdate": "2025-03-18",
    "Paymenttype": "应付",
    "Slipstatus": "未使用",
    "Receiptpaymentmethod": "银行转账",
    "Isprepaid": "否",
    "Currency": "RMB",
    "Amount": 21,
    "Writtenoffamount": 21,
    "Balance": 0,
    "Actualreceivedamount": 0,
    "Actualpaidamount": 21,
    "Financialcharges": 0,
    "Exchangegainloss": 0,
    "Shortchange": 0,
    "Originalcurrencydifference": 0,
    "Creator": "周文轩",
    "Reviewer": "未复核",
    "Reviewdate": "",
    "Iscancelled": "",
    "Invoiceinformation": "2025-03-04",
    "Remarks": "",
    "Accountperiod": 0,
    "Voucherdate": "",
    "Reviewername": "",
    "Billsettlementtype": "",
    "Prereceiptpaymentremarks": "",
    "Receiptpaymentvouchernumber": ""
  },
  {
    "Writeoffserialnumber": "SHP25020002",
    "Settlementobject": "上海四海仓库",
    "Businessnumber": "AFS2007004",
    "Settlementagent": "",
    "Counterparty": "上海四海仓库",
    "Ourbank": "",
    "Paymentnoticenumber": "FK25020001",
    "Vouchernumber": "",
    "Bankslipnumber": "",
    "Writeoffperson": "周文轩",
    "Writeoffdate": "2025-02-21",
    "Receiptpaymentdate": "2025-02-21",
    "Paymenttype": "应付",
    "Slipstatus": "未使用",
    "Receiptpaymentmethod": "银行转账",
    "Isprepaid": "否",
    "Currency": "RMB",
    "Amount": 800,
    "Writtenoffamount": 800,
    "Balance": 0,
    "Actualreceivedamount": 0,
    "Actualpaidamount": 800,
    "Financialcharges": 0,
    "Exchangegainloss": 0,
    "Shortchange": 0,
    "Originalcurrencydifference": 0,
    "Creator": "周文轩",
    "Reviewer": "未复核",
    "Reviewdate": "",
    "Iscancelled": "",
    "Invoiceinformation": "1111,上海四海仓库,2025-02-21",
    "Remarks": "",
    "Accountperiod": 60,
    "Voucherdate": "",
    "Reviewername": "",
    "Billsettlementtype": "",
    "Prereceiptpaymentremarks": "",
    "Receiptpaymentvouchernumber": ""
  },
  {
    "Writeoffserialnumber": "SHP25020001",
    "Settlementobject": "上海麟泽国际物流有限公司",
    "Businessnumber": "AFS2007004",
    "Settlementagent": "",
    "Counterparty": "上海四海仓库",
    "Ourbank": "",
    "Paymentnoticenumber": "FK25020001",
    "Vouchernumber": "",
    "Bankslipnumber": "",
    "Writeoffperson": "周文轩",
    "Writeoffdate": "2025-02-21",
    "Receiptpaymentdate": "2025-02-21",
    "Paymenttype": "应付",
    "Slipstatus": "未使用",
    "Receiptpaymentmethod": "银行转账",
    "Isprepaid": "否",
    "Currency": "USD",
    "Amount": 5000,
    "Writtenoffamount": 5000,
    "Balance": 0,
    "Actualreceivedamount": 0,
    "Actualpaidamount": 5000,
    "Financialcharges": 0,
    "Exchangegainloss": 0,
    "Shortchange": 0,
    "Originalcurrencydifference": 0,
    "Creator": "周文轩",
    "Reviewer": "未复核",
    "Reviewdate": "",
    "Iscancelled": "",
    "Invoiceinformation": "1111,上海四海仓库,2025-02-21",
    "Remarks": "",
    "Accountperiod": 0,
    "Voucherdate": "",
    "Reviewername": "",
    "Billsettlementtype": "",
    "Prereceiptpaymentremarks": "",
    "Receiptpaymentvouchernumber": ""
  }
];
 
export default [
  // 已核销台账
  {
    url: "/api/has_off_setting",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: hasOffSettingItems,
      };
    },
  },
  {
    url: "/api/has_off_setting/save",
    method: "POST",
    response: ({ body }: { body: HasOffSettingItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/has_off_setting/save/progress",
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