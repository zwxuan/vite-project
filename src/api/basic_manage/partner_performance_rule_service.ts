
import { KpiDefinitionItemProps } from '@/types/basic_manage/kpi_definition';
import request, { ApiRes, requestWithProgress } from '../request'
import { PartnerPerformanceRuleItemProps } from "@/types/basic_manage/partner_performance_rule";
import Mock from "mockjs";
import { RuleKpiItemItemProps } from '@/types/basic_manage/rule_kpi_item';
//
const partnerPerformanceRuleItems: PartnerPerformanceRuleItemProps[] = [
  {
    "RowKey": Mock.mock("@id"),
    "RuleId": "Rule0001",
    "RuleName": "美线同行Q3评估",
    "PartnerType": "供应商",
    "EffectiveDate": "2025-07-01",
    "ExpireDate": "2025-09-30",
    "IsActive": "1",
    "CreatedBy": "admin",
    "CreatedAt": "2025-03-15"
  },
  {
    "RowKey": Mock.mock("@id"),
    "RuleId": "Rule0002",
    "RuleName": "欧洲代理年度规则",
    "PartnerType": "海外代理",
    "EffectiveDate": "2025-01-01",
    "ExpireDate": "2025-12-31",
    "IsActive": "1",
    "CreatedBy": "ops_mgr",
    "CreatedAt": "2025-01-10"
  },
  {
    "RowKey": Mock.mock("@id"),
    "RuleId": "Rule0003",
    "RuleName": "东南亚紧急代理标准",
    "PartnerType": "客户",
    "EffectiveDate": "2025-06-01",
    "ExpireDate": "2025-12-31",
    "IsActive": "1",
    "CreatedBy": "crisis_team",
    "CreatedAt": "2025-05-20"
  },

];

const kpiDefinitionItems: KpiDefinitionItemProps[] = [
  {
    "RowKey": Mock.mock("@id"),
    "KpiId": "KPI0001",
    "KpiCode": "OTD_CONF",
    "KpiName": "订舱确认时效",
    "Description": "衡量从下单到订舱确认的平均时间",
    "DataType": "NUMBER",
    "IsCritical": "0",
  },
  {
    "RowKey": Mock.mock("@id"),
    "KpiId": "KPI0002",
    "KpiCode": "BL_ISSUE",
    "KpiName": "提单签发速度",
    "Description": "提单从生成到客户收到的时效",
    "DataType": "NUMBER",
    "IsCritical": "1",
  },
  {
    "RowKey": Mock.mock("@id"),
    "KpiId": "KPI0003",
    "KpiCode": "CUSTOMS_TIME",
    "KpiName": "平均清关时效",
    "Description": "货物到达港口后平均清关所需时间",
    "DataType": "NUMBER",
    "IsCritical": "0",
  },
  {
    "RowKey": Mock.mock("@id"),
    "KpiId": "KPI0004",
    "KpiCode": "DUTY_FINE",
    "KpiName": "海关罚金发生",
    "Description": "是否发生因代理操作失误导致的海关罚金",
    "DataType": "BOOLEAN",
    "IsCritical": "1",
  },
  {
    "RowKey": Mock.mock("@id"),
    "KpiId": "KPI0005",
    "KpiCode": "HIDDEN_FEE",
    "KpiName": "隐蔽费用投诉",
    "Description": "客户对未提前告知费用的投诉次数",
    "DataType": "NUMBER",
    "IsCritical": "0",
  }
];

const ruleKpiItemItems: RuleKpiItemItemProps[] = [
  {
    "RowKey": Mock.mock("@id"),
    "ItemId": "ITM001",
    "RuleId": "RULE001",
    "KpiId": "KPI101",
    "Weight": 15.00,
    "ScoringConfig": "{\"method\":\"deduction\",\"params\":{\"base_score\":100,\"deduct_per_unit\":5,\"unit\":1,\"max_deduction\":50}}",
    "Description": "扣分制：每超时1小时扣5分，最多扣50分（满分100分）；实际值=30h → 扣分=(30-24)*5=30分 → 得分=100-30=70分"
  },
  {
    "RowKey": Mock.mock("@id"),
    "ItemId": "ITM002",
    "RuleId": "RULE001",
    "KpiId": "KPI102",
    "Weight": 15.00,
    "ScoringConfig": "{\"method\":\"step\",\"params\":{\"thresholds\":[{\"value\":24,\"score\":100},{\"value\":48,\"score\":70},{\"value\":72,\"score\":0}]}}",
    "Description": " 阶梯评分法；实际值=36h → 得分=70分"
  },
  {
    "RowKey": Mock.mock("@id"),
    "ItemId": "ITM003",
    "RuleId": "RULE002",
    "KpiId": "KPI201",
    "Weight": 15.00,
    "ScoringConfig": "{\"method\":\"linear\",\"params\":{\"min_value\":72,\"max_value\":24,\"min_score\":0,\"max_score\":120}}",
    "Description": "线性插值：72小时得0分，24小时得120分；实际值=36h → 得分=120 - (36-24)/(72-24)*120 = 100分"
  },
  {
    "RowKey": Mock.mock("@id"),
    "ItemId": "ITM004",
    "RuleId": "RULE002",
    "KpiId": "KPI202",
    "Weight": 5.00,
    "ScoringConfig": "{\"method\":\"boolean\",\"params\":{\"true_score\":0,\"false_score\":100}}",
    "Description": "布尔达标法；如果KPI值为true，得分=0分；如果KPI值为false，得分=100分"
  },
  {
    "RowKey": Mock.mock("@id"),
    "ItemId": "ITM005",
    "RuleId": "RULE003",
    "KpiId": "KPI203",
    "Weight": 10.00,
    "ScoringConfig": "{\"method\":\"deduction\",\"params\":{\"base_score\":100,\"deduct_per_unit\":30,\"unit\":1,\"max_deduction\":100}}",
    "Description": "扣分制：每超时1天扣30分，最多扣100分（满分100分）；实际值=3天 → 扣分=(3-1)*30=90分 → 得分=100-90=10分"
  }
];


// 获取账单管理台账列表
export const getRuleKpiItemList = async (): Promise<RuleKpiItemItemProps[]> => {
  return ruleKpiItemItems;
}
// 获取账单管理台账列表
export const getPartnerPerformanceRuleList = async (): Promise<PartnerPerformanceRuleItemProps[]> => {
  return partnerPerformanceRuleItems;
}

export const getKpiDefinitionList = async (): Promise<KpiDefinitionItemProps[]> => {
  return kpiDefinitionItems;
}

// 保存账单管理
export const savePartnerPerformanceRule = async (data: PartnerPerformanceRuleItemProps, onUploadProgress?: (progress: number) => void): Promise<PartnerPerformanceRuleItemProps> => {
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
