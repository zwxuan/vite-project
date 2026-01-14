
import request, { ApiRes, requestWithProgress } from '../../request'
import { SummaryRuleItemProps } from "@/types/dynamic_configuration_platform/basic_manage/summary_rule";
import Mock from "mockjs";

const summaryRuleItems:SummaryRuleItemProps[] = [
  {
      SummaryRuleCode:Mock.mock("@id"),
      BookName:'管理账套',
      RuleName:'应收发票',
      EntryName:'应收账款',
      GroupBy:'发票号-结算单位',
  },  
  {
    SummaryRuleCode:Mock.mock("@id"),
    BookName:'管理账套',
    RuleName:'实收实付',
    EntryName:'银行存款',
    GroupBy:'银行存款-银行账号',
},
];
// 获取币制信息
export const getSummaryRuleList = async () : Promise<SummaryRuleItemProps[]> => {
  // const response = await request({
  //   method: "GET",
  //   url: "/summary_rule"
  // });
  // const responseData = response?.data as ApiRes<SummaryRuleItemProps[]>;
  // return responseData.data || [];
  return summaryRuleItems;
}

export const saveSummaryRule = (data:SummaryRuleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/summary_rule/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

