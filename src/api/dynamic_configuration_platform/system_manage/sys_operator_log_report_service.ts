
import request, { ApiRes, requestWithProgress } from '../../request'
import { SysOperatorLogReportItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_operator_log_report";
import Mock from "mockjs";
//
const sysOperatorLogReportItems: SysOperatorLogReportItemProps[] = [
    {
        "Department": "人力资源部",
        "UserName": "张伟强",
        "Application": "办公系统",
        "Service": "文件上传",
        "OperateDevice": "华为平板",
        "VisitCount": 2
    },
    {
        "Department": "财务部",
        "UserName": "李晓彤",
        "Application": "人事管理",
        "Service": "考勤查询",
        "OperateDevice": "苹果手机",
        "VisitCount": 1
    },
    {
        "Department": "技术部",
        "UserName": "王建国",
        "Application": "财务报销",
        "Service": "发票录入",
        "OperateDevice": "联想电脑",
        "VisitCount": 3
    },
    {
        "Department": "市场部",
        "UserName": "陈思琪",
        "Application": "项目管理",
        "Service": "任务分配",
        "OperateDevice": "戴尔笔记本",
        "VisitCount": 2
    },
    {
        "Department": "销售部",
        "UserName": "刘子豪",
        "Application": "客户关系",
        "Service": "客户跟进",
        "OperateDevice": "小米手机",
        "VisitCount": 1
    },
    {
        "Department": "采购部",
        "UserName": "黄雅婷",
        "Application": "库存管理",
        "Service": "入库登记",
        "OperateDevice": "华硕电脑",
        "VisitCount": 3
    },
    {
        "Department": "行政部",
        "UserName": "赵文博",
        "Application": "销售系统",
        "Service": "订单创建",
        "OperateDevice": "三星平板",
        "VisitCount": 2
    },
    {
        "Department": "客服部",
        "UserName": "周美玲",
        "Application": "培训平台",
        "Service": "课程学习",
        "OperateDevice": "OPPO手机",
        "VisitCount": 1
    },
    {
        "Department": "法务部",
        "UserName": "吴志强",
        "Application": "审批流程",
        "Service": "请假申请",
        "OperateDevice": "苹果电脑",
        "VisitCount": 3
    },
    {
        "Department": "研发部",
        "UserName": "郑雨欣",
        "Application": "数据报表",
        "Service": "导出数据",
        "OperateDevice": "华为手机",
        "VisitCount": 2
    },
    {
        "Department": "产品部",
        "UserName": "孙浩然",
        "Application": "会议预约",
        "Service": "会议室预定",
        "OperateDevice": "荣耀平板",
        "VisitCount": 1
    },
    {
        "Department": "运维部",
        "UserName": "徐梦洁",
        "Application": "资产管理",
        "Service": "设备报修",
        "OperateDevice": "vivo手机",
        "VisitCount": 3
    },
    {
        "Department": "设计部",
        "UserName": "胡一帆",
        "Application": "合同管理",
        "Service": "合同审批",
        "OperateDevice": "MacBook",
        "VisitCount": 2
    },
    {
        "Department": "公关部",
        "UserName": "林小婉",
        "Application": "招聘系统",
        "Service": "简历筛选",
        "OperateDevice": "iPad",
        "VisitCount": 1
    },
    {
        "Department": "审计部",
        "UserName": "郭天宇",
        "Application": "绩效考核",
        "Service": "评分提交",
        "OperateDevice": "Surface",
        "VisitCount": 3
    },
    {
        "Department": "信息部",
        "UserName": "何静雯",
        "Application": "知识库",
        "Service": "文档查阅",
        "OperateDevice": "红米手机",
        "VisitCount": 2
    },
    {
        "Department": "后勤部",
        "UserName": "马俊杰",
        "Application": "日志系统",
        "Service": "操作记录",
        "OperateDevice": "ThinkPad",
        "VisitCount": 1
    },
    {
        "Department": "安全部",
        "UserName": "高雪梅",
        "Application": "通知公告",
        "Service": "消息推送",
        "OperateDevice": "魅族手机",
        "VisitCount": 3
    },
    {
        "Department": "战略部",
        "UserName": "罗志明",
        "Application": "工单系统",
        "Service": "工单处理",
        "OperateDevice": "华为Mate",
        "VisitCount": 2
    },
    {
        "Department": "培训部",
        "UserName": "董芳芳",
        "Application": "权限管理",
        "Service": "角色分配",
        "OperateDevice": "iPhone",
        "VisitCount": 1
    }
];


// 获取账单管理台账列表
export const getSysOperatorLogReportList = async (): Promise<SysOperatorLogReportItemProps[]> => {
    return sysOperatorLogReportItems;
}

// 保存账单管理
export const saveSysOperatorLogReport = async (data: SysOperatorLogReportItemProps, onUploadProgress?: (progress: number) => void): Promise<SysOperatorLogReportItemProps> => {
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
export const getSysOperatorLogReportList = async (): Promise<SysOperatorLogReportItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/sys_operator_log_report"
  })
  const responseData = response?.data as ApiRes<SysOperatorLogReportItemProps[]>;
  return responseData.data || [];
}

export const saveSysOperatorLogReport = (data:SysOperatorLogReportItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/sys_operator_log_report/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
