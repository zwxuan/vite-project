
import request, {ApiRes,requestWithProgress } from '../../request'
import { SpaceCarrierItemProps } from "@/types/dynamic_configuration_platform/basic_manage/space_carrier";
import Mock from "mockjs";
//
const spaceCarrierItems:SpaceCarrierItemProps[] = [
    {
        Id:Mock.mock("@id"),
        CarrierName:'澳洲国际航运有限公司',
        CarrierType:'船公司',
        BookingMethod:'EDI',
        DeparturePort:'TUNIS',
        Route:'中美洲',
        DestinationPort:'TRIPOLI',
        Country:'孟买',
        ContactPerson:'杰森',
        ContactNumber:'13800000000',
        Email:'jason@example.com',
    },
    {
        Id:Mock.mock("@id"),
        CarrierName:'澳大利亚国际航运有限公司',
        CarrierType:'船公司',
        BookingMethod:'EDI',
        DeparturePort:'TUNIS',
        Route:'中美洲',
        DestinationPort:'TRIPOLI',
        Country:'孟买',
        ContactPerson:'杰森',
        ContactNumber:'13800000000',
        Email:'jason@example.com',
    },
    {
        Id:Mock.mock("@id"),
        CarrierName:'极地航空公司',
        CarrierType:'航空公司',
        BookingMethod:'网上',
        DeparturePort:'TUNIS',
        Route:'中美洲',
        DestinationPort:'TRIPOLI',
        Country:'孟买',
        ContactPerson:'杰森',
        ContactNumber:'13800000000',
        Email:'jason@example.com',
    },
    {
        Id:Mock.mock("@id"),
        CarrierName:'乌兹别克斯坦航空公司',
        CarrierType:'航空公司',
        BookingMethod:'纸质',
        DeparturePort:'TUCSON',
        Route:'印巴',
        DestinationPort:'ABBOTSFORD',
        Country:'孟买',
        ContactPerson:'皮特',
        ContactNumber:'13820030000',
        Email:'piter@example.com',
    }
];


// 获取账单管理台账列表
export const getSpaceCarrierList = async (): Promise<SpaceCarrierItemProps[]> => {
  return spaceCarrierItems;
}

// 保存账单管理
export const saveSpaceCarrier = async (data: SpaceCarrierItemProps, onUploadProgress?: (progress: number) => void): Promise<SpaceCarrierItemProps> => {
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
export const getSpaceCarrierList = async (): Promise<SpaceCarrierItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/space_carrier"
  })
  const responseData = response?.data as ApiRes<SpaceCarrierItemProps[]>;
  return responseData.data || [];
}

export const saveSpaceCarrier = (data:SpaceCarrierItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/space_carrier/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
