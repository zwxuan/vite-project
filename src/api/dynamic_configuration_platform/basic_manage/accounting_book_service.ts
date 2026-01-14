
import request, { ApiRes, requestWithProgress } from '../../request'
import { AccountingBookItemProps } from "@/types/dynamic_configuration_platform/basic_manage/accounting_book";
import Mock from "mockjs";

// 模拟账套设置台账数据
const accountingBookItems:AccountingBookItemProps[] = [
  {
    "BookId": "623a8d7b1f4e5c2d98765432",
    "CompanyCode": "JT",
    "CompanyName": "集团公司",
    "BookCode": "AC001",
    "BookName": "管理账套",
    "FiscalYear": "2024",
    "Currency": "USD",
    "ThirdSystemName": "Oracle系统",
    "ApiRemark": "自动同步",
    "IsActive": 1,
    "CreatedAt": "2024-01-10 08:45:22",
    "UpdatedAt": "2024-03-05 16:20:18"
  },
  {
    "BookId": "623a8d7b1f4e5c2d98765434",
    "CompanyCode": "JT",
    "CompanyName": "集团公司",
    "BookCode": "AC002",
    "BookName": "税务账套",
    "FiscalYear": "2024",
    "Currency": "USD",
    "ThirdSystemName": "Oracle系统",
    "ApiRemark": "自动同步",
    "IsActive": 1,
    "CreatedAt": "2024-01-10 08:45:22",
    "UpdatedAt": "2024-03-05 16:20:18"
  }
];

// 获取账套设置台账列表
export const getAccountingBookList = async (): Promise<AccountingBookItemProps[]> => {
  return accountingBookItems;
}

// 保存账套设置
export const saveAccountingBook = async (data: AccountingBookItemProps, onUploadProgress?: (progress: number) => void): Promise<AccountingBookItemProps> => {
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
// 获取账套设置台账列表
export const getAccountingBookList = async () : Promise<AccountingBookItemProps[]> => {
  const reponse = await request({
    method: "GET",
    url: "/accounting_book"
  });
  const responseData = reponse?.data as ApiRes<AccountingBookItemProps[]>;
  return responseData.data || [];
}

// 保存账套设置
export const saveAccountingBook = (data:AccountingBookItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/accounting_book/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/

