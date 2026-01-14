
import request, { ApiRes, requestWithProgress } from '../../request'
import { SysLoginLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_login_log";
import Mock from "mockjs";
//
const sysLoginLogItems: SysLoginLogItemProps[] = [
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-22 08:41:08",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-19 07:52:04",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-18 14:14:13",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-17 08:53:07",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-16 09:34:01",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-15 14:42:30",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-15 14:41:42",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-15 13:56:27",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-04 14:06:33",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-09-03 13:52:36",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-19 08:11:27",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-18 14:41:57",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-18 14:41:30",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-18 14:34:14",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-18 14:32:04",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-18 08:26:57",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-15 10:00:34",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-14 09:43:22",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-14 09:35:02",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-14 09:34:35",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-12 14:26:56",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-12 14:26:35",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-07 09:10:47",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-06 15:17:57",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-06 14:16:59",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-06 09:12:03",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-05 10:07:27",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-04 14:34:51",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-04 14:34:27",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-04 14:26:18",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-08-04 14:24:46",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-30 08:35:13",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-29 16:00:04",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-29 09:57:54",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-29 09:57:14",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-29 09:54:37",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-29 09:35:26",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-29 09:31:56",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-28 09:48:36",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-23 15:16:33",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-23 15:12:46",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-23 09:18:59",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-23 09:12:56",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-23 09:04:02",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.56.71.22",
        "LoginTime": "2025-07-23 08:48:02",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-22 10:55:03",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-22 10:53:38",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-22 10:50:25",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-22 08:57:43",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-21 09:33:37",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-18 13:53:13",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-18 13:46:28",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-18 08:43:53",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-17 14:00:52",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-17 13:56:44",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-17 13:46:19",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登出",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-17 08:42:54",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.22.82",
        "LoginTime": "2025-07-17 08:42:34",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.31.160",
        "LoginTime": "2025-04-16 13:59:03",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "张晓晓",
        "Operation": "登录",
        "IpAddress": "218.59.31.160",
        "LoginTime": "2025-03-31 19:50:58",
        "LoginDevice": "Web端",
        "Status": "成功"
    },
];


// 获取账单管理台账列表
export const getSysLoginLogList = async (): Promise<SysLoginLogItemProps[]> => {
    return sysLoginLogItems;
}

// 保存账单管理
export const saveSysLoginLog = async (data: SysLoginLogItemProps, onUploadProgress?: (progress: number) => void): Promise<SysLoginLogItemProps> => {
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
export const getSysLoginLogList = async (): Promise<SysLoginLogItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/sys_login_log"
  })
  const responseData = response?.data as ApiRes<SysLoginLogItemProps[]>;
  return responseData.data || [];
}

export const saveSysLoginLog = (data:SysLoginLogItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/sys_login_log/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
