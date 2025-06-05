
import request, {ApiRes,requestWithProgress } from '../request'
import { BaseFreightTermsItemProps } from "@/types/basic_manage/base_freight_terms";
import Mock from "mockjs";
//
const baseFreightTermsItems:BaseFreightTermsItemProps[] = [
    {
        "Code":"CCBYPP",
        "EnglishName":"FREIGHT COLLECT BAF YAS PREPAID",
        "ChineseName":"到付运费（含BAFYAS预付）",
        "Meaning":"运费由收货方支付，但BAF（燃油附加费）和YAS（其他附加费）由发货方预付",
        "ApplicableScenarios":"需要明确区分基础运费与其他附加费的支付责任",
        "Advantages":"降低基础运费收款风险，但需协调附加费支付",
        "Disadvantages":"收货方可能对附加费产生争议，需额外管理附加费支付流程",
        "ExchangeCode":"CCBYPP",
        "IsoCode":"CCBYPP"
    },
    {
        "Code":"3P",
        "EnglishName":"3rd Party",
        "ChineseName":"第三方支付",
        "Meaning":"运费由第三方（非托运人/收货人）支付",
        "ApplicableScenarios":"供应链中存在第三方支付方（如贸易代理、物流公司等）",
        "Advantages":"简化账务结算流程，减少直接收款压力",
        "Disadvantages":"需确认第三方支付能力及付款时效，可能存在付款延迟或违约风险",
        "ExchangeCode":"3P",
        "IsoCode":"3P"
    },
    {
        "Code":"FPD",
        "EnglishName":"FREIGHT PAYABLE AT DESTINATION",
        "ChineseName":"目的地支付运费",
        "Meaning":"运费在货物到达目的港后由收货方支付",
        "ApplicableScenarios":"跨境贸易中收货方要求延迟付款，或信用证未包含运费条款",
        "Advantages":"降低发货方资金占用，符合部分国家/地区清关要求",
        "Disadvantages":"增加货代公司收款风险，需加强收货方信用评估",
        "ExchangeCode":"FPD",
        "IsoCode":"FPD"
    },
    {
        "Code":"FAA",
        "EnglishName":"FREIGHT AS ARRANGED",
        "ChineseName":"按约定处理",
        "Meaning":"运费及相关费用按双方协商条款执行",
        "ApplicableScenarios":"特殊贸易条款或定制化服务需求",
        "Advantages":"灵活适应复杂贸易条件，满足个性化需求",
        "Disadvantages":"需额外签订补充协议，增加操作复杂性",
        "ExchangeCode":"FAA",
        "IsoCode":"FAA"
    },
    {
        "Code":"CC",
        "EnglishName":"FREIGHT COLLECT",
        "ChineseName":"到付运费",
        "Meaning":"运费由收货方在目的港支付",
        "ApplicableScenarios":"买方市场主导交易，或收货方要求控制成本",
        "Advantages":"无需预收运费，减轻发货方资金压力",
        "Disadvantages":"存在收货方拒付风险，需加强信用调查",
        "ExchangeCode":"CC",
        "IsoCode":"CC"
    },
    {
        "Code":"PP",
        "EnglishName":"FREIGHT PREPAID",
        "ChineseName":"预付运费",
        "Meaning":"运费由发货方在装运港支付",
        "ApplicableScenarios":"卖方市场主导交易，或信用证明确要求预付运费",
        "Advantages":"提前锁定资金回笼，降低收款风险",
        "Disadvantages":"发货方资金占用压力，需承担付款延迟风险",
        "ExchangeCode":"PP",
        "IsoCode":"PP"
    },
    {
        "Code":"PPBYCC",
        "EnglishName":"FREIGHT PREPAID BAF YAS COLLECT",
        "ChineseName":"预付运费（含BAFYAS到付）",
        "Meaning":"基础运费由发货方预付，BAF/YAS由收货方到付",
        "ApplicableScenarios":"市场惯例要求或特殊附加费分摊规则",
        "Advantages":"平衡双方责任，避免附加费争议",
        "Disadvantages":"需明确附加费计算方式，增加结算复杂性",
        "ExchangeCode":"PPBYCC",
        "IsoCode":"PPBYCC"
    },
    {
        "Code":"PPBYPP",
        "EnglishName":"FREIGHT PREPAID BAF YAS PREPAID",
        "ChineseName":"全部费用预付",
        "Meaning":"运费及所有附加费均由发货方在装运港支付",
        "ApplicableScenarios":"高价值货物或信用良好的长期合作客户",
        "Advantages":"完全规避运费收款风险，操作流程简化",
        "Disadvantages":"发货方资金压力最大，需承担全部付款责任",
        "ExchangeCode":"PPBYPP",
        "IsoCode":"PPBYPP"
    },
    {
        "Code":"CCBYCC",
        "EnglishName":"FREIGHT COLLECT BAF YAS COLLECT",
        "ChineseName":"全部费用到付",
        "Meaning":"运费及所有附加费均由收货方在目的港支付",
        "ApplicableScenarios":"买方强势市场或清关地特殊要求",
        "Advantages":"无需预收任何费用，完全转移收款风险",
        "Disadvantages":"收货方可能拒绝支付附加费，需强化合同约束",
        "ExchangeCode":"CCBYCC",
        "IsoCode":"CCBYCC"
    },
    {
        "Code":"PPAC",
        "EnglishName":"Prepaid and Collect",
        "ChineseName":"预付与到付混合",
        "Meaning":"部分费用预付，部分费用到付",
        "ApplicableScenarios":"多式联运或分段运输场景",
        "Advantages":"灵活分担运输成本，适应复杂物流需求",
        "Disadvantages":"需明确费用划分比例，增加账务管理难度",
        "ExchangeCode":"PPAC",
        "IsoCode":"PPAC"
    },
    {
        "Code":"EWAC",
        "EnglishName":"Elsewhere and Collect",
        "ChineseName":"第三方支付+到付",
        "Meaning":"费用由第三方支付，收货方到付",
        "ApplicableScenarios":"供应链金融或三方协议场景",
        "Advantages":"降低直接收款风险，符合三方利益分配",
        "Disadvantages":"需协调多方付款安排，可能延长结算周期",
        "ExchangeCode":"EWAC",
        "IsoCode":"EWAC"
    },
    {
        "Code":"PPAE",
        "EnglishName":"Prepaid and Elsewhere",
        "ChineseName":"预付与第三方支付混合",
        "Meaning":"部分费用预付，部分由第三方支付",
        "ApplicableScenarios":"复杂贸易结构（如转口贸易）",
        "Advantages":"灵活匹配多边贸易关系",
        "Disadvantages":"需核对多方支付凭证，增加合规审查难度",
        "ExchangeCode":"PPAE",
        "IsoCode":"PPAE"
    },
    {
        "Code":"EW",
        "EnglishName":"Elsewhere",
        "ChineseName":"第三方支付",
        "Meaning":"所有费用由第三方支付",
        "ApplicableScenarios":"供应链外包或金融服务场景",
        "Advantages":"完全转移资金责任，简化账务处理",
        "Disadvantages":"依赖第三方支付能力，存在付款不确定性",
        "ExchangeCode":"EW",
        "IsoCode":"EW"
    }
];


// 获取账单管理台账列表
export const getBaseFreightTermsList = async (): Promise<BaseFreightTermsItemProps[]> => {
  return baseFreightTermsItems;
}

// 保存账单管理
export const saveBaseFreightTerms = async (data: BaseFreightTermsItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseFreightTermsItemProps> => {
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
export const getBaseFreightTermsList = async (): Promise<BaseFreightTermsItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_freight_terms"
  })
  const responseData = response?.data as ApiRes<BaseFreightTermsItemProps[]>;
  return responseData.data || [];
}

export const saveBaseFreightTerms = (data:BaseFreightTermsItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_freight_terms/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
