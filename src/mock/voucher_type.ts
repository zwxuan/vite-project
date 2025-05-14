import Mock from "mockjs";
import { VoucherTypeItemProps } from "@/types/basic_manage/voucher_type/voucher_type";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const voucherTypeItems: VoucherTypeItemProps[] = [
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '冲销凭证',
    TypeRemark: '应收与应付冲销时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '转帐凭证',
    TypeRemark: '转帐凭证',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '红冲凭证',
    TypeRemark: '红冲蓝色凭证时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '实收付凭证',
    TypeRemark: '实收付凭证时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '付款凭证',
    TypeRemark: '涉及付款时使用',
    TypeShortName: '记',
  },
  {
    TypeCode: Mock.mock("@id"),
    BookName: '管理账套',
    TypeName: '收款凭证',
    TypeRemark: '涉及收款时使用',
    TypeShortName: '记',
  },
];

export default [
  // 凭证类型台账
  {
    url: "/api/voucher_type",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: voucherTypeItems,
      };
    },
  },
  {
    url: "/api/voucher_type/save",
    method: "POST",
    response: ({ body }: { body: VoucherTypeItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/voucher_type/save/progress",
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