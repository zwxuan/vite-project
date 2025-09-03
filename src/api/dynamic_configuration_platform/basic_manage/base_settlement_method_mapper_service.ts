
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseSettlementMethodMapperItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_settlement_method_mapper";
import Mock from "mockjs";
//
const baseSettlementMethodMapperItems:BaseSettlementMethodMapperItemProps[] = [
  {
    "OrgName": "ORG0001",
    "SettlementMode": "电汇",
    "CurrencyCode": "CNY",
    "BankType": "国有大行",
    "BankBranch": "北京朝阳分行",
    "BankAccount": "6217 0001 0000 0001",
    "CashAccount": "1001 0001 0001",
    "IsDefault": "Y",
    "Remark": "日常结算户",
    "CreatedBy": "张三",
    "CreatedTime": "2024-05-12 09:15:23",
    "UpdatedBy": "李四",
    "UpdatedTime": "2024-06-01 14:32:17"
  },
  {
    "OrgName": "ORG0002",
    "SettlementMode": "网银",
    "CurrencyCode": "USD",
    "BankType": "股份银行",
    "BankBranch": "上海浦东支行",
    "BankAccount": "6222 0002 0000 0002",
    "CashAccount": "1002 0002 0002",
    "IsDefault": "N",
    "Remark": "美元收汇专户",
    "CreatedBy": "王五",
    "CreatedTime": "2024-03-18 11:20:10",
    "UpdatedBy": "赵六",
    "UpdatedTime": "2024-04-10 16:45:33"
  },
  {
    "OrgName": "ORG0003",
    "SettlementMode": "支票",
    "CurrencyCode": "EUR",
    "BankType": "外资银行",
    "BankBranch": "广州天河支行",
    "BankAccount": "6233 0003 0000 0003",
    "CashAccount": "1003 0003 0003",
    "IsDefault": "Y",
    "Remark": "欧洲业务专户",
    "CreatedBy": "孙七",
    "CreatedTime": "2024-02-25 08:05:55",
    "UpdatedBy": "周八",
    "UpdatedTime": "2024-05-20 10:11:44"
  },
  {
    "OrgName": "ORG0004",
    "SettlementMode": "银企直联",
    "CurrencyCode": "HKD",
    "BankType": "城商行",
    "BankBranch": "深圳南山分行",
    "BankAccount": "6244 0004 0000 0004",
    "CashAccount": "1004 0004 0004",
    "IsDefault": "N",
    "Remark": "港股结算户",
    "CreatedBy": "吴九",
    "CreatedTime": "2024-04-09 13:22:18",
    "UpdatedBy": "郑十",
    "UpdatedTime": "2024-06-03 09:50:12"
  },
  {
    "OrgName": "ORG0005",
    "SettlementMode": "现金",
    "CurrencyCode": "JPY",
    "BankType": "农商行",
    "BankBranch": "成都锦江支行",
    "BankAccount": "6255 0005 0000 0005",
    "CashAccount": "1005 0005 0005",
    "IsDefault": "Y",
    "Remark": "备用金账户",
    "CreatedBy": "刘一",
    "CreatedTime": "2024-01-30 15:40:30",
    "UpdatedBy": "陈二",
    "UpdatedTime": "2024-03-15 17:25:00"
  },
  {
    "OrgName": "ORG0006",
    "SettlementMode": "信用证",
    "CurrencyCode": "GBP",
    "BankType": "政策性银行",
    "BankBranch": "天津滨海支行",
    "BankAccount": "6266 0006 0000 0006",
    "CashAccount": "1006 0006 0006",
    "IsDefault": "N",
    "Remark": "进出口业务",
    "CreatedBy": "杨三",
    "CreatedTime": "2024-05-05 12:10:45",
    "UpdatedBy": "黄四",
    "UpdatedTime": "2024-05-28 08:35:22"
  },
  {
    "OrgName": "ORG0007",
    "SettlementMode": "代收付",
    "CurrencyCode": "AUD",
    "BankType": "民营银行",
    "BankBranch": "杭州西湖支行",
    "BankAccount": "6277 0007 0000 0007",
    "CashAccount": "1007 0007 0007",
    "IsDefault": "Y",
    "Remark": "工资代发专户",
    "CreatedBy": "林五",
    "CreatedTime": "2024-03-22 14:55:10",
    "UpdatedBy": "徐六",
    "UpdatedTime": "2024-04-18 11:05:37"
  },
  {
    "OrgName": "ORG0008",
    "SettlementMode": "托收",
    "CurrencyCode": "CAD",
    "BankType": "村镇银行",
    "BankBranch": "南京江宁支行",
    "BankAccount": "6288 0008 0000 0008",
    "CashAccount": "1008 0008 0008",
    "IsDefault": "N",
    "Remark": "水电费托收",
    "CreatedBy": "马七",
    "CreatedTime": "2024-02-14 10:30:20",
    "UpdatedBy": "朱八",
    "UpdatedTime": "2024-03-30 16:20:50"
  },
  {
    "OrgName": "ORG0009",
    "SettlementMode": "POS刷卡",
    "CurrencyCode": "SGD",
    "BankType": "合资银行",
    "BankBranch": "武汉光谷支行",
    "BankAccount": "6299 0009 0000 0009",
    "CashAccount": "1009 0009 0009",
    "IsDefault": "Y",
    "Remark": "门店收银专户",
    "CreatedBy": "胡九",
    "CreatedTime": "2024-04-27 09:00:00",
    "UpdatedBy": "高十",
    "UpdatedTime": "2024-05-15 13:15:25"
  },
  {
    "OrgName": "ORG0010",
    "SettlementMode": "第三方支付",
    "CurrencyCode": "CHF",
    "BankType": "互联网银行",
    "BankBranch": "西安高新支行",
    "BankAccount": "6210 0010 0000 0010",
    "CashAccount": "1010 0010 0010",
    "IsDefault": "N",
    "Remark": "电商收款",
    "CreatedBy": "萧一",
    "CreatedTime": "2024-06-02 17:45:12",
    "UpdatedBy": "叶二",
    "UpdatedTime": "2024-06-05 08:10:33"
  }
];


// 获取账单管理台账列表
export const getBaseSettlementMethodMapperList = async (): Promise<BaseSettlementMethodMapperItemProps[]> => {
  return baseSettlementMethodMapperItems;
}

// 保存账单管理
export const saveBaseSettlementMethodMapper = async (data: BaseSettlementMethodMapperItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseSettlementMethodMapperItemProps> => {
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
export const getBaseSettlementMethodMapperList = async (): Promise<BaseSettlementMethodMapperItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_settlement_method_mapper"
  })
  const responseData = response?.data as ApiRes<BaseSettlementMethodMapperItemProps[]>;
  return responseData.data || [];
}

export const saveBaseSettlementMethodMapper = (data:BaseSettlementMethodMapperItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_settlement_method_mapper/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
