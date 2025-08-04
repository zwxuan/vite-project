
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { VoucherGroupingRuleItemProps } from "@/types/dynamic_configuration_platform/basic_manage/voucher_grouping_rule";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: VoucherGroupingRuleItemProps) => void, handleDelete: (record: VoucherGroupingRuleItemProps) => void): TableColumnsType<VoucherGroupingRuleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getVoucherGroupingRuleRuleCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RuleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherGroupingRuleBookCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherGroupingRuleRuleName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RuleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherGroupingRuleBookkeepingMethod()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookkeepingMethod',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getVoucherGroupingRuleGroupBy()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'GroupBy',
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

