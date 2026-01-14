
import request, { ApiRes, requestWithProgress } from '../../request'
import { EntryGroupingRuleItemProps } from "@/types/dynamic_configuration_platform/basic_manage/entry_grouping_rule";
import Mock from "mockjs";

const entryGroupingRuleItems: EntryGroupingRuleItemProps[] = [
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '应收发票',
    EntryName: '应收账款',
    AccountLevel: 2,
    AccountGroup1By: '发票号',
    AccountGroup2By: '',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '结算单位',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '应收发票',
    EntryName: '营业收入',
    AccountLevel: 1,
    AccountGroup1By: '',
    AccountGroup2By: '',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '实收实付',
    EntryName: '银行存款',
    AccountLevel: 1,
    AccountGroup1By: '银行账号',
    AccountGroup2By: '币制',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
  {
    EntryId: Mock.mock("@id"),
    BookName: '管理账套',
    RuleName: '实收实付',
    EntryName: '应收账款',
    AccountLevel: 2,
    AccountGroup1By: '发票号',
    AccountGroup2By: '',
    AccountGroup3By: '',
    AccountGroup4By: '',
    AccountGroup5By: '',
    AccountGroup6By: '',
    AuxiliaryGroup1By: '结算单位',
    AuxiliaryGroup2By: '',
    AuxiliaryGroup3By: '',
    AuxiliaryGroup4By: '',
    AuxiliaryGroup5By: '',
    AuxiliaryGroup6By: '',
    CreatedAt: Mock.mock('@datetime()'),
    UpdatedAt: Mock.mock('@datetime()'),
  },
];
// 获取币制信息
export const getEntryGroupingRuleList = async () : Promise<EntryGroupingRuleItemProps[]> => {
  // const response = await request({
  //   method: "GET",
  //   url: "/entry_grouping_rule"
  // });
  // const responseData = response?.data as ApiRes<EntryGroupingRuleItemProps[]>;
  // return responseData.data || [];
  return entryGroupingRuleItems;
}

export const saveEntryGroupingRule = (data:EntryGroupingRuleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/entry_grouping_rule/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

