import { TableColumnsType } from 'antd';
import i18n from '@/i18n';
import { BatchOperationLocale } from '@/utils/locale/customs_compliance/customs_job_management/batch_operation';

export interface ImportResult {
    id: string;
    fileName: string;
    fileSize: string;
    status: 'success' | 'fail';
    successCount: number;
    failCount: number;
    errorMessage?: string;
    importTime: string;
}

export const getColumns = (): TableColumnsType<ImportResult> => [
    {
        title: i18n.t(BatchOperationLocale.getBatchOperationFileName()),
        dataIndex: 'fileName',
        key: 'fileName',
        width: 200,
    },
    {
        title: i18n.t(BatchOperationLocale.getBatchOperationFileSize()),
        dataIndex: 'fileSize',
        key: 'fileSize',
        width: 100,
    },
    {
        title: i18n.t(BatchOperationLocale.getBatchOperationStatus()),
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: string) => (
            <span style={{ color: status === 'success' ? '#52c41a' : '#ff4d4f' }}>
                {status === 'success' ? i18n.t(BatchOperationLocale.getBatchOperationImportSuccess()) : i18n.t(BatchOperationLocale.getBatchOperationImportFail())}
            </span>
        ),
    },
    {
        title: i18n.t(BatchOperationLocale.getBatchOperationSuccessCount()),
        dataIndex: 'successCount',
        key: 'successCount',
        width: 100,
    },
    {
        title: i18n.t(BatchOperationLocale.getBatchOperationFailCount()),
        dataIndex: 'failCount',
        key: 'failCount',
        width: 100,
    },
    {
        title: i18n.t(BatchOperationLocale.getBatchOperationErrorMessage()),
        dataIndex: 'errorMessage',
        key: 'errorMessage',
        ellipsis: true,
    },
];
