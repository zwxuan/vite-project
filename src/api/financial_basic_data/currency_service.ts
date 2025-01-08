//currency_service.ts
import request, { requestWithProgress } from '../request'
import { CurrencyItemProps } from "@/types/currency/currency"

// 获取币制信息
export const getCurrencyList = () => {
  return request({
    method: "GET",
    url: "/currency"
  })
}

export const saveCurrency = (data:CurrencyItemProps,onUploadProgress: (progress: number) => void) => {
  return requestWithProgress({
    method: 'POST',
    url: "/currency/save",
    data:data,
    onUploadProgress: (progress) => {
        onUploadProgress(progress);
    }
  })
}

// 获取模板信息
export const getImportTemplateList = () => {
  return request({
    method: 'GET',
    url: '/excel/import_template/list'
  })
}

export const getTemplateFieldList = () => {
  return request({
    method: 'GET',
    url: '/excel/template_field/list'
  })
}