
import request, { ApiRes, requestWithProgress } from '../../request'
import { SysExceptionLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_exception_log";
import Mock from "mockjs";
//
const sysExceptionLogItems: SysExceptionLogItemProps[] = [
    {
        "UserCode": "320000197506178359",
        "UserName": "影狼牙",
        "Domain": "幽冥域",
        "Application": "结算中心",
        "Service": "清结算服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "System.NullReferenceException: Object reference not set to an instance of an object. → 结算单 ID=null，F_Qty 字段未实例化",
        "RequestUrl": "/settle/calc",
        "RequestParam": "{billId:null}",
        "RequestHeader": "Authorization:Bearer tk111",
        "IpAddress": "192.168.0.113",
        "ExceptionTime": "2025-09-22 14:01:11",
        "OperateDevice": "Chrome",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178360",
        "UserName": "星鸾羽",
        "Domain": "幻星域",
        "Application": "推荐引擎",
        "Service": "特征召回服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "IndexOutOfRangeException: Index was outside the bounds of the array. → userFeatureVec.Length=0，但代码硬编码 vec[128]",
        "RequestUrl": "/recall/feature",
        "RequestParam": "{uid:8848}",
        "RequestHeader": "Authorization:Bearer tk212",
        "IpAddress": "192.168.0.114",
        "ExceptionTime": "2025-09-22 14:02:22",
        "OperateDevice": "Web端",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178361",
        "UserName": "沙狐踪",
        "Domain": "荒漠域",
        "Application": "调度中心",
        "Service": "任务分片服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "Deadlock detected: MySQL error 1213 → 'Deadlock found when trying to get lock; try restarting transaction' 重试3次仍失败",
        "RequestUrl": "/job/shard",
        "RequestParam": "{jobId:J9527}",
        "RequestHeader": "Authorization:Bearer tk313",
        "IpAddress": "192.168.0.115",
        "ExceptionTime": "2025-09-22 14:03:33",
        "OperateDevice": "App",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178362",
        "UserName": "雪狐眸",
        "Domain": "冰川域",
        "Application": "支付网关",
        "Service": "渠道适配服务",
        "ExceptionLvl": "中",
        "ExceptionMsg": "System.FormatException: Input string was not in a correct format. → Amount=“19.9a” 包含非数字字符",
        "RequestUrl": "/pay/channel",
        "RequestParam": "{amt:\"19.9a\"}",
        "RequestHeader": "Authorization:Bearer tk414",
        "IpAddress": "192.168.0.116",
        "ExceptionTime": "2025-09-22 14:04:44",
        "OperateDevice": "Chrome",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178363",
        "UserName": "天鹏翼",
        "Domain": "苍穹域",
        "Application": "用户中心",
        "Service": "权限缓存服务",
        "ExceptionLvl": "中",
        "ExceptionMsg": "StackOverflowException: The request pipeline recycled >2048 times → 大概率是 Filter 中无限递归",
        "RequestUrl": "/user/permission",
        "RequestParam": "{uid:6688}",
        "RequestHeader": "Authorization:Bearer tk515",
        "IpAddress": "192.168.0.117",
        "ExceptionTime": "2025-09-22 14:05:55",
        "OperateDevice": "Firefox",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178364",
        "UserName": "焰羽雀",
        "Domain": "炽焰域",
        "Application": "直播弹幕",
        "Service": "敏感词过滤服务",
        "ExceptionLvl": "低",
        "ExceptionMsg": "OutOfMemoryError: Java heap space → DFA 词库加载后占用 2.1 GB，超出容器 limit 2 GB",
        "RequestUrl": "/barrage/filter",
        "RequestParam": "{txt:\"***\"}",
        "RequestHeader": "Authorization:Bearer tk616",
        "IpAddress": "192.168.0.118",
        "ExceptionTime": "2025-09-22 14:07:06",
        "OperateDevice": "Edge",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178365",
        "UserName": "铁犀角",
        "Domain": "铁甲域",
        "Application": "合同系统",
        "Service": "PDF 印章服务",
        "ExceptionLvl": "中",
        "ExceptionMsg": "iText.Kernel.PdfException: PDF header signature not found. → 模板文件被前端二次压缩导致头信息丢失",
        "RequestUrl": "/contract/stamp",
        "RequestParam": "{tpl:\"contract.pdf\"}",
        "RequestHeader": "Authorization:Bearer tk717",
        "IpAddress": "192.168.0.119",
        "ExceptionTime": "2025-09-22 14:08:17",
        "OperateDevice": "Web端",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178366",
        "UserName": "灵蝶舞",
        "Domain": "花灵域",
        "Application": "问卷系统",
        "Service": "提交校验服务",
        "ExceptionLvl": "低",
        "ExceptionMsg": "JsonReaderException: Unexpected character encountered while parsing value: {. → 选项字段多包了一层 {}",
        "RequestUrl": "/survey/submit",
        "RequestParam": "{opt:{{\"id\":1}}}}",
        "RequestHeader": "Authorization:Bearer tk818",
        "IpAddress": "192.168.0.120",
        "ExceptionTime": "2025-09-22 14:09:28",
        "OperateDevice": "App",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178367",
        "UserName": "苍狼啸",
        "Domain": "荒原域",
        "Application": "CRM",
        "Service": "客户查询服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "EntityNotFoundException: Could not load entity with ID 1021 → 逻辑删除标记=1 仍被查询",
        "RequestUrl": "/customer/get",
        "RequestParam": "{id:1021}",
        "RequestHeader": "Authorization:Bearer tk919",
        "IpAddress": "192.168.0.121",
        "ExceptionTime": "2025-09-22 14:10:39",
        "OperateDevice": "Chrome",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178368",
        "UserName": "碧鲸涛",
        "Domain": "深海域",
        "Application": "BI 报表",
        "Service": "SQL 执行引擎",
        "ExceptionLvl": "中",
        "ExceptionMsg": "SQLTimeoutException: Statement cancelled after 30 s → 缺少分区条件导致全表扫描 1.8 亿行",
        "RequestUrl": "/report/sql",
        "RequestParam": "{sql:\"select * from fact_sale\"}",
        "RequestHeader": "Authorization:Bearer tk020",
        "IpAddress": "192.168.0.122",
        "ExceptionTime": "2025-09-22 14:11:50",
        "OperateDevice": "Firefox",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178369",
        "UserName": "金乌焰",
        "Domain": "曜日域",
        "Application": "运维平台",
        "Service": "发布服务",
        "ExceptionLvl": "低",
        "ExceptionMsg": "RollbackException: k8s rollout restart failed: readiness probe timeout (10 s) → 新镜像忘记暴露 8080",
        "RequestUrl": "/deploy/rollback",
        "RequestParam": "{app:A1023,rev:20250922.1}",
        "RequestHeader": "Authorization:Bearer tk121",
        "IpAddress": "192.168.0.123",
        "ExceptionTime": "2025-09-22 14:13:01",
        "OperateDevice": "Edge",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178370",
        "UserName": "玄龟甲",
        "Domain": "古石域",
        "Application": "监控中心",
        "Service": "告警服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "IllegalStateException: AlertManager 重复初始化 → 单例模式被 Spring 代理破坏，CPU 飙至 98%",
        "RequestUrl": "/alert/trigger",
        "RequestParam": "{metric:cpu}",
        "RequestHeader": "Authorization:Bearer tk222",
        "IpAddress": "192.168.0.124",
        "ExceptionTime": "2025-09-22 14:14:12",
        "OperateDevice": "Web端",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178371",
        "UserName": "白泽麟",
        "Domain": "祥云域",
        "Application": "网关",
        "Service": "限流服务",
        "ExceptionLvl": "中",
        "ExceptionMsg": "RejectedExecutionException: Thread pool queue full (capacity=2048) → 突发流量 6w QPS 打满",
        "RequestUrl": "/gateway/limit",
        "RequestParam": "{api:/order/create}",
        "RequestHeader": "Authorization:Bearer tk323",
        "IpAddress": "192.168.0.125",
        "ExceptionTime": "2025-09-22 14:15:23",
        "OperateDevice": "Chrome",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178372",
        "UserName": "九尾狐",
        "Domain": "青丘域",
        "Application": "会员中心",
        "Service": "积分服务",
        "ExceptionLvl": "低",
        "ExceptionMsg": "PointsNegativeException: Account 1026 points=-50 after deduction → 并发扣减未加行锁",
        "RequestUrl": "/points/consume",
        "RequestParam": "{points:100}",
        "RequestHeader": "Authorization:Bearer tk424",
        "IpAddress": "192.168.0.126",
        "ExceptionTime": "2025-09-22 14:16:34",
        "OperateDevice": "App",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178373",
        "UserName": "雷鹏翅",
        "Domain": "风暴域",
        "Application": "通知平台",
        "Service": "短信服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "SmsSendException: Provider Aliyun returned 400 - SignatureDoesNotMatch → 密钥被运维手动刷新未同步",
        "RequestUrl": "/sms/send",
        "RequestParam": "{template:T1027}",
        "RequestHeader": "Authorization:Bearer tk525",
        "IpAddress": "192.168.0.127",
        "ExceptionTime": "2025-09-22 14:17:45",
        "OperateDevice": "Firefox",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178374",
        "UserName": "紫霄鹤",
        "Domain": "紫霄域",
        "Application": "预算系统",
        "Service": "额度服务",
        "ExceptionLvl": "中",
        "ExceptionMsg": "BudgetExhaustedException: Dept 1028 monthly budget 0.00 CNY → 预算被财务手动冻结",
        "RequestUrl": "/budget/check",
        "RequestParam": "{amount:5000}",
        "RequestHeader": "Authorization:Bearer tk626",
        "IpAddress": "192.168.0.128",
        "ExceptionTime": "2025-09-22 14:18:56",
        "OperateDevice": "Edge",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178375",
        "UserName": "赤焰驹",
        "Domain": "赤焰域",
        "Application": "抽奖系统",
        "Service": "奖池服务",
        "ExceptionLvl": "低",
        "ExceptionMsg": "PrizeEmptyException: Prize pool P1029 has 0 prizes → 运营忘记补库存",
        "RequestUrl": "/lottery/draw",
        "RequestParam": "{pool:P1029}",
        "RequestHeader": "Authorization:Bearer tk727",
        "IpAddress": "192.168.0.129",
        "ExceptionTime": "2025-09-22 14:20:07",
        "OperateDevice": "Web端",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178376",
        "UserName": "霜狼牙",
        "Domain": "极寒域",
        "Application": "工单系统",
        "Service": "流转服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "FlowStateException: Ticket T1030 state=CLOSED cannot be withdrawn → 前端缓存未刷新，用户重复点击撤回",
        "RequestUrl": "/ticket/withdraw",
        "RequestParam": "{ticket:T1030}",
        "RequestHeader": "Authorization:Bearer tk828",
        "IpAddress": "192.168.0.130",
        "ExceptionTime": "2025-09-22 14:21:18",
        "OperateDevice": "Chrome",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178377",
        "UserName": "幻鲸息",
        "Domain": "幻海域",
        "Application": "库存中心",
        "Service": "预占服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "DataIntegrityViolationException: Duplicate entry '8848-9527' for key 'uk_sku_warehouse' → 唯一索引冲突",
        "RequestUrl": "/stock/preempt",
        "RequestParam": "{sku:8848,w:9527}",
        "RequestHeader": "Authorization:Bearer tk929",
        "IpAddress": "192.168.0.131",
        "ExceptionTime": "2025-09-22 14:22:29",
        "OperateDevice": "App",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178378",
        "UserName": "影豹袭",
        "Domain": "影月域",
        "Application": "促销系统",
        "Service": "优惠券服务",
        "ExceptionLvl": "中",
        "ExceptionMsg": "IllegalThreadStateException: Timer already cancelled. → 定时任务线程被重复 shutdown",
        "RequestUrl": "/coupon/expire",
        "RequestParam": "{batch:B1031}",
        "RequestHeader": "Authorization:Bearer tk030",
        "IpAddress": "192.168.0.132",
        "ExceptionTime": "2025-09-22 14:23:40",
        "OperateDevice": "Firefox",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178379",
        "UserName": "雷麟角",
        "Domain": "雷霆域",
        "Application": "认证系统",
        "Service": "JWT 刷新服务",
        "ExceptionLvl": "低",
        "ExceptionMsg": "SignatureException: JWT signature does not match locally computed signature. → 刷新令牌被手动篡改",
        "RequestUrl": "/auth/refresh",
        "RequestParam": "{refresh:fake.token}",
        "RequestHeader": "Authorization:Bearer tk131",
        "IpAddress": "192.168.0.133",
        "ExceptionTime": "2025-09-22 14:24:51",
        "OperateDevice": "Edge",
        "Status":"完成"
    },
    {
        "UserCode": "320000197506178380",
        "UserName": "金鹏展",
        "Domain": "罡风域",
        "Application": "网关",
        "Service": "签名服务",
        "ExceptionLvl": "高",
        "ExceptionMsg": "NoSuchAlgorithmException: algorithm 'SM3' not available → 升级 JDK 后国密扩展包未放入 lib;NoSuchAlgorithmException: algorithm 'SM3' not available → 升级 JDK 后国密扩展包未放入 lib;NoSuchAlgorithmException: algorithm 'SM3' not available → 升级 JDK 后国密扩展包未放入 lib;NoSuchAlgorithmException: algorithm 'SM3' not available → 升级 JDK 后国密扩展包未放入 lib;NoSuchAlgorithmException: algorithm 'SM3' not available → 升级 JDK 后国密扩展包未放入 lib;NoSuchAlgorithmException: algorithm 'SM3' not available → 升级 JDK 后国密扩展包未放入 lib;NoSuchAlgorithmException: algorithm 'SM3' not available → 升级 JDK 后国密扩展包未放入 lib;",
        "RequestUrl": "/gateway/sign",
        "RequestParam": "{alg:SM3}",
        "RequestHeader": "Authorization:Bearer tk232",
        "IpAddress": "192.168.0.134",
        "ExceptionTime": "2025-09-22 14:26:02",
        "OperateDevice": "Web端",
        "Status":"完成"
    }
];


// 获取账单管理台账列表
export const getSysExceptionLogList = async (): Promise<SysExceptionLogItemProps[]> => {
    return sysExceptionLogItems;
}

// 保存账单管理
export const saveSysExceptionLog = async (data: SysExceptionLogItemProps, onUploadProgress?: (progress: number) => void): Promise<SysExceptionLogItemProps> => {
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
export const getSysExceptionLogList = async (): Promise<SysExceptionLogItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/sys_exception_log"
  })
  const responseData = response?.data as ApiRes<SysExceptionLogItemProps[]>;
  return responseData.data || [];
}

export const saveSysExceptionLog = (data:SysExceptionLogItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/sys_exception_log/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
