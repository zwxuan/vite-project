
import request, {ApiRes,requestWithProgress } from '../request'
import { BaseSettlementMethodItemProps } from "@/types/basic_manage/base_settlement_method/base_settlement_method";
import Mock from "mockjs";
//
const baseSettlementMethodItems:BaseSettlementMethodItemProps[] = [
    {
        "Code":"system_0003",
        "SettlementMethodCn":"现金返利",
        "SettlementMethodEn":"Cash Rebate",
        "EnabledStatus":"已启用",
        "IsDefault":"否",
        "ApplicableScenario":"促销活动、长期合作客户"
    },
    {
        "Code":"system_0004",
        "SettlementMethodCn":"票据结算",
        "SettlementMethodEn":"Bill Settlement",
        "EnabledStatus":"已启用",
        "IsDefault":"否",
        "ApplicableScenario":"延期付款、信用交易"
    },
    {
        "Code":"system_0001",
        "SettlementMethodCn":"银行转账",
        "SettlementMethodEn":"Bank Transfer",
        "EnabledStatus":"已启用",
        "IsDefault":"否",
        "ApplicableScenario":"大额交易、账期结算"
    },
    {
        "Code":"system_0002",
        "SettlementMethodCn":"现金收付款",
        "SettlementMethodEn":"Cash Payment",
        "EnabledStatus":"已启用",
        "IsDefault":"否",
        "ApplicableScenario":"小额交易、即时结算"
    },
    {
        "Code":"system_0005",
        "SettlementMethodCn":"支票结算",
        "SettlementMethodEn":"Check Settlement",
        "EnabledStatus":"已启用",
        "IsDefault":"否",
        "ApplicableScenario":"企业间转账、延期付款、信用交易、跨区域商品\/劳务交易"
    },
    {
        "Code":"system_0006",
        "SettlementMethodCn":"退款转预收",
        "SettlementMethodEn":"Refund to Prepayment",
        "EnabledStatus":"已启用",
        "IsDefault":"否",
        "ApplicableScenario":"退货后保留资金、客户信用管理、财务账务优化、政策性要求"
    }
];


// 获取账单管理台账列表
export const getBaseSettlementMethodList = async (): Promise<BaseSettlementMethodItemProps[]> => {
  return baseSettlementMethodItems;
}

// 保存账单管理
export const saveBaseSettlementMethod = async (data: BaseSettlementMethodItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseSettlementMethodItemProps> => {
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


/*
// 获取币制信息
export const getBaseSettlementMethodList = async (): Promise<BaseSettlementMethodItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_settlement_method"
  })
  const responseData = response?.data as ApiRes<BaseSettlementMethodItemProps[]>;
  return responseData.data || [];
}

export const saveBaseSettlementMethod = (data:BaseSettlementMethodItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_settlement_method/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
