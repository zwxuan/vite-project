
import request, { ApiRes, requestWithProgress } from '../request'
import { CodeMappingItemProps } from "@/types/basic_manage/code_mapping";
import Mock from "mockjs";

// 模拟编码映射台账数据
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

// 模拟编码映射分录数据
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

// 获取编码映射台账列表
export const getCodeMappingList = async (): Promise<CodeMappingItemProps[]> => {
  return codeMappingItems;
}

// 获取编码映射分录列表
export const getCodeMappingEntryList = async (): Promise<CodeMappingItemProps[]> => {
  return codeMappingEntrys;
}

// 保存编码映射
export const saveCodeMapping = async (data: CodeMappingItemProps, onUploadProgress?: (progress: number) => void): Promise<CodeMappingItemProps> => {
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
// 获取编码映射台账列表
export const getCodeMappingList = async () : Promise<CodeMappingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/code_mapping"
  });
  const responseData = response?.data as ApiRes<CodeMappingItemProps[]>;
  return responseData.data || [];
}

// 获取编码映射分录列表
export const getCodeMappingEntryList = async () : Promise<CodeMappingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/code_mapping/entry"
  });
  const responseData = response?.data as ApiRes<CodeMappingItemProps[]>;
  return responseData.data || [];
}

// 保存编码映射
export const saveCodeMapping = (data:CodeMappingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/code_mapping/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

