
import request, {ApiRes,requestWithProgress } from '../../request'
import { DataPermissionByUserItemProps } from "@/types/dynamic_configuration_platform/identity/data_permission_by_user";
import Mock from "mockjs";
//
const dataPermissionByUserItems:DataPermissionByUserItemProps[] = [
  {"UserCode":"U20250715001","UserName":"章昊天","PositionName":"人力资源专员","RoleName":"门户管理员","DataPermission":"集团总部/人力资源中心/组织发展部/HR主管","SpecialDataPermission":"① 员工实体：部门字段=组织发展部 ② 合同实体：合同状态≠已作废 ③ 预警任务实体：优先级≥High →（① 或 ②）且 ③"},
  {"UserCode":"U20250715002","UserName":"李思雅","PositionName":"财务专员","RoleName":"基础数据管理员","DataPermission":"集团总部/财务中心/资金管理部/资金主管","SpecialDataPermission":"① 汇率实体：生效日期≥today()-7 ② 发票类型实体：启用状态=启用 ③ 结算方式实体：系统锁定=false → ① 且 ② 且 ③"},
  {"UserCode":"U20250715003","UserName":"王晨曦","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","DataPermission":"集团总部/数据中心/客户分析部/分析师","SpecialDataPermission":"① 客户实体：客户级别=VIP ② 客户分类实体：分类路径 like '/战略客户%' ③ 客户标签实体：标签战略=true →（① 或 ②）且 ③"},
  {"UserCode":"U20250715004","UserName":"刘宇航","PositionName":"前端开发工程师","RoleName":"应用构建人员","DataPermission":"集团总部/研发中心/平台架构部/架构师","SpecialDataPermission":"① 菜单实体：系统标识=动态建模平台 ② 功能按钮实体：可见=true ③ 角色实体：锁定=false → ① 且 ② 且 ③"},
  {"UserCode":"U20250715005","UserName":"陈雨欣","PositionName":"销售代表","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/直销部/销售主管","SpecialDataPermission":"① 订单实体：状态=待审核 ② 开票实体：开票状态=待开票 ③ 付款申请实体：审批节点=运营管理员 →（① 或 ②）且 ③"},
  {"UserCode":"U20250715006","UserName":"杨梓轩","PositionName":"运维工程师","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/运维部/运维工程师","SpecialDataPermission":"① 调度任务实体：状态=运行中 ② 登录日志实体：登录时间≥today()-1 ③ 异常日志实体：级别=ERROR → ① 且 ② 且 ③"},
  {"UserCode":"U20250715007","UserName":"赵子墨","PositionName":"采购专员","RoleName":"集成开发实施","DataPermission":"集团总部/交付中心/实施一部/实施顾问","SpecialDataPermission":"① 供应商实体：合作状态=合作中 ② 模板实体：启用=true ③ 银行信息实体：国家=CN → ① 且 ② 且 ③"},
  {"UserCode":"U20250715008","UserName":"孙诗涵","PositionName":"行政助理","RoleName":"门户模板管理员","DataPermission":"集团总部/行政中心/行政部/行政专员","SpecialDataPermission":"① 部门实体：启用=true ② 节假日实体：年份=2024 ③ 行政组织实体：虚拟组织=false → ① 且 ② 且 ③"},
  {"UserCode":"U20250715009","UserName":"周亦凡","PositionName":"软件工程师","RoleName":"生产技术员","DataPermission":"集团总部/生产中心/制造一部/生产组长","SpecialDataPermission":"① 箱型实体：启用=true ② 海关编码实体：生效=true ③ 空港实体：状态=启用 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715010","UserName":"吴语嫣","PositionName":"客服专员","RoleName":"全员","DataPermission":"集团总部/客服中心/售后一组/客服代表","SpecialDataPermission":"① 客户级别实体：启用=true ② 客户行业实体：启用=true ③ 海运服务实体：状态=可用 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715011","UserName":"黄俊凯","PositionName":"法务专员","RoleName":"门户管理员","DataPermission":"集团总部/法务中心/合规部/法务经理","SpecialDataPermission":"① 合同实体：合同状态≠已作废 ② 法务审核实体：审核结果=通过 ③ 印章记录实体：用印状态=已盖章 →（① 且 ②）或 ③"},
  {"UserCode":"U20250715012","UserName":"徐婉儿","PositionName":"培训讲师","RoleName":"应用构建人员","DataPermission":"集团总部/培训中心/课程研发部/课程设计师","SpecialDataPermission":"① 课程实体：状态=已发布 ② 课件实体：可见=true ③ 考试实体：启用=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715013","UserName":"高博涛","PositionName":"运营专员","RoleName":"生产主管","DataPermission":"集团总部/生产中心/计划部/计划员","SpecialDataPermission":"① 费用模板实体：启用=true ② 对账单实体：状态=已对账 ③ 内部代理结算实体：状态=已结算 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715014","UserName":"林芷若","PositionName":"质量主管","RoleName":"基础数据管理员","DataPermission":"集团总部/质量中心/质量体系部/质量工程师","SpecialDataPermission":"① 质检标准实体：启用=true ② 不合格品实体：处理状态=待处理 ③ 纠正措施实体：验证状态=已验证 →（① 且 ②）或 ③"},
  {"UserCode":"U20250715015","UserName":"郑浩然","PositionName":"物流专员","RoleName":"集成开发实施","DataPermission":"集团总部/物流中心/运输部/运输主管","SpecialDataPermission":"① 航线实体：启用=true ② 车辆实体：可用=true ③ 司机实体：状态=在职 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715016","UserName":"韩雨彤","PositionName":"公关经理","RoleName":"运营管理员","DataPermission":"集团总部/品牌中心/公关部/公关经理","SpecialDataPermission":"① 活动实体：状态=进行中 ② 媒体投放实体：投放状态=已上线 ③ 舆情监控实体：等级≥警告 →（① 或 ②）且 ③"},
  {"UserCode":"U20250715017","UserName":"朱瑞霖","PositionName":"人力资源专员","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/数据管理部/数据管理员","SpecialDataPermission":"① 数据权限实体：启用=true ② 操作日志实体：操作时间≥today()-7 ③ 数据字典实体：锁定=false → ① 且 ② 且 ③"},
  {"UserCode":"U20250715018","UserName":"冯雪怡","PositionName":"财务专员","RoleName":"基础数据管理员","DataPermission":"集团总部/财务中心/报表部/报表专员","SpecialDataPermission":"① 凭证类型实体：启用状态=启用 ② 账套实体：启用状态=启用 ③ 凭证查询实体：查询权限=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715019","UserName":"蒋子杰","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","DataPermission":"集团总部/营销中心/内容营销部/内容运营","SpecialDataPermission":"① 内容实体：发布状态=已发布 ② 渠道实体：启用=true ③ 标签实体：热门=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715020","UserName":"谢梓萱","PositionName":"前端开发工程师","RoleName":"应用构建人员","DataPermission":"集团总部/研发中心/UI设计部/交互设计师","SpecialDataPermission":"① 页面模板实体：启用=true ② 组件库实体：版本≥V3 ③ 设计稿实体：审批状态=通过 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715021","UserName":"彭思远","PositionName":"销售代表","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/大客户部/大客户经理","SpecialDataPermission":"① 客户实体：级别=KA ② 订单实体：金额≥500万 ③ 回款实体：回款比例≥90% →（① 且 ②）且 ③"},
  {"UserCode":"U20250715022","UserName":"曹雨泽","PositionName":"运维工程师","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/基础设施部/网络工程师","SpecialDataPermission":"① 网络设备实体：状态=在线 ② 带宽实体：使用率<80% ③ 告警实体：级别<严重 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715023","UserName":"邓欣怡","PositionName":"采购专员","RoleName":"集成开发实施","DataPermission":"集团总部/供应链中心/供应商管理部/供应商管理专员","SpecialDataPermission":"① 供应商实体：评级≥A ② 合同实体：到期日期≥today()+90 ③ 绩效实体：得分≥85 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715024","UserName":"萧子墨","PositionName":"行政助理","RoleName":"门户模板管理员","DataPermission":"集团总部/行政中心/资产管理部/资产管理员","SpecialDataPermission":"① 资产实体：状态=在用 ② 折旧实体：剩余年限≥1 ③ 处置实体：处置状态=未处置 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715025","UserName":"苏梓涵","PositionName":"软件工程师","RoleName":"生产技术员","DataPermission":"集团总部/研发中心/测试部/测试工程师","SpecialDataPermission":"① 测试用例实体：状态=已评审 ② 缺陷实体：状态=已修复 ③ 版本实体：发布状态=已发布 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715026","UserName":"叶思远","PositionName":"客服专员","RoleName":"全员","DataPermission":"集团总部/客服中心/质检部/质检专员","SpecialDataPermission":"① 客服工单实体：状态=已解决 ② 满意度实体：评分≥4 ③ 知识库实体：启用=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715027","UserName":"程雨桐","PositionName":"法务专员","RoleName":"门户管理员","DataPermission":"集团总部/法务中心/知识产权部/专利专员","SpecialDataPermission":"① 专利实体：状态=有效 ② 申请实体：申请日期≥today()-365 ③ 年费实体：缴纳状态=已缴纳 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715028","UserName":"魏子轩","PositionName":"培训讲师","RoleName":"应用构建人员","DataPermission":"集团总部/培训中心/讲师发展部/讲师主管","SpecialDataPermission":"① 讲师实体：启用=true ② 课程实体：状态=已上架 ③ 评估实体：平均分≥4.5 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715029","UserName":"姜梓萱","PositionName":"运营专员","RoleName":"生产主管","DataPermission":"集团总部/生产中心/安全部/安全员","SpecialDataPermission":"① 安全检查实体：状态=已完成 ② 隐患实体：等级=一般 ③ 整改实体：状态=已整改 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715030","UserName":"崔思远","PositionName":"质量主管","RoleName":"基础数据管理员","DataPermission":"集团总部/质量中心/检验部/检验工程师","SpecialDataPermission":"① 检验计划实体：状态=已发布 ② 检验记录实体：结果=合格 ③ 证书实体：有效期≥today()+30 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715031","UserName":"潘雨泽","PositionName":"物流专员","RoleName":"集成开发实施","DataPermission":"集团总部/物流中心/仓储部/仓储主管","SpecialDataPermission":"① 库存实体：可用量>0 ② 库位实体：状态=启用 ③ 盘点实体：差异=0 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715032","UserName":"袁欣怡","PositionName":"公关经理","RoleName":"运营管理员","DataPermission":"集团总部/品牌中心/新媒体部/新媒体运营","SpecialDataPermission":"① 推文实体：发布状态=已发布 ② 阅读实体：阅读量≥10000 ③ 互动实体：点赞≥500 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715033","UserName":"许子墨","PositionName":"人力资源专员","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/研发管理部/研发管理员","SpecialDataPermission":"① 代码仓库实体：状态=正常 ② 合并请求实体：状态=已合并 ③ 构建实体：结果=成功 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715034","UserName":"何梓涵","PositionName":"财务专员","RoleName":"基础数据管理员","DataPermission":"集团总部/财务中心/税务部/税务专员","SpecialDataPermission":"① 税种实体：启用=true ② 申报实体：状态=已申报 ③ 缴税实体：状态=已缴 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715035","UserName":"吕思远","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","DataPermission":"集团总部/营销中心/广告投放部/广告优化师","SpecialDataPermission":"① 广告实体：状态=投放中 ② 消耗实体：消耗>预算*0.8 ③ 转化实体：转化率>5% → ① 且 ② 且 ③"},
  {"UserCode":"U20250715036","UserName":"施梓萱","PositionName":"前端开发工程师","RoleName":"应用构建人员","DataPermission":"集团总部/研发中心/移动开发部/移动工程师","SpecialDataPermission":"① 应用实体：上架状态=已上架 ② 版本实体：审核通过=true ③ 崩溃率实体：崩溃率<1% → ① 且 ② 且 ③"},
  {"UserCode":"U20250715037","UserName":"阎雨泽","PositionName":"销售代表","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/渠道合作部/渠道经理","SpecialDataPermission":"① 渠道实体：合作状态=合作中 ② 业绩实体：达标率≥100% ③ 返佣实体：结算状态=已结算 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715038","UserName":"江欣怡","PositionName":"运维工程师","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/数据库部/DBA","SpecialDataPermission":"① 数据库实体：状态=正常 ② 备份实体：成功=true ③ 性能实体：CPU<80% → ① 且 ② 且 ③"},
  {"UserCode":"U20250715039","UserName":"傅子墨","PositionName":"采购专员","RoleName":"集成开发实施","DataPermission":"集团总部/供应链中心/招标部/招标专员","SpecialDataPermission":"① 招标实体：状态=已发布 ② 投标实体：状态=已投标 ③ 中标实体：状态=已中标 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715040","UserName":"阮梓涵","PositionName":"行政助理","RoleName":"门户模板管理员","DataPermission":"集团总部/行政中心/接待部/接待专员","SpecialDataPermission":"① 接待实体：状态=已完成 ② 满意度实体：评分≥4 ③ 费用实体：已报销=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715041","UserName":"雷思远","PositionName":"软件工程师","RoleName":"生产技术员","DataPermission":"集团总部/研发中心/算法部/算法工程师","SpecialDataPermission":"① 算法实体：状态=已上线 ② 模型实体：准确率≥90% ③ 任务实体：状态=成功 → ① 且 ② 且 ③"},
  {"UserCode":"U20250715042","UserName":"贺雨桐","PositionName":"客服专员","RoleName":"全员","DataPermission":"集团总部/客服中心/投诉部/投诉专员","SpecialDataPermission":"① 投诉实体：状态=已处理 ② 回访实体：满意=true ③ 知识库实体：已更新=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715043","UserName":"倪梓萱","PositionName":"法务专员","RoleName":"门户管理员","DataPermission":"集团总部/法务中心/合规部/合规专员","SpecialDataPermission":"① 合规检查实体：状态=已检查 ② 不合规实体：已整改=true ③ 报告实体：已提交=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715044","UserName":"殷子轩","PositionName":"培训讲师","RoleName":"应用构建人员","DataPermission":"集团总部/培训中心/在线学习部/学习顾问","SpecialDataPermission":"① 学习实体：进度=100% ② 考试实体：合格=true ③ 证书实体：已颁发=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715045","UserName":"罗欣怡","PositionName":"运营专员","RoleName":"生产主管","DataPermission":"集团总部/生产中心/设备部/设备管理员","SpecialDataPermission":"① 设备实体：状态=正常 ② 保养实体：已保养=true ③ 故障实体：已修复=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715046","UserName":"毕梓涵","PositionName":"质量主管","RoleName":"基础数据管理员","DataPermission":"集团总部/质量中心/计量部/计量工程师","SpecialDataPermission":"① 计量实体：合格=true ② 校准实体：已校准=true ③ 记录实体：已审核=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715047","UserName":"孟雨泽","PositionName":"物流专员","RoleName":"集成开发实施","DataPermission":"集团总部/物流中心/运输部/运输专员","SpecialDataPermission":"① 运单实体：状态=已签收 ② 回单实体：已回单=true ③ 费用实体：已结算=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715048","UserName":"龙欣怡","PositionName":"公关经理","RoleName":"运营管理员","DataPermission":"集团总部/品牌中心/设计部/视觉设计师","SpecialDataPermission":"① 设计稿实体：已审核=true ② 素材实体：已上传=true ③ 版权实体：已授权=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715049","UserName":"万子墨","PositionName":"人力资源专员","RoleName":"IT管理员","DataPermission":"集团总部/信息中心/中间件部/中间件工程师","SpecialDataPermission":"① 中间件实体：状态=正常 ② 监控实体：告警=false ③ 配置实体：已同步=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715050","UserName":"段梓涵","PositionName":"财务专员","RoleName":"基础数据管理员","DataPermission":"集团总部/财务中心/资金部/资金专员","SpecialDataPermission":"① 账户实体：状态=正常 ② 流水实体：已核对=true ③ 对账实体：已对账=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715051","UserName":"郝雨泽","PositionName":"市场推广专员","RoleName":"用户洞察授权用户","DataPermission":"集团总部/营销中心/会员部/会员运营","SpecialDataPermission":"① 会员实体：状态=有效 ② 积分实体：≥1000 ③ 权益实体：已激活=true → ① 且 ② 且 ③"},
  {"UserCode":"U20250715052","UserName":"孔欣怡","PositionName":"前端开发工程师","RoleName":"应用构建人员","DataPermission":"集团总部/研发中心/测试部/自动化测试工程师","SpecialDataPermission":"① 自动化脚本实体：已通过=true ② 测试报告实体：无阻塞=true ③ 覆盖率实体：≥80% → ① 且 ② 且 ③"},
  {"UserCode":"U20250715053","UserName":"白梓轩","PositionName":"销售代表","RoleName":"运营管理员","DataPermission":"集团总部/营销中心/电商部/电商运营","SpecialDataPermission":"① 商品实体：上架=true ② 库存实体：>0 ③ 活动实体：进行中=true → ① 且 ② 且 ③"}
];


// 获取账单管理台账列表
export const getDataPermissionByUserList = async (): Promise<DataPermissionByUserItemProps[]> => {
  return dataPermissionByUserItems;
}

// 保存账单管理
export const saveDataPermissionByUser = async (data: DataPermissionByUserItemProps, onUploadProgress?: (progress: number) => void): Promise<DataPermissionByUserItemProps> => {
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
export const getDataPermissionByUserList = async (): Promise<DataPermissionByUserItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/data_permission_by_user"
  })
  const responseData = response?.data as ApiRes<DataPermissionByUserItemProps[]>;
  return responseData.data || [];
}

export const saveDataPermissionByUser = (data:DataPermissionByUserItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/data_permission_by_user/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
