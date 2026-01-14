import React, { useState } from 'react';
import { Card, Button, Table, message } from 'antd';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import AdvancedSearchForm from "@/components/search-form";
import { getColumns } from './columns';
import { fields } from './search_fields';
import '@/pages/page_list.less';

const AssignmentRules: React.FC = () => {
    // Mock Data
    const dataSource = [
        { key: '1', ruleName: 'VIP Customer Priority', jobType: 'All', condition: 'Customer Level = VIP', priority: 'High', status: 'ACTIVE' },
        { key: '2', ruleName: 'Customs Team Assignment', jobType: 'Customs', condition: 'Type = Import', priority: 'Medium', status: 'ACTIVE' },
    ];

    const handleEdit = (record: any) => {
        message.info(`Edit rule: ${record.ruleName}`);
    };

    const handleDelete = (record: any) => {
        message.success(`Rule deleted: ${record.ruleName}`);
    };

    const columns = getColumns(handleEdit, handleDelete);

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getAssignmentRulesTitle())}
                        </span>
                    </div>
                </div>
                 <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary">{i18n.t(LocaleHelper.getNewRule())}</Button>
                            <Button>{i18n.t(LocaleHelper.getImport())}</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ padding: '10px' }}>
                <Card bordered={false}>
                    <AdvancedSearchForm fields={fields as any} onSearch={() => {}} />
                    <Table
                        columns={columns as any}
                        dataSource={dataSource}
                        size="small"
                        pagination={{ pageSize: 10 }}
                    />
                </Card>
            </div>
        </div>
    );
};

export default AssignmentRules;
