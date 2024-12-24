//currency_service.ts
import request from '../request'
 
// 获取币制信息
export const getCurrencyList = () => {
  return request({
    method: 'GET',
    url: '/currency'
  })
}
// 获取模板信息
export const getImportTemplateList = () => {
  return request({
    method: 'GET',
    url: '/excel/import_template/list'
  })
}