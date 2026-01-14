
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseSettlementCycleItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_settlement_cycle";
import Mock from "mockjs";
//
const baseSettlementCycleItems:BaseSettlementCycleItemProps[] = [
  {
    "Code": "DAILY",
    "EnName": "Daily Invoicing",
    "CnName": "日结开票",
    "Meaning": "每日汇总当日所有交易记录并自动生成发票",
    "Scenario": "适用于高频交易、资金周转要求高的场景，例如连锁便利店每日配送结算、生鲜电商平台与供应商的日清日结合作、外卖平台与骑手的每日服务费结算等。此类场景要求财务数据及时同步，便于对账和资金管理。",
    "Advantage": "资金回笼迅速，财务对账及时，提升供应商信任度",
    "Disadvantage": "开票频率高，系统负载大，异常处理成本较高"
  },
  {
    "Code": "T+0",
    "EnName": "T Plus Zero",
    "CnName": "T+0当日开票",
    "Meaning": "交易发生当天即完成开票，通常在支付成功后立即触发",
    "Scenario": "适用于实时性要求极高的业务，如加油站即时开票、大型商超POS系统现结开票、SaaS平台用户按次付费后立即获取发票用于报销等。常见于B2C场景中客户需要‘交易即发票’的体验。",
    "Advantage": "客户体验好，支持即时报销，提升服务满意度",
    "Disadvantage": "存在交易冲正风险，若后续退款需频繁红冲发票，增加税务合规压力"
  },
  {
    "Code": "T+1",
    "EnName": "T Plus One",
    "CnName": "T+1次日开票",
    "Meaning": "交易发生后次日即完成开票，通常在支付成功后次日触发",
    "Scenario": "广泛应用于主流支付平台和电商平台，如微信支付、支付宝对商户的结算开票，或线上教育平台在课程购买次日统一开票。适用于需要一定风控审核时间但又不能延迟太久的场景，兼顾效率与安全。",
    "Advantage": "平衡风控与效率，适合自动化批量处理，降低系统瞬时压力",
    "Disadvantage": "节假日可能顺延，导致客户感知延迟，影响报销时效"
  },
  {
    "Code": "WEEKLY",
    "EnName": "Weekly Invoicing",
    "CnName": "周结开票",
    "Meaning": "每周固定时间（如每周一）对上周交易进行汇总并开具发票",
    "Scenario": "适用于中等交易频率且合作稳定的B2B业务，如连锁餐饮品牌与食材供应商的每周集中采购结算、区域物流服务商与电商平台的周度配送费用结算、外包客服团队按周统计服务工时后开票等。",
    "Advantage": "减少开票次数，降低财务人工成本，便于集中对账",
    "Disadvantage": "客户回款周期较长，企业现金流压力增加，需较强信用管理机制"
  },
  {
    "Code": "BIWEEKLY",
    "EnName": "Bi-weekly Invoicing",
    "CnName": "双周开票",
    "Meaning": "每两周为一个周期进行交易汇总并开票，通常为固定日期（如每双周周五）",
    "Scenario": "适用于交易量适中但不适合月结的客户，例如中型制造企业与零部件供应商的双周对账开票、集团内部跨子公司服务费结算、软件项目阶段性交付后的双周服务费开票等。",
    "Advantage": "比月结更灵活，比周结更省力，适合过渡型合作模式",
    "Disadvantage": "周期不直观，部分客户不易记忆，对账流程略复杂"
  },
  {
    "Code": "MONTHLY",
    "EnName": "Monthly Invoicing",
    "CnName": "月结开票",
    "Meaning": "每月固定日期对上月所有交易进行汇总并开具发票",
    "Scenario": "最常见的企业间结算方式，适用于长期稳定合作关系，如制造业企业与原材料供应商的月度采购结算、电信运营商与内容提供商的流量分成结算、企业租赁办公场地的租金及服务费月结开票等。",
    "Advantage": "管理简便，开票成本低，便于财务月度核算与报表编制",
    "Disadvantage": "资金回笼慢，存在坏账风险，依赖客户信用评级体系"
  },
  {
    "Code": "QUARTERLY",
    "EnName": "Quarterly Invoicing",
    "CnName": "季结开票",
    "Meaning": "每季度结束后的固定时间对三个月交易进行汇总开票",
    "Scenario": "多用于长期服务类合同或项目周期较长的合作，如IT系统维保服务按季度开票、咨询公司为客户提供战略咨询服务的季度费用结算、政府或国企采购中的季度付款协议等。",
    "Advantage": "大幅减少开票与对账频次，降低行政管理负担",
    "Disadvantage": "回款周期过长，影响供应商现金流规划，不利于中小企业"
  },
  {
    "Code": "ADVANCE",
    "EnName": "Advance Invoicing",
    "CnName": "预开发票",
    "Meaning": "在商品交付或服务提供前，根据合同约定提前开具发票",
    "Scenario": "常见于客户内部报销流程严格的单位，如政府机关、事业单位、大型国企要求‘先票后款’；或在签订年度合同时，客户要求分批开票以便预算报销。也适用于预付款模式下的财务配合需求。",
    "Advantage": "满足客户报销或预算审批需求，促进合同签署与回款",
    "Disadvantage": "存在税务合规风险，若服务未履约需红冲处理，影响信用"
  },
  {
    "Code": "POST_SETTLE",
    "EnName": "Post-settlement Invoicing",
    "CnName": "对账后开票",
    "Meaning": "双方先完成对账确认，再根据最终无误的数据开具发票",
    "Scenario": "适用于交易数据复杂、需多方核对的场景，如电商平台与品牌商家的销售分成结算（扣除退货、佣金后开票）、广告联盟按点击效果结算、联营门店按实际销售额分成后的发票开具等。",
    "Advantage": "确保开票数据准确，减少争议和红冲，提升财务合规性",
    "Disadvantage": "流程繁琐，开票延迟，影响客户报销和资金安排"
  },
  {
    "Code": "CUSTOM",
    "EnName": "Custom Cycle",
    "CnName": "自定义开票",
    "Meaning": "根据合同或客户特殊要求设定非标准开票周期",
    "Scenario": "适用于个性化合作模式，如某跨国企业要求每月15日和月底两次开票；或项目制合作中按里程碑节点开票（如交付30%开一张，验收后开尾款票）；也可用于新客户试用期后的灵活结算安排。",
    "Advantage": "高度灵活，可适配多样化客户需求，提升客户满意度",
    "Disadvantage": "难以系统化自动化处理，增加财务人工干预和出错风险"
  }
];


// 获取账单管理台账列表
export const getBaseSettlementCycleList = async (): Promise<BaseSettlementCycleItemProps[]> => {
  return baseSettlementCycleItems;
}

// 保存账单管理
export const saveBaseSettlementCycle = async (data: BaseSettlementCycleItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseSettlementCycleItemProps> => {
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
export const getBaseSettlementCycleList = async (): Promise<BaseSettlementCycleItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_settlement_cycle"
  })
  const responseData = response?.data as ApiRes<BaseSettlementCycleItemProps[]>;
  return responseData.data || [];
}

export const saveBaseSettlementCycle = (data:BaseSettlementCycleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_settlement_cycle/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
