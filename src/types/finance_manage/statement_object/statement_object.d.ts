// 结算对象属性
export interface StatementObjectItemProps {
    // 
    Id:string;
    // 结算对象
    SettlementObject:string;
    // 月结/票结
    MonthlySettlementTicketSettlement:string;
    // USD应收
    UsdReceivable:number;
    // USD应付
    UsdPayable:number;
    // CNY应收
    CnyReceivable:number;
    // CNY已收
    CnyReceived:number;
    // CNY应付
    CnyPayable:number;
    // CNY已付
    CnyPaid:number;
    // EUR应收
    EurReceivable:number;
    // EUR应付
    EurPayable:number;
    // HKD应收
    HkdReceivable:number;
    // HKD应付
    HkdPayable:number;
    // NGN应收
    NgnReceivable:number;
    // NGN已收
    NgnReceived:number;
    // NGN已付
    NgnPaid:number;
    // NGN应付
    NgnPayable:number;
    // GBP应收
    GbpReceivable:number;
    // GBP应付
    GbpPayable:number;
    // JPY应收
    JpyReceivable:number;
    // JPY应付
    JpyPayable:number;
    // JPY已收
    JpyReceived:number;
    // JPY已付
    JpyPaid:number;
    // 其他折算CNY应收
    OtherCnyReceivable:number;
    // 其他折算CNY已收
    OtherCnyReceived:number;
    // 其他折算CNY应付
    OtherCnyPayable:number;
    // 其他折算CNY已付
    OtherCnyPaid:number;
    // 其他折算EUR应收
    OtherEurReceivable:number;
    // 其他折算EUR应付
    OtherEurPayable:number;
    // 其他折算EUR已收
    OtherEurReceived:number;
    // 其他折算EUR已付
    OtherEurPaid:number;
    // 其他折算HKD应收
    OtherHkdReceivable:number;
    // 其他折算HKD应付
    OtherHkdPayable:number;
    // 其他折算HKD已收
    OtherHkdReceived:number;
    // 其他折算HKD已付
    OtherHkdPaid:number;
    // 其他折算GBP应收
    OtherGbpReceivable:number;
    // 其他折算GBP应付
    OtherGbpPayable:number;
    // 其他折算JPY应收
    OtherJpyReceivable:number;
    // 其他折算JPY应付
    OtherJpyPayable:number;
    // 其他折算NGN应收
    OtherNgnReceivable:number;
    // 其他折算NGN应付
    OtherNgnPayable:number;
    // 其他折算NGN已收
    OtherNgnReceived:number;
    // 其他折算NGN已付
    OtherNgnPaid:number;
    // 折合CNY已收
    EquivalentCnyReceived:number;
    // 折合CNY已付
    EquivalentCnyPaid:number;
    // USD未收
    UsdUnreceived:number;
    // USD已收
    UsdReceived:number;
    // USD已付
    UsdPaid:number;
    // USD未付
    UsdUnpaid:number;
    // CNY未收
    CnyUnreceived:number;
    // CNY未付
    CnyUnpaid:number;
    // EUR未收
    EurUnreceived:number;
    // EUR已收
    EurReceived:number;
    // EUR已付
    EurPaid:number;
    // EUR未付
    EurUnpaid:number;
    // HKD未收
    HkdUnreceived:number;
    // HKD已收
    HkdReceived:number;
    // HKD已付
    HkdPaid:number;
    // HKD未付
    HkdUnpaid:number;
    // GBP未收
    GbpUnreceived:number;
    // GBP未付
    GbpUnpaid:number;
    // JPY未收
    JpyUnreceived:number;
    // JPY未付
    JpyUnpaid:number;
    // NGN未收
    NgnUnreceived:number;
    // NGN未付
    NgnUnpaid:number;
    // 其他折算CNY未收
    OtherCnyUnreceived:number;
    // 其他折算CNY未付
    OtherCnyUnpaid:number;
    // 其他折算EUR未收
    OtherEurUnreceived:number;
    // 其他折算EUR未付
    OtherEurUnpaid:number;
    // 其他折算HKD未收
    OtherHkdUnreceived:number;
    // 其他折算HKD未付
    OtherHkdUnpaid:number;
    // 其他折算GBP未收
    OtherGbpUnreceived:number;
    // 其他折算GBP未付
    OtherGbpUnpaid:number;
    // 其他折算JPY未收
    OtherJpyUnreceived:number;
    // 其他折算JPY未付
    OtherJpyUnpaid:number;
    // 其他折算NGN未收
    OtherNgnUnreceived:number;
    // 其他折算NGN未付
    OtherNgnUnpaid:number;
    // 提货日期
    DeliveryDate:string;
    // 到库日期
    ArrivalDate:string;
    // 单证
    Documents:string;
}