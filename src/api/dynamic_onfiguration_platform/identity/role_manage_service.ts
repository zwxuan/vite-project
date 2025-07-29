
import request, {ApiRes,requestWithProgress } from '../../request'
import { RoleManageItemProps } from "@/types/dynamic_onfiguration_platform/identity/role_manage";
import Mock from "mockjs";
//
const roleManageItems:RoleManageItemProps[] = [
    {
        "RoleCode": "test",
        "RoleName": "测试说明",
        "ManageOrg": "企业账号级",
        "SystemRole": "否",
        "Status": "已启用",
        "RoleType": "管理类",
        "RoleTag": "",
        "RoleDesc": "测试角色",
        "RoleGroup": ""
    },
    {
        "RoleCode": "ED_ENGINEERX",
        "RoleName": "生产技术员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "业务类",
        "RoleTag": "",
        "RoleDesc": "BOM维护、生产技术规范建立及跟踪",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "uba_user",
        "RoleName": "用户洞察授权用户",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "业务类",
        "RoleTag": "",
        "RoleDesc": "用户洞察仪表盘授权用户",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "ipaas",
        "RoleName": "集成开发实施",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "管理类",
        "RoleTag": "",
        "RoleDesc": "集成实施开发使用",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "XTPortalManager",
        "RoleName": "门户模板管理员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "管理类",
        "RoleTag": "",
        "RoleDesc": "协同领域－管理某一个门户的管理者，只能设计门户，无法新建门户模版",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "xtrole_shujutongji",
        "RoleName": "运营管理员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "管理类",
        "RoleTag": "",
        "RoleDesc": "协同领域－数据统计运营管理员",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "YYGJ_role01",
        "RoleName": "应用构建人员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "管理类",
        "RoleTag": "",
        "RoleDesc": "角色：应用构建人员 功能权限：应用构建、沙箱管理、传输包管理、移动工作台",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "portal_manager",
        "RoleName": "工作台管理员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "通用类",
        "RoleTag": "",
        "RoleDesc": "PC端工作台的管理员，区别于协同",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "isEveryOne",
        "RoleName": "全员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "业务类",
        "RoleTag": "",
        "RoleDesc": "全员预制角色",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "ED01",
        "RoleName": "IT管理员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "业务类",
        "RoleTag": "",
        "RoleDesc": "IT管理员",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "xtrole_menhu",
        "RoleName": "门户管理员",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "通用类",
        "RoleTag": "",
        "RoleDesc": "协同领域－门户管理员",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "BD_GM",
        "RoleName": "基础数据管理员",
        "ManageOrg": "企业账号级",
        "SystemRole": "否",
        "Status": "已启用",
        "RoleType": "通用类",
        "RoleTag": "",
        "RoleDesc": "基础数据管理员",
        "RoleGroup": "生产组"
    },
    {
        "RoleCode": "MFG_ROLE_01",
        "RoleName": "生产主管",
        "ManageOrg": "企业账号级",
        "SystemRole": "是",
        "Status": "已启用",
        "RoleType": "通用类",
        "RoleTag": "",
        "RoleDesc": "主管企业生产制造业务的管理人员",
        "RoleGroup": "生产组"
    }
];


// 获取账单管理台账列表
export const getRoleManageList = async (): Promise<RoleManageItemProps[]> => {
  return roleManageItems;
}

// 保存账单管理
export const saveRoleManage = async (data: RoleManageItemProps, onUploadProgress?: (progress: number) => void): Promise<RoleManageItemProps> => {
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
export const getRoleManageList = async (): Promise<RoleManageItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/role_manage"
  })
  const responseData = response?.data as ApiRes<RoleManageItemProps[]>;
  return responseData.data || [];
}

export const saveRoleManage = (data:RoleManageItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/role_manage/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
