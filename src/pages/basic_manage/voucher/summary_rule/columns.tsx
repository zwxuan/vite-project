
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { SummaryRuleItemProps } from "@/types/basic_manage/summary_rule";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: SummaryRuleItemProps) => void, handleDelete: (record: SummaryRuleItemProps) => void): TableColumnsType<SummaryRuleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getSummaryRuleSummaryRuleCode()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'SummaryRuleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSummaryRuleBookName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSummaryRuleRuleName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RuleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSummaryRuleEntryName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EntryName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getSummaryRuleGroupBy()),
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

