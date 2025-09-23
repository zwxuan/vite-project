
import request, {ApiRes,requestWithProgress } from '../../request'
import { SysWarningTypeItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_warning_type";
import Mock from "mockjs";
//
const sysWarningTypeItems:SysWarningTypeItemProps[] = [
    {
        AppCode: "币种",
        TypeCode: "CURRENCY_RATE_ALERT",
        TypeName: "汇率异常预警",
        TypeSchema: "订阅报表模式",
        ReportCenter: "财务基础数据中心",
        CreatedBy: "财务管理员",
        CreatedTime: "2024-01-15 09:00:00",
    },
    {
        AppCode: "税制档案",
        TypeCode: "TAX_SYSTEM_UPDATE",
        TypeName: "税制档案更新提醒",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "税务管理员",
        CreatedTime: "2024-01-15 09:15:00"
    },
    {
        AppCode: "银行网点",
        TypeCode: "BANK_BRANCH_INACTIVE",
        TypeName: "银行网点停用预警",
        TypeSchema: "订阅报表模式",
        ReportCenter: "财务基础数据中心",
        CreatedBy: "银行管理员",
        CreatedTime: "2024-01-15 09:30:00",
    },
    {
        AppCode: "订单管理",
        TypeCode: "ORDER_OVERDUE",
        TypeName: "订单超期预警",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "业务管理员",
        CreatedTime: "2024-01-15 10:00:00"
    },
    {
        AppCode: "对账",
        TypeCode: "RECONCILIATION_FAILED",
        TypeName: "费用对账失败",
        TypeSchema: "订阅报表模式",
        ReportCenter: "费用管理中心",
        CreatedBy: "财务管理员",
        CreatedTime: "2024-01-15 10:15:00",
    },
    {
        AppCode: "账单",
        TypeCode: "BILL_OVERDUE",
        TypeName: "账单逾期提醒",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "账务管理员",
        CreatedTime: "2024-01-15 10:30:00"
    },
    {
        AppCode: "收款发票",
        TypeCode: "INVOICE_AMOUNT_MISMATCH",
        TypeName: "发票金额不匹配",
        TypeSchema: "订阅报表模式",
        ReportCenter: "发票管理中心",
        CreatedBy: "发票管理员",
        CreatedTime: "2024-01-15 11:00:00",
    },
    {
        AppCode: "付款申请",
        TypeCode: "PAYMENT_APPROVAL_TIMEOUT",
        TypeName: "付款审批超时",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "审批管理员",
        CreatedTime: "2024-01-15 11:15:00"
    },
    {
        AppCode: "实收实付",
        TypeCode: "PAYMENT_RECORD_MISSING",
        TypeName: "实收实付记录缺失",
        TypeSchema: "订阅报表模式",
        ReportCenter: "TMO管理中心",
        CreatedBy: "财务管理员",
        CreatedTime: "2024-01-15 11:30:00",
    },
    {
        AppCode: "费用审核",
        TypeCode: "EXPENSE_AUDIT_PENDING",
        TypeName: "费用审核待处理",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "审核管理员",
        CreatedTime: "2024-01-15 12:00:00"
    },
    {
        AppCode: "费用模板",
        TypeCode: "TEMPLATE_VERSION_OUTDATED",
        TypeName: "费用模板版本过期",
        TypeSchema: "订阅报表模式",
        ReportCenter: "模板管理中心",
        CreatedBy: "模板管理员",
        CreatedTime: "2024-01-15 12:15:00",
    },
    {
        AppCode: "中国地图",
        TypeCode: "DATA_VISUALIZATION_ERROR",
        TypeName: "数据可视化异常",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "可视化管理员",
        CreatedTime: "2024-01-15 12:30:00"
    },
    {
        AppCode: "销售箱量统计表",
        TypeCode: "REPORT_DATA_INCOMPLETE",
        TypeName: "报表数据不完整",
        TypeSchema: "订阅报表模式",
        ReportCenter: "业务统计中心",
        CreatedBy: "报表管理员",
        CreatedTime: "2024-01-15 13:00:00",
    },
    {
        AppCode: "未收未付统计对账表",
        TypeCode: "FINANCIAL_DATA_INCONSISTENT",
        TypeName: "财务数据不一致",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "财务分析员",
        CreatedTime: "2024-01-15 13:15:00"
    },
    {
        AppCode: "数据交换管理",
        TypeCode: "DATA_EXCHANGE_FAILED",
        TypeName: "数据交换失败",
        TypeSchema: "订阅报表模式",
        ReportCenter: "集成平台中心",
        CreatedBy: "集成管理员",
        CreatedTime: "2024-01-15 13:30:00",
    },
    {
        AppCode: "标准接口",
        TypeCode: "API_INTERFACE_TIMEOUT",
        TypeName: "标准接口超时",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "接口管理员",
        CreatedTime: "2024-01-15 14:00:00"
    },
    {
        AppCode: "员工管理",
        TypeCode: "EMPLOYEE_INFO_INCOMPLETE",
        TypeName: "员工信息不完整",
        TypeSchema: "订阅报表模式",
        ReportCenter: "组织机构中心",
        CreatedBy: "人事管理员",
        CreatedTime: "2024-01-15 14:15:00",
    },
    {
        AppCode: "角色管理",
        TypeCode: "ROLE_PERMISSION_CONFLICT",
        TypeName: "角色权限冲突",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "权限管理员",
        CreatedTime: "2024-01-15 14:30:00"
    },
    {
        AppCode: "登录日志",
        TypeCode: "ABNORMAL_LOGIN_DETECTED",
        TypeName: "异常登录检测",
        TypeSchema: "订阅报表模式",
        ReportCenter: "日志管理中心",
        CreatedBy: "安全管理员",
        CreatedTime: "2024-01-15 15:00:00",
    },
    {
        AppCode: "预警类型",
        TypeCode: "WARNING_TYPE_CONFIG_ERROR",
        TypeName: "预警类型配置错误",
        TypeSchema: "接口模式",
        ReportCenter: "",
        CreatedBy: "系统管理员",
        CreatedTime: "2024-01-15 15:15:00"
    },
];


// 获取账单管理台账列表
export const getSysWarningTypeList = async (): Promise<SysWarningTypeItemProps[]> => {
  return sysWarningTypeItems;
}

// 保存账单管理
export const saveSysWarningType = async (data: SysWarningTypeItemProps, onUploadProgress?: (progress: number) => void): Promise<SysWarningTypeItemProps> => {
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
export const getSysWarningTypeList = async (): Promise<SysWarningTypeItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/sys_warning_type"
  })
  const responseData = response?.data as ApiRes<SysWarningTypeItemProps[]>;
  return responseData.data || [];
}

export const saveSysWarningType = (data:SysWarningTypeItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/sys_warning_type/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
