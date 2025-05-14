
import request, { ApiRes, requestWithProgress } from '../request'
import { VoucherGroupingRuleItemProps } from "@/types/basic_manage/voucher_grouping_rule/voucher_grouping_rule";

const voucherGroupingRuleItems: VoucherGroupingRuleItemProps[] = [
  {
    RuleCode: '1',
    BookName: '管理账套',
    RuleName: '应收发票',
    BookkeepingMethod: '普通记账',
    GroupBy: '发票号',
  },
  {
    RuleCode: '2',
    BookName: '管理账套',
    RuleName: '应付发票',
    BookkeepingMethod: '普通记账',
    GroupBy: '发票号',
  },
  {
    RuleCode: '3',
    BookName: '管理账套',
    RuleName: '实收实付',
    BookkeepingMethod: '普通记账',
    GroupBy: '销账编号',
  },
];
// 获取币制信息
export const getVoucherGroupingRuleList = async () : Promise<VoucherGroupingRuleItemProps[]> => {
  // const response = await request({
  //   method: "GET",
  //   url: "/voucher_grouping_rule"
  // });
  // const responseData = response?.data as ApiRes<VoucherGroupingRuleItemProps[]>;
  // return responseData.data || [];
  return voucherGroupingRuleItems;
}

export const saveVoucherGroupingRule = (data:VoucherGroupingRuleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/voucher_grouping_rule/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

