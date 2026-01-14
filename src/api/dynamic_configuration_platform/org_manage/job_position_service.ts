
import request, {ApiRes,requestWithProgress } from '../../request'
import { JobPositionItemProps } from "@/types/dynamic_configuration_platform/org_manage/job_position";
import Mock from "mockjs";
//
const jobPositionItems:JobPositionItemProps[] = [
  {
    "JobCode": "1001",
    "JobName": "人力资源专员",
    "DeptBelong": "人力资源部",
    "ParentJob": "人力资源主管",
    "JobStatus": "1",
    "JobDuty": "负责招聘、培训、员工关系管理等工作",
    "JobRemark": "需具备HR相关经验"
  },
  {
    "JobCode": "1002",
    "JobName": "软件工程师",
    "DeptBelong": "技术部",
    "ParentJob": "技术主管",
    "JobStatus": "1",
    "JobDuty": "负责系统开发与维护，编写高质量代码",
    "JobRemark": "熟悉Java/Python优先"
  },
  {
    "JobCode": "1003",
    "JobName": "产品经理",
    "DeptBelong": "产品部",
    "ParentJob": "产品总监",
    "JobStatus": "1",
    "JobDuty": "负责产品规划、需求分析及产品生命周期管理",
    "JobRemark": "需具备3年以上产品经验"
  },
  {
    "JobCode": "1004",
    "JobName": "财务专员",
    "DeptBelong": "财务部",
    "ParentJob": "财务主管",
    "JobStatus": "1",
    "JobDuty": "负责账务处理、报表编制及财务分析",
    "JobRemark": "需持有会计从业资格证"
  },
  {
    "JobCode": "1005",
    "JobName": "销售代表",
    "DeptBelong": "销售部",
    "ParentJob": "销售经理",
    "JobStatus": "1",
    "JobDuty": "完成销售任务，维护客户关系",
    "JobRemark": "需具备较强的沟通能力"
  },
  {
    "JobCode": "1006",
    "JobName": "市场推广专员",
    "DeptBelong": "市场部",
    "ParentJob": "市场主管",
    "JobStatus": "1",
    "JobDuty": "制定并执行市场推广计划，提升品牌影响力",
    "JobRemark": "熟悉新媒体运营者优先"
  },
  {
    "JobCode": "1007",
    "JobName": "行政助理",
    "DeptBelong": "行政部",
    "ParentJob": "行政主管",
    "JobStatus": "1",
    "JobDuty": "协助处理日常行政事务，会议安排等",
    "JobRemark": "需熟练使用办公软件"
  },
  {
    "JobCode": "1008",
    "JobName": "测试工程师",
    "DeptBelong": "技术部",
    "ParentJob": "测试主管",
    "JobStatus": "1",
    "JobDuty": "负责软件测试用例设计与执行，确保产品质量",
    "JobRemark": "熟悉自动化测试工具者优先"
  },
  {
    "JobCode": "1009",
    "JobName": "运营专员",
    "DeptBelong": "运营管理部",
    "ParentJob": "运营主管",
    "JobStatus": "1",
    "JobDuty": "负责平台日常运营及数据分析",
    "JobRemark": "有电商运营经验者优先"
  },
  {
    "JobCode": "1010",
    "JobName": "客服专员",
    "DeptBelong": "客户服务部",
    "ParentJob": "客服主管",
    "JobStatus": "0",
    "JobDuty": "处理客户咨询与投诉，提升客户满意度",
    "JobRemark": "需普通话标准"
  },
  {
    "JobCode": "1011",
    "JobName": "UI设计师",
    "DeptBelong": "产品设计部",
    "ParentJob": "设计主管",
    "JobStatus": "1",
    "JobDuty": "负责产品界面设计与用户体验优化",
    "JobRemark": "需提供作品集"
  },
  {
    "JobCode": "1012",
    "JobName": "数据分析师",
    "DeptBelong": "数据分析部",
    "ParentJob": "数据分析主管",
    "JobStatus": "1",
    "JobDuty": "对业务数据进行分析，提供决策支持",
    "JobRemark": "掌握SQL/Python优先"
  },
  {
    "JobCode": "1013",
    "JobName": "项目经理",
    "DeptBelong": "项目管理部",
    "ParentJob": "项目总监",
    "JobStatus": "1",
    "JobDuty": "统筹项目进度，协调资源，确保项目按时交付",
    "JobRemark": "PMP认证者优先"
  },
  {
    "JobCode": "1014",
    "JobName": "采购专员",
    "DeptBelong": "采购部",
    "ParentJob": "采购主管",
    "JobStatus": "1",
    "JobDuty": "负责物资采购及供应商管理",
    "JobRemark": "需具备谈判能力"
  },
  {
    "JobCode": "1015",
    "JobName": "法务专员",
    "DeptBelong": "法务部",
    "ParentJob": "法务主管",
    "JobStatus": "1",
    "JobDuty": "处理合同审核、法律咨询及风险控制",
    "JobRemark": "通过司法考试者优先"
  },
  {
    "JobCode": "1016",
    "JobName": "新媒体运营",
    "DeptBelong": "市场部",
    "ParentJob": "市场主管",
    "JobStatus": "1",
    "JobDuty": "负责社交媒体内容策划与运营",
    "JobRemark": "熟悉短视频平台运营者优先"
  },
  {
    "JobCode": "1017",
    "JobName": "前端开发工程师",
    "DeptBelong": "技术部",
    "ParentJob": "技术主管",
    "JobStatus": "1",
    "JobDuty": "负责前端页面开发与交互实现",
    "JobRemark": "熟悉React/Vue框架者优先"
  },
  {
    "JobCode": "1018",
    "JobName": "运维工程师",
    "DeptBelong": "运维部",
    "ParentJob": "运维主管",
    "JobStatus": "1",
    "JobDuty": "负责服务器及网络系统的维护与监控",
    "JobRemark": "熟悉Linux系统者优先"
  },
  {
    "JobCode": "1019",
    "JobName": "培训讲师",
    "DeptBelong": "人力资源部",
    "ParentJob": "培训主管",
    "JobStatus": "2",
    "JobDuty": "负责员工培训课程开发与授课",
    "JobRemark": "具备授课经验者优先"
  },
  {
    "JobCode": "1020",
    "JobName": "安全工程师",
    "DeptBelong": "安全合规部",
    "ParentJob": "安全主管",
    "JobStatus": "1",
    "JobDuty": "负责公司信息安全与合规管理",
    "JobRemark": "持有CISSP证书者优先"
  }
];


// 获取账单管理台账列表
export const getJobPositionList = async (): Promise<JobPositionItemProps[]> => {
  return jobPositionItems;
}

// 保存账单管理
export const saveJobPosition = async (data: JobPositionItemProps, onUploadProgress?: (progress: number) => void): Promise<JobPositionItemProps> => {
  // 模拟上传进度
  if (onUploadProgress) {
    let progress = 1;
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
export const getJobPositionList = async (): Promise<JobPositionItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/job_position"
  })
  const responseData = response?.data as ApiRes<JobPositionItemProps[]>;
  return responseData.data || [];
}

export const saveJobPosition = (data:JobPositionItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/job_position/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
