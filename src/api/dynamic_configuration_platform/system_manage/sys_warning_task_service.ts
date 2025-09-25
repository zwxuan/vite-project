
import request, { ApiRes, requestWithProgress } from '../../request'
import { SysWarningTaskItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_warning_task";
import Mock from "mockjs";
//
const sysWarningTaskItems: SysWarningTaskItemProps[] = [
    {
        "AppCode": "OA办公系统",
        "TaskCode": "任务编码一",
        "TaskName": "数据同步任",
        "WarningType": "高危预警类",
        "TypeSchema": "定时任务模",
        "Status":"已启用",
        "SuccessCnt": 8,
        "FailCnt": 2,
        "TaskRemark": "每日凌晨执",
        "CreatedTime": "2025-09-24 14:23:17"
    },
    {
        "AppCode": "人力资源系统",
        "TaskCode": "备份作业二",
        "TaskName": "日志清理任",
        "WarningType": "中危告警类",
        "TypeSchema": "手动触发模",
        "Status":"已启用",
        "SuccessCnt": 12,
        "FailCnt": 5,
        "TaskRemark": "保留七天数",
        "CreatedTime": "2025-09-23 09:45:33"
    },
    {
        "AppCode": "财务管理系统",
        "TaskCode": "报表生成三",
        "TaskName": "用户统计任",
        "WarningType": "低危提示类",
        "TypeSchema": "事件驱动模",
        "Status":"已启用",
        "SuccessCnt": 105,
        "FailCnt": 3,
        "TaskRemark": "每小时汇总",
        "CreatedTime": "2025-09-25 02:12:08"
    },
    {
        "AppCode": "客户关系系统",
        "TaskCode": "接口调用四",
        "TaskName": "第三方对接",
        "WarningType": "网络异常类",
        "TypeSchema": "轮询检查模",
        "Status":"已启用",
        "SuccessCnt": 44,
        "FailCnt": 11,
        "TaskRemark": "超时重试三",
        "CreatedTime": "2025-09-22 18:30:55"
    },
    {
        "AppCode": "供应链管理",
        "TaskCode": "数据校验五",
        "TaskName": "完整性检查",
        "WarningType": "数据错误类",
        "TypeSchema": "批处理模",
        "Status":"已启用",
        "SuccessCnt": 7,
        "FailCnt": 0,
        "TaskRemark": "校验主外键",
        "CreatedTime": "2025-09-25 08:05:21"
    },
    {
        "AppCode": "ERP系统",
        "TaskCode": "缓存刷新六",
        "TaskName": "Redis更新任",
        "WarningType": "性能瓶颈类",
        "TypeSchema": "异步处理模",
        "Status":"已启用",
        "SuccessCnt": 201,
        "FailCnt": 9,
        "TaskRemark": "缓存过期后",
        "CreatedTime": "2025-09-21 22:17:44"
    },
    {
        "AppCode": "CRM系统",
        "TaskCode": "消息推送七",
        "TaskName": "短信通知任",
        "WarningType": "权限不足类",
        "TypeSchema": "队列消费模",
        "Status":"已启用",
        "SuccessCnt": 56,
        "FailCnt": 23,
        "TaskRemark": "失败重发两",
        "CreatedTime": "2025-09-24 11:33:02"
    },
    {
        "AppCode": "数据中台",
        "TaskCode": "文件上传八",
        "TaskName": "图片压缩任",
        "WarningType": "磁盘满载类",
        "TypeSchema": "流式处理模",
        "Status":"已启用",
        "SuccessCnt": 3,
        "FailCnt": 1,
        "TaskRemark": "压缩至80质",
        "CreatedTime": "2025-09-23 15:48:39"
    },
    {
        "AppCode": "统一身份认证",
        "TaskCode": "权限同步九",
        "TaskName": "角色更新任",
        "WarningType": "配置缺失类",
        "TypeSchema": "同步任务模",
        "Status":"已启用",
        "SuccessCnt": 18,
        "FailCnt": 0,
        "TaskRemark": "跨系统同步",
        "CreatedTime": "2025-09-25 05:20:11"
    },
    {
        "AppCode": "监控告警平台",
        "TaskCode": "监控检查十",
        "TaskName": "服务健康任",
        "WarningType": "超时中断类",
        "TypeSchema": "心跳检测模",
        "Status":"已启用",
        "SuccessCnt": 99,
        "FailCnt": 4,
        "TaskRemark": "每五分钟检",
        "CreatedTime": "2025-09-22 07:55:28"
    },
    {
        "AppCode": "日志分析系统",
        "TaskCode": "数据迁移一",
        "TaskName": "库表结构任",
        "WarningType": "版本不兼容",
        "TypeSchema": "迁移任务模",
        "Status":"已启用",
        "SuccessCnt": 0,
        "FailCnt": 15,
        "TaskRemark": "仅限测试环",
        "CreatedTime": "2025-09-24 20:10:03"
    },
    {
        "AppCode": "BI报表平台",
        "TaskCode": "日志归档二",
        "TaskName": "历史数据任",
        "WarningType": "IO阻塞类",
        "TypeSchema": "归档处理模",
        "Status":"已启用",
        "SuccessCnt": 320,
        "FailCnt": 2,
        "TaskRemark": "按月归档压",
        "CreatedTime": "2025-09-21 12:40:57"
    },
    {
        "AppCode": "安全审计系统",
        "TaskCode": "证书更新三",
        "TaskName": "SSL续期任",
        "WarningType": "证书过期类",
        "TypeSchema": "安全维护模",
        "Status":"已启用",
        "SuccessCnt": 1,
        "FailCnt": 0,
        "TaskRemark": "提前30天提",
        "CreatedTime": "2025-09-23 03:25:14"
    },
    {
        "AppCode": "用户中心",
        "TaskCode": "用户清理四",
        "TaskName": "僵尸账户任",
        "WarningType": "隐私合规类",
        "TypeSchema": "清理任务模",
        "Status":"已启用",
        "SuccessCnt": 45,
        "FailCnt": 7,
        "TaskRemark": "180天未登",
        "CreatedTime": "2025-09-25 01:00:00"
    },
    {
        "AppCode": "绩效考核系统",
        "TaskCode": "指标计算五",
        "TaskName": "KPI汇总任",
        "WarningType": "计算溢出类",
        "TypeSchema": "聚合分析模",
        "Status":"已停用",
        "SuccessCnt": 88,
        "FailCnt": 6,
        "TaskRemark": "基于部门统",
        "CreatedTime": "2025-09-22 16:55:33"
    },
    {
        "AppCode": "邮件通知平台",
        "TaskCode": "邮件发送六",
        "TaskName": "周报提醒任",
        "WarningType": "SMTP错误类",
        "TypeSchema": "通知任务模",
        "Status":"已启用",
        "SuccessCnt": 132,
        "FailCnt": 18,
        "TaskRemark": "抄送管理层",
        "CreatedTime": "2025-09-24 09:12:47"
    },
    {
        "AppCode": "DevOps平台",
        "TaskCode": "镜像构建七",
        "TaskName": "Docker打包",
        "WarningType": "资源不足类",
        "TypeSchema": "CI构建模",
        "Status":"已启用",
        "SuccessCnt": 5,
        "FailCnt": 3,
        "TaskRemark": "使用最新基",
        "CreatedTime": "2025-09-23 21:30:09"
    },
    {
        "AppCode": "API网关",
        "TaskCode": "API测试八",
        "TaskName": "接口压测任",
        "WarningType": "响应超时类",
        "TypeSchema": "测试验证模",
        "Status":"已启用",
        "SuccessCnt": 100,
        "FailCnt": 25,
        "TaskRemark": "并发100线",
        "CreatedTime": "2025-09-21 10:05:22"
    },
    {
        "AppCode": "数据脱敏平台",
        "TaskCode": "数据脱敏九",
        "TaskName": "隐私保护任",
        "WarningType": "脱敏失败类",
        "TypeSchema": "安全处理模",
        "Status":"已启用",
        "SuccessCnt": 76,
        "FailCnt": 1,
        "TaskRemark": "手机号掩码",
        "CreatedTime": "2025-09-25 07:40:18"
    },
    {
        "AppCode": "发布管理系统",
        "TaskCode": "版本发布十",
        "TaskName": "灰度上线任",
        "WarningType": "回滚触发类",
        "TypeSchema": "发布部署模",
        "Status":"已启用",
        "SuccessCnt": 20,
        "FailCnt": 0,
        "TaskRemark": "先发布10%用",
        "CreatedTime": "2025-09-22 14:22:36"
    }
];


// 获取账单管理台账列表
export const getSysWarningTaskList = async (): Promise<SysWarningTaskItemProps[]> => {
    return sysWarningTaskItems;
}

// 保存账单管理
export const saveSysWarningTask = async (data: SysWarningTaskItemProps, onUploadProgress?: (progress: number) => void): Promise<SysWarningTaskItemProps> => {
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
export const getSysWarningTaskList = async (): Promise<SysWarningTaskItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/sys_warning_task"
  })
  const responseData = response?.data as ApiRes<SysWarningTaskItemProps[]>;
  return responseData.data || [];
}

export const saveSysWarningTask = (data:SysWarningTaskItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/sys_warning_task/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
