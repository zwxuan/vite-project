
import request, {ApiRes,requestWithProgress } from '../request'
import { EmployeeCategoryItemProps } from "@/types/org_manage/employee_category";
import Mock from "mockjs";
//
const employeeCategoryItems:EmployeeCategoryItemProps[] = [
  {
    "CategoryCode": "1",
    "CategoryName": "自有员工",
    "Status": "1",
    "Remarks": "公司正式员工"
  },
  {
    "CategoryCode": "2",
    "CategoryName": "实习生",
    "Status": "0",
    "Remarks": "短期实习人员"
  },
  {
    "CategoryCode": "3",
    "CategoryName": "外包员工",
    "Status": "1",
    "Remarks": "第三方派遣员工"
  },
  {
    "CategoryCode": "4",
    "CategoryName": "正式员工",
    "Status": "1",
    "Remarks": "已转正员工"
  },
  {
    "CategoryCode": "5",
    "CategoryName": "兼职员工",
    "Status": "1",
    "Remarks": "非全日制员工"
  },
  {
    "CategoryCode": "6",
    "CategoryName": "退休返聘",
    "Status": "1",
    "Remarks": "退休人员返聘"
  },
  {
    "CategoryCode": "7",
    "CategoryName": "劳务派遣",
    "Status": "1",
    "Remarks": "通过劳务公司派遣"
  },
  {
    "CategoryCode": "8",
    "CategoryName": "合作方人员",
    "Status": "1",
    "Remarks": "合作单位派驻人员"
  }
];


// 获取账单管理台账列表
export const getEmployeeCategoryList = async (): Promise<EmployeeCategoryItemProps[]> => {
  return employeeCategoryItems;
}

// 保存账单管理
export const saveEmployeeCategory = async (data: EmployeeCategoryItemProps, onUploadProgress?: (progress: number) => void): Promise<EmployeeCategoryItemProps> => {
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
export const getEmployeeCategoryList = async (): Promise<EmployeeCategoryItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/employee_category"
  })
  const responseData = response?.data as ApiRes<EmployeeCategoryItemProps[]>;
  return responseData.data || [];
}

export const saveEmployeeCategory = (data:EmployeeCategoryItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/employee_category/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
