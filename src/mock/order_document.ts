import Mock from "mockjs";
import { OrderDocumentItemProps } from "@/types/business_manage/order_document";
import { IncomingMessage, ServerResponse } from 'http';

// 修正icon的类型问题，因为JSX元素不能作为JSON对象的一部分，这里已经改为字符串
const orderDocumentItems: OrderDocumentItemProps[] = [
  {
    FileName: `${Object.values(Mock.mock({ "object|1": { "V3-海运托书_AFS2007004": "V3-海运托书_AFS2007004", "未收对账表（按工作号）": "未收对账表（按工作号）", "对单确认模块_AFS2007004": "对单确认模块_AFS2007004" } }).object)[0]}`,
    Version: '1.0',
    FileType: `${Object.values(Mock.mock({ "object|1": { "jpg": "jpg", "xls": "xls", "pdf": "pdf", "doc": "doc" } }).object)[0]}`,
    FileFormat: `${Object.values(Mock.mock({ "object|1": { "application/octet-stream": "application/octet-stream", "application/pdf": "application/pdf" } }).object)[0]}`,
    FileSize: Mock.mock('@string("number", 1, 3)'),
    CreatedBy: Mock.mock('@cname()'),
    CreatedDate: Mock.mock('@datetime()'),
    FileSource: `${Object.values(Mock.mock({ "object|1": { "仓储系统": "仓储系统", "报关系统": "报关系统", "海运系统": "海运系统" } }).object)[0]}`,
    AttributeDetails: '',
    SyncStatus: '未同步',
    ExternalFileType: '',
    LastSyncTime: Mock.mock('@datetime()'),
    Operation: Mock.mock('@cname()'),
  },
  {
    FileName: `${Object.values(Mock.mock({ "object|1": { "V3-海运托书_AFS2007004": "V3-海运托书_AFS2007004", "未收对账表（按工作号）": "未收对账表（按工作号）", "对单确认模块_AFS2007004": "对单确认模块_AFS2007004" } }).object)[0]}`,
    Version: '1.0',
    FileType: `${Object.values(Mock.mock({ "object|1": { "jpg": "jpg", "xls": "xls", "pdf": "pdf", "doc": "doc" } }).object)[0]}`,
    FileFormat: `${Object.values(Mock.mock({ "object|1": { "application/octet-stream": "application/octet-stream", "application/pdf": "application/pdf" } }).object)[0]}`,
    FileSize: Mock.mock('@string("number", 1, 3)'),
    CreatedBy: Mock.mock('@cname()'),
    CreatedDate: Mock.mock('@datetime()'),
    FileSource: `${Object.values(Mock.mock({ "object|1": { "仓储系统": "仓储系统", "报关系统": "报关系统", "海运系统": "海运系统" } }).object)[0]}`,
    AttributeDetails: '',
    SyncStatus: '未同步',
    ExternalFileType: '',
    LastSyncTime: Mock.mock('@datetime()'),
    Operation: Mock.mock('@cname()'),
  },
  {
    FileName: `${Object.values(Mock.mock({ "object|1": { "V3-海运托书_AFS2007004": "V3-海运托书_AFS2007004", "未收对账表（按工作号）": "未收对账表（按工作号）", "对单确认模块_AFS2007004": "对单确认模块_AFS2007004" } }).object)[0]}`,
    Version: '1.0',
    FileType: `${Object.values(Mock.mock({ "object|1": { "jpg": "jpg", "xls": "xls", "pdf": "pdf", "doc": "doc" } }).object)[0]}`,
    FileFormat: `${Object.values(Mock.mock({ "object|1": { "application/octet-stream": "application/octet-stream", "application/pdf": "application/pdf" } }).object)[0]}`,
    FileSize: Mock.mock('@string("number", 1, 3)'),
    CreatedBy: Mock.mock('@cname()'),
    CreatedDate: Mock.mock('@datetime()'),
    FileSource: `${Object.values(Mock.mock({ "object|1": { "仓储系统": "仓储系统", "报关系统": "报关系统", "海运系统": "海运系统" } }).object)[0]}`,
    AttributeDetails: '',
    SyncStatus: '未同步',
    ExternalFileType: '',
    LastSyncTime: Mock.mock('@datetime()'),
    Operation: Mock.mock('@cname()'),
  },
];

export default [
  // 订单文档台账
  {
    url: "/api/order_document",
    method: "GET",
    response: () => {
      return {
        code: 200,
        success: true,
        message: "请求成功。",
        data: orderDocumentItems,
      };
    },
  },
  {
    url: "/api/order_document/save",
    method: "POST",
    response: ({ body }: { body: OrderDocumentItemProps }) => {
      return {
        code: 200,
        success: true,
        message: "开始处理",
        data: body
      };
    }
  },
  {
    url: "/api/order_document/save/progress",
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