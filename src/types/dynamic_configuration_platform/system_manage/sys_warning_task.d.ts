// 预警任务属性
export interface SysWarningTaskItemProps {
    // 所属应用
    AppCode:string;
    // 任务编码
    TaskCode:string;
    // 任务名称
    TaskName:string;
    // 预警类型
    WarningType:string;
    // 类型模式
    TypeSchema:string;
    // 状态
    Status:string;
    // 成功次数
    SuccessCnt:number;
    // 失败次数
    FailCnt:number;
    // 任务备注
    TaskRemark:string;
    // 创建时间
    CreatedTime:string;
}

export interface SysWarningTaskCronProps {
    //序号
    SeqNo:string;
    // Cron表达式
    Cron:string;
    // 测试Cron示例
    TestCron:string;
}

export interface SysWarningTaskReviceMessageProps {
    //序号
    SeqNo:string;
    // 接收类型
    ReceiveType:string;
    // 接收对象
    ReceiveObject:string;
}