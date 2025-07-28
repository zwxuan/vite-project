import Mock from "mockjs";
import { VoucherGroupingRuleItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/voucher_grouping_rule";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const voucherGroupingRuleItems: VoucherGroupingRuleItemProps[] = [
  {
    RuleCode: '1',
    BookName: '管理账套',
    RuleName: '应收发票',
    BookkeepingMethod: '普通记账',
    GroupBy: '发票号',
  },
  {
    RuleCode: '2',
    BookName: '管理账套',
    RuleName: '应付发票',
    BookkeepingMethod: '普通记账',
    GroupBy: '发票号',
  },
  {
    RuleCode: '3',
    BookName: '管理账套',
    RuleName: '实收实付',
    BookkeepingMethod: '普通记账',
    GroupBy: '销账编号',
  },
];

export default [
  // 凭证分组规则台账
  {
    url: "/api/voucher_grouping_rule",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: voucherGroupingRuleItems,
      };
    },
  },
  {
    url: "/api/voucher_grouping_rule/save",
    method: "POST",
    response: ({ body }: { body: VoucherGroupingRuleItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/voucher_grouping_rule/save/progress",
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