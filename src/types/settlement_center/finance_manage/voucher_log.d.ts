// 凭证生成日志属性
export interface VoucherLogItemProps {
    // 凭证流水号
    VoucherSerialNo:string;
    // 凭证号
    VoucherNo:string;
    // 凭证类型
    VoucherType:string;
    // 凭证借贷合计
    VoucherDebitCreditTotal:string;
    // 凭证状态
    VoucherStatus:string;
    // 凭证日期
    VoucherDate:string;
    // 凭证状态（第二个状态字段）
    VoucherStatus2:string;
    // 对方凭证号
    CounterpartyVoucherNo:string;
    // 借方金额
    DebitAmount:number;
    // 贷方金额
    CreditAmount:number;
    // 发送状态
    SendStatus:string;
    // 删除状态
    DeleteStatus:string;
    // 创建人
    Creator:string;
    // 创建日期
    CreateDate:string;
    // 发送人
    Sender:string;
    // 发送日期
    SendDate:string;
}