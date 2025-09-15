
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseAccountPurposeItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_account_purpose";
import Mock from "mockjs";
//
const baseAccountPurposeItems:BaseAccountPurposeItemProps[] = [
  {
    "AccountPurposeCode": "AP001",
    "AccountPurposeName": "工资发放专用账户",
    "IsDefault": "是",
    "Status": "启用",
    "Remark": "用于每月15日发放员工薪资"
  },
  {
    "AccountPurposeCode": "AP002",
    "AccountPurposeName": "供应商结算账户",
    "IsDefault": "否",
    "Status": "启用",
    "Remark": "仅用于月结供应商货款支付"
  },
  {
    "AccountPurposeCode": "AP003",
    "AccountPurposeName": "税费缴纳专户",
    "IsDefault": "否",
    "Status": "启用",
    "Remark": "绑定税务局自动扣款协议"
  },
  {
    "AccountPurposeCode": "AP004",
    "AccountPurposeName": "备用金账户",
    "IsDefault": "是",
    "Status": "启用",
    "Remark": "用于部门日常零星支出"
  },
  {
    "AccountPurposeCode": "AP005",
    "AccountPurposeName": "项目专项资金户",
    "IsDefault": "否",
    "Status": "待审核",
    "Remark": "A轮融资项目专用，待财务总监审批"
  },
  {
    "AccountPurposeCode": "AP006",
    "AccountPurposeName": "跨境支付账户",
    "IsDefault": "否",
    "Status": "启用",
    "Remark": "支持美元/欧元结算，用于海外采购"
  },
  {
    "AccountPurposeCode": "AP007",
    "AccountPurposeName": "员工报销账户",
    "IsDefault": "是",
    "Status": "启用",
    "Remark": "对接OA报销系统，自动打款"
  },
  {
    "AccountPurposeCode": "AP008",
    "AccountPurposeName": "临时过渡账户",
    "IsDefault": "否",
    "Status": "停用",
    "Remark": "2024年系统迁移期间使用，已废弃"
  },
  {
    "AccountPurposeCode": "AP009",
    "AccountPurposeName": "客户退款专户",
    "IsDefault": "否",
    "Status": "启用",
    "Remark": "独立账户确保退款资金隔离"
  },
  {
    "AccountPurposeCode": "AP010",
    "AccountPurposeName": "分红派息账户",
    "IsDefault": "否",
    "Status": "待审核",
    "Remark": "股东分红使用，需董事会批准后启用"
  }
];


// 获取账单管理台账列表
export const getBaseAccountPurposeList = async (): Promise<BaseAccountPurposeItemProps[]> => {
  return baseAccountPurposeItems;
}

// 保存账单管理
export const saveBaseAccountPurpose = async (data: BaseAccountPurposeItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseAccountPurposeItemProps> => {
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
export const getBaseAccountPurposeList = async (): Promise<BaseAccountPurposeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_account_purpose"
  })
  const responseData = response?.data as ApiRes<BaseAccountPurposeItemProps[]>;
  return responseData.data || [];
}

export const saveBaseAccountPurpose = (data:BaseAccountPurposeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_account_purpose/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
