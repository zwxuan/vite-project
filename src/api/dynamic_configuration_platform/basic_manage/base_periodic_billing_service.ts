
import request, {ApiRes,requestWithProgress } from '../../request'
import { BasePeriodicBillingItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_periodic_billing";
import Mock from "mockjs";
//
const basePeriodicBillingItems:BasePeriodicBillingItemProps[] = [
    {
        "Code": "CYC-001",
        "EnName": "Per Transaction Invoicing",
        "CnName": "单笔开票",
        "Meaning": "每发生一笔交易立即开具发票",
        "Scenario": "一次性销售大额设备",
        "Advantage": "回款快对账清晰",
        "Disadvantage": "开票频繁工作量大"
    },
    {
        "Code": "CYC-002",
        "EnName": "Monthly Invoicing",
        "CnName": "月度开票",
        "Meaning": "按月汇总交易统一开票",
        "Scenario": "长期供货月结客户",
        "Advantage": "减少开票提升效率",
        "Disadvantage": "存在账期回款延迟"
    },
    {
        "Code": "CYC-003",
        "EnName": "Quarterly Invoicing",
        "CnName": "季度开票",
        "Meaning": "每季度汇总后开具发票",
        "Scenario": "年度服务分季结算",
        "Advantage": "匹配预算管理周期",
        "Disadvantage": "资金回笼周期较长"
    },
    {
        "Code": "CYC-004",
        "EnName": "Milestone Based Invoicing",
        "CnName": "按里程碑开票",
        "Meaning": "按项目进度节点开票",
        "Scenario": "软件开发项目外包",
        "Advantage": "回款与进度相匹配",
        "Disadvantage": "节点确认易生争议"
    },
    {
        "Code": "CYC-005",
        "EnName": "Annual Invoicing",
        "CnName": "年度开票",
        "Meaning": "一年一次开具总发票",
        "Scenario": "会员费年费服务",
        "Advantage": "极大简化开票流程",
        "Disadvantage": "现金流压力较为集中"
    }
];


// 获取账单管理台账列表
export const getBasePeriodicBillingList = async (): Promise<BasePeriodicBillingItemProps[]> => {
  return basePeriodicBillingItems;
}

// 保存账单管理
export const saveBasePeriodicBilling = async (data: BasePeriodicBillingItemProps, onUploadProgress?: (progress: number) => void): Promise<BasePeriodicBillingItemProps> => {
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
export const getBasePeriodicBillingList = async (): Promise<BasePeriodicBillingItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_periodic_billing"
  })
  const responseData = response?.data as ApiRes<BasePeriodicBillingItemProps[]>;
  return responseData.data || [];
}

export const saveBasePeriodicBilling = (data:BasePeriodicBillingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_periodic_billing/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
