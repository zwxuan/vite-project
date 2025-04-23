
import request, { ApiRes, requestWithProgress } from '../request'
import { HasOffSettingItemProps, OffSettingDetailItemProps } from "@/types/has_off_setting/has_off_setting";

const hasOffSettingItems:HasOffSettingItemProps[] = [
  {
    "Writeoffserialnumber": "SHP25030001",
    "Settlementobject": "澳大利亚航空公司",
    "Businessnumber": "SE2011011",
    "Settlementagent": "",
    "Counterparty": "",
    "Ourbank": "",
    "Paymentnoticenumber": "",
    "Vouchernumber": "",
    "Bankslipnumber": "",
    "Writeoffperson": "周文轩",
    "Writeoffdate": "2025-03-18",
    "Receiptpaymentdate": "2025-03-18",
    "Paymenttype": "应付",
    "Slipstatus": "未使用",
    "Receiptpaymentmethod": "银行转账",
    "Isprepaid": "否",
    "Currency": "RMB",
    "Amount": 21,
    "Writtenoffamount": 21,
    "Balance": 0,
    "Actualreceivedamount": 0,
    "Actualpaidamount": 21,
    "Financialcharges": 0,
    "Exchangegainloss": 0,
    "Shortchange": 0,
    "Originalcurrencydifference": 0,
    "Creator": "周文轩",
    "Reviewer": "未复核",
    "Reviewdate": "",
    "Iscancelled": "",
    "Invoiceinformation": "2025-03-04",
    "Remarks": "",
    "Accountperiod": 0,
    "Voucherdate": "",
    "Reviewername": "",
    "Billsettlementtype": "",
    "Prereceiptpaymentremarks": "",
    "Receiptpaymentvouchernumber": ""
  },
  {
    "Writeoffserialnumber": "SHP25020002",
    "Settlementobject": "上海四海仓库",
    "Businessnumber": "AFS2007004",
    "Settlementagent": "",
    "Counterparty": "上海四海仓库",
    "Ourbank": "",
    "Paymentnoticenumber": "FK25020001",
    "Vouchernumber": "",
    "Bankslipnumber": "",
    "Writeoffperson": "周文轩",
    "Writeoffdate": "2025-02-21",
    "Receiptpaymentdate": "2025-02-21",
    "Paymenttype": "应付",
    "Slipstatus": "未使用",
    "Receiptpaymentmethod": "银行转账",
    "Isprepaid": "否",
    "Currency": "RMB",
    "Amount": 800,
    "Writtenoffamount": 800,
    "Balance": 0,
    "Actualreceivedamount": 0,
    "Actualpaidamount": 800,
    "Financialcharges": 0,
    "Exchangegainloss": 0,
    "Shortchange": 0,
    "Originalcurrencydifference": 0,
    "Creator": "周文轩",
    "Reviewer": "未复核",
    "Reviewdate": "",
    "Iscancelled": "",
    "Invoiceinformation": "1111,上海四海仓库,2025-02-21",
    "Remarks": "",
    "Accountperiod": 60,
    "Voucherdate": "",
    "Reviewername": "",
    "Billsettlementtype": "",
    "Prereceiptpaymentremarks": "",
    "Receiptpaymentvouchernumber": ""
  },
  {
    "Writeoffserialnumber": "SHP25020001",
    "Settlementobject": "上海麟泽国际物流有限公司",
    "Businessnumber": "AFS2007004",
    "Settlementagent": "",
    "Counterparty": "上海四海仓库",
    "Ourbank": "",
    "Paymentnoticenumber": "FK25020001",
    "Vouchernumber": "",
    "Bankslipnumber": "",
    "Writeoffperson": "周文轩",
    "Writeoffdate": "2025-02-21",
    "Receiptpaymentdate": "2025-02-21",
    "Paymenttype": "应付",
    "Slipstatus": "未使用",
    "Receiptpaymentmethod": "银行转账",
    "Isprepaid": "否",
    "Currency": "USD",
    "Amount": 5000,
    "Writtenoffamount": 5000,
    "Balance": 0,
    "Actualreceivedamount": 0,
    "Actualpaidamount": 5000,
    "Financialcharges": 0,
    "Exchangegainloss": 0,
    "Shortchange": 0,
    "Originalcurrencydifference": 0,
    "Creator": "周文轩",
    "Reviewer": "未复核",
    "Reviewdate": "",
    "Iscancelled": "",
    "Invoiceinformation": "1111,上海四海仓库,2025-02-21",
    "Remarks": "",
    "Accountperiod": 0,
    "Voucherdate": "",
    "Reviewername": "",
    "Billsettlementtype": "",
    "Prereceiptpaymentremarks": "",
    "Receiptpaymentvouchernumber": ""
  }
];
// 获取币制信息
export const getHasOffSettingList = async () : Promise<HasOffSettingItemProps[]> => {
  // const response = await request({
  //   method: "GET",
  //   url: "/has_off_setting"
  // });
  // const responseData = response?.data as ApiRes<HasOffSettingItemProps[]>;
  // return responseData.data || [];
  return hasOffSettingItems;
}

export const getHasOffDetailList = async () : Promise<OffSettingDetailItemProps[]> => {
  // const response = await request({
  //   method: "GET",
  //   url: "/has_off_setting"
  // });
  // const responseData = response?.data as ApiRes<OffSettingDetailItemProps[]>;
  // return responseData.data || [];
  return [];
}

export const saveHasOffSetting = (data:HasOffSettingItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/has_off_setting/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

