import Mock from "mockjs";
import { SetFeeScheduleItemProps } from "@/types/set_fee_schedule/set_fee_schedule";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const setFeeScheduleItems: SetFeeScheduleItemProps[] = [
  {
    "BusinessType": "海运出口",
    "PlanName": "海出基础费用包",
    "Client": "",
    "Carrier": "",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  },
  {
    "BusinessType": "海运进口",
    "PlanName": "海运进口基础费用",
    "Client": "",
    "Carrier": "",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  },
  {
    "BusinessType": "空运进口",
    "PlanName": "空运进口费用",
    "Client": "上海沃行信息技术有限公司",
    "Carrier": "长锦商船船务有限公司",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  },
  {
    "BusinessType": "空运出口",
    "PlanName": "空运出口基础费",
    "Client": "上海沃行信息技术有限公司",
    "Carrier": "长锦商船船务有限公司",
    "BookingAgent": "",
    "CargoType": "普货",
    "LclFclType": "",
    "RouteRegion": "",
    "InputPerson": "平台客服",
    "InputDate": "2020-01-16",
    "EffectiveDate": "",
    "ExpirationDate": "",
    "AuditStatus": "未提交",
    "Auditor": "",
    "AuditTime": "",
    "PlanDescription": "",
    "DestinationAgent": ""
  }
];

export default [
  // 设置费用方案台账
  {
    url: "/api/set_fee_schedule",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: setFeeScheduleItems,
      };
    },
  },
  {
    url: "/api/set_fee_schedule/save",
    method: "POST",
    response: ({ body }: { body: SetFeeScheduleItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/set_fee_schedule/save/progress",
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