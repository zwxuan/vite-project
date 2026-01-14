
import request, {ApiRes,requestWithProgress } from '../../request'
import { FunctionPermissionByUserItemProps } from "@/types/dynamic_configuration_platform/identity/function_permission_by_user";
import Mock from "mockjs";
//
const functionPermissionByUserItems:FunctionPermissionByUserItemProps[] = [
  {"UserCode":"EMP0001","UserName":"张伟","PositionName":"人力资源专员","RoleName":"门户管理员","AppName":"动态建模平台","MenuFullPath":"组织权限-员工-员工管理","FunctionName":"新增员工"},
  {"UserCode":"EMP0002","UserName":"王芳","PositionName":"财务专员","RoleName":"基础数据管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-财务基础数据-税率管理","FunctionName":"编辑税率"},
  {"UserCode":"EMP0003","UserName":"李娜","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","AppName":"动态建模平台","MenuFullPath":"基础设置-合作伙伴-客户分类","FunctionName":"查看客户分类"},
  {"UserCode":"EMP0004","UserName":"刘强","PositionName":"前端开发工程师","RoleName":"应用构建人员","AppName":"动态建模平台","MenuFullPath":"系统管理-菜单管理-功能按钮","FunctionName":"配置按钮权限"},
  {"UserCode":"EMP0005","UserName":"陈敏","PositionName":"销售代表","RoleName":"运营管理员","AppName":"动态建模平台","MenuFullPath":"业务中心-托书管理-订单管理","FunctionName":"审核订单"},
  {"UserCode":"EMP0006","UserName":"杨洋","PositionName":"运维工程师","RoleName":"IT管理员","AppName":"动态建模平台","MenuFullPath":"系统管理-调度任务","FunctionName":"新增定时任务"},
  {"UserCode":"EMP0007","UserName":"赵磊","PositionName":"采购专员","RoleName":"集成开发实施","AppName":"动态建模平台","MenuFullPath":"系统维护-模板管理-供应商对账模板","FunctionName":"导出模板"},
  {"UserCode":"EMP0008","UserName":"孙丽","PositionName":"行政助理","RoleName":"门户模板管理员","AppName":"动态建模平台","MenuFullPath":"组织权限-组织机构-部门","FunctionName":"编辑部门信息"},
  {"UserCode":"EMP0009","UserName":"周杰","PositionName":"软件工程师","RoleName":"生产技术员","AppName":"动态建模平台","MenuFullPath":"基础设置-业务基础数据-箱型种类","FunctionName":"新增箱型"},
  {"UserCode":"EMP0010","UserName":"吴倩","PositionName":"客服专员","RoleName":"全员","AppName":"动态建模平台","MenuFullPath":"基础设置-合作伙伴-客户级别","FunctionName":"查看客户级别"},
  {"UserCode":"EMP0001","UserName":"张伟","PositionName":"人力资源专员","RoleName":"工作台管理员","AppName":"动态建模平台","MenuFullPath":"组织权限-组织机构-岗位","FunctionName":"启用岗位"},
  {"UserCode":"EMP0002","UserName":"王芳","PositionName":"财务专员","RoleName":"基础数据管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-财务基础数据-结算方式","FunctionName":"删除结算方式"},
  {"UserCode":"EMP0003","UserName":"李娜","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","AppName":"动态建模平台","MenuFullPath":"基础设置-企业基础数据-企业类型","FunctionName":"导出企业类型"},
  {"UserCode":"EMP0004","UserName":"刘强","PositionName":"前端开发工程师","RoleName":"应用构建人员","AppName":"动态建模平台","MenuFullPath":"业务中心-集装箱-集装箱装箱","FunctionName":"打印装箱单"},
  {"UserCode":"EMP0005","UserName":"陈敏","PositionName":"销售代表","RoleName":"运营管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-凭证设置-账套设置","FunctionName":"禁用账套"},
  {"UserCode":"EMP0006","UserName":"杨洋","PositionName":"运维工程师","RoleName":"IT管理员","AppName":"动态建模平台","MenuFullPath":"系统管理-日志管理-登录日志","FunctionName":"清理日志"},
  {"UserCode":"EMP0007","UserName":"赵磊","PositionName":"采购专员","RoleName":"集成开发实施","AppName":"动态建模平台","MenuFullPath":"基础设置-财务基础数据-银行信息","FunctionName":"同步银行信息"},
  {"UserCode":"EMP0008","UserName":"孙丽","PositionName":"行政助理","RoleName":"门户模板管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-日期管理-节假日设定","FunctionName":"新增节假日"},
  {"UserCode":"EMP0009","UserName":"周杰","PositionName":"软件工程师","RoleName":"生产技术员","AppName":"动态建模平台","MenuFullPath":"基础设置-业务基础数据-海关编码","FunctionName":"批量导入"},
  {"UserCode":"EMP0010","UserName":"吴倩","PositionName":"客服专员","RoleName":"全员","AppName":"动态建模平台","MenuFullPath":"基础设置-合作伙伴-客户行业","FunctionName":"查看详情"},
  {"UserCode":"EMP0011","UserName":"黄勇","PositionName":"法务专员","RoleName":"门户管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-合作伙伴-合同管理","FunctionName":"审批合同"},
  {"UserCode":"EMP0012","UserName":"徐婷","PositionName":"培训讲师","RoleName":"应用构建人员","AppName":"动态建模平台","MenuFullPath":"权限管理-授权-授权分配用户","FunctionName":"分配角色"},
  {"UserCode":"EMP0013","UserName":"高强","PositionName":"运营专员","RoleName":"生产主管","AppName":"动态建模平台","MenuFullPath":"系统维护-模板管理-费用模板","FunctionName":"复制模板"},
  {"UserCode":"EMP0014","UserName":"林芳","PositionName":"质量主管","RoleName":"基础数据管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-财务基础数据-汇率管理","FunctionName":"更新汇率"},
  {"UserCode":"EMP0015","UserName":"郑浩","PositionName":"物流专员","RoleName":"集成开发实施","AppName":"动态建模平台","MenuFullPath":"基础设置-业务基础数据-航线归类","FunctionName":"删除归类"},
  {"UserCode":"EMP0016","UserName":"韩梅","PositionName":"公关经理","RoleName":"运营管理员","AppName":"动态建模平台","MenuFullPath":"财务管理-发票管理-开票收票","FunctionName":"红冲发票"},
  {"UserCode":"EMP0001","UserName":"张伟","PositionName":"人力资源专员","RoleName":"IT管理员","AppName":"动态建模平台","MenuFullPath":"系统管理-预警任务","FunctionName":"新增预警"},
  {"UserCode":"EMP0002","UserName":"王芳","PositionName":"财务专员","RoleName":"基础数据管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-凭证设置-凭证类型","FunctionName":"启用凭证类型"},
  {"UserCode":"EMP0003","UserName":"李娜","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","AppName":"动态建模平台","MenuFullPath":"基础设置-业务基础数据-海港","FunctionName":"导出海港"},
  {"UserCode":"EMP0004","UserName":"刘强","PositionName":"前端开发工程师","RoleName":"应用构建人员","AppName":"动态建模平台","MenuFullPath":"权限管理-角色管理-角色管理","FunctionName":"复制角色"},
  {"UserCode":"EMP0005","UserName":"陈敏","PositionName":"销售代表","RoleName":"运营管理员","AppName":"动态建模平台","MenuFullPath":"财务管理-发票管理-收款发票","FunctionName":"开票"},
  {"UserCode":"EMP0006","UserName":"杨洋","PositionName":"运维工程师","RoleName":"IT管理员","AppName":"动态建模平台","MenuFullPath":"系统管理-日志管理-操作日志","FunctionName":"下载日志"},
  {"UserCode":"EMP0007","UserName":"赵磊","PositionName":"采购专员","RoleName":"集成开发实施","AppName":"动态建模平台","MenuFullPath":"基础设置-凭证设置-分录摘要规则","FunctionName":"测试规则"},
  {"UserCode":"EMP0008","UserName":"孙丽","PositionName":"行政助理","RoleName":"门户模板管理员","AppName":"动态建模平台","MenuFullPath":"组织权限-组织机构-管理组织","FunctionName":"启用组织"},
  {"UserCode":"EMP0009","UserName":"周杰","PositionName":"软件工程师","RoleName":"生产技术员","AppName":"动态建模平台","MenuFullPath":"基础设置-业务基础数据-空港","FunctionName":"批量启用"},
  {"UserCode":"EMP0010","UserName":"吴倩","PositionName":"客服专员","RoleName":"全员","AppName":"动态建模平台","MenuFullPath":"基础设置-合作伙伴-绩效规则","FunctionName":"查看规则"},
  {"UserCode":"EMP0011","UserName":"黄勇","PositionName":"法务专员","RoleName":"门户管理员","AppName":"动态建模平台","MenuFullPath":"财务管理-财务审核-费用审核","FunctionName":"驳回"},
  {"UserCode":"EMP0012","UserName":"徐婷","PositionName":"培训讲师","RoleName":"应用构建人员","AppName":"动态建模平台","MenuFullPath":"权限管理-角色管理-角色组","FunctionName":"编辑角色组"},
  {"UserCode":"EMP0013","UserName":"高强","PositionName":"运营专员","RoleName":"生产主管","AppName":"动态建模平台","MenuFullPath":"财务管理-费用管理-对账单","FunctionName":"发送对账单"},
  {"UserCode":"EMP0014","UserName":"林芳","PositionName":"质量主管","RoleName":"基础数据管理员","AppName":"动态建模平台","MenuFullPath":"基础设置-财务基础数据-发票类型","FunctionName":"禁用发票类型"},
  {"UserCode":"EMP0015","UserName":"郑浩","PositionName":"物流专员","RoleName":"集成开发实施","AppName":"动态建模平台","MenuFullPath":"财务管理-费用管理-内部代理结算","FunctionName":"生成结算单"},
  {"UserCode":"EMP0016","UserName":"韩梅","PositionName":"公关经理","RoleName":"运营管理员","AppName":"动态建模平台","MenuFullPath":"财务管理-财务管理-未销账综合查询","FunctionName":"导出查询结果"},
  {"UserCode":"EMP0001","UserName":"张伟","PositionName":"人力资源专员","RoleName":"IT管理员","AppName":"动态建模平台","MenuFullPath":"系统管理-编码规则","FunctionName":"新增规则"},
  {"UserCode":"EMP0002","UserName":"王芳","PositionName":"财务专员","RoleName":"基础数据管理员","AppName":"动态建模平台","MenuFullPath":"财务管理-综合财务查询-凭证查询","FunctionName":"导出凭证"},
  {"UserCode":"EMP0003","UserName":"李娜","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","AppName":"动态建模平台","MenuFullPath":"基础设置-财务基础数据-TMO类型","FunctionName":"查看详情"},
  {"UserCode":"EMP0004","UserName":"刘强","PositionName":"前端开发工程师","RoleName":"应用构建人员","AppName":"动态建模平台","MenuFullPath":"系统管理-菜单管理-菜单管理","FunctionName":"移动菜单"},
  {"UserCode":"EMP0005","UserName":"陈敏","PositionName":"销售代表","RoleName":"运营管理员","AppName":"动态建模平台","MenuFullPath":"财务管理-付款申请-付款申请","FunctionName":"提交申请"},
  {"UserCode":"EMP0006","UserName":"杨洋","PositionName":"运维工程师","RoleName":"IT管理员","AppName":"动态建模平台","MenuFullPath":"系统管理-日志管理-异常日志","FunctionName":"删除异常"},
  {"UserCode":"EMP0007","UserName":"赵磊","PositionName":"采购专员","RoleName":"集成开发实施","AppName":"动态建模平台","MenuFullPath":"基础设置-企业基础数据-企业规模","FunctionName":"批量导入"},
  {"UserCode":"EMP0008","UserName":"孙丽","PositionName":"行政助理","RoleName":"门户模板管理员","AppName":"动态建模平台","MenuFullPath":"组织权限-组织机构-行政组织","FunctionName":"启用行政组织"},
  {"UserCode":"EMP0009","UserName":"周杰","PositionName":"软件工程师","RoleName":"生产技术员","AppName":"动态建模平台","MenuFullPath":"权限管理-权限查询-数据权限查询（按角色）","FunctionName":"导出报表"},
  {"UserCode":"EMP0010","UserName":"吴倩","PositionName":"客服专员","RoleName":"全员","AppName":"动态建模平台","MenuFullPath":"业务中心-托书管理-海运服务","FunctionName":"查看服务详情"}
];


// 获取账单管理台账列表
export const getFunctionPermissionByUserList = async (): Promise<FunctionPermissionByUserItemProps[]> => {
  return functionPermissionByUserItems;
}

// 保存账单管理
export const saveFunctionPermissionByUser = async (data: FunctionPermissionByUserItemProps, onUploadProgress?: (progress: number) => void): Promise<FunctionPermissionByUserItemProps> => {
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
export const getFunctionPermissionByUserList = async (): Promise<FunctionPermissionByUserItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/function_permission_by_user"
  })
  const responseData = response?.data as ApiRes<FunctionPermissionByUserItemProps[]>;
  return responseData.data || [];
}

export const saveFunctionPermissionByUser = (data:FunctionPermissionByUserItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/function_permission_by_user/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
