
import request, {ApiRes,requestWithProgress } from '../../request'
import { AdminOrgItemProps } from "@/types/dynamic_configuration_platform/org_manage/admin_org";
import Mock from "mockjs";
//
const adminOrgItems:AdminOrgItemProps[] = [
  {
    OrgCode: '00',
    OrgName: '集团总部',
    OrgAbbr: '',
    OrgStatus: '已启用',
    OrgRemark: '',
    children : [
      {
        OrgCode: '0001',
        OrgName: '青岛分公司',
        OrgAbbr: '',
        OrgStatus: '已启用',
        OrgRemark: '',
      },
      {
        OrgCode: '0002',
        OrgName: '海运事业部',
        OrgAbbr: '',
        OrgStatus: '已启用',
        OrgRemark: '',
        children : [
          {
            OrgCode: '000201',
            OrgName: '宁波站',
            OrgAbbr: '',
            OrgStatus: '已启用',
            OrgRemark: '',
          },
          {
            OrgCode: '000202',
            OrgName: '青岛站',
            OrgAbbr: '',
            OrgStatus: '已启用',
            OrgRemark: '',
          },
        ],
      },
      {
        OrgCode: '0003',
        OrgName: '空运事业部',
        OrgAbbr: '',
        OrgStatus: '已启用',
        OrgRemark: '',
        children : [
          {
            OrgCode: '000301',
            OrgName: '空运东区',
            OrgAbbr: '',
            OrgStatus: '已启用',
            OrgRemark: '',
            children : [
              {
                OrgCode: '00030101',
                OrgName: '产品部',
                OrgAbbr: '',
                OrgStatus: '已启用',
                OrgRemark: '',
              },
              {
                OrgCode: '00030102',
                OrgName: '运营部',
                OrgAbbr: '',
                OrgStatus: '已启用',
                OrgRemark: '',
              },
            ],
          },
        ],
      },
    ],
  },
];


// 获取账单管理台账列表
export const getAdminOrgList = async (): Promise<AdminOrgItemProps[]> => {
  return adminOrgItems;
}

// 保存账单管理
export const saveAdminOrg = async (data: AdminOrgItemProps, onUploadProgress?: (progress: number) => void): Promise<AdminOrgItemProps> => {
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
export const getAdminOrgList = async (): Promise<AdminOrgItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/admin_org"
  })
  const responseData = response?.data as ApiRes<AdminOrgItemProps[]>;
  return responseData.data || [];
}

export const saveAdminOrg = (data:AdminOrgItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/admin_org/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
