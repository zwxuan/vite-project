
import request, { ApiRes, requestWithProgress } from '../request'
import { FeeAdjustmentFeeItemProps, FeeAdjustmentItemProps } from "@/types/finance_manage/fee_adjustment/fee_adjustment";
import Mock from "mockjs";
//
const feeAdjustmentItems: FeeAdjustmentItemProps[] = [
  {
    BusinessId: 'SHSELAX3D00001',
    Consignor: '上海振华国家物流有限公司',
    BookingAgent: '天津宝阳国际货运代理有限公司',
    ShippingCompany: '天津宝阳国际货运代理有限公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'MB123456',
    MblNumber: 'APLU067466753',
    MblType: 'FCL',
    BusinessStatus: '已发布',
    SalesPerson: '张三',
    BlStatus: '待确认',
    SysAuditStatus: '正常',
    ReleaseAuditStatus: '待审核',
    AuditTime: '2023-05-25',
    HoldTime: '',
    HoldReason: '',
    ContractValid: '是',
    Invoiced: '是',
    FullyWrittenOff: '是',
    Overdue: '否',
    OverLimit: '否',
    Remarks: '',
  },
  {
    BusinessId: 'SHSELAX3D00002',
    Consignor: '上海环球贸易有限公司',
    BookingAgent: '达飞轮船（中国）有限公司',
    ShippingCompany: '达飞轮船（中国）有限公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'MB234567',
    MblNumber: 'APLU7466753',
    MblType: '正本',
    BusinessStatus: '已提交',
    SalesPerson: '迪迪',
    BlStatus: '待确认',
    SysAuditStatus: '正常',
    ReleaseAuditStatus: '待审核',
    AuditTime: '2023-05-25',
    HoldTime: '',
    HoldReason: '',
    ContractValid: '是',
    Invoiced: '是',
    FullyWrittenOff: '是',
    Overdue: '否',
    OverLimit: '否',
    Remarks: '',
  },
  {
    BusinessId: 'SHSELAX3D00003',
    Consignor: 'ABC贸易公司',
    BookingAgent: '',
    ShippingCompany: '长荣海运股份有限公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'V.123456',
    MblNumber: 'APLU067466753',
    MblType: 'FCL',
    BusinessStatus: '已发布',
    SalesPerson: '张三',
    BlStatus: '待确认',
    SysAuditStatus: '异常',
    ReleaseAuditStatus: '待审核',
    AuditTime: '2023-05-25',
    HoldTime: '',
    HoldReason: '',
    ContractValid: '是',
    Invoiced: '是',
    FullyWrittenOff: '是',
    Overdue: '否',
    OverLimit: '否',
    Remarks: '',
  },
  {
    BusinessId: 'SHSELAX3D00004',
    Consignor: '北京爱迪生机械有限公司',
    BookingAgent: '美国总统班轮公司',
    ShippingCompany: '美国总统班轮公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'MB123456',
    MblNumber: 'APLU067466753',
    MblType: '正本',
    BusinessStatus: '已发布',
    SalesPerson: '张三',
    BlStatus: '待确认',
    SysAuditStatus: '正常',
    ReleaseAuditStatus: '待审核',
    AuditTime: '2023-05-25',
    HoldTime: '',
    HoldReason: '',
    ContractValid: '是',
    Invoiced: '是',
    FullyWrittenOff: '是',
    Overdue: '否',
    OverLimit: '否',
    Remarks: '',
  }
];

const feeAdjustmentFeeItems: FeeAdjustmentFeeItemProps[] = [
  {
    FeeCode: Mock.mock("@id"),
    BusinessId: 'SHSELAX3D00001',
    Consignor: '上海振华国家物流有限公司',
    BookingAgent: '天津宝阳国际货运代理有限公司',
    ShippingCompany: '天津宝阳国际货运代理有限公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'MB123456',
    MblNumber: 'APLU067466753',
    SettlementUnitCode: '1',
    SettlementUnitName: '上海振华国家物流有限公司',
    FeeName: '海运费',
    TransactionType: '应收',
    CurrencyCode: 'CNY',
    Amount: Mock.mock('@float(60, 100, 0, 2)'),
    DomesticForeign: '国内',
    SettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    UnsettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    PayableAmount: Mock.mock('@float(60, 100, 0, 2)'),
    RelatedBlNumber: 'APLU067466753',
    BillType: 'FCL',
    SettlementNumber: '',
  },
  {
    FeeCode: Mock.mock("@id"),
    BusinessId: 'SHSELAX3D00001',
    Consignor: '上海振华国家物流有限公司',
    BookingAgent: '天津宝阳国际货运代理有限公司',
    ShippingCompany: '天津宝阳国际货运代理有限公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'MB123456',
    MblNumber: 'APLU067466753',
    SettlementUnitCode: '2',
    SettlementUnitName: '上海环球贸易有限公司',
    FeeName: '海运费',
    TransactionType: '应收',
    CurrencyCode: 'CNY',
    Amount: Mock.mock('@float(60, 100, 0, 2)'),
    DomesticForeign: '国内',
    SettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    UnsettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    PayableAmount: Mock.mock('@float(60, 100, 0, 2)'),
    RelatedBlNumber: 'APLU067466753',
    BillType: 'FCL',
    SettlementNumber: '',
  },
  {
    FeeCode: Mock.mock("@id"),
    BusinessId: 'SHSELAX3D00001',
    Consignor: '上海振华国家物流有限公司',
    BookingAgent: '天津宝阳国际货运代理有限公司',
    ShippingCompany: '天津宝阳国际货运代理有限公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'MB123456',
    MblNumber: 'APLU067466753',
    SettlementUnitCode: '3',
    SettlementUnitName: 'ABC贸易公司',
    FeeName: '海运费',
    TransactionType: '应收',
    CurrencyCode: 'CNY',
    Amount: Mock.mock('@float(60, 100, 0, 2)'),
    DomesticForeign: '国内',
    SettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    UnsettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    PayableAmount: Mock.mock('@float(60, 100, 0, 2)'),
    RelatedBlNumber: 'APLU067466753',
    BillType: 'FCL',
    SettlementNumber: '',
  },
  {
    FeeCode: Mock.mock("@id"),
    BusinessId: 'SHSELAX3D00001',
    Consignor: '上海振华国家物流有限公司',
    BookingAgent: '天津宝阳国际货运代理有限公司',
    ShippingCompany: '天津宝阳国际货运代理有限公司',
    SailingDate: '2023-05-25',
    VesselVoyage: 'MB123456',
    MblNumber: 'APLU067466753',
    SettlementUnitCode: '4',
    SettlementUnitName: '北京爱迪生机械有限公司',
    FeeName: '海运费',
    TransactionType: '应付',
    CurrencyCode: 'CNY',
    Amount: Mock.mock('@float(60, 100, 0, 2)'),
    DomesticForeign: '国内',
    SettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    UnsettledAmount: Mock.mock('@float(60, 100, 0, 2)'),
    PayableAmount: Mock.mock('@float(60, 100, 0, 2)'),
    RelatedBlNumber: 'APLU067466753',
    BillType: 'FCL',
    SettlementNumber: ''
  }
];


// 获取账单管理台账列表
export const getFeeAdjustmentFeeList = async (): Promise<FeeAdjustmentFeeItemProps[]> => {
  return feeAdjustmentFeeItems;
}

// 获取账单管理台账列表
export const getFeeAdjustmentList = async (): Promise<FeeAdjustmentItemProps[]> => {
  return feeAdjustmentItems;
}

/*
// 获取币制信息
export const getReleaseOrderVerificationList = async (): Promise<ReleaseOrderVerificationItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/release_order_verification"
  })
  const responseData = response?.data as ApiRes<ReleaseOrderVerificationItemProps[]>;
  return responseData.data || [];
}

export const saveReleaseOrderVerification = (data:ReleaseOrderVerificationItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/release_order_verification/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
