
import request, {ApiRes,requestWithProgress } from '../../request'
import { FunctionPermissionByRoleItemProps } from "@/types/dynamic_configuration_platform/identity/function_permission_by_role";
import Mock from "mockjs";
//
const functionPermissionByRoleItems:FunctionPermissionByRoleItemProps[] = [
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "企业风格设置",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "组件管理",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "工作台管理",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "我管理的工作台",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "组件设置-web广告图",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "友空间客户端",
    "MenuFullPath": "PC端侧边栏设置",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动门户设计",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动工作台设置",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动应用排序",
    "FunctionName": ""
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动主题模板库",
    "FunctionName": "工作台广告图"
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动主题模板库",
    "FunctionName": "工作台背景"
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动主题模板库",
    "FunctionName": "首页广告图"
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动主题模板库",
    "FunctionName": "启动图设置"
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动主题模板库",
    "FunctionName": "导航设置"
  },
  {
    "RoleCode": "xtrole_menhu",
    "RoleName": "门户管理员",
    "BelongOrg": "",
    "AppName": "移动端配置",
    "MenuFullPath": "移动主题模板库",
    "FunctionName": "主题色"
  },
  {
    "RoleCode": "XTPortalManager",
    "RoleName": "门户模板管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "我管理的工作台",
    "FunctionName": "主题色"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据看板",
    "FunctionName": "主题色"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "自定义默认BOM"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "参数设置",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "参数设置",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "用途",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "用途",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "用途",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "用途",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "用途",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED01",
    "RoleName": "IT管理员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "0001",
    "RoleName": "管理员",
    "BelongOrg": "",
    "AppName": "低代码开发",
    "MenuFullPath": "资源中心",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "0001",
    "RoleName": "管理员",
    "BelongOrg": "",
    "AppName": "低代码开发",
    "MenuFullPath": "应用构建",
    "FunctionName": "设计"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单替代料明细表",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单替代料明细表",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单全阶审核",
    "FunctionName": "审核"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单全阶审核",
    "FunctionName": "弃审"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单全阶审核",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单全阶审核",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单全阶审核",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单批量维护",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单差异比较表",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单差异比较表",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "批量操作"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "分配组织"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "默认卷积"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "提交"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "审核"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "模板下载"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "弃审"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "修订"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "查看加密名称"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "特征默认值"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "现场更新"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "撤回"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单维护",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据看板",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单全阶维护",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单综合查询",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单综合查询",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "物料清单综合查询",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "自定义默认BOM"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工程数据匹配规则",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "子件用途查询",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "子件用途查询",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "无物料清单物料检查",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "无物料清单物料检查",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工序控制码",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "标准工序",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "参数设置",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "参数设置",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "母件结构查询",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "母件结构查询",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "母件结构查询",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线模板",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "默认卷积"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "提交"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "物料分配"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "现场更新"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "弃审"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "取消分配"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "撤回"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "特征默认值"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "修订"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工艺路线",
    "FunctionName": "审核"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心分类",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "保存"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "UI模板"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "启用/停用"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "ED_ENGINEERX",
    "RoleName": "生产技术员",
    "BelongOrg": "",
    "AppName": "工程数据",
    "MenuFullPath": "工作中心",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "portal_manager",
    "RoleName": "工作台管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "组件管理",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "portal_manager",
    "RoleName": "工作台管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "工作台管理",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "portal_manager",
    "RoleName": "工作台管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "我管理的工作台",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "portal_manager",
    "RoleName": "工作台管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "导航设置",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "portal_manager",
    "RoleName": "工作台管理员",
    "BelongOrg": "",
    "AppName": "工作台管理",
    "MenuFullPath": "组件设置-web广告图",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "YYGJ_role01",
    "RoleName": "应用构建人员",
    "BelongOrg": "",
    "AppName": "低代码开发",
    "MenuFullPath": "应用构建",
    "FunctionName": "设计"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "启用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "停用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户级别",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "启用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "停用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户分类",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "新增变更"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "分配组织申请"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "提交"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "复制"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "弃审"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "撤回"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "变更历史查询"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "审核"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户申请",
    "FunctionName": "重新推送"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "停用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "启用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "客户行业",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "Excel导出"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "停用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "启用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "销售渠道",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "停用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "查看"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "编辑"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "物流公司",
    "FunctionName": "启用"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "导出"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "打印"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "查询全部货位"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "修改"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "新增"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "快速定义"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "导入"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "删除"
  },
  {
    "RoleCode": "test2",
    "RoleName": "test2",
    "BelongOrg": "集团公司",
    "AppName": "基础数据",
    "MenuFullPath": "货位",
    "FunctionName": "查看"
  }, 
];


// 获取账单管理台账列表
export const getFunctionPermissionByRoleList = async (): Promise<FunctionPermissionByRoleItemProps[]> => {
  return functionPermissionByRoleItems;
}

// 保存账单管理
export const saveFunctionPermissionByRole = async (data: FunctionPermissionByRoleItemProps, onUploadProgress?: (progress: number) => void): Promise<FunctionPermissionByRoleItemProps> => {
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
export const getFunctionPermissionByRoleList = async (): Promise<FunctionPermissionByRoleItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/function_permission_by_role"
  })
  const responseData = response?.data as ApiRes<FunctionPermissionByRoleItemProps[]>;
  return responseData.data || [];
}

export const saveFunctionPermissionByRole = (data:FunctionPermissionByRoleItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/function_permission_by_role/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
