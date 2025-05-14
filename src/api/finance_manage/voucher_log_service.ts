
import request, {ApiRes,requestWithProgress } from '../request'
import { VoucherLogItemProps } from "@/types/finance_manage/voucher_log/voucher_log";
import Mock from "mockjs";
//
const voucherLogItems:VoucherLogItemProps[] = [
    {
        "VoucherSerialNo":"PZ20250500861",
        "VoucherNo":"0901-2025.04-C-2",
        "VoucherType":"税务核销",
        "VoucherDebitCreditTotal":"0901-0002:借7727.85 贷7727.85",
        "VoucherStatus":"已发送",
        "VoucherDate":"2025-05-07",
        "VoucherStatus2":"已发送",
        "CounterpartyVoucherNo":"0901-2025.04-C-2",
        "DebitAmount":7727.85,
        "CreditAmount":7727.85,
        "SendStatus":"True",
        "DeleteStatus":"False",
        "Creator":"新加坡财务",
        "CreateDate":"2025-05-07 18:31:24.883000",
        "Sender":"新加坡财务",
        "SendDate":"2025-05-07 18:31:28"
    },
    {
        "VoucherSerialNo":"PZ20250500862",
        "VoucherNo":"0901-2025.04-C-2",
        "VoucherType":"核销单",
        "VoucherDebitCreditTotal":"0901-0002:借7727.85 贷7727.85",
        "VoucherStatus":"未发送",
        "VoucherDate":"2025-05-07",
        "VoucherStatus2":"未发送",
        "CounterpartyVoucherNo":"0901-2025.04-C-2",
        "DebitAmount":7727.85,
        "CreditAmount":7727.85,
        "SendStatus":"False",
        "DeleteStatus":"False",
        "Creator":"新加坡财务",
        "CreateDate":"2025-05-07 18:34:54.993000",
        "Sender":"新加坡财务",
        "SendDate":"2025-05-07 18:31:28"
    },
    {
        "VoucherSerialNo":"PZ20250500863",
        "VoucherNo":"0901-2025.04-C-3",
        "VoucherType":"税务核销",
        "VoucherDebitCreditTotal":"0901-0002:借1409.55 贷1409.55",
        "VoucherStatus":"已发送",
        "VoucherDate":"2025-05-07",
        "VoucherStatus2":"已发送",
        "CounterpartyVoucherNo":"0901-2025.04-C-3",
        "DebitAmount":1409.55,
        "CreditAmount":1409.55,
        "SendStatus":"True",
        "DeleteStatus":"False",
        "Creator":"新加坡财务",
        "CreateDate":"2025-05-07 18:34:54.500000",
        "Sender":"新加坡财务",
        "SendDate":"2025-05-07 18:34:55"
    },
    {
        "VoucherSerialNo":"PZ20250500864",
        "VoucherNo":"0901-2025.04-C-3",
        "VoucherType":"核销单",
        "VoucherDebitCreditTotal":"0901-0002:借1409.55 贷1409.55",
        "VoucherStatus":"未发送",
        "VoucherDate":"2025-05-07",
        "VoucherStatus2":"未发送",
        "CounterpartyVoucherNo":"0901-2025.04-C-3",
        "DebitAmount":1409.55,
        "CreditAmount":1409.55,
        "SendStatus":"False",
        "DeleteStatus":"False",
        "Creator":"集团财务",
        "CreateDate":"2025-05-07 19:48:09.460000",
        "Sender":"新加坡财务",
        "SendDate":"2025-05-07 18:34:55"
    },
    {
        "VoucherSerialNo":"PZ20250500865",
        "VoucherNo":"22-2025.04-C-8",
        "VoucherType":"税务核销",
        "VoucherDebitCreditTotal":"22-0001:借49351.84 贷49351.84",
        "VoucherStatus":"已发送",
        "VoucherDate":"2025-05-07",
        "VoucherStatus2":"已发送",
        "CounterpartyVoucherNo":"22-2025.04-C-8",
        "DebitAmount":49351.84,
        "CreditAmount":49351.84,
        "SendStatus":"True",
        "DeleteStatus":"False",
        "Creator":"集团财务",
        "CreateDate":"2025-05-07 19:48:11.083000",
        "Sender":"集团财务",
        "SendDate":"2025-05-07 19:48:12"
    },
];


// 获取账单管理台账列表
export const getVoucherLogList = async (): Promise<VoucherLogItemProps[]> => {
  return voucherLogItems;
}

// 保存账单管理
export const saveVoucherLog = async (data: VoucherLogItemProps, onUploadProgress?: (progress: number) => void): Promise<VoucherLogItemProps> => {
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
export const getVoucherLogList = async (): Promise<VoucherLogItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/voucher_log"
  })
  const responseData = response?.data as ApiRes<VoucherLogItemProps[]>;
  return responseData.data || [];
}

export const saveVoucherLog = (data:VoucherLogItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/voucher_log/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}
*/
