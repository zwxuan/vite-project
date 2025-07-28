
import request, { ApiRes, requestWithProgress } from '../../request'
import { BaseCargoTypeItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_cargo_type";
import Mock from "mockjs";
//
const baseCargoTypeItems: BaseCargoTypeItemProps[] = [
    {
        "Id": "DG",
        "EnglishName": "Dangerous Goods",
        "ChineseName": "危险品",
        "Description": "危险品（如化学品、易燃品、爆炸品等），需特殊运输许可和包装。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "GOH",
        "EnglishName": "Garment On Hanger",
        "ChineseName": "挂衣箱",
        "Description": "挂衣箱（服装类货物，用塑料袋或纸箱悬挂运输，常见于快时尚行业）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "BB",
        "EnglishName": "Break Bulk",
        "ChineseName": "大件货",
        "Description": "大件货（非集装箱货物，需人工或机械装卸，如机械设备、钢材等）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "GC",
        "EnglishName": "General Cargo",
        "ChineseName": "普货",
        "Description": "普货（常规散货，无特殊运输要求，如日用品、小件工业品等）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "RF",
        "EnglishName": "Reefer/Refrigerated Cargo",
        "ChineseName": "温控货物",
        "Description": "温控货物（需冷藏或恒温运输，如生鲜、药品、冷冻食品等）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "OOG",
        "EnglishName": "Out of Gauge Cargo",
        "ChineseName": "超限货物",
        "Description": "超限货物（尺寸或重量超出标准集装箱限制，需特殊运输安排，如超长、超宽设备）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "LO",
        "EnglishName": "Live Animals",
        "ChineseName": "活体动物",
        "Description": "活体动物（如牲畜、宠物、实验动物等，需特殊舱位和许可证）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "PAC",
        "EnglishName": "Palletized Cargo",
        "ChineseName": "托盘货物",
        "Description": "托盘货物（标准化托盘装载货物，便于机械化装卸，常见于仓储物流）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "PRC",
        "EnglishName": "Project Cargo",
        "ChineseName": "项目货物",
        "Description": "项目货物（大型工程项目设备，如风电设备、船舶部件，需定制化运输方案）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "HLC",
        "EnglishName": "Heavy Lift Cargo",
        "ChineseName": "重货",
        "Description": "重货（单件重量超过标准集装箱承载能力，需特种运输工具，如超重机械、工业设备）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "LC",
        "EnglishName": "Liquid Cargo",
        "ChineseName": "液体货物",
        "Description": "液体货物（如石油、化学品、液化气，需专用油罐车或散装运输）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "OC",
        "EnglishName": "Overweight Cargo",
        "ChineseName": "超重货物",
        "Description": "超重货物（单件重量超过运输工具限制，需特殊申报和加固措施）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "PEC",
        "EnglishName": "Perishable Cargo",
        "ChineseName": "易腐货物",
        "Description": "易腐货物（需快速运输和保鲜处理，如水果、花卉、海鲜等）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "EC",
        "EnglishName": "Exempted Cargo",
        "ChineseName": "免检货物",
        "Description": "免检货物（符合特定豁免条款的货物，如部分低风险普通商品）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "SPC",
        "EnglishName": "Special Cargo",
        "ChineseName": "特殊货物",
        "Description": "特殊货物（需特殊处理的货物，如贵重物品、机密文件、外交邮袋等）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "ED",
        "EnglishName": "Oversized Dimensions",
        "ChineseName": "超尺寸货物",
        "Description": "超尺寸货物（长度、宽度或高度超出标准限制，需特殊运输安排）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "SEC",
        "EnglishName": "Sensitive Cargo",
        "ChineseName": "敏感货物",
        "Description": "敏感货物（需防震、防潮、防尘的精密仪器或电子产品）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "BAC",
        "EnglishName": "Battery Cargo",
        "ChineseName": "电池类货物",
        "Description": "电池类货物（如锂电池、铅酸电池，需按危险品规则运输并标注UN编号）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "CRC",
        "EnglishName": "Cryogenic Cargo",
        "ChineseName": "超低温货物",
        "Description": "超低温货物（需极低温运输，如液氮、液氧，需专业冷藏设备）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "CUC",
        "EnglishName": "Cultural Cargo",
        "ChineseName": "文物/文化货物",
        "Description": "文物/文化货物（需特殊保护和保险，如艺术品、古董）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "",
        "FbaAirUse": "",
        "FbaRailUse": ""
    },
    {
        "Id": "ECC",
        "EnglishName": "E-commerce Cargo",
        "ChineseName": "电商货物",
        "Description": "电商货物（小件包裹，通常通过快递或小包渠道运输，如跨境B2C订单）。",
        "OceanUse": "Y",
        "AirUse": "Y",
        "FbaOceanUse": "Y",
        "FbaAirUse": "Y",
        "FbaRailUse": "Y"
    }
]
    ;


// 获取账单管理台账列表
export const getBaseCargoTypeList = async (): Promise<BaseCargoTypeItemProps[]> => {
    return baseCargoTypeItems;
}

// 保存账单管理
export const saveBaseCargoType = async (data: BaseCargoTypeItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseCargoTypeItemProps> => {
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
export const getBaseCargoTypeList = async (): Promise<BaseCargoTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_cargo_type"
  })
  const responseData = response?.data as ApiRes<BaseCargoTypeItemProps[]>;
  return responseData.data || [];
}

export const saveBaseCargoType = (data:BaseCargoTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_cargo_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
