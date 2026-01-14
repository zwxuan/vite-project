
import request, { ApiRes, requestWithProgress } from '../../request'
import { SysOperatorLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_operator_log";
import Mock from "mockjs";
//
const sysOperatorLogItems: SysOperatorLogItemProps[] = [
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "日志管理",
        "Service": "登录日志",
        "OperationBtn": "导出全部",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-22 09:45:50",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "日志管理",
        "Service": "业务日志",
        "OperationBtn": "打开",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-22 09:24:11",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "日志管理",
        "Service": "操作日志",
        "OperationBtn": "打开",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-22 09:12:31",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "日志管理",
        "Service": "登录日志",
        "OperationBtn": "打开",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-22 09:12:27",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "日志管理",
        "Service": "业务日志",
        "OperationBtn": "打开",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-22 09:04:54",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 09:49:32",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 09:49:20",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 09:49:01",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 09:48:58",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:55:42",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "日志管理",
        "Service": "业务日志",
        "OperationBtn": "导出全部",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:55:27",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "查看业务日志",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:53:46",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "日志管理",
        "Service": "业务日志",
        "OperationBtn": "打开",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:53:46",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:53:41",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:53:39",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:53:11",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-17 08:53:05",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-16 14:20:49",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-16 14:20:32",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业现金账户",
        "OperationBtn": "打开",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-16 14:20:30",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "增行",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-16 13:31:26",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "返回",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-16 09:57:00",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 15:57:53",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 14:44:34",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 14:42:34",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "打开",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 14:42:32",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 14:41:16",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "下载新增模板",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 14:30:42",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "取消",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 14:28:58",
        "OperateDevice": "Web端",
        "Status": "成功"
    },
    {
        "UserCode": "YHT-883138-8829171670327670978",
        "UserName": "周文轩",
        "Domain": "",
        "Application": "结算信息",
        "Service": "企业资金账户",
        "OperationBtn": "新增",
        "IpAddress": "112.255.6.74",
        "OperateTime": "2025-09-15 14:28:51",
        "OperateDevice": "Web端",
        "Status": "成功"
    }
];


// 获取账单管理台账列表
export const getSysOperatorLogList = async (): Promise<SysOperatorLogItemProps[]> => {
    return sysOperatorLogItems;
}

// 保存账单管理
export const saveSysOperatorLog = async (data: SysOperatorLogItemProps, onUploadProgress?: (progress: number) => void): Promise<SysOperatorLogItemProps> => {
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
export const getSysOperatorLogList = async (): Promise<SysOperatorLogItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/sys_operator_log"
  })
  const responseData = response?.data as ApiRes<SysOperatorLogItemProps[]>;
  return responseData.data || [];
}

export const saveSysOperatorLog = (data:SysOperatorLogItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/sys_operator_log/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
