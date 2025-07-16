
import request, {ApiRes,requestWithProgress } from '../request'
import { CustomerTypeItemProps } from "@/types/basic_manage/customer_type";
import Mock from "mockjs";
//
const customerTypeItems:CustomerTypeItemProps[] = [
    {
        Code:Mock.mock("@id"),
        ChineseName:'潜在客户',
        EnglishName:'Potential Customer',
        Remark:'潜在客户指的是那些可能对产品或服务感兴趣但尚未进行任何接触或者互动的个人或组织。这些客户可能符合目标市场特征，但还没有表现出购买意向。识别潜在客户是营销活动的重要部分，目的是通过各种渠道吸引他们关注公司的产品或服务。',
    },  
    {
        Code:Mock.mock("@id"),
        ChineseName:'意向客户',
        EnglishName:'Intentional Customer',
        Remark:'意向客户是指那些已经显示出对公司产品或服务有兴趣，并且愿意进一步了解的人。这可以通过请求信息、参加网络研讨会、注册试用版或其他形式的互动来表现出来。这类客户处于销售漏斗的中间阶段，销售人员通常会针对这些客户采取积极的跟进措施以推动其进入下一阶段。',
    },  
    {
        Code:Mock.mock("@id"),
        ChineseName:'成交客户',
        EnglishName:'Deal Customer',
        Remark:'成交客户是指那些最终决定购买并完成交易过程的客户。一旦客户支付了产品或服务费用，他们就从意向客户转变为成交客户。对于企业来说，这部分客户不仅代表了一次成功的销售，也是未来可能的重复购买者以及口碑传播的基础。',
    },  
    {
        Code:Mock.mock("@id"),
        ChineseName:'售后客户',
        EnglishName:'After-sales Customer',
        Remark:'售后客户指的是已经完成了购买行为后的客户群体。这一阶段的重点在于提供优质的客户服务和支持，确保客户的满意度，解决可能出现的问题，并鼓励再次购买或推荐给他人。维护良好的售后服务关系有助于建立长期的品牌忠诚度。',
    },  
      
];


// 获取账单管理台账列表
export const getCustomerTypeList = async (): Promise<CustomerTypeItemProps[]> => {
  return customerTypeItems;
}

// 保存账单管理
export const saveCustomerType = async (data: CustomerTypeItemProps, onUploadProgress?: (progress: number) => void): Promise<CustomerTypeItemProps> => {
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
export const getCustomerTypeList = async (): Promise<CustomerTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/customer_type"
  })
  const responseData = response?.data as ApiRes<CustomerTypeItemProps[]>;
  return responseData.data || [];
}

export const saveCustomerType = (data:CustomerTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/customer_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
