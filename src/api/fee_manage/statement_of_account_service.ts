
import request, { requestWithProgress } from '../request'
import { StatementOfAccountItemProps } from "@/types/statement_of_account/statement_of_account";

// 获取币制信息
export const getStatementOfAccountList = () => {
  return request({
    method: "GET",
    url: "/statement_of_account"
  })
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

