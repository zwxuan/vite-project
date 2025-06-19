
import request, {ApiRes,requestWithProgress } from '../request'
import { InternalAgentSettlementItemProps } from "@/types/cost_manage/internal_agent_settlement";
import Mock from "mockjs";
//
const internalAgentSettlementItems:InternalAgentSettlementItemProps[] = [
    {
        Id:Mock.mock("@id"),
        SettlementNumber:'SETT001',
        OrderNumber:'ORDER001',
        ServiceNumber:'SERVICE001',
        CostId:'COST001',
        CostName:'代理费',
        Currency:'RMB',
        DomesticToHk:1000,
        HkReceiveDomestic:1000,
        HkAgentPayment:1000,
        Status:'已结算',
    },
    {
        Id:'ICE002',
        SettlementNumber:'SETT002',
        OrderNumber:'ORDER002',
        ServiceNumber:'SERVICE002',
        CostId:'COST002',
        CostName:'代理费',
        Currency:'RMB',
        DomesticToHk:1000,
        HkReceiveDomestic:1000,
        HkAgentPayment:1000,
        Status:'已结算',
    },
    {
        Id:'ICE003',
        SettlementNumber:'SETT003',
        OrderNumber:'ORDER003',
        ServiceNumber:'SERVICE003',
        CostId:'COST003',
        CostName:'代理费',
        Currency:'RMB',
        DomesticToHk:1000,
        HkReceiveDomestic:1000,
        HkAgentPayment:1000,
        Status:'已结算',
    },
    {
        Id:'ICE004',
        SettlementNumber:'SETT004',
        OrderNumber:'ORDER004',
        ServiceNumber:'SERVICE004',
        CostId:'COST004',
        CostName:'代理费',
        Currency:'RMB',
        DomesticToHk:1000,
        HkReceiveDomestic:1000,
        HkAgentPayment:1000,
        Status:'已结算',
    },
    {
        Id:'ICE005',
        SettlementNumber:'SETT005',
        OrderNumber:'ORDER005',
        ServiceNumber:'SERVICE005',
        CostId:'COST005',
        CostName:'代理费',
        Currency:'RMB',
        DomesticToHk:1000,
        HkReceiveDomestic:1000,
        HkAgentPayment:1000,
        Status:'已结算',
    },
    {
        Id:'ICE006',
        SettlementNumber:'SETT006',
        OrderNumber:'ORDER006',
        ServiceNumber:'SERVICE006',
        CostId:'COST006',
        CostName:'代理费',
        Currency:'RMB',
        DomesticToHk:1000,
        HkReceiveDomestic:1000,
        HkAgentPayment:1000,
        Status:'已结算',
    },
    {
        Id:'ICE007',
        SettlementNumber:'SETT007',
        OrderNumber:'ORDER007',
        ServiceNumber:'SERVICE007',
        CostId:'COST007',
        CostName:'代理费',
        Currency:'RMB',
        DomesticToHk:1000,
        HkReceiveDomestic:1000,
        HkAgentPayment:1000,
        Status:'已结算',
    },
];


// 获取账单管理台账列表
export const getInternalAgentSettlementList = async (): Promise<InternalAgentSettlementItemProps[]> => {
  return internalAgentSettlementItems;
}

// 保存账单管理
export const saveInternalAgentSettlement = async (data: InternalAgentSettlementItemProps, onUploadProgress?: (progress: number) => void): Promise<InternalAgentSettlementItemProps> => {
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
export const getInternalAgentSettlementList = async (): Promise<InternalAgentSettlementItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/internal_agent_settlement"
  })
  const responseData = response?.data as ApiRes<InternalAgentSettlementItemProps[]>;
  return responseData.data || [];
}

export const saveInternalAgentSettlement = (data:InternalAgentSettlementItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/internal_agent_settlement/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
