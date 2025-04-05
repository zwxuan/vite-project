//excel_service.ts
import { ExportLogItem } from '@/types/excel/export_template';
import request, { ApiRes } from '../request'
import { ImportLogItem } from '@/types/excel/import_template';
 
export const getExportLogList = async () : Promise<ExportLogItem[]> => {
  const reponse = await request({
    method: 'GET',
    url: '/excel/export_log/list'
  });
  const responseData = reponse?.data as ApiRes<ExportLogItem[]>;
  return responseData.data || [];
}

export const getImportLogList = async () : Promise<ImportLogItem[]> => {
  const reponse = await request({
    method: 'GET',
    url: '/excel/import_log/list'
  });
  const responseData = reponse?.data as ApiRes<ImportLogItem[]>;
  return responseData.data || [];
}