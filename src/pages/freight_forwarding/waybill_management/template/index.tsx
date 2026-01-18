import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { WaybillTemplateItem, WaybillTemplateListParams } from "@/types/freight_forwarding/waybill_management/template";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const WaybillTemplate: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<WaybillTemplateItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    // Mock data for templates
    const mockTemplates: WaybillTemplateItem[] = [
        { templateId: 'T001', templateName: 'Standard Sea Export', transportMode: 'SEA', templateType: 'BOOKING', createdBy: 'Admin', createdAt: '2024-01-01', status: 'ENABLED', content: {} },
        { templateId: 'T002', templateName: 'Express Air Import', transportMode: 'AIR', templateType: 'ARRIVAL', createdBy: 'User1', createdAt: '2024-02-15', status: 'ENABLED', content: {} },
        { templateId: 'T003', templateName: 'Rail Standard', transportMode: 'RAIL', templateType: 'LOADING', createdBy: 'User2', createdAt: '2024-03-10', status: 'DISABLED', content: {} },
    ];

    useEffect(() => {
        loadData({});
    }, []);

    const loadData = async (params: WaybillTemplateListParams) => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        let filtered = [...mockTemplates];
        if (params.transportMode) filtered = filtered.filter(t => t.transportMode === params.transportMode);
        if (params.templateType) filtered = filtered.filter(t => t.templateType === params.templateType);
        if (params.status) filtered = filtered.filter(t => t.status === params.status);
        
        setData(filtered);
        setTotal(filtered.length);
        setLoading(false);
    };

    const handleSearch = (values: any) => {
        loadData(values);
    };

    const handleEdit = (record: WaybillTemplateItem) => {
        navigate(`/waybill_management/template/detail/${record.templateId}`);
    };

    const handleCopy = (record: WaybillTemplateItem) => {
        message.success(`Copied template: ${record.templateName}`);
        loadData({});
    };

    const handleToggleStatus = (record: WaybillTemplateItem) => {
        const newStatus = record.status === 'ENABLED' ? 'DISABLED' : 'ENABLED';
        message.success(`Status changed to ${newStatus}`);
        // In real app, call API here
        record.status = newStatus; 
        setData([...data]); 
    };

    const handleDelete = (record: WaybillTemplateItem) => {
        Modal.confirm({
            title: i18n.t(LocaleHelper.getWaybillListDelete()),
            content: `Delete template ${record.templateName}?`,
            onOk: () => {
                message.success('Deleted');
                loadData({});
            }
        });
    };

    const columns = getColumns(handleEdit, handleCopy, handleToggleStatus, handleDelete);

    const handleBatchAction = (action: string) => {
        message.success(`Batch ${action} successful`);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getWaybillTemplateTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger onClick={() => navigate('/waybill_management/template/create')}>
                                {i18n.t(LocaleHelper.getWaybillTemplateNewTemplate())}
                            </Button>
                            <Button onClick={() => handleBatchAction('Enable')}>{i18n.t(LocaleHelper.getWaybillTemplateBatchEnable())}</Button>
                            <Button onClick={() => handleBatchAction('Disable')}>{i18n.t(LocaleHelper.getWaybillTemplateBatchDisable())}</Button>
                            <Button onClick={() => handleBatchAction('Export')}>{i18n.t(LocaleHelper.getWaybillTemplateBatchExport())}</Button>
                            <Button onClick={() => handleBatchAction('Delete')}>{i18n.t(LocaleHelper.getWaybillTemplateBatchDelete())}</Button>
                            <Button onClick={() => message.info('Import Template')}>
                                {i18n.t(LocaleHelper.getWaybillTemplateImport())}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

            <div className='nc-bill-table-area'>
                <div style={{ marginBottom: 16 }}>
                    
                </div>
                <Table<WaybillTemplateItem>
                    columns={columns}
                    dataSource={data}
                    rowKey="templateId"
                    size="small"
                    bordered={true}
                    loading={loading}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 380px)' }}
                />
            </div>
        </div>
    );
};
export default WaybillTemplate;
