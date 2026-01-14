
import request, {ApiRes,requestWithProgress } from '../../request'
import { RoleTagsItemProps } from "@/types/dynamic_configuration_platform/identity/role_tags";
import Mock from "mockjs";
//
const roleTagsItems:RoleTagsItemProps[] = [
    {
        TagCode:Mock.mock("@id"),
        TagName:'系统管理员',
        Status:'启用',
    },
    {
        TagCode:Mock.mock("@id"),
        TagName:'普通用户',
        Status:'启用',
    },
    {
        TagCode:Mock.mock("@id"),
        TagName:'测试用户',
        Status:'启用',
    },
    {
        TagCode:Mock.mock("@id"),
        TagName:'测试用户1',
        Status:'启用',
    },
    {
        TagCode:Mock.mock("@id"),
        TagName:'测试用户2',
        Status:'启用',
    }
];


// 获取账单管理台账列表
export const getRoleTagsList = async (): Promise<RoleTagsItemProps[]> => {
  return roleTagsItems;
}

// 保存账单管理
export const saveRoleTags = async (data: RoleTagsItemProps, onUploadProgress?: (progress: number) => void): Promise<RoleTagsItemProps> => {
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
export const getRoleTagsList = async (): Promise<RoleTagsItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/role_tags"
  })
  const responseData = response?.data as ApiRes<RoleTagsItemProps[]>;
  return responseData.data || [];
}

export const saveRoleTags = (data:RoleTagsItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/role_tags/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
