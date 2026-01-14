
import request, {ApiRes,requestWithProgress } from '../../request'
import { RoleGroupItemProps } from "@/types/dynamic_configuration_platform/identity/role_group";
import Mock from "mockjs";
//
const roleGroupItems:RoleGroupItemProps[] = [
    {
        RoleGroupCode:Mock.mock("@id"),
        RoleGroupName:'生产组',
        Status:'已启用',
        RoleType:'业务类',
        IncludedRoles:'生产角色1,生产角色2',
    },  
    {
        RoleGroupCode:Mock.mock("@id"),
        RoleGroupName:'测试组',
        Status:'已启用',
        RoleType:'业务类',
        IncludedRoles:'测试角色1,测试角色2',
    },
    {
        RoleGroupCode:Mock.mock("@id"),
        RoleGroupName:'开发组',
        Status:'已启用',
        RoleType:'业务类',
        IncludedRoles:'开发角色1,开发角色2',
    },
    {
        RoleGroupCode:Mock.mock("@id"),
        RoleGroupName:'测试组',
        Status:'已启用',
        RoleType:'业务类',
        IncludedRoles:'测试角色1,测试角色2',
    },
    {
        RoleGroupCode:Mock.mock("@id"),
        RoleGroupName:'管理组',
        Status:'已启用',
        RoleType:'管理类',
        IncludedRoles:'管理角色1,管理角色2',
    }
];


// 获取账单管理台账列表
export const getRoleGroupList = async (): Promise<RoleGroupItemProps[]> => {
  return roleGroupItems;
}

// 保存账单管理
export const saveRoleGroup = async (data: RoleGroupItemProps, onUploadProgress?: (progress: number) => void): Promise<RoleGroupItemProps> => {
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
export const getRoleGroupList = async (): Promise<RoleGroupItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/role_group"
  })
  const responseData = response?.data as ApiRes<RoleGroupItemProps[]>;
  return responseData.data || [];
}

export const saveRoleGroup = (data:RoleGroupItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/role_group/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
