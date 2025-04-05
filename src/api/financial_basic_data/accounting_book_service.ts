
import request, { ApiRes, requestWithProgress } from '../request'
import { AccountingBookItemProps } from "@/types/accounting_book/accounting_book";

// 获取币制信息
export const getAccountingBookList = async () : Promise<AccountingBookItemProps[]> => {
  const reponse = await request({
    method: "GET",
    url: "/accounting_book"
  });
  const responseData = reponse?.data as ApiRes<AccountingBookItemProps[]>;
  return responseData.data || [];
}

export const saveAccountingBook = (data:AccountingBookItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/accounting_book/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

