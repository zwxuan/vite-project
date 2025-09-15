
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseCorporateFundAccountItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_corporate_fund_account";
import Mock from "mockjs";
//
const baseCorporateFundAccountItems:BaseCorporateFundAccountItemProps[] = [
  {
    "AccountCode": "ACC20250001",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "华东结算中心",
    "OwningOrg": "上海分公司",
    "OpenAccountOrg": "招商银行上海分行",
    "AccountName": "上海分公司基本户",
    "BankAccountNo": "6225881234567890123",
    "AccountHolderName": "上海某某科技有限公司",
    "OpeningBank": "招商银行陆家嘴支行",
    "EbillAgentBank": "招商银行电子票据平台",
    "AccountPurpose": "日常经营收支",
    "AccountLevel": "一级账户",
    "AccountNature": "基本",
    "AccountType": "活期",
    "OpenDate": "2023-05-12T10:30:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "主账户，绑定ERP系统自动收付款"
  },
  {
    "AccountCode": "ACC20250002",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "华南结算中心",
    "OwningOrg": "广州分公司",
    "OpenAccountOrg": "工商银行广州分行",
    "AccountName": "员工工资专户",
    "BankAccountNo": "6222023456789012345",
    "AccountHolderName": "广州某某科技有限公司",
    "OpeningBank": "工商银行天河支行",
    "EbillAgentBank": "工行企业网银平台",
    "AccountPurpose": "员工薪资发放",
    "AccountLevel": "二级账户",
    "AccountNature": "专用",
    "AccountType": "活期",
    "OpenDate": "2023-07-18T14:20:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "仅用于工资代发，禁止其他用途"
  },
  {
    "AccountCode": "ACC20250003",
    "OpenAccountType": "结算中心开户",
    "SettlementCenter": "华北结算中心",
    "OwningOrg": "北京总部",
    "OpenAccountOrg": "集团资金结算中心",
    "AccountName": "集团内部结算户",
    "BankAccountNo": "ZJ20230001",
    "AccountHolderName": "北京某某集团有限公司",
    "OpeningBank": "集团结算系统",
    "EbillAgentBank": "集团电子票据平台",
    "AccountPurpose": "子公司间资金划转",
    "AccountLevel": "一级账户",
    "AccountNature": "一般",
    "AccountType": "活期",
    "OpenDate": "2022-11-03T09:15:00",
    "TaxRegister": "无需登记",
    "AccountStatus": "启用",
    "Remark": "仅用于集团内部资金归集与下拨"
  },
  {
    "AccountCode": "ACC20250004",
    "OpenAccountType": "财务公司",
    "SettlementCenter": "华东结算中心",
    "OwningOrg": "杭州研发中心",
    "OpenAccountOrg": "某某集团财务公司",
    "AccountName": "研发项目专项资金户",
    "BankAccountNo": "CW2024PRJ001",
    "AccountHolderName": "杭州某某科技有限公司",
    "OpeningBank": "集团财务公司",
    "EbillAgentBank": "财务公司电子平台",
    "AccountPurpose": "A轮融资项目支出",
    "AccountLevel": "二级账户",
    "AccountNature": "专用",
    "AccountType": "活期",
    "OpenDate": "2024-01-22T11:45:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "仅限项目编号PRJ2024001使用"
  },
  {
    "AccountCode": "ACC20250005",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "西南结算中心",
    "OwningOrg": "成都分公司",
    "OpenAccountOrg": "交通银行成都分行",
    "AccountName": "成都分公司备用金账户",
    "BankAccountNo": "6222620123456789012",
    "AccountHolderName": "成都某某科技有限公司",
    "OpeningBank": "交行高新区支行",
    "EbillAgentBank": "交行企业银行",
    "AccountPurpose": "日常零星支出",
    "AccountLevel": "三级账户",
    "AccountNature": "一般",
    "AccountType": "活期",
    "OpenDate": "2023-09-30T16:00:00",
    "TaxRegister": "未登记",
    "AccountStatus": "启用",
    "Remark": "限额5万元，超限需审批"
  },
  {
    "AccountCode": "ACC20250006",
    "OpenAccountType": "其他金融机构",
    "SettlementCenter": "华南结算中心",
    "OwningOrg": "深圳跨境电商部",
    "OpenAccountOrg": "前海微众银行",
    "AccountName": "跨境美元结算账户",
    "BankAccountNo": "WZ2024USD001",
    "AccountHolderName": "深圳某某跨境有限公司",
    "OpeningBank": "微众银行",
    "EbillAgentBank": "微众跨境结算系统",
    "AccountPurpose": "海外平台回款",
    "AccountLevel": "一级账户",
    "AccountNature": "一般",
    "AccountType": "活期",
    "OpenDate": "2024-03-15T13:10:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "仅接收Amazon、eBay平台美元回款"
  },
  {
    "AccountCode": "ACC20250007",
    "OpenAccountType": "数币钱包",
    "SettlementCenter": "华东结算中心",
    "OwningOrg": "南京办事处",
    "OpenAccountOrg": "数字人民币运营机构",
    "AccountName": "数字人民币收款钱包",
    "BankAccountNo": "DC2024NJ001",
    "AccountHolderName": "南京某某科技有限公司",
    "OpeningBank": "人民银行数币系统",
    "EbillAgentBank": "数币企业钱包平台",
    "AccountPurpose": "政府补贴数字人民币收款",
    "AccountLevel": "三级账户",
    "AccountNature": "专用",
    "AccountType": "活期",
    "OpenDate": "2024-06-08T10:05:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "仅用于接收数字人民币形式的政府补贴"
  },
  {
    "AccountCode": "ACC20250008",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "华北结算中心",
    "OwningOrg": "天津物流中心",
    "OpenAccountOrg": "中信银行天津分行",
    "AccountName": "物流运费结算户",
    "BankAccountNo": "6226660123456789012",
    "AccountHolderName": "天津某某物流有限公司",
    "OpeningBank": "中信银行滨海支行",
    "EbillAgentBank": "中信银行电子回单系统",
    "AccountPurpose": "支付第三方物流费用",
    "AccountLevel": "二级账户",
    "AccountNature": "一般",
    "AccountType": "活期",
    "OpenDate": "2023-12-01T08:50:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "对接TMS系统自动支付运费"
  },
  {
    "AccountCode": "ACC20250009",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "华中结算中心",
    "OwningOrg": "武汉分公司",
    "OpenAccountOrg": "民生银行武汉分行",
    "AccountName": "社保公积金专户",
    "BankAccountNo": "6226181234567890123",
    "AccountHolderName": "武汉某某科技有限公司",
    "OpeningBank": "民生银行光谷支行",
    "EbillAgentBank": "民生社保代缴平台",
    "AccountPurpose": "代缴五险一金",
    "AccountLevel": "二级账户",
    "AccountNature": "专用",
    "AccountType": "活期",
    "OpenDate": "2024-02-20T15:30:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "每月10日前自动扣款"
  },
  {
    "AccountCode": "ACC20250010",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "西北结算中心",
    "OwningOrg": "西安研发中心",
    "OpenAccountOrg": "兴业银行西安分行",
    "AccountName": "设备采购保证金户",
    "BankAccountNo": "6229081234567890123",
    "AccountHolderName": "西安某某科技有限公司",
    "OpeningBank": "兴业银行高新支行",
    "EbillAgentBank": "兴业对公电子票据",
    "AccountPurpose": "大型设备采购保证金",
    "AccountLevel": "二级账户",
    "AccountNature": "保证金",
    "AccountType": "保证金",
    "OpenDate": "2023-08-14T11:20:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "合同履约后自动解冻"
  },
  {
    "AccountCode": "ACC20250011",
    "OpenAccountType": "结算中心开户",
    "SettlementCenter": "华东结算中心",
    "OwningOrg": "苏州制造工厂",
    "OpenAccountOrg": "集团资金结算中心",
    "AccountName": "原材料集中采购户",
    "BankAccountNo": "ZJ2024CG002",
    "AccountHolderName": "苏州某某制造有限公司",
    "OpeningBank": "集团结算系统",
    "EbillAgentBank": "集团供应链平台",
    "AccountPurpose": "支付集团统采供应商货款",
    "AccountLevel": "一级账户",
    "AccountNature": "一般",
    "AccountType": "活期",
    "OpenDate": "2024-04-10T09:40:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "月结供应商统一从此账户支付"
  },
  {
    "AccountCode": "ACC20250012",
    "OpenAccountType": "其他金融机构",
    "SettlementCenter": "华南结算中心",
    "OwningOrg": "厦门外贸部",
    "OpenAccountOrg": "厦门国际银行",
    "AccountName": "欧元定期存款户",
    "BankAccountNo": "6214831234567890123",
    "AccountHolderName": "厦门某某进出口有限公司",
    "OpeningBank": "厦门国际银行思明支行",
    "EbillAgentBank": "厦国行跨境结算系统",
    "AccountPurpose": "欧元资金保值增值",
    "AccountLevel": "一级账户",
    "AccountNature": "一般",
    "AccountType": "定期",
    "OpenDate": "2024-05-17T14:55:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "3个月定期，到期自动转存"
  },
  {
    "AccountCode": "ACC20250013",
    "OpenAccountType": "财务公司",
    "SettlementCenter": "华北结算中心",
    "OwningOrg": "青岛分公司",
    "OpenAccountOrg": "某某集团财务公司",
    "AccountName": "政府补贴监管户",
    "BankAccountNo": "CW2023QD005",
    "AccountHolderName": "青岛某某科技有限公司",
    "OpeningBank": "集团财务公司",
    "EbillAgentBank": "财务公司监管平台",
    "AccountPurpose": "接收政府专项资金",
    "AccountLevel": "二级账户",
    "AccountNature": "专用",
    "AccountType": "活期",
    "OpenDate": "2023-10-25T10:10:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "资金用途需按申报项目执行"
  },
  {
    "AccountCode": "ACC20250014",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "西南结算中心",
    "OwningOrg": "重庆分公司",
    "OpenAccountOrg": "重庆银行",
    "AccountName": "员工持股计划账户",
    "BankAccountNo": "6214651234567890123",
    "AccountHolderName": "重庆某某科技有限公司",
    "OpeningBank": "重庆银行渝中支行",
    "EbillAgentBank": "重行股权管理平台",
    "AccountPurpose": "员工持股资金管理",
    "AccountLevel": "三级账户",
    "AccountNature": "专用",
    "AccountType": "活期",
    "OpenDate": "2024-07-01T16:30:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "封闭管理，禁止对外支付"
  },
  {
    "AccountCode": "ACC20250015",
    "OpenAccountType": "数币钱包",
    "SettlementCenter": "华东结算中心",
    "OwningOrg": "合肥办事处",
    "OpenAccountOrg": "数字人民币运营机构",
    "AccountName": "数币零星支出钱包",
    "BankAccountNo": "DC2024HF002",
    "AccountHolderName": "合肥某某科技有限公司",
    "OpeningBank": "人民银行数币系统",
    "EbillAgentBank": "数币企业钱包平台",
    "AccountPurpose": "日常小额报销支付",
    "AccountLevel": "三级账户",
    "AccountNature": "一般",
    "AccountType": "活期",
    "OpenDate": "2024-08-12T11:00:00",
    "TaxRegister": "无需登记",
    "AccountStatus": "启用",
    "Remark": "单笔限额5000元，月累计5万元"
  },
  {
    "AccountCode": "ACC20250016",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "华南结算中心",
    "OwningOrg": "东莞制造厂",
    "OpenAccountOrg": "广发银行东莞分行",
    "AccountName": "出口退税专户",
    "BankAccountNo": "6225681234567890123",
    "AccountHolderName": "东莞某某制造有限公司",
    "OpeningBank": "广发银行松山湖支行",
    "EbillAgentBank": "广发退税直通车",
    "AccountPurpose": "接收出口退税款",
    "AccountLevel": "二级账户",
    "AccountNature": "专用",
    "AccountType": "活期",
    "OpenDate": "2023-06-19T13:40:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "退税款到账后3日内转入主账户"
  },
  {
    "AccountCode": "ACC20250017",
    "OpenAccountType": "其他金融机构",
    "SettlementCenter": "华北结算中心",
    "OwningOrg": "大连分公司",
    "OpenAccountOrg": "盛京银行大连分行",
    "AccountName": "日元通知存款户",
    "BankAccountNo": "6236681234567890123",
    "AccountHolderName": "大连某某贸易有限公司",
    "OpeningBank": "盛京银行中山支行",
    "EbillAgentBank": "盛京跨境日元通道",
    "AccountPurpose": "日元资金灵活管理",
    "AccountLevel": "一级账户",
    "AccountNature": "一般",
    "AccountType": "通知",
    "OpenDate": "2024-09-05T10:25:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "7天通知存款，支持灵活支取"
  },
  {
    "AccountCode": "ACC20250018",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "华中结算中心",
    "OwningOrg": "长沙分公司",
    "OpenAccountOrg": "长沙银行",
    "AccountName": "双十一营销保证金户",
    "BankAccountNo": "6228931234567890123",
    "AccountHolderName": "长沙某某科技有限公司",
    "OpeningBank": "长沙银行芙蓉支行",
    "EbillAgentBank": "长行营销资金监管平台",
    "AccountPurpose": "平台活动保证金",
    "AccountLevel": "二级账户",
    "AccountNature": "保证金",
    "AccountType": "保证金",
    "OpenDate": "2024-09-10T09:00:00",
    "TaxRegister": "已登记",
    "AccountStatus": "启用",
    "Remark": "活动结束后若无违约，自动解冻"
  },
  {
    "AccountCode": "ACC20250019",
    "OpenAccountType": "结算中心开户",
    "SettlementCenter": "西北结算中心",
    "OwningOrg": "兰州办事处",
    "OpenAccountOrg": "集团资金结算中心",
    "AccountName": "临时过渡结算户",
    "BankAccountNo": "ZJ2024LZ003",
    "AccountHolderName": "兰州某某科技有限公司",
    "OpeningBank": "集团结算系统",
    "EbillAgentBank": "集团电子平台",
    "AccountPurpose": "临时收款过渡",
    "AccountLevel": "三级账户",
    "AccountNature": "临时",
    "AccountType": "活期",
    "OpenDate": "2024-08-20T15:10:00",
    "TaxRegister": "无需登记",
    "AccountStatus": "停用",
    "Remark": "因组织架构调整，已停用并迁移"
  },
  {
    "AccountCode": "ACC20250020",
    "OpenAccountType": "银行开户",
    "SettlementCenter": "华东结算中心",
    "OwningOrg": "宁波外贸部",
    "OpenAccountOrg": "宁波银行总行",
    "AccountName": "信用证保证金账户",
    "BankAccountNo": "6223090012345678901",
    "AccountHolderName": "宁波某某进出口有限公司",
    "OpeningBank": "宁波银行江东支行",
    "EbillAgentBank": "宁行国际结算系统",
    "AccountPurpose": "开立进口信用证保证金",
    "AccountLevel": "二级账户",
    "AccountNature": "保证金",
    "AccountType": "保证金",
    "OpenDate": "2024-07-25T14:00:00",
    "TaxRegister": "已登记",
    "AccountStatus": "冻结",
    "Remark": "信用证未到期，账户资金冻结中"
  }
];


// 获取账单管理台账列表
export const getBaseCorporateFundAccountList = async (): Promise<BaseCorporateFundAccountItemProps[]> => {
  return baseCorporateFundAccountItems;
}

// 保存账单管理
export const saveBaseCorporateFundAccount = async (data: BaseCorporateFundAccountItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseCorporateFundAccountItemProps> => {
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
export const getBaseCorporateFundAccountList = async (): Promise<BaseCorporateFundAccountItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_corporate_fund_account"
  })
  const responseData = response?.data as ApiRes<BaseCorporateFundAccountItemProps[]>;
  return responseData.data || [];
}

export const saveBaseCorporateFundAccount = (data:BaseCorporateFundAccountItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_corporate_fund_account/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
