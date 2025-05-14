
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { EntryGroupingRuleItemProps } from "@/types/basic_manage/entry_grouping_rule/entry_grouping_rule";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: EntryGroupingRuleItemProps) => void, handleDelete: (record: EntryGroupingRuleItemProps) => void): TableColumnsType<EntryGroupingRuleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleEntryId()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EntryId',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleBookName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'BookName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleRuleName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'RuleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleEntryName()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'EntryName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAccountLevel()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountLevel',
        sorter: true,
        align: 'right',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAccountGroup1By()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountGroup1By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAccountGroup2By()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountGroup2By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAccountGroup3By()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountGroup3By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAccountGroup4By()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountGroup4By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAccountGroup5By()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountGroup5By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAccountGroup6By()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'AccountGroup6By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAuxiliaryGroup1By()),
        width: 140,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'AuxiliaryGroup1By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAuxiliaryGroup2By()),
        width: 140,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'AuxiliaryGroup2By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAuxiliaryGroup3By()),
        width: 140,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'AuxiliaryGroup3By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAuxiliaryGroup4By()),
        width: 140,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'AuxiliaryGroup4By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAuxiliaryGroup5By()),
        width: 140,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'AuxiliaryGroup5By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleAuxiliaryGroup6By()),
        width: 140,
        onHeaderCell: () => ({ style: { width: '120px' } }),
        dataIndex: 'AuxiliaryGroup6By',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleCreatedAt()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'CreatedAt',
        sorter: true,
        align: 'center',
    },
    {
        title: i18n.t(LocaleHelper.getEntryGroupingRuleUpdatedAt()),
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        dataIndex: 'UpdatedAt',
        sorter: true,
        align: 'center',
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
