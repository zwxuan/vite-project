
import request, { ApiRes, requestWithProgress } from '../../request'
import { BaseShipmentTypeItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/base_shipment_type";
import Mock from "mockjs";
//
const baseShipmentTypeItems: BaseShipmentTypeItemProps[] = [
    {
        "ShipmentTypeId": "LCLAD",
        "ShipmentTypeName": "LCL 拼箱",
        "ShipmentTypeMeaning": "拼箱运输，多个小票货物拼装至一个集装箱",
        "ApplicableScenario": "小批量货物（如小商品、样品）",
        "Advantage": "降低成本，适合中小型企业",
        "Disadvantage": "运输周期较长，需拆箱分拨"
    },
    {
        "ShipmentTypeId": "COLAD",
        "ShipmentTypeName": "Co-Load",
        "ShipmentTypeMeaning": "多方共享运输资源（舱位或集装箱），分摊成本",
        "ApplicableScenario": "货量不足时降低成本，适用于海运、空运或陆运",
        "Advantage": "分摊费用，提高资源利用率",
        "Disadvantage": "需多方协调，责任划分复杂"
    },
    {
        "ShipmentTypeId": "AGBOK",
        "ShipmentTypeName": "代理订舱",
        "ShipmentTypeMeaning": "货代为客户向船公司 / 航空公司预订舱位",
        "ApplicableScenario": "所有海运 / 空运需求，尤其是舱位紧张时",
        "Advantage": "专业服务，简化客户流程，优先保障舱位",
        "Disadvantage": "需支付代理费用，依赖船公司资源"
    },
    {
        "ShipmentTypeId": "SCONS",
        "ShipmentTypeName": "自拼",
        "ShipmentTypeMeaning": "货代主动整合客户货物进行拼箱",
        "ApplicableScenario": "客户分散但目的地相同，如多个工厂出口至同一港口",
        "Advantage": "提升资源整合效率，优化成本",
        "Disadvantage": "需承担装箱协调责任，操作复杂"
    },
    {
        "ShipmentTypeId": "FCLAD",
        "ShipmentTypeName": "FCL 整箱",
        "ShipmentTypeMeaning": "整箱运输，单票货物填满整个集装箱",
        "ApplicableScenario": "大批量货物（如大件设备、高价值商品）",
        "Advantage": "独占集装箱，运输效率高，安全性强",
        "Disadvantage": "单位成本较高，需足够货量"
    },
    {
        "ShipmentTypeId": "INTPL",
        "ShipmentTypeName": "整拼",
        "ShipmentTypeMeaning": "多个整箱货物拼装至同一运输工具（非同一集装箱）",
        "ApplicableScenario": "同一航线但发货人分散的场景（如多个工厂出口至同一港口）",
        "Advantage": "优化舱位利用率，降低单票运费",
        "Disadvantage": "需协调多方装箱时间，操作复杂"
    },
    {
        "ShipmentTypeId": "EXTPL",
        "ShipmentTypeName": "外拼",
        "ShipmentTypeMeaning": "货代与其他公司合作拼箱，整合外部资源",
        "ApplicableScenario": "本地拼箱资源不足时，联合其他地区货代",
        "Advantage": "扩大拼箱规模，降低成本",
        "Disadvantage": "需审核合作方资质，风险分担复杂"
    },
    {
        "ShipmentTypeId": "FBASH",
        "ShipmentTypeName": "FBA 海运",
        "ShipmentTypeMeaning": "为亚马逊 FBA 仓库运输货物的海运服务",
        "ApplicableScenario": "跨境电商货物直发亚马逊海外仓",
        "Advantage": "直接对接 FBA 系统，时效可控",
        "Disadvantage": "需严格遵守亚马逊包装 / 清关规则，可能产生滞留费"
    },
    {
        "ShipmentTypeId": "GENCR",
        "ShipmentTypeName": "散杂",
        "ShipmentTypeMeaning": "散杂货运输，未包装或大宗散装货物（如煤炭、矿石）",
        "ApplicableScenario": "大宗商品（煤炭、矿石、钢材）或工程设备运输",
        "Advantage": "成本低，适合低值大件",
        "Disadvantage": "需特殊装卸设备，运输周期长"
    },
    {
        "ShipmentTypeId": "MMTPT",
        "ShipmentTypeName": "多式联运",
        "ShipmentTypeMeaning": "结合海运、铁路、公路等多种运输方式",
        "ApplicableScenario": "跨境大宗货物（如中欧班列 + 海运）、时效敏感货物",
        "Advantage": "缩短运输周期，降低综合成本",
        "Disadvantage": "需协调多环节，操作复杂"
    },
    {
        "ShipmentTypeId": "GRNLT",
        "ShipmentTypeName": "绿色物流",
        "ShipmentTypeMeaning": "通过优化运输方案减少碳排放（如拼箱、多式联运）",
        "ApplicableScenario": "注重环保的客户（如欧盟市场）、碳足迹合规需求",
        "Advantage": "降低环境影响，符合国际政策趋势",
        "Disadvantage": "初期投入高，需技术优化支持"
    }
];


// 获取账单管理台账列表
export const getBaseShipmentTypeList = async (): Promise<BaseShipmentTypeItemProps[]> => {
    return baseShipmentTypeItems;
}

// 保存账单管理
export const saveBaseShipmentType = async (data: BaseShipmentTypeItemProps, onUploadProgress?: (progress: number) => void): Promise<BaseShipmentTypeItemProps> => {
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
export const getBaseShipmentTypeList = async (): Promise<BaseShipmentTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/base_shipment_type"
  })
  const responseData = response?.data as ApiRes<BaseShipmentTypeItemProps[]>;
  return responseData.data || [];
}

export const saveBaseShipmentType = (data:BaseShipmentTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/base_shipment_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
