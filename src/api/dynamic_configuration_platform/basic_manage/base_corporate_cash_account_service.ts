
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseCorporateCashAccountItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_corporate_cash_account";
import Mock from "mockjs";
//
const baseCorporateCashAccountItems:BaseCorporateCashAccountItemProps[] = [
  {
    "AccountCode": "CASH-CNY-001",
    "AccountName": "科技发展部",
    "OwningOrg": "财务中心一",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-03-12 15:28:47",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "测试账户一"
  },
  {
    "AccountCode": "CASH-USD-002",
    "AccountName": "国际业务部",
    "OwningOrg": "海外事业部",
    "CurrencyCode": "美元",
    "OpenDate": "2024-05-19 09:14:22",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "美元结算户"
  },
  {
    "AccountCode": "CASH-EUR-003",
    "AccountName": "研发资金户",
    "OwningOrg": "研发中心A",
    "CurrencyCode": "欧元",
    "OpenDate": "2024-01-08 17:33:05",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "研发专款户"
  },
  {
    "AccountCode": "CASH-HKD-004",
    "AccountName": "市场推广户",
    "OwningOrg": "市场部三组",
    "CurrencyCode": "港币",
    "OpenDate": "2024-07-22 11:05:38",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "广告费用户"
  },
  {
    "AccountCode": "CASH-JPY-005",
    "AccountName": "客户服务户",
    "OwningOrg": "客服中心B",
    "CurrencyCode": "日元",
    "OpenDate": "2024-02-14 14:47:19",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "临时过渡户"
  },
  {
    "AccountCode": "CASH-CNY-006",
    "AccountName": "物流结算户",
    "OwningOrg": "供应链部",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-06-30 08:22:56",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "运费专用户"
  },
  {
    "AccountCode": "CASH-GBP-007",
    "AccountName": "采购资金户",
    "OwningOrg": "采购中心C",
    "CurrencyCode": "英镑",
    "OpenDate": "2024-04-05 13:10:44",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "大宗采购户"
  },
  {
    "AccountCode": "CASH-CNY-008",
    "AccountName": "行政管理户",
    "OwningOrg": "行政部门一",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-08-11 16:55:31",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "日常开销户"
  },
  {
    "AccountCode": "CASH-AUD-009",
    "AccountName": "人力资源户",
    "OwningOrg": "HR中心D",
    "CurrencyCode": "澳元",
    "OpenDate": "2024-03-27 10:08:12",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "薪资发放户"
  },
  {
    "AccountCode": "CASH-CNY-010",
    "AccountName": "法务合规户",
    "OwningOrg": "法务部二组",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-05-03 12:39:27",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "诉讼备用金"
  },
  {
    "AccountCode": "CASH-CAD-011",
    "AccountName": "IT运维户",
    "OwningOrg": "信息科技部",
    "CurrencyCode": "加元",
    "OpenDate": "2024-07-09 18:21:03",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "服务器维护"
  },
  {
    "AccountCode": "CASH-CNY-012",
    "AccountName": "品牌建设户",
    "OwningOrg": "品牌部一组",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-02-28 09:45:50",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "VI设计费用"
  },
  {
    "AccountCode": "CASH-SGD-013",
    "AccountName": "政府关系户",
    "OwningOrg": "政企合作部",
    "CurrencyCode": "新加坡",
    "OpenDate": "2024-06-15 14:12:33",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "政策申报户"
  },
  {
    "AccountCode": "CASH-CNY-014",
    "AccountName": "投资者关系",
    "OwningOrg": "董秘办公室",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-01-19 11:30:18",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "路演备用金"
  },
  {
    "AccountCode": "CASH-EUR-015",
    "AccountName": "环保专项户",
    "OwningOrg": "ESG委员会",
    "CurrencyCode": "欧元",
    "OpenDate": "2024-04-22 16:07:41",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "碳中和项目"
  },
  {
    "AccountCode": "CASH-CNY-016",
    "AccountName": "安全应急户",
    "OwningOrg": "安全部门E",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-08-02 13:52:25",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "突发事件金"
  },
  {
    "AccountCode": "CASH-CNY-017",
    "AccountName": "工会福利户",
    "OwningOrg": "工会委员会",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-03-05 08:17:39",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "员工福利金"
  },
  {
    "AccountCode": "CASH-USD-018",
    "AccountName": "公益捐赠户",
    "OwningOrg": "CSR部门F",
    "CurrencyCode": "美元",
    "OpenDate": "2024-07-18 15:44:06",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "慈善基金会"
  },
  {
    "AccountCode": "CASH-CNY-019",
    "AccountName": "创新孵化户",
    "OwningOrg": "创新实验室",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-05-30 10:29:53",
    "IsDefault": "是默认账",
    "AccountStatus": "已启用",
    "Remark": "初创项目金"
  },
  {
    "AccountCode": "CASH-MUL-020",
    "AccountName": "跨境结算户",
    "OwningOrg": "国际结算部",
    "CurrencyCode": "人民币",
    "OpenDate": "2024-06-08 17:03:11",
    "IsDefault": "非默认账",
    "AccountStatus": "已启用",
    "Remark": "外汇管制户"
  }
];


// 获取账单管理台账列表
export const getBaseCorporateCashAccountList = async (): Promise<BaseCorporateCashAccountItemProps[]> => {
  return baseCorporateCashAccountItems;
}

// 保存账单管理
export const saveBaseCorporateCashAccount = async (data: BaseCorporateCashAccountItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseCorporateCashAccountItemProps> => {
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
export const getBaseCorporateCashAccountList = async (): Promise<BaseCorporateCashAccountItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_corporate_cash_account"
  })
  const responseData = response?.data as ApiRes<BaseCorporateCashAccountItemProps[]>;
  return responseData.data || [];
}

export const saveBaseCorporateCashAccount = (data:BaseCorporateCashAccountItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_corporate_cash_account/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
