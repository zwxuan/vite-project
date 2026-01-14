
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { BasePeriodicBillingItemProps } from "@/types/dynamic_configuration_platform/basic_manage/base_periodic_billing";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: BasePeriodicBillingItemProps) => void, handleDelete: (record: BasePeriodicBillingItemProps) => void): TableColumnsType<BasePeriodicBillingItemProps> => [

    {
        title: i18n.t(LocaleHelper.getBasePeriodicBillingCode()),
        width: 80,
        onHeaderCell: () => ({ style: { width: '80px' } }),
        dataIndex: 'Code',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBasePeriodicBillingEnName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'EnName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBasePeriodicBillingCnName()),
        width: 160,
        onHeaderCell: () => ({ style: { width: '160px' } }),
        dataIndex: 'CnName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBasePeriodicBillingMeaning()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'Meaning',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBasePeriodicBillingScenario()),
        
        dataIndex: 'Scenario',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBasePeriodicBillingAdvantage()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
        dataIndex: 'Advantage',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getBasePeriodicBillingDisadvantage()),
        width: 260,
        onHeaderCell: () => ({ style: { width: '260px' } }),
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
