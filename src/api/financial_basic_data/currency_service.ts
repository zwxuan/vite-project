//currency_service.ts
import { ImportTemplateFieldItem, ImportTemplateItem } from '@/types/excel/import_template';
import request, { ApiRes, requestWithProgress } from '../request'
import { CurrencyItemProps } from "@/types/currency/currency"

// 获取币制信息
export const getCurrencyList = async () : Promise<CurrencyItemProps[]> => {
  const response = await request({
    method: "GET",
    url: "/currency"
  });
  const responseData = response?.data as ApiRes<CurrencyItemProps[]>;
  return responseData.data || [];
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
export const getImportTemplateList = async () : Promise<ImportTemplateItem[]> => {
  const response = await request({
    method: 'GET',
    url: '/excel/import_template/list'
  });
  const responseData = response?.data as ApiRes<ImportTemplateItem[]>;
  return responseData.data || [];
}

export const getTemplateFieldList = async () : Promise<ImportTemplateFieldItem[]> => {
  const response = await request({
    method: 'GET',
    url: '/excel/template_field/list'
  });
  const responseData = response?.data as ApiRes<ImportTemplateFieldItem[]>;
  return responseData.data || [];
}