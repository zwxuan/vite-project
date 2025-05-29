
import request, { ApiRes, requestWithProgress } from '../request'
import { BaseExchangeRateItemProps } from "@/types/basic_manage/base_exchange_rate/base_exchange_rate";
import Mock from "mockjs";
//
const baseExchangeRateItems: BaseExchangeRateItemProps[] = [
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "韩元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.005238,
        "IndirectExchangeRate": 190.912562
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "马来西亚林吉特",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 1.6965,
        "IndirectExchangeRate": 0.589449
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "卢布",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.0893,
        "IndirectExchangeRate": 11.198208
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "美元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 7.20155,
        "IndirectExchangeRate": 0.138859
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "兰特",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.40105,
        "IndirectExchangeRate": 2.493455
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "澳大利亚元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 4.63515,
        "IndirectExchangeRate": 0.215743
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "巴西雷亚尔",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 1.2762,
        "IndirectExchangeRate": 0.783576
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "加元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 5.20735,
        "IndirectExchangeRate": 0.192036
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "瑞士法郎",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 8.69855,
        "IndirectExchangeRate": 0.114962
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "丹麦克朗",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 1.0915,
        "IndirectExchangeRate": 0.91617
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "欧元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 8.14055,
        "IndirectExchangeRate": 0.122842
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "英镑",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 9.7068,
        "IndirectExchangeRate": 0.103021
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "港元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.91865,
        "IndirectExchangeRate": 1.088554
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "日元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.049846,
        "IndirectExchangeRate": 20.06179
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "澳门元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.8917,
        "IndirectExchangeRate": 1.121453
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "墨西哥比索",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.3733,
        "IndirectExchangeRate": 2.678811
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "挪威克朗",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.7078,
        "IndirectExchangeRate": 1.412828
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "新西兰元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 4.2955,
        "IndirectExchangeRate": 0.232802
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "瑞典克朗",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.7462,
        "IndirectExchangeRate": 1.340123
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "新加坡元",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 5.58315,
        "IndirectExchangeRate": 0.17911
    },
    {
        "Rate_Code": Mock.mock("@id"),
        "PurposeCurrency": "人民币",
        "ExchangeRateType": "基准汇率",
        "SourceCurrency": "泰国铢",
        "QuotationDate": "2025-05-28",
        "DirectExchangeRate": 0.22,
        "IndirectExchangeRate": 4.545455
    }
];


// 获取账单管理台账列表
export const getBaseExchangeRateList = async (): Promise<BaseExchangeRateItemProps[]> => {
    return baseExchangeRateItems;
}

// 保存账单管理
export const saveBaseExchangeRate = async (data: BaseExchangeRateItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseExchangeRateItemProps> => {
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
export const getBaseExchangeRateList = async (): Promise<BaseExchangeRateItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_exchange_rate"
  })
  const responseData = response?.data as ApiRes<BaseExchangeRateItemProps[]>;
  return responseData.data || [];
}

export const saveBaseExchangeRate = (data:BaseExchangeRateItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_exchange_rate/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
