
import request, { ApiRes, requestWithProgress } from '../../request'
import { BaseTransportationTermsItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_transportation_terms";
import Mock from "mockjs";
//
const baseTransportationTermsItems: BaseTransportationTermsItemProps[] = [
    {
        "Code": "CY-SD",
        "EnglishName": "CY to SD",
        "ChineseName": "集装箱堆场到堆场",
        "Meaning": "从发货人指定的集装箱堆场到收货人指定的堆场。",
        "ApplicableScenarios": "整箱货物运输，无需拆箱或分拣。",
        "Advantages": "操作简单，责任明确；适合整箱货物。",
        "Disadvantages": "需要双方提供堆场信息；不包含装卸费用。"
    },
    {
        "Code": "CY-SHIPHK",
        "EnglishName": "CY to Ship at Hong Kong",
        "ChineseName": "集装箱堆场到香港船舶",
        "Meaning": "从集装箱堆场到香港船舶的运输。",
        "ApplicableScenarios": "货物需在香港装船的整箱运输。",
        "Advantages": "适合需要通过香港中转的整箱货物。",
        "Disadvantages": "仅限特定港口（如香港）；需协调堆场和船期。"
    },
    {
        "Code": "CFS-CFS",
        "EnglishName": "CFS to CFS",
        "ChineseName": "拼箱到拼箱",
        "Meaning": "从发货人拼箱仓库到收货人拼箱仓库，需分拣和重新拼箱。",
        "ApplicableScenarios": "小批量货物，需在目的港拼箱后再分发。",
        "Advantages": "成本低，适合多批次货物整合；责任明确。",
        "Disadvantages": "运输时间长；需多次装卸分拣，增加货物损坏风险。"
    },
    {
        "Code": "CFS-FO",
        "EnglishName": "CFS to Free Out",
        "ChineseName": "拼箱到收货人仓库（买方清关）",
        "Meaning": "从拼箱仓库到收货人仓库，买方负责清关和卸货。",
        "ApplicableScenarios": "买方具备清关能力，需自主安排卸货。",
        "Advantages": "买方控制清关流程；卖方责任终止于卸货前。",
        "Disadvantages": "买方需承担清关和卸货风险；卖方不负责后续问题。"
    },
    {
        "Code": "CY-CY",
        "EnglishName": "CY to CY",
        "ChineseName": "集装箱堆场到堆场（整箱）",
        "Meaning": "从发货人堆场到收货人堆场，无需拆箱。",
        "ApplicableScenarios": "整箱货物运输，适合跨国长途运输。",
        "Advantages": "操作简单，责任明确；适合整箱货物。",
        "Disadvantages": "不包含装卸费用；需双方提供堆场信息。"
    },
    {
        "Code": "CY-RAILRP",
        "EnglishName": "CY to Rail Ramp",
        "ChineseName": "集装箱堆场到铁路场站",
        "Meaning": "从集装箱堆场到铁路场站的运输。",
        "ApplicableScenarios": "需通过铁路运输的整箱货物（如跨国联运）。",
        "Advantages": "结合铁路运输优势，适合长距离或跨境运输。",
        "Disadvantages": "需协调铁路场站和堆场；装卸流程复杂。"
    },
    {
        "Code": "CY-Hook",
        "EnglishName": "CY to Hook",
        "ChineseName": "集装箱堆场到吊钩",
        "Meaning": "从堆场到船舶吊钩位置的运输。",
        "ApplicableScenarios": "集装箱装船前的短途运输。",
        "Advantages": "专用于装船前的吊装环节；操作高效。",
        "Disadvantages": "仅限装船前使用；不涉及后续运输。"
    },
    {
        "Code": "CFS-DOOR",
        "EnglishName": "CFS to Door",
        "ChineseName": "拼箱门到门",
        "Meaning": "从拼箱仓库到收货人门口，卖方承担运费和保险。",
        "ApplicableScenarios": "小批量货物，买方需自行清关。",
        "Advantages": "成本低，适合中小批量货物；卖方责任明确。",
        "Disadvantages": "买方需承担清关和卸货风险；运输时间较长。"
    },
    {
        "Code": "CY-FO",
        "EnglishName": "CY to Free Out",
        "ChineseName": "堆场到收货人仓库（买方清关）",
        "Meaning": "从堆场到收货人仓库，买方负责清关和卸货。",
        "ApplicableScenarios": "买方具备清关能力，需自主安排卸货。",
        "Advantages": "买方控制清关流程；卖方责任终止于卸货前。",
        "Disadvantages": "买方需承担清关和卸货风险；卖方不负责后续问题。"
    },
    {
        "Code": "DOOR-DOOR",
        "EnglishName": "Door to Door",
        "ChineseName": "门到门运输",
        "Meaning": "从发货人仓库到收货人仓库，全程运输服务。",
        "ApplicableScenarios": "全程物流需求，适合整箱或拼箱货物。",
        "Advantages": "一站式服务，责任明确；适合对时效要求高的客户。",
        "Disadvantages": "成本较高；需协调多方资源。"
    },
    {
        "Code": "DOOR-CFS",
        "EnglishName": "Door to CFS",
        "ChineseName": "门到拼箱仓库",
        "Meaning": "从发货人仓库到拼箱仓库，需分拣后与其他货物拼箱。",
        "ApplicableScenarios": "多批次小货物需整合后再出口。",
        "Advantages": "降低单票货物运输成本；适合多批次发货。",
        "Disadvantages": "需等待拼箱完成，运输时间较长。"
    },
    {
        "Code": "CY-RAMP",
        "EnglishName": "CY to Ramp",
        "ChineseName": "堆场到装货坡道",
        "Meaning": "从堆场到装货坡道的运输。",
        "ApplicableScenarios": "货物需通过坡道装车（如卡车或火车）。",
        "Advantages": "专用于装车前的短途运输；操作高效。",
        "Disadvantages": "仅限装货环节使用；不涉及后续运输。"
    },
    {
        "Code": "CY-DOOR",
        "EnglishName": "CY to Door",
        "ChineseName": "堆场到门",
        "Meaning": "从堆场到收货人仓库，卖方承担运费和保险。",
        "ApplicableScenarios": "整箱货物，买方需自行清关和卸货。",
        "Advantages": "操作简单，适合整箱货物；卖方责任明确。",
        "Disadvantages": "买方需承担清关和卸货风险；成本较高。"
    },
    {
        "Code": "CFS-CY",
        "EnglishName": "CFS to CY",
        "ChineseName": "拼箱到堆场",
        "Meaning": "从拼箱仓库到收货人堆场，需分拣后装箱。",
        "ApplicableScenarios": "小批量货物需在目的港整箱交付。",
        "Advantages": "降低单票货物运输成本；适合多批次整合。",
        "Disadvantages": "需等待拼箱完成，运输时间较长。"
    },
    {
        "Code": "DOOR-CY",
        "EnglishName": "Door to CY",
        "ChineseName": "门到堆场",
        "Meaning": "从发货人仓库到堆场，需装箱后运输。",
        "ApplicableScenarios": "整箱货物需在发货地装箱后直接运输。",
        "Advantages": "操作简单，适合整箱货物；卖方责任明确。",
        "Disadvantages": "需协调装箱和堆场安排；不包含后续运输费用。"
    },
    {
        "Code": "LOOSE-LOO",
        "EnglishName": "Loose to Loose",
        "ChineseName": "散货到散货",
        "Meaning": "以散货形式运输，无需包装或装箱。",
        "ApplicableScenarios": "散装货物（如煤炭、矿石、谷物）运输。",
        "Advantages": "成本低；适合大宗散货。",
        "Disadvantages": "需专用装卸设备；货物易受污染或损耗。"
    }
];


// 获取账单管理台账列表
export const getBaseTransportationTermsList = async (): Promise<BaseTransportationTermsItemProps[]> => {
    return baseTransportationTermsItems;
}

// 保存账单管理
export const saveBaseTransportationTerms = async (data: BaseTransportationTermsItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseTransportationTermsItemProps> => {
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
export const getBaseTransportationTermsList = async (): Promise<BaseTransportationTermsItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_transportation_terms"
  })
  const responseData = response?.data as ApiRes<BaseTransportationTermsItemProps[]>;
  return responseData.data || [];
}

export const saveBaseTransportationTerms = (data:BaseTransportationTermsItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_transportation_terms/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
