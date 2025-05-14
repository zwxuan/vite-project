import request, { ApiRes, requestWithProgress } from '../request'
import { ChargingStandardItemProps } from "@/types/system_manage/charging_standard/charging_standard";
import Mock from "mockjs";

// 模拟计费标准台账数据
const chargingStandardItems: ChargingStandardItemProps[] = [
  {
      "Id": "1",
      "PaymentMethod": "应收",
      "FeeName": "单证费",
      "IsControlled": "否",
      "SettlementUnitType": "客户",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 2000,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "2",
      "PaymentMethod": "应收",
      "FeeName": "查验费",
      "IsControlled": "否",
      "SettlementUnitType": "客户",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 600,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "3",
      "PaymentMethod": "应付",
      "FeeName": "机场杂费",
      "IsControlled": "否",
      "SettlementUnitType": "承运人",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 200,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "4",
      "PaymentMethod": "应付",
      "FeeName": "查验费",
      "IsControlled": "否",
      "SettlementUnitType": "订舱代理/换单代理",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 500,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "5",
      "PaymentMethod": "应付",
      "FeeName": "装箱费",
      "IsControlled": "否",
      "SettlementUnitType": "承运人",
      "FixedSettlementUnit": "",
      "Currency": "RMB",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 200,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  },
  {
      "Id": "6",
      "PaymentMethod": "应收",
      "FeeName": "空运费",
      "IsControlled": "否",
      "SettlementUnitType": "客户",
      "FixedSettlementUnit": "",
      "Currency": "USD",
      "City": "",
      "BillingUnit": "计费重量价",
      "ValueLowerLimit": 0,
      "ValueUpperLimit": 0,
      "ContainerType": "",
      "ContainerCategory": "",
      "Quantity": 0,
      "BillingUnitPrice": "0",
      "UnitPrice": 1000,
      "MinimumCharge": 0,
      "TaxRate": 0,
      "Remarks": "",
      "RequiresInvoice": "是"
  }
];

// 获取计费标准台账列表
export const getChargingStandardList = async (): Promise<ChargingStandardItemProps[]> => {
  return chargingStandardItems;
}

// 保存计费标准
export const saveChargingStandard = async (data: ChargingStandardItemProps, onUploadProgress?: (progress: number) => void): Promise<ChargingStandardItemProps> => {
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

// 原有API接口代码（已注释）
/*
// 获取计费标准台账列表
export const getChargingStandardList = async () : Promise<ChargingStandardItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/charging_standard"
  });
  const responseData = response?.data as ApiRes<ChargingStandardItemProps[]>;
  return responseData.data || [];
}

// 保存计费标准
export const saveChargingStandard = (data:ChargingStandardItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/charging_standard/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/