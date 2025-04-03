import Mock from "mockjs";
import { CodeMappingItemProps } from "@/types/code_mapping/code_mapping";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const codeMappingItems: CodeMappingItemProps[] = [
  {
    MappingCode: Mock.mock("@id"),
    BookingName: '管理账套',
    BusinessCode: '',
    BusinessName: '合作伙伴名称1',
    FinanceCode: '0001',
    Remark: '合作伙伴对应的财务编码',
  },
  {
    MappingCode: Mock.mock("@id"),
    BookingName: '管理账套',
    BusinessCode: '',
    BusinessName: '合作伙伴名称2',
    FinanceCode: '0002',
    Remark: '合作伙伴对应的财务编码',
  },
];

const codeMappingEntrys: CodeMappingItemProps[] = [
  {
    MappingCode: Mock.mock("@id"),
    BookingName: '管理账套',
    BusinessCode: '',
    BusinessName: '应收账款',
    FinanceCode: '1131',
    Remark: '分录对应的财务编码',
  },
  {
    MappingCode: Mock.mock("@id"),
    BookingName: '管理账套',
    BusinessCode: '',
    BusinessName: '银行存款',
    FinanceCode: '1132',
    Remark: '分录对应的财务编码',
  },
  {
    MappingCode: Mock.mock("@id"),
    BookingName: '管理账套',
    BusinessCode: '',
    BusinessName: '营业收入',
    FinanceCode: '5001',
    Remark: '分录对应的财务编码',
  },
];

export default [
  // 编码映射台账
  {
    url: "/api/code_mapping",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: codeMappingItems,
      };
    },
  },
  {
    url: "/api/code_mapping/entry",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: codeMappingEntrys,
      };
    },
  },
  {
    url: "/api/code_mapping/save",
    method: "POST",
    response: ({ body }: { body: CodeMappingItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/code_mapping/save/progress",
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