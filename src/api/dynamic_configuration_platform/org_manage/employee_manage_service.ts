
import request, {ApiRes,requestWithProgress } from '../../request'
import { EmployeeManageItemProps } from "@/types/dynamic_configuration_platform/org_manage/employee_manage";
import Mock from "mockjs";
//
const employeeManageItems:EmployeeManageItemProps[] = [
  {
    "EmployeeCode": "EMP0001",
    "EmployeeName": "张伟",
    "Organization": "总部",
    "Department": "人力资源部",
    "Email": "zhangwei@company.com",
    "Mobile": "13800001111",
    "Status":"1",
    "EmployeeCategory": "自有员工",
    "Remarks": "主管",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-20 14:30:00"
  },
  {
    "EmployeeCode": "EMP0002",
    "EmployeeName": "王芳",
    "Organization": "华东分公司",
    "Department": "财务部",
    "Email": "wangfang@company.com",
    "Mobile": "13900002222",
    "Status":"1",
    "EmployeeCategory": "正式员工",
    "Remarks": "会计",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-18 10:15:00"
  },
  {
    "EmployeeCode": "EMP0003",
    "EmployeeName": "李娜",
    "Organization": "华南分公司",
    "Department": "市场部",
    "Email": "lina@company.com",
    "Mobile": "13600003333",
    "Status":"1",
    "EmployeeCategory": "实习生",
    "Remarks": "市场助理",
    "LastUpdatedBy": "manager",
    "LastUpdatedTime": "2025-07-19 16:45:00"
  },
  {
    "EmployeeCode": "EMP0004",
    "EmployeeName": "刘强",
    "Organization": "总部",
    "Department": "技术部",
    "Email": "liuqiang@company.com",
    "Mobile": "13500004444",
    "Status":"1",
    "EmployeeCategory": "外包员工",
    "Remarks": "前端开发",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-21 09:20:00"
  },
  {
    "EmployeeCode": "EMP0005",
    "EmployeeName": "陈敏",
    "Organization": "华北分公司",
    "Department": "销售部",
    "Email": "chenmin@company.com",
    "Mobile": "13700005555",
    "Status":"1",
    "EmployeeCategory": "正式员工",
    "Remarks": "销售经理",
    "LastUpdatedBy": "manager",
    "LastUpdatedTime": "2025-07-17 11:10:00"
  },
  {
    "EmployeeCode": "EMP0006",
    "EmployeeName": "杨洋",
    "Organization": "总部",
    "Department": "IT部",
    "Email": "yangyang@company.com",
    "Mobile": "13300006666",
    "Status":"1",
    "EmployeeCategory": "自有员工",
    "Remarks": "系统运维",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-22 15:30:00"
  },
  {
    "EmployeeCode": "EMP0007",
    "EmployeeName": "赵磊",
    "Organization": "西南分公司",
    "Department": "采购部",
    "Email": "zhaolei@company.com",
    "Mobile": "13200007777",
    "Status":"1",
    "EmployeeCategory": "劳务派遣",
    "Remarks": "采购专员",
    "LastUpdatedBy": "manager",
    "LastUpdatedTime": "2025-07-16 17:25:00"
  },
  {
    "EmployeeCode": "EMP0008",
    "EmployeeName": "孙丽",
    "Organization": "总部",
    "Department": "行政部",
    "Email": "sunli@company.com",
    "Mobile": "13100008888",
    "Status":"1",
    "EmployeeCategory": "自有员工",
    "Remarks": "行政主管",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-15 10:45:00"
  },
  {
    "EmployeeCode": "EMP0009",
    "EmployeeName": "周杰",
    "Organization": "华东分公司",
    "Department": "研发部",
    "Email": "zhoujie@company.com",
    "Mobile": "13400009999",
    "Status":"1",
    "EmployeeCategory": "正式员工",
    "Remarks": "高级工程师",
    "LastUpdatedBy": "manager",
    "LastUpdatedTime": "2025-07-14 14:00:00"
  },
  {
    "EmployeeCode": "EMP0010",
    "EmployeeName": "吴倩",
    "Organization": "华南分公司",
    "Department": "客服部",
    "Email": "wuqian@company.com",
    "Mobile": "13800001112",
    "Status":"1",
    "EmployeeCategory": "实习生",
    "Remarks": "客户服务",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-13 16:30:00"
  },
  {
    "EmployeeCode": "EMP0011",
    "EmployeeName": "黄勇",
    "Organization": "总部",
    "Department": "法务部",
    "Email": "huangyong@company.com",
    "Mobile": "13900002223",
    "Status":"1",
    "EmployeeCategory": "自有员工",
    "Remarks": "法务顾问",
    "LastUpdatedBy": "manager",
    "LastUpdatedTime": "2025-07-12 12:15:00"
  },
  {
    "EmployeeCode": "EMP0012",
    "EmployeeName": "徐婷",
    "Organization": "华北分公司",
    "Department": "培训部",
    "Email": "xuting@company.com",
    "Mobile": "13600003334",
    "Status":"1",
    "EmployeeCategory": "正式员工",
    "Remarks": "培训专员",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-11 09:50:00"
  },
  {
    "EmployeeCode": "EMP0013",
    "EmployeeName": "高强",
    "Organization": "西南分公司",
    "Department": "运营部",
    "Email": "gaoqiang@company.com",
    "Mobile": "13500004445",
    "Status":"1",
    "EmployeeCategory": "外包员工",
    "Remarks": "运营主管",
    "LastUpdatedBy": "manager",
    "LastUpdatedTime": "2025-07-10 11:40:00"
  },
  {
    "EmployeeCode": "EMP0014",
    "EmployeeName": "林芳",
    "Organization": "总部",
    "Department": "质量管理部",
    "Email": "linfang@company.com",
    "Mobile": "13700005556",
    "Status":"1",
    "EmployeeCategory": "自有员工",
    "Remarks": "质量主管",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-09 15:20:00"
  },
  {
    "EmployeeCode": "EMP0015",
    "EmployeeName": "郑浩",
    "Organization": "华东分公司",
    "Department": "物流部",
    "Email": "zhenghao@company.com",
    "Mobile": "13300006667",
    "Status":"1",
    "EmployeeCategory": "劳务派遣",
    "Remarks": "物流专员",
    "LastUpdatedBy": "manager",
    "LastUpdatedTime": "2025-07-08 10:30:00"
  },
  {
    "EmployeeCode": "EMP0016",
    "EmployeeName": "韩梅",
    "Organization": "华南分公司",
    "Department": "公关部",
    "Email": "hanmei@company.com",
    "Mobile": "13200007778",
    "Status":"1",
    "EmployeeCategory": "正式员工",
    "Remarks": "公关经理",
    "LastUpdatedBy": "admin",
    "LastUpdatedTime": "2025-07-07 14:10:00"
  }
];


// 获取账单管理台账列表
export const getEmployeeManageList = async (): Promise<EmployeeManageItemProps[]> => {
  return employeeManageItems;
}

// 保存账单管理
export const saveEmployeeManage = async (data: EmployeeManageItemProps, onUploadProgress?: (progress: number) => void): Promise<EmployeeManageItemProps> => {
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
export const getEmployeeManageList = async (): Promise<EmployeeManageItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/employee_manage"
  })
  const responseData = response?.data as ApiRes<EmployeeManageItemProps[]>;
  return responseData.data || [];
}

export const saveEmployeeManage = (data:EmployeeManageItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/employee_manage/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
