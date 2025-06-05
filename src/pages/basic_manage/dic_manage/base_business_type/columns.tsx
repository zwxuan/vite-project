
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BaseBusinessTypeItemProps } from "@/types/basic_manage/base_business_type";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BaseBusinessTypeItemProps) => void, handleDelete: (record: BaseBusinessTypeItemProps) => void): TableColumnsType<BaseBusinessTypeItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBaseBusinessTypeBusinessTypeCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessTypeCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBusinessTypeBusinessTypeName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessTypeName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBusinessTypeBusinessTypeMeaning()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BusinessTypeMeaning',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBusinessTypeApplicableScenario()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'ApplicableScenario',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBusinessTypeAdvantage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Advantage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBaseBusinessTypeDisadvantage()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'Disadvantage',
        sorter: true,
        align: 'left',
    },
    {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (_, record) => (
        <>
            <a>启用</a>
            <a onClick={()=>handleEdit(record)}>编辑</a>
            <Popconfirm title="确定要删除吗?" cancelText="取消" okText="确定" onConfirm={() => handleDelete(record)}>
                <a>删除</a>
            </Popconfirm>
        </>
        ),
    },
]; 
