
import request, { ApiRes, requestWithProgress } from '../../request'
import { BaseTradeTermsItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_trade_terms";
import Mock from "mockjs";
//
const baseTradeTermsItems: BaseTradeTermsItemProps[] = [
    {
        "Code": "EXW",
        "EnglishName": "Ex Works",
        "ChineseName": "工厂交货",
        "Meaning": "卖方在指定地点（如工厂）将货物交给买方，买方承担全部运输及风险。",
        "ApplicableScenario": "买方自备物流，适用于熟悉运输流程的买家。",
        "Advantage": "成本最低，卖方责任最小。",
        "Disadvantage": "买方承担全部风险和费用，适合大型或复杂运输。"
    },
    {
        "Code": "FCA",
        "EnglishName": "Free Carrier",
        "ChineseName": "货交承运人",
        "Meaning": "卖方在指定地点（如仓库）将货物交给买方指定的承运人，风险转移给买方。",
        "ApplicableScenario": "适用于任何运输方式，尤其是多式联运。",
        "Advantage": "明确责任划分，适合国际物流。",
        "Disadvantage": "需提前协调承运人，可能增加沟通成本。"
    },
    {
        "Code": "FAS",
        "EnglishName": "Free Alongside Ship",
        "ChineseName": "船边交货",
        "Meaning": "卖方将货物运至指定装运港船边，买方负责装船及后续费用。",
        "ApplicableScenario": "适用于买方控制装船流程的海运场景。",
        "Advantage": "降低卖方风险，适合买方熟悉装船操作。",
        "Disadvantage": "买方需承担装船风险，可能产生额外费用。"
    },
    {
        "Code": "FOB",
        "EnglishName": "Free On Board",
        "ChineseName": "船上交货",
        "Meaning": "卖方将货物装上指定船舶，风险转移给买方，买方承担运费及保险。",
        "ApplicableScenario": "海运中最常用，适用于买方负责运输和保险的情况。",
        "Advantage": "明确风险转移点，适合买方控制运输。",
        "Disadvantage": "卖方需承担装船前所有费用，可能增加成本。"
    },
    {
        "Code": "CFR",
        "EnglishName": "Cost and Freight",
        "ChineseName": "成本加运费",
        "Meaning": "卖方承担运费至目的港，但风险在装船后转移给买方，买方需自行投保。",
        "ApplicableScenario": "适用于买方希望控制保险的海运场景。",
        "Advantage": "卖方负责运输，买方灵活选择保险。",
        "Disadvantage": "买方需自行投保，可能增加沟通成本。"
    },
    {
        "Code": "CIF",
        "EnglishName": "Cost, Insurance and Freight",
        "ChineseName": "成本、保险加运费",
        "Meaning": "卖方承担运费和最低保险至目的港，风险在装船后转移给买方。",
        "ApplicableScenario": "传统海运条款，适用于卖方希望简化保险流程的场景。",
        "Advantage": "卖方提供基本保障，适合风险厌恶型买家。",
        "Disadvantage": "保险范围有限，买方可能需额外投保。"
    },
    {
        "Code": "CPT",
        "EnglishName": "Carriage Paid To",
        "ChineseName": "运费付至指定目的地",
        "Meaning": "卖方支付运输至指定目的地的费用，但风险在交货时转移给买方。",
        "ApplicableScenario": "适用于多式联运或买方负责保险的场景。",
        "Advantage": "卖方控制运输，买方灵活选择保险。",
        "Disadvantage": "买方需自行投保，可能增加成本。"
    },
    {
        "Code": "CIP",
        "EnglishName": "Carriage and Insurance Paid to",
        "ChineseName": "运费及保险付至指定目的地",
        "Meaning": "卖方支付运输及保险费用至指定目的地，风险在交货时转移给买方。",
        "ApplicableScenario": "适用于卖方希望提供全面保障的多式联运场景。",
        "Advantage": "提供全面保障，适合高风险货物。",
        "Disadvantage": "卖方成本较高，需明确保险范围。"
    },
    {
        "Code": "DPU",
        "EnglishName": "Delivered at Place Unloaded",
        "ChineseName": "目的地卸货交货",
        "Meaning": "卖方将货物运至指定目的地并卸货，买方承担清关及后续费用。",
        "ApplicableScenario": "适用于需要卸货但无需清关的场景。",
        "Advantage": "卖方责任扩大，适合复杂运输。",
        "Disadvantage": "买方仍需处理清关及税费。"
    },
    {
        "Code": "DDP",
        "EnglishName": "Delivered Duty Paid",
        "ChineseName": "完税后交货",
        "Meaning": "卖方承担所有费用及风险，包括清关和税费，直至货物交付买方指定地点。",
        "ApplicableScenario": "适用于卖方希望全面负责的场景（如跨境电商）。",
        "Advantage": "买方零风险，适合快速交付需求。",
        "Disadvantage": "卖方成本和风险最高，需充分评估当地法规。"
    },
    {
        "Code": "DAP",
        "EnglishName": "Delivered at Place (2020) / Delivered at Terminal (2010)",
        "ChineseName": "目的地交货",
        "Meaning": "卖方将货物运至指定目的地并准备卸货，买方承担卸货及后续费用。",
        "ApplicableScenario": "适用于买方负责卸货和清关的场景（如大型设备运输）。",
        "Advantage": "卖方责任明确，适合买方熟悉当地流程。",
        "Disadvantage": "买方需承担卸货及清关风险。"
    },
    {
        "Code": "FIOST",
        "EnglishName": "Free In and Out and Stowed",
        "ChineseName": "装船、卸船、堆舱及平舱费用由卖方承担",
        "Meaning": "卖方承担装船、卸船、堆舱和平舱费用，买方承担其他费用。",
        "ApplicableScenario": "航运术语，适用于大宗货物运输（如散货）。",
        "Advantage": "明确费用划分，减少争议。",
        "Disadvantage": "卖方成本较高，需详细合同约定。"
    },
    {
        "Code": "FLO",
        "EnglishName": "Free Load and Out",
        "ChineseName": "装船及卸船费用由卖方承担",
        "Meaning": "卖方承担装船和卸船费用，买方承担其他费用。",
        "ApplicableScenario": "航运术语，适用于特定货物运输（如液体散货）。",
        "Advantage": "明确费用责任，减少买方负担。",
        "Disadvantage": "卖方成本较高，需合同明确。"
    },
    {
        "Code": "FLT",
        "EnglishName": "Freight Liner Terms",
        "ChineseName": "班轮条款",
        "Meaning": "包含装船、卸船、理舱等费用，按班轮惯例处理（非标准术语，需具体合同约定）。",
        "ApplicableScenario": "班轮运输中使用，适用于大宗或标准化货物。",
        "Advantage": "简化费用计算，适合标准化运输。",
        "Disadvantage": "非标准条款，需明确具体费用范围。"
    }
];


// 获取账单管理台账列表
export const getBaseTradeTermsList = async (): Promise<BaseTradeTermsItemProps[]> => {
    return baseTradeTermsItems;
}

// 保存账单管理
export const saveBaseTradeTerms = async (data: BaseTradeTermsItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseTradeTermsItemProps> => {
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
export const getBaseTradeTermsList = async (): Promise<BaseTradeTermsItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_trade_terms"
  })
  const responseData = response?.data as ApiRes<BaseTradeTermsItemProps[]>;
  return responseData.data || [];
}

export const saveBaseTradeTerms = (data:BaseTradeTermsItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_trade_terms/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
