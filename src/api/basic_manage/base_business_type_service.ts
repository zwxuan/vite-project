
import request, { ApiRes, requestWithProgress } from '../request'
import { BaseBusinessTypeItemProps } from "@/types/basic_manage/base_business_type";
import Mock from "mockjs";
//
const baseBusinessTypeItems: BaseBusinessTypeItemProps[] = [
    {
        "BusinessTypeCode": "LN",
        "BusinessTypeName": "LN航线非合约货",
        "BusinessTypeMeaning": "临时性或小批量订单的非合约货物。",
        "ApplicableScenario": "临时需求、小批量货物。",
        "Advantage": "灵活，无合约约束。",
        "Disadvantage": "运费高，舱位不稳定。"
    },
    {
        "BusinessTypeCode": "LD",
        "BusinessTypeName": "LD航线线上货",
        "BusinessTypeMeaning": "线上订单货物，通过系统对接运输。",
        "ApplicableScenario": "跨境电商订单、快速响应需求。",
        "Advantage": "系统化高效，减少人工操作。",
        "Disadvantage": "依赖平台技术，规则变动风险。"
    },
    {
        "BusinessTypeCode": "CC",
        "BusinessTypeName": "CC同行订舱",
        "BusinessTypeMeaning": "联合同行订舱，分摊成本。",
        "ApplicableScenario": "小批量联合运输、高运力需求。",
        "Advantage": "成本低，舱位利用率高。",
        "Disadvantage": "协调复杂，合作方风险。"
    },
    {
        "BusinessTypeCode": "IR",
        "BusinessTypeName": "IR国际铁路",
        "BusinessTypeMeaning": "国际铁路运输（如中欧班列）。",
        "ApplicableScenario": "大宗货物、时效要求中等。",
        "Advantage": "时效稳定，碳排放低。",
        "Disadvantage": "路线有限，装卸流程复杂。"
    },
    {
        "BusinessTypeCode": "LC",
        "BusinessTypeName": "LC航线合约货",
        "BusinessTypeMeaning": "长期合约航线货物，享受固定运价。",
        "ApplicableScenario": "大宗长期运输、价格敏感客户。",
        "Advantage": "成本可控，舱位保障强。",
        "Disadvantage": "需签订长期合约，灵活性低。"
    },
    {
        "BusinessTypeCode": "TC",
        "BusinessTypeName": "TC代拉代报业务",
        "BusinessTypeMeaning": "代理提货和清关业务。",
        "ApplicableScenario": "无物流团队客户、复杂清关需求。",
        "Advantage": "减少客户操作，全流程服务。",
        "Disadvantage": "风险集中，成本较高。"
    },
    {
        "BusinessTypeCode": "SC",
        "BusinessTypeName": "SC自拼",
        "BusinessTypeMeaning": "货代自行组织拼箱。",
        "ApplicableScenario": "多客户同目的地、货量不足。",
        "Advantage": "成本优化，资源整合。",
        "Disadvantage": "协调复杂，责任集中。"
    },
    {
        "BusinessTypeCode": "LB",
        "BusinessTypeName": "LB航线直约货",
        "BusinessTypeMeaning": "与船公司直约的航线货物。",
        "ApplicableScenario": "大宗长期运输、高价值货物。",
        "Advantage": "运价优惠，舱位优先。",
        "Disadvantage": "门槛高（最低货量），合约灵活性低。"
    },
    {
        "BusinessTypeCode": "BK",
        "BusinessTypeName": "BK代理订舱货",
        "BusinessTypeMeaning": "代理客户向船公司订舱。",
        "ApplicableScenario": "中小型客户、舱位紧张航线。",
        "Advantage": "专业服务，优先舱位。",
        "Disadvantage": "代理费用高，依赖船公司资源。"
    },
    {
        "BusinessTypeCode": "LD",
        "BusinessTypeName": "LD航线合约货",
        "BusinessTypeMeaning": "长期合约航线货物（LD航线）。",
        "ApplicableScenario": "大宗长期运输、价格敏感客户。",
        "Advantage": "成本可控，舱位保障强。",
        "Disadvantage": "需签订长期合约，灵活性低。"
    },
    {
        "BusinessTypeCode": "BK",
        "BusinessTypeName": "BK订舱货业务",
        "BusinessTypeMeaning": "代理订舱的货物（可能涉及特定航线）。",
        "ApplicableScenario": "舱位紧张航线、快速锁定需求。",
        "Advantage": "专业服务，减少客户操作。",
        "Disadvantage": "代理费用高，渠道依赖性强。"
    },
    {
        "BusinessTypeCode": "FBA",
        "BusinessTypeName": "FBA跨境电商业务",
        "BusinessTypeMeaning": "亚马逊FBA仓库直发运输。",
        "ApplicableScenario": "跨境电商卖家、快速清关需求。",
        "Advantage": "直接对接FBA系统，降低仓储成本。",
        "Disadvantage": "严格规则要求，滞留费风险。"
    },
    {
        "BusinessTypeCode": "TC",
        "BusinessTypeName": "TC海外代拉代报业务",
        "BusinessTypeMeaning": "海外目的地代理提货和清关。",
        "ApplicableScenario": "无海外团队客户、复杂清关国家。",
        "Advantage": "本地化服务，降低操作风险。",
        "Disadvantage": "成本高，依赖海外合作方。"
    },
    {
        "BusinessTypeCode": "LO",
        "BusinessTypeName": "LO航线外配货",
        "BusinessTypeMeaning": "联合外部资源拼货的航线货物。",
        "ApplicableScenario": "本地资源不足、跨区域拼箱。",
        "Advantage": "成本优化，扩大拼箱规模。",
        "Disadvantage": "合作方资质风险，责任分担复杂。"
    }
];


// 获取账单管理台账列表
export const getBaseBusinessTypeList = async (): Promise<BaseBusinessTypeItemProps[]> => {
    return baseBusinessTypeItems;
}

// 保存账单管理
export const saveBaseBusinessType = async (data: BaseBusinessTypeItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseBusinessTypeItemProps> => {
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
export const getBaseBusinessTypeList = async (): Promise<BaseBusinessTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_business_type"
  })
  const responseData = response?.data as ApiRes<BaseBusinessTypeItemProps[]>;
  return responseData.data || [];
}

export const saveBaseBusinessType = (data:BaseBusinessTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_business_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
