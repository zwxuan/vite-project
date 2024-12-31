//excel_service.ts
import request from '../request'
 
export const getExportLogList = () => {
  return request({
    method: 'GET',
    url: '/excel/export_log/list'
  })
}

export const getImportLogList = () => {
  return request({
    method: 'GET',
    url: '/excel/import_log/list'
  })
}