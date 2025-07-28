
import request, {ApiRes,requestWithProgress } from '../../request'
import { VisitCustomerItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/visit_customer";
import Mock from "mockjs";
//
const visitCustomerItems:VisitCustomerItemProps[] = [
    {
        Id:Mock.mock("@id"),
        Theme:'实地拜访',
        VisitTime:'2023-01-01',
        Recorder:'张三',
        RecordTime:'2023-01-01 09:00:00',
        Status:'已拜访',
        Location:'市南区华润大厦A座',
        Participants:'张三、李四、王五',
        Content:'拜访客户，了解客户需求，协调客户合作事宜。',
        Result:'客户对合作方案表示认同，双方达成合作协议。',
        NextTask:'与客户进行后续沟通',
        ReportTo:'李想',
        Remarks:'拜访客户过程中，客户对合作方案表示认同，双方达成合作协议。',
    },
    {
        Id:Mock.mock("@id"),
        Theme:'电话',
        VisitTime:'2023-01-01',
        Recorder:'张三',
        RecordTime:'2023-01-01 09:00:00',
        Status:'进行中',
        Location:'市南区华润大厦A座',
        Participants:'张三、李四、王五',
        Content:'拜访客户，了解客户需求，协调客户合作事宜。',
        Result:'客户对合作方案表示认同，双方达成合作协议。',
        NextTask:'与客户进行后续沟通',
        ReportTo:'李想',
        Remarks:'拜访客户过程中，客户对合作方案表示认同，双方达成合作协议。',
    },
    {
        Id:Mock.mock("@id"),
        Theme:'即时通信',
        VisitTime:'2021-08-01',
        Recorder:'张三',
        RecordTime:'2021-08-01 10:00:00',
        Status:'进行中',
        Location:'上海',
        Participants:'张三、李四、王五',
        Content:'拜访客户，了解客户需求，协调客户合作事宜。',
        Result:'客户对合作方案表示认同，双方达成合作协议。',
        NextTask:'与客户进行合作',
        ReportTo:'张三',
        Remarks:'无'
    },
    {
        Id:Mock.mock("@id"),
        Theme:'电子邮件',
        VisitTime:'2021-08-01',
        Recorder:'张三',
        RecordTime:'2021-08-01 10:00:00',
        Status:'进行中',
        Location:'上海',
        Participants:'张三、李四、王五',
        Content:'拜访客户，了解客户需求，协调客户合作事宜。',
        Result:'客户对合作方案表示认同，双方达成合作协议。',
        NextTask:'与客户进行合作',
        ReportTo:'张三',
        Remarks:'无'
    },
    {
        Id:Mock.mock("@id"),
        Theme:'客户来访',
        VisitTime:'2021-08-01',
        Recorder:'张三',
        RecordTime:'2021-08-01 10:00:00',
        Status:'进行中',
        Location:'上海',
        Participants:'张三、李四、王五',
        Content:'拜访客户，了解客户需求，协调客户合作事宜。',
        Result:'客户对合作方案表示认同，双方达成合作协议。',
        NextTask:'与客户进行电话沟通，了解客户需求。',
        ReportTo:'张三',
        Remarks:'无'
    },
    {
        Id:Mock.mock("@id"),
        Theme:'熟客介绍',
        VisitTime:'2021-08-01',
        Recorder:'张三',
        RecordTime:'2021-08-01 10:00:00',
        Status:'进行中',
        Location:'上海',
        Participants:'张三、李四、王五',
        Content:'拜访客户，了解客户需求，协调客户合作事宜。',
        Result:'客户对合作方案表示认同，双方达成合作协议。',
        NextTask:'与客户进行合作',
        ReportTo:'张三',
        Remarks:'无'
    },
    {
        Id:Mock.mock("@id"),
        Theme:'展会开发',
        VisitTime:'2021-08-01',
        Recorder:'张三',
        RecordTime:'2021-08-01 10:00:00',
        Status:'异常',
        Location:'上海',
        Participants:'张三、李四、王五',
        Content:'拜访客户，了解客户需求，协调客户合作事宜。',
        Result:'客户对合作方案表示认同，双方达成合作协议。',
        NextTask:'与客户进行合作',
        ReportTo:'张三',
        Remarks:'无'
    }
];


// 获取账单管理台账列表
export const getVisitCustomerList = async (): Promise<VisitCustomerItemProps[]> => {
  return visitCustomerItems;
}

// 保存账单管理
export const saveVisitCustomer = async (data: VisitCustomerItemProps, onUploadProgress?: (progress: number) => void): Promise<VisitCustomerItemProps> => {
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
export const getVisitCustomerList = async (): Promise<VisitCustomerItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/visit_customer"
  })
  const responseData = response?.data as ApiRes<VisitCustomerItemProps[]>;
  return responseData.data || [];
}

export const saveVisitCustomer = (data:VisitCustomerItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/visit_customer/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
