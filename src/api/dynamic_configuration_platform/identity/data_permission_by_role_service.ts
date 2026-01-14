
import request, {ApiRes,requestWithProgress } from '../../request'
import { DataPermissionByRoleItemProps } from "@/types/dynamic_configuration_platform/identity/data_permission_by_role";
import Mock from "mockjs";
//
const dataPermissionByRoleItems:DataPermissionByRoleItemProps[] = [
  {"RoleCode":"R001","RoleName":"门户管理员","DataPermission":"集团总部/人力资源中心/组织发展部/HR主管","SpecialDataPermission":"① 员工实体：部门字段=组织发展部 ② 合同实体：合同状态≠已作废 ③ 预警任务实体：优先级≥High →（① 或 ②）且 ③"},
  {"RoleCode":"R001","RoleName":"门户管理员","DataPermission":"集团总部/行政中心/综合办/行政主管","SpecialDataPermission":"① 员工实体：部门字段=组织发展部 ② 合同实体：合同状态≠已作废 ③ 预警任务实体：优先级≥High →（① 或 ②）且 ③"},
  {"RoleCode":"R001","RoleName":"门户管理员","DataPermission":"集团总部/信息中心/门户运营部/门户专员","SpecialDataPermission":"① 员工实体：部门字段=组织发展部 ② 合同实体：合同状态≠已作废 ③ 预警任务实体：优先级≥High →（① 或 ②）且 ③"},
  {"RoleCode":"R001","RoleName":"门户管理员","DataPermission":"集团总部/培训中心/在线学习部/学习顾问","SpecialDataPermission":"① 员工实体：部门字段=组织发展部 ② 合同实体：合同状态≠已作废 ③ 预警任务实体：优先级≥High →（① 或 ②）且 ③"},
  {"RoleCode":"R001","RoleName":"门户管理员","DataPermission":"集团总部/审计监察部/内审组/审计专员","SpecialDataPermission":"① 员工实体：部门字段=组织发展部 ② 合同实体：合同状态≠已作废 ③ 预警任务实体：优先级≥High →（① 或 ②）且 ③"},
  {"RoleCode":"R002","RoleName":"基础数据管理员","DataPermission":"集团总部/财务中心/资金管理部/资金主管","SpecialDataPermission":"① 汇率实体：生效日期≥today()-7 ② 发票类型实体：启用状态=启用 ③ 结算方式实体：系统锁定=false → ① 且 ② 且 ③"},
  {"RoleCode":"R002","RoleName":"基础数据管理员","DataPermission":"集团总部/供应链中心/采购部/采购组","SpecialDataPermission":"① 汇率实体：生效日期≥today()-7 ② 发票类型实体：启用状态=启用 ③ 结算方式实体：系统锁定=false → ① 且 ② 且 ③"},
  {"RoleCode":"R002","RoleName":"基础数据管理员","DataPermission":"集团总部/营销中心/电商事业部/运营经理","SpecialDataPermission":"① 汇率实体：生效日期≥today()-7 ② 发票类型实体：启用状态=启用 ③ 结算方式实体：系统锁定=false → ① 且 ② 且 ③"},
  {"RoleCode":"R003","RoleName":"用户洞察授权用户","DataPermission":"集团总部/数据中心/客户分析部/分析师","SpecialDataPermission":"① 客户实体：客户级别=VIP ② 客户分类实体：分类路径 like '/战略客户%' ③ 客户标签实体：战略=true →（① 或 ②）且 ③"},
  {"RoleCode":"R003","RoleName":"用户洞察授权用户","DataPermission":"集团总部/营销中心/用户增长部/增长专家","SpecialDataPermission":"① 客户实体：客户级别=VIP ② 客户分类实体：分类路径 like '/战略客户%' ③ 客户标签实体：战略=true →（① 或 ②）且 ③"},
  {"RoleCode":"R003","RoleName":"用户洞察授权用户","DataPermission":"集团总部/品牌中心/公关部/公关专员","SpecialDataPermission":"① 客户实体：客户级别=VIP ② 客户分类实体：分类路径 like '/战略客户%' ③ 客户标签实体：战略=true →（① 或 ②）且 ③"},
  {"RoleCode":"R004","RoleName":"应用构建人员","DataPermission":"集团总部/研发中心/平台架构部/架构师","SpecialDataPermission":"① 菜单实体：系统标识=动态建模平台 ② 功能按钮实体：可见=true ③ 角色实体：锁定=false → ① 且 ② 且 ③"},
  {"RoleCode":"R004","RoleName":"应用构建人员","DataPermission":"集团总部/研发中心/前端开发部/高级工程师","SpecialDataPermission":"① 菜单实体：系统标识=动态建模平台 ② 功能按钮实体：可见=true ③ 角色实体：锁定=false → ① 且 ② 且 ③"},
  {"RoleCode":"R004","RoleName":"应用构建人员","DataPermission":"集团总部/研发中心/后端开发部/高级工程师","SpecialDataPermission":"① 菜单实体：系统标识=动态建模平台 ② 功能按钮实体：可见=true ③ 角色实体：锁定=false → ① 且 ② 且 ③"},
  {"RoleCode":"R004","RoleName":"应用构建人员","DataPermission":"集团总部/测试中心/自动化测试部/测试架构师","SpecialDataPermission":"① 菜单实体：系统标识=动态建模平台 ② 功能按钮实体：可见=true ③ 角色实体：锁定=false → ① 且 ② 且 ③"},
  {"RoleCode":"R005","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/直销部/销售主管","SpecialDataPermission":"① 订单实体：状态=待审核 ② 开票实体：开票状态=待开票 ③ 付款申请实体：审批节点=运营管理员 →（① 或 ②）且 ③"},
  {"RoleCode":"R005","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/渠道部/渠道经理","SpecialDataPermission":"① 订单实体：状态=待审核 ② 开票实体：开票状态=待开票 ③ 付款申请实体：审批节点=运营管理员 →（① 或 ②）且 ③"},
  {"RoleCode":"R005","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/客服部/客服主管","SpecialDataPermission":"① 订单实体：状态=待审核 ② 开票实体：开票状态=待开票 ③ 付款申请实体：审批节点=运营管理员 →（① 或 ②）且 ③"},
  {"RoleCode":"R005","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/品牌部/品牌经理","SpecialDataPermission":"① 订单实体：状态=待审核 ② 开票实体：开票状态=待开票 ③ 付款申请实体：审批节点=运营管理员 →（① 或 ②）且 ③"},
  {"RoleCode":"R005","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/公关部/公关经理","SpecialDataPermission":"① 订单实体：状态=待审核 ② 开票实体：开票状态=待开票 ③ 付款申请实体：审批节点=运营管理员 →（① 或 ②）且 ③"},
  {"RoleCode":"R006","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/运维部/运维工程师","SpecialDataPermission":"① 调度任务实体：状态=运行中 ② 登录日志实体：登录时间≥today()-1 ③ 异常日志实体：级别=ERROR → ① 且 ② 且 ③"},
  {"RoleCode":"R006","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/信息安全部/安全工程师","SpecialDataPermission":"① 调度任务实体：状态=运行中 ② 登录日志实体：登录时间≥today()-1 ③ 异常日志实体：级别=ERROR → ① 且 ② 且 ③"},
  {"RoleCode":"R006","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/系统管理部/系统管理员","SpecialDataPermission":"① 调度任务实体：状态=运行中 ② 登录日志实体：登录时间≥today()-1 ③ 异常日志实体：级别=ERROR → ① 且 ② 且 ③"},
  {"RoleCode":"R007","RoleName":"集成开发实施","DataPermission":"集团总部/交付中心/实施一部/实施顾问","SpecialDataPermission":"① 供应商实体：合作状态=合作中 ② 模板实体：启用=true ③ 银行信息实体：国家=CN → ① 且 ② 且 ③"},
  {"RoleCode":"R007","RoleName":"集成开发实施","DataPermission":"集团总部/交付中心/实施二部/实施顾问","SpecialDataPermission":"① 供应商实体：合作状态=合作中 ② 模板实体：启用=true ③ 银行信息实体：国家=CN → ① 且 ② 且 ③"},
  {"RoleCode":"R007","RoleName":"集成开发实施","DataPermission":"集团总部/交付中心/实施三部/实施顾问","SpecialDataPermission":"① 供应商实体：合作状态=合作中 ② 模板实体：启用=true ③ 银行信息实体：国家=CN → ① 且 ② 且 ③"},
  {"RoleCode":"R007","RoleName":"集成开发实施","DataPermission":"集团总部/交付中心/培训部/培训讲师","SpecialDataPermission":"① 供应商实体：合作状态=合作中 ② 模板实体：启用=true ③ 银行信息实体：国家=CN → ① 且 ② 且 ③"},
  {"RoleCode":"R008","RoleName":"门户模板管理员","DataPermission":"集团总部/行政中心/行政部/行政专员","SpecialDataPermission":"① 部门实体：启用=true ② 节假日实体：年份=2024 ③ 行政组织实体：虚拟组织=false → ① 且 ② 且 ③"},
  {"RoleCode":"R008","RoleName":"门户模板管理员","DataPermission":"集团总部/行政中心/后勤部/后勤主管","SpecialDataPermission":"① 部门实体：启用=true ② 节假日实体：年份=2024 ③ 行政组织实体：虚拟组织=false → ① 且 ② 且 ③"},
  {"RoleCode":"R008","RoleName":"门户模板管理员","DataPermission":"集团总部/行政中心/接待部/接待专员","SpecialDataPermission":"① 部门实体：启用=true ② 节假日实体：年份=2024 ③ 行政组织实体：虚拟组织=false → ① 且 ② 且 ③"},
  {"RoleCode":"R009","RoleName":"生产技术员","DataPermission":"集团总部/生产中心/制造一部/生产组长","SpecialDataPermission":"① 箱型实体：启用=true ② 海关编码实体：生效=true ③ 空港实体：状态=启用 → ① 且 ② 且 ③"},
  {"RoleCode":"R009","RoleName":"生产技术员","DataPermission":"集团总部/生产中心/制造二部/生产组长","SpecialDataPermission":"① 箱型实体：启用=true ② 海关编码实体：生效=true ③ 空港实体：状态=启用 → ① 且 ② 且 ③"},
  {"RoleCode":"R009","RoleName":"生产技术员","DataPermission":"集团总部/生产中心/工艺部/工艺工程师","SpecialDataPermission":"① 箱型实体：启用=true ② 海关编码实体：生效=true ③ 空港实体：状态=启用 → ① 且 ② 且 ③"},
  {"RoleCode":"R009","RoleName":"生产技术员","DataPermission":"集团总部/生产中心/设备部/设备工程师","SpecialDataPermission":"① 箱型实体：启用=true ② 海关编码实体：生效=true ③ 空港实体：状态=启用 → ① 且 ② 且 ③"},
  {"RoleCode":"R010","RoleName":"全员","DataPermission":"集团总部/客服中心/售后一组/客服代表","SpecialDataPermission":"① 客户级别实体：启用=true ② 客户行业实体：启用=true ③ 海运服务实体：状态=可用 → ① 且 ② 且 ③"},
  {"RoleCode":"R010","RoleName":"全员","DataPermission":"集团总部/客服中心/售后二组/客服代表","SpecialDataPermission":"① 客户级别实体：启用=true ② 客户行业实体：启用=true ③ 海运服务实体：状态=可用 → ① 且 ② 且 ③"},
  {"RoleCode":"R010","RoleName":"全员","DataPermission":"集团总部/客服中心/售前组/客服代表","SpecialDataPermission":"① 客户级别实体：启用=true ② 客户行业实体：启用=true ③ 海运服务实体：状态=可用 → ① 且 ② 且 ③"},
  {"RoleCode":"R011","RoleName":"生产主管","DataPermission":"集团总部/生产中心/计划部/计划员","SpecialDataPermission":"① 费用模板实体：启用=true ② 对账单实体：状态=已对账 ③ 内部代理结算实体：状态=已结算 → ① 且 ② 且 ③"},
  {"RoleCode":"R011","RoleName":"生产主管","DataPermission":"集团总部/生产中心/物料部/物料主管","SpecialDataPermission":"① 费用模板实体：启用=true ② 对账单实体：状态=已对账 ③ 内部代理结算实体：状态=已结算 → ① 且 ② 且 ③"},
  {"RoleCode":"R011","RoleName":"生产主管","DataPermission":"集团总部/生产中心/质检部/质检主管","SpecialDataPermission":"① 费用模板实体：启用=true ② 对账单实体：状态=已对账 ③ 内部代理结算实体：状态=已结算 → ① 且 ② 且 ③"},
  {"RoleCode":"R011","RoleName":"生产主管","DataPermission":"集团总部/生产中心/仓储部/仓储主管","SpecialDataPermission":"① 费用模板实体：启用=true ② 对账单实体：状态=已对账 ③ 内部代理结算实体：状态=已结算 → ① 且 ② 且 ③"},
  {"RoleCode":"R011","RoleName":"生产主管","DataPermission":"集团总部/生产中心/物流部/物流主管","SpecialDataPermission":"① 费用模板实体：启用=true ② 对账单实体：状态=已对账 ③ 内部代理结算实体：状态=已结算 → ① 且 ② 且 ③"}
];


// 获取账单管理台账列表
export const getDataPermissionByRoleList = async (): Promise<DataPermissionByRoleItemProps[]> => {
  return dataPermissionByRoleItems;
}

// 保存账单管理
export const saveDataPermissionByRole = async (data: DataPermissionByRoleItemProps, onUploadProgress?: (progress: number) => void): Promise<DataPermissionByRoleItemProps> => {
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
export const getDataPermissionByRoleList = async (): Promise<DataPermissionByRoleItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/data_permission_by_role"
  })
  const responseData = response?.data as ApiRes<DataPermissionByRoleItemProps[]>;
  return responseData.data || [];
}

export const saveDataPermissionByRole = (data:DataPermissionByRoleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/data_permission_by_role/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
