
import request, { requestWithProgress } from '../request'
import { AccountingBookItemProps } from "@/types/accounting_book/accounting_book";

// 获取币制信息
export const getAccountingBookList = () => {
  return request({
    method: "GET",
    url: "/accounting_book"
  })
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

