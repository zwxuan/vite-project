import Mock from "mockjs";
import { AccountMappingItemProps } from "@/types/basic_manage/account_mapping/account_mapping";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const accountMappingItems:AccountMappingItemProps[] = [
    {
        MappingId:Mock.mock("@id"),
        BookName:'管理账套',
        RuleName:'应收发票',
        EntryName:'应收账款',
        AccountName:'应收账款USD',
        AccountGroupBy:'币制=USD',
        FinanceCode:'113101',
        Remark:'科目内容说明',
    },
    {
      MappingId:Mock.mock("@id"),
      BookName:'管理账套',
      RuleName:'应收发票',
      EntryName:'营业收入',
      AccountName:'营业收入',
      AccountGroupBy:'',
      FinanceCode:'5001',
      Remark:'科目内容说明',
  },
];
 
export default [
  // 科目映射台账
  {
    url: "/api/account_mapping",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: accountMappingItems,
      };
    },
  },
  {
    url: "/api/account_mapping/save",
    method: "POST",
    response: ({ body }: { body: AccountMappingItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/account_mapping/save/progress",
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