
import Mock from "mockjs";
import { OrderDocumentItemProps } from "@/types/business_manage/order_document/order_document";
import request, { ApiRes, requestWithProgress } from '../request';

// 模拟订单文档台账数据
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

// 获取订单文档台账列表
export const getOrderDocumentList = async (): Promise<OrderDocumentItemProps[]> => {
  return orderDocumentItems;
}

// 保存订单文档台账
export const saveOrderDocument = async (data: OrderDocumentItemProps, onUploadProgress?: (progress: number) => void): Promise<OrderDocumentItemProps> => {
  // 模拟上传进度
  if (onUploadProgress) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      onUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  }
  return data;
}

// 原有API接口代码（已注释）
/*

// 获取币制信息
export const getOrderDocumentList = async () : Promise<OrderDocumentItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/order_document"
  });
  const responseData = response?.data as ApiRes<OrderDocumentItemProps[]>;
  return responseData.data || [];
}

export const saveOrderDocument = (data:OrderDocumentItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/order_document/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/