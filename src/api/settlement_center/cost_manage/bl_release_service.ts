
import request, {ApiRes,requestWithProgress } from '../../request'
import { BlReleaseItemProps } from "@/types/settlement_center/cost_manage/bl_release";
import Mock from "mockjs";
//
const blReleaseItems:BlReleaseItemProps[] = [
    {
        BusinessId:'SHSELAX3D00001',
        Consignor:'上海振华国家物流有限公司',
        BookingAgent:'天津宝阳国际货运代理有限公司',
        ShippingCompany:'天津宝阳国际货运代理有限公司',
        SailingDate:'2023-05-25',
        VesselVoyage:'MB123456',
        MblNumber:'APLU067466753',
        SalesPerson:'张三',
        BlStatus:'待确认',
        ReleaseAuditStatus:'待审核',
        AuditTime:'2023-05-25',
        ContractValid:'是',
        Invoiced:'是',
        FullyWrittenOff:'是',
        Overdue:'否',
        OverLimit:'否',
        Remarks:'',
        ReleaseNumber:'R00001',
        PostOfDestination:'洛杉矶',
    },
    {
        BusinessId:'SHSELAX3D00002',
        Consignor:'上海环球贸易有限公司',
        BookingAgent:'达飞轮船（中国）有限公司',
        ShippingCompany:'达飞轮船（中国）有限公司',
        SailingDate:'2023-05-25',
        VesselVoyage:'MB234567',
        MblNumber:'APLU7466753',
        SalesPerson:'迪迪',
        BlStatus:'待确认',
        ReleaseAuditStatus:'待审核',
        AuditTime:'2023-05-25',
        ContractValid:'是',
        Invoiced:'是',
        FullyWrittenOff:'是',
        Overdue:'否',
        OverLimit:'否',
        Remarks:'',
        ReleaseNumber:'R00002',
        PostOfDestination:'上海',
    },
    {
        BusinessId:'SHSELAX3D00003',
        Consignor:'ABC贸易公司',
        BookingAgent:'', 
        ShippingCompany:'长荣海运股份有限公司',
        SailingDate:'2023-05-25',
        VesselVoyage:'V.123456',
        MblNumber:'APLU067466753',
        SalesPerson:'张三',
        BlStatus:'待确认',
        ReleaseAuditStatus:'待审核',
        AuditTime:'2023-05-25',
        ContractValid:'是',
        Invoiced:'是',
        FullyWrittenOff:'是',
        Overdue:'否',
        OverLimit:'否',
        Remarks:'',
        ReleaseNumber:'R00003',
        PostOfDestination:'上海',
    },
    {
        BusinessId:'SHSELAX3D00004',
        Consignor:'北京爱迪生机械有限公司',
        BookingAgent:'美国总统班轮公司',  
        ShippingCompany:'美国总统班轮公司',
        SailingDate:'2023-05-25',
        VesselVoyage:'MB123456',
        MblNumber:'APLU067466753',
        SalesPerson:'张三',
        BlStatus:'已放单',
        ReleaseAuditStatus:'待审核',
        AuditTime:'2023-05-25',
        ContractValid:'是',
        Invoiced:'是',
        FullyWrittenOff:'是',
        Overdue:'否',
        OverLimit:'否',
        Remarks:'',
        ReleaseNumber:'R00004',
        PostOfDestination:'上海',
    }  
];


// 获取账单管理台账列表
export const getBlReleaseList = async (): Promise<BlReleaseItemProps[]> => {
  return blReleaseItems;
}

// 保存账单管理
export const saveBlRelease = async (data: BlReleaseItemProps, onUploadProgress?: (progress: number) => void): Promise<BlReleaseItemProps> => {
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
export const getBlReleaseList = async (): Promise<BlReleaseItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/bl_release"
  })
  const responseData = response?.data as ApiRes<BlReleaseItemProps[]>;
  return responseData.data || [];
}

export const saveBlRelease = (data:BlReleaseItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/bl_release/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
