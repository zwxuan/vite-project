import Mock from "mockjs";
import { SummaryRuleItemProps } from "@/types/summary_rule/summary_rule";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const summaryRuleItems:SummaryRuleItemProps[] = [
    {
        SummaryRuleCode:Mock.mock("@id"),
        BookName:'管理账套',
        RuleName:'应收发票',
        EntryName:'应收账款',
        GroupBy:'发票号-结算单位',
    },  
    {
      SummaryRuleCode:Mock.mock("@id"),
      BookName:'管理账套',
      RuleName:'实收实付',
      EntryName:'银行存款',
      GroupBy:'银行存款-银行账号',
  },
];
 
export default [
  // 分录摘要规则台账
  {
    url: "/api/summary_rule",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: summaryRuleItems,
      };
    },
  },
  {
    url: "/api/summary_rule/save",
    method: "POST",
    response: ({ body }: { body: SummaryRuleItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/summary_rule/save/progress",
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