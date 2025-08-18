
import request, { ApiRes, requestWithProgress } from '../../request'
import { BaseBankTypeItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_bank_type";
import Mock from "mockjs";
//
const baseBankTypeItems: BaseBankTypeItemProps[] = [
    {
        "BankTypeCode": "00000001",
        "BankTypeName": "电子联行转换中心",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000002",
        "BankTypeName": "人民银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000003",
        "BankTypeName": "人民银行金库",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000004",
        "BankTypeName": "支付系统收费专户",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000005",
        "BankTypeName": "中国农业银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000006",
        "BankTypeName": "中国银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000007",
        "BankTypeName": "美国银行",
        "CountryRegion": "美国",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000008",
        "BankTypeName": "长安银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000009",
        "BankTypeName": "国家开发银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000010",
        "BankTypeName": "中国进出口银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000011",
        "BankTypeName": "中国农业发展银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000012",
        "BankTypeName": "交通银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000013",
        "BankTypeName": "中信银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000014",
        "BankTypeName": "中国光大银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000015",
        "BankTypeName": "华夏银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000016",
        "BankTypeName": "中国民生银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000017",
        "BankTypeName": "广东发展银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000018",
        "BankTypeName": "平安银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "00000019",
        "BankTypeName": "电子支付票据交换系统",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "000001",
        "BankTypeName": "中国工商银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "000002",
        "BankTypeName": "中国建设银行",
        "CountryRegion": "中国大陆",
        "Status": "已启用"
    },
    {
        "BankTypeCode": "system-002",
        "BankTypeName": "财务公司",
        "CountryRegion": "",
        "Status": "已启用"
    }
];


// 获取账单管理台账列表
export const getBaseBankTypeList = async (): Promise<BaseBankTypeItemProps[]> => {
    return baseBankTypeItems;
}

// 保存账单管理
export const saveBaseBankType = async (data: BaseBankTypeItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseBankTypeItemProps> => {
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
export const getBaseBankTypeList = async (): Promise<BaseBankTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_bank_type"
  })
  const responseData = response?.data as ApiRes<BaseBankTypeItemProps[]>;
  return responseData.data || [];
}

export const saveBaseBankType = (data:BaseBankTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_bank_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
