
import request, { ApiRes, requestWithProgress } from '../request'
import { StatementOfAccountItemProps } from "@/types/statement_of_account/statement_of_account";

// 获取币制信息
export const getStatementOfAccountList = async () : Promise<StatementOfAccountItemProps[]> => {
  const reponse = await request({
    method: "GET",
    url: "/statement_of_account"
  });
  const responseData = reponse?.data as ApiRes<StatementOfAccountItemProps[]>;
  return responseData.data || [];
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

