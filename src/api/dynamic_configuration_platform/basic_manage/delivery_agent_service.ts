
import request, {ApiRes,requestWithProgress } from '../../request'
import { DeliveryAgentItemProps } from "@/types/dynamic_configuration_platform/basic_manage/delivery_agent";
import Mock from "mockjs";
//
const deliveryAgentItems:DeliveryAgentItemProps[] = [
    {
        Id:Mock.mock("@id"),
        AgentChineseName:'美西国际物流有限公司',
        AgentEnglishName:'ABC Logistics Inc. (USA)',
        AgentEnglishAbbreviation:'ABC LA',
        AffiliatedBranchCompany:'美国分公司',
        IsDefault:'是',
        AgentInfo:'地址:123 Main St, Los Angeles, CA 90001, USA;联系人:Lisa Chen (换单操作经理);电话/邮箱:+1 310-XXX-XXXX / docs.lax@abclogistics.com;换单要求：需提供正本HBL或电放保函+授权书；截止时间：工作日15:00前;备注:擅长处理MSC、CMA船公司；提供加急服务（额外收费）;'
    },
    {
        Id:Mock.mock("@id"),
        AgentChineseName:'上海美西国际物流有限公司',
        AgentEnglishName:'ABC Logistics Inc. (China)',
        AgentEnglishAbbreviation:'ABC LA',
        AffiliatedBranchCompany:'上海分公司',
        IsDefault:'否',
        AgentInfo:'地址:上海XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
    },
    {
        Id:Mock.mock("@id"),
        AgentChineseName:'上海美西国际物流有限公司',
        AgentEnglishName:'ABC Logistics Inc. (China)',
        AgentEnglishAbbreviation:'ABC LA',
        AffiliatedBranchCompany:'上海分公司',
        IsDefault:'否',
        AgentInfo:''
    }
];


// 获取账单管理台账列表
export const getDeliveryAgentList = async (): Promise<DeliveryAgentItemProps[]> => {
  return deliveryAgentItems;
}

// 保存账单管理
export const saveDeliveryAgent = async (data: DeliveryAgentItemProps, onUploadProgress?: (progress: number) => void): Promise<DeliveryAgentItemProps> => {
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
export const getDeliveryAgentList = async (): Promise<DeliveryAgentItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/delivery_agent"
  })
  const responseData = response?.data as ApiRes<DeliveryAgentItemProps[]>;
  return responseData.data || [];
}

export const saveDeliveryAgent = (data:DeliveryAgentItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/delivery_agent/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
