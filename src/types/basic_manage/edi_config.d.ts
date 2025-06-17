// EDI配置属性
export interface EdiConfigItemProps {
    // 编号
    Id:string;
    // 分公司
    BranchOffice:string;
    // EDI发送方代码
    EdiSenderCode:string;
    // EDI接收方代码
    EdiReceiverCode:string;
    // CNCode
    CnCode:string;
    // 订舱代理
    BookingAgent:string;
    // 订舱人代码
    BookingPersonCode:string;
}