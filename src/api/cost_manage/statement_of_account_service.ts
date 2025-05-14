
import request, { ApiRes, requestWithProgress } from '../request'
import { StatementOfAccountItemProps } from "@/types/cost_manage/statement_of_account/statement_of_account";

const statementOfAccountItems: StatementOfAccountItemProps[] = [
  {
    "StatementNumber": "SH20080001D",
    "SettlementObject": "上海大洋行有限公司",
    "CounterpartyStatementNumber": "",
    "Creator": "解寅琨",
    "StatementType": "国内账单",
    "InvoiceTitle": "上海大洋行有限公司",
    "TransactionType": "应收",
    "ConfirmationStatus": "未确认",
    "InvoicingStatus": "全部开票",
    "StatementWriteoffStatus": "全部核销",
    "Currency": "USD",
    "Amount": 9034.96,
    "WrittenOffAmount": 9034.96,
    "InvoicingInfo": "上海大洋行有限公司,2020-09-11",
    "Remarks": "",
    "CurrencyTotal": 8000.00,
    "ConfirmationTime": "",
    "ConfirmationPerson": "",
    "BusinessReferenceNumber": "",
    "Carrier": "高丽海运株式会社",
    "PickupDeliveryLocation": "SHANGHAI",
    "ActualPickupTime": "",
    "ParentCompany": ""
  }
];
// 获取币制信息
export const getStatementOfAccountList = async () : Promise<StatementOfAccountItemProps[]> => {
  // const reponse = await request({
  //   method: "GET",
  //   url: "/statement_of_account"
  // });
  // const responseData = reponse?.data as ApiRes<StatementOfAccountItemProps[]>;
  // return responseData.data || [];
  return statementOfAccountItems;
}

export const saveStatementOfAccount = (data:StatementOfAccountItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/statement_of_account/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

