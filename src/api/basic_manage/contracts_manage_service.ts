
import request, {ApiRes,requestWithProgress } from '../request'
import { ContractsCompareFieldsItemProps, ContractsManageItemProps, ContractsRuleEngineItemProps } from "@/types/basic_manage/contracts_manage";
import Mock from "mockjs";
//
const contractsManageItems:ContractsManageItemProps[] = [
    {
      "ContractId": "1002",
      "Partner": "澳洲国际航运有限公司",
      "CustomerLevel": "",
      "AuditStatus": "审核通过",
      "ContractStatus": "已到期",
      "ContractType": "首签",
      "EffectiveDate": "2024-12-23",
      "ExpirationDate": "2024-12-28",
      "AttachmentCount": "1",
      "Operator": "管理员",
      "OperationDate": "2025-06-03",
      "ContractAgreement": "客户合同",
      "LogRecord": "按月结算",
      "CreditLimit": 0,
      "CreditCurrency": "RMB",
      "DateType": "ETD",
      "PaymentCycle": 0,
      "IsExtension": "",
      "ExtensionPeriod": 0,
      "Remarks": "",
      "IsShippingChapterUploaded": "",
      "IsContractUploaded": "",
      "IsNeedUpdate": "",
      "CompanyBranch": "CS",
      "SalesRep": "",
      "SettlementMethod": "按月结算"
    },
    {
      "ContractId": "9987",
      "Partner": "极地航空公司",
      "CustomerLevel": "",
      "AuditStatus": "审核通过",
      "ContractStatus": "未到期",
      "ContractType": "首签",
      "EffectiveDate": "2025-03-20",
      "ExpirationDate": "2029-06-01",
      "AttachmentCount": "0",
      "Operator": "管理员",
      "OperationDate": "2025-03-20",
      "ContractAgreement": "客户合同",
      "LogRecord": "按月结算",
      "CreditLimit": 9999999,
      "CreditCurrency": "RMB",
      "DateType": "业务日期",
      "PaymentCycle": 30,
      "IsExtension": "",
      "ExtensionPeriod": 0,
      "Remarks": "",
      "IsShippingChapterUploaded": "",
      "IsContractUploaded": "",
      "IsNeedUpdate": "",
      "CompanyBranch": "CS",
      "SalesRep": "",
      "SettlementMethod": "按月结算"
    }
  ];

  const contractsRuleEngineItems: ContractsRuleEngineItemProps[] = [
    {
      RowKey: Mock.mock("@id"),
      ReconciliationRuleName: '合同规则1',
      MatchFieldRelation: '与',
    },
    {
      RowKey: Mock.mock("@id"),
      ReconciliationRuleName: '合同规则2',
      MatchFieldRelation: '或',
    },
  ];
  
  const contractsCompareItems: ContractsCompareFieldsItemProps[] = [
    {
      RowKey: Mock.mock("@id"),
      CompareFieldsName: '业务类型',
      CompareFieldRelation: '等于',
      CompareFieldValue: '海运出口',
    },
    {
      RowKey: Mock.mock("@id"),
      CompareFieldsName: '操作分公司',
      CompareFieldRelation: '等于',
      CompareFieldValue: '青岛分公司',
    },
  ];
  
  export const getContractsRuleEngineList = async (): Promise<ContractsRuleEngineItemProps[]> => {
    return contractsRuleEngineItems;
  }

  
  export const getContractsCompareFieldsList = async (): Promise<ContractsCompareFieldsItemProps[]> => {
    return contractsCompareItems;
  }


// 获取账单管理台账列表
export const getContractsManageList = async (): Promise<ContractsManageItemProps[]> => {
  return contractsManageItems;
}

// 保存账单管理
export const saveContractsManage = async (data: ContractsManageItemProps, onUploadProgress?: (progress: number) => void): Promise<ContractsManageItemProps> => {
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
export const getContractsManageList = async (): Promise<ContractsManageItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/contracts_manage"
  })
  const responseData = response?.data as ApiRes<ContractsManageItemProps[]>;
  return responseData.data || [];
}

export const saveContractsManage = (data:ContractsManageItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/contracts_manage/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
