
import request, {ApiRes,requestWithProgress } from '../request'
import { ManageOrgItemProps } from "@/types/org_manage/manage_org";
import Mock from "mockjs";
//
const manageOrgItems:ManageOrgItemProps[] = [
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
export const getManageOrgList = async (): Promise<ManageOrgItemProps[]> => {
  return manageOrgItems;
}

// 保存账单管理
export const saveManageOrg = async (data: ManageOrgItemProps, onUploadProgress?: (progress: number) => void): Promise<ManageOrgItemProps> => {
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
export const getManageOrgList = async (): Promise<ManageOrgItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/manage_org"
  })
  const responseData = response?.data as ApiRes<ManageOrgItemProps[]>;
  return responseData.data || [];
}

export const saveManageOrg = (data:ManageOrgItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/manage_org/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
