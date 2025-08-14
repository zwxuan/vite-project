
import { TableColumnsType, Tag, Popconfirm } from 'antd';
import { DataPermissionByRoleItemProps } from "@/types/dynamic_configuration_platform/identity/data_permission_by_role";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';



export const getColumns = (handleEdit: (record: DataPermissionByRoleItemProps) => void, handleDelete: (record: DataPermissionByRoleItemProps) => void): TableColumnsType<DataPermissionByRoleItemProps> => [

    {
        title: i18n.t(LocaleHelper.getDataPermissionByRoleRoleCode()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'RoleCode',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDataPermissionByRoleRoleName()),
        width: 200,
        onHeaderCell: () => ({ style: { width: '200px' } }),
        dataIndex: 'RoleName',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDataPermissionByRoleDataPermission()),
        width: 400,
        onHeaderCell: () => ({ style: { width: '400px' } }),
        dataIndex: 'DataPermission',
        sorter: true,
        align: 'left',
    },
    {
        title: i18n.t(LocaleHelper.getDataPermissionByRoleSpecialDataPermission()),
        dataIndex: 'SpecialDataPermission',
        sorter: true,
        align: 'left',
        render: (text: string) => {
            if (!text) return '-';
            
            // 检查是否包含布尔条件汇总（如 →（① 或 ②）且 ③）
            const booleanSummaryMatch = text.match(/→(.+)$/);
            let mainText = text;
            let booleanSummary = null;
            
            if (booleanSummaryMatch) {
                booleanSummary = booleanSummaryMatch[1].trim();
                mainText = text.replace(/→.+$/, '').trim();
            }
            
            // 解析特殊数据权限文本并美化显示
            const items = mainText.split(/(?=[①②③④⑤⑥⑦⑧⑨⑩])/).filter(item => item.trim());
            
            if (items.length === 0) {
                return text;
            }
            
            return (
                <span style={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                    {items.map((item, index) => {
                        const match = item.match(/^([①②③④⑤⑥⑦⑧⑨⑩])\s*(.+)/);
                        if (!match) return null;
                        
                        const [, number, content] = match;
                        const parts = content.split('：');
                        const entityName = parts[0]?.trim();
                        const conditions = parts[1]?.trim();
                        
                        return (
                            <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                <Tag color="blue"  style={{ fontSize: '11px', margin: 0 }}>
                                    {number}{entityName}:{conditions && (
                                    conditions.split(' AND ').map((condition, condIndex) => (
                                                condition.trim()
                                        ))
                                )}
                                </Tag>
                                
                            </span>
                        );
                    })}
                    {booleanSummary && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px'}}>
                            <Tag 
                                color="volcano" 
                                style={{ 
                                    fontSize: '11px', 
                                    margin: 0, 
                                    fontWeight: 'bold',
                                    border: '1px dashed #ff7875'
                                }}
                            >
                                {booleanSummary}
                            </Tag>
                        </span>
                    )}
                </span>
            );
        },
    },
];
