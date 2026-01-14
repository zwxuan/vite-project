
import request, {ApiRes,requestWithProgress } from '../../request'
import { BaseBillTermsItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_bill_terms";
import Mock from "mockjs";
//
const baseBillTermsItems:BaseBillTermsItemProps[] = [
    {
        "Code": "MF",
        "Name": "目放",
        "LocalName": "目放",
        "ExchangeCode": "MF",
        "IsoCode": "MF",
        "BillType": "MBL",
        "Remarks": "备注",
        "ReleaseType": "【全部】"
    },
    {
        "Code": "COPY",
        "Name": "COPY",
        "LocalName": "COPY",
        "ExchangeCode": "COPY",
        "IsoCode": "COPY",
        "BillType": "HBL",
        "Remarks": "备注",
        "ReleaseType": "【全部】"
    },
    {
        "Code": "TRDM",
        "Name": "电放",
        "LocalName": "电放",
        "ExchangeCode": "TRDM",
        "IsoCode": "TRDM",
        "BillType": "MBL",
        "Remarks": "备注",
        "ReleaseType": "【全部】"
    },
    {
        "Code": "ORIGINAL",
        "Name": "正本",
        "LocalName": "正本",
        "ExchangeCode": "ORIGINAL",
        "IsoCode": "ORIGINAL",
        "BillType": "HBL",
        "Remarks": "备注",
        "ReleaseType": "【全部】"
    },
    {
        "Code": "SWB",
        "Name": "SWB",
        "LocalName": "SWB",
        "ExchangeCode": "SWB",
        "IsoCode": "SWB",
        "BillType": "MBL",
        "Remarks": "备注",
        "ReleaseType": "【全部】"
    },
    {
        "Code": "HMF",
        "Name": "目放",
        "LocalName": "目放",
        "ExchangeCode": "MF",
        "IsoCode": "MF",
        "BillType": "HBL",
        "Remarks": "备注",
        "ReleaseType": "【目放】"
    },
    {
        "Code": "SCDF",
        "Name": "双重电放",
        "LocalName": "双重电放",
        "ExchangeCode": "SCDF",
        "IsoCode": "SCDF",
        "BillType": "MBL",
        "Remarks": "备注",
        "ReleaseType": "【全部】"
    },
    {
        "Code": "TRDH",
        "Name": "电放",
        "LocalName": "电放",
        "ExchangeCode": "TRDH",
        "IsoCode": "TRDH",
        "BillType": "HBL",
        "Remarks": "备注",
        "ReleaseType": "【电放】"
    }
];


// 获取账单管理台账列表
export const getBaseBillTermsList = async (): Promise<BaseBillTermsItemProps[]> => {
  return baseBillTermsItems;
}

// 保存账单管理
export const saveBaseBillTerms = async (data: BaseBillTermsItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseBillTermsItemProps> => {
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
export const getBaseBillTermsList = async (): Promise<BaseBillTermsItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_bill_terms"
  })
  const responseData = response?.data as ApiRes<BaseBillTermsItemProps[]>;
  return responseData.data || [];
}

export const saveBaseBillTerms = (data:BaseBillTermsItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_bill_terms/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
