
import { TableColumnsType, Tag, Popconfirm, Input, Select, Button, InputNumber } from 'antd';
import { CodeMappingItemProps } from "@/types/dynamic_configuration_platform/basic_manage/code_mapping";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
export const getColumns = (handleEdit: (record: CodeMappingItemProps) => void, handleDelete: (record: CodeMappingItemProps) => void, handleSave: (record: CodeMappingItemProps) => void, handleCancel: () => void, isEditing: (record: CodeMappingItemProps) => boolean, editingRow: CodeMappingItemProps | null, setEditingRow: (row: CodeMappingItemProps | null) => void): TableColumnsType<CodeMappingItemProps> => [
    {
        title: i18n.t(LocaleHelper.getCodeMappingBookingName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'BookingName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getCodeMappingBusinessName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'BusinessName',
        sorter: true,
        align: 'left',
        render: (text: string, record: CodeMappingItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Select
                    value={editingRow?.BusinessCode}
                    style={{ width: '100%', textAlign: 'left' }}
                    onChange={value => setEditingRow({ ...editingRow!, BusinessCode: value })}
                    options={[
                        { value: '00001', label: '客户1' },
                        { value: '00002', label: '客户2' }
                    ]}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getCodeMappingFinanceCode()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'FinanceCode',
        sorter: true,
        align: 'left',
        render: (text: boolean, record: CodeMappingItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.FinanceCode}
                    onChange={e => setEditingRow({ ...editingRow!, FinanceCode: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: i18n.t(LocaleHelper.getCodeMappingRemark()),
        dataIndex: 'Remark',
        sorter: true,
        align: 'left',
        render: (text: string, record: CodeMappingItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <Input
                    value={editingRow?.Remark}
                    onChange={e => setEditingRow({ ...editingRow!, Remark: e.target.value })}
                />
            ) : (
                text
            );
        }
    },
    {
        title: '操作',
        dataIndex: 'operation',
        fixed: 'right',
        width: 80,
        render: (_: any, record: CodeMappingItemProps) => {
            const editable = isEditing(record);
            return editable ? (
                <>
                    <a onClick={() => handleSave(editingRow!)}>保存</a>
                    <a onClick={handleCancel}>取消</a>
                </>
            ) : (
                <>
                    <a onClick={() => handleEdit(record)}>编辑</a>
                    <Popconfirm title="确定删除?" onConfirm={() => handleDelete(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </>
            );
        },
    },
];

