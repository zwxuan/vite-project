import React, { useState } from 'react';
import { Table, Button, Space, Tag, Card, Row, Col, Divider, List } from 'antd';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import '@/pages/page_list.less';

const ServiceTemplate: React.FC = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [dataSource] = useState([
        { key: '1', templateId: 'TPL-01', name: '标准进口套餐', services: '报关+仓储+保险', scenario: '进口贸易', usageCount: 156, status: '启用' },
        { key: '2', templateId: 'TPL-02', name: '出口全程服务', services: '报关+单证+保险', scenario: '出口贸易', usageCount: 89, status: '启用' },
        { key: '3', templateId: 'TPL-03', name: '仓储增值服务', services: '仓储+分拣+包装', scenario: '电商物流', usageCount: 234, status: '启用' },
    ]);

    const handleSearch = (values: any) => {
        console.log('Search', values);
    };

    const columns = [
        { title: '模板ID', dataIndex: 'templateId', key: 'templateId' },
        { title: '模板名称', dataIndex: 'name', key: 'name' },
        { title: '包含服务', dataIndex: 'services', key: 'services' },
        { title: '适用场景', dataIndex: 'scenario', key: 'scenario' },
        { title: '使用次数', dataIndex: 'usageCount', key: 'usageCount' },
        {
            title: '操作',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a style={{ color: '#1890ff' }} onClick={() => setSelectedTemplate(record)}>[详情]</a>
                    <a style={{ color: '#1890ff' }}>[编辑]</a>
                    <a style={{ color: '#1890ff' }}>[复制]</a>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            <span>订单管理 {'>'} 服务组合模板</span>
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div className="buttonGroup-component">
                        <div className="u-button-group">
                            <Button type="primary" danger>新建模板</Button>
                            <Button>批量操作</Button>
                            <Button>导出</Button>
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearchForm fields={fields as any} onSearch={handleSearch} />

            <div style={{ padding: '0 10px' }}>
                <div className='nc-bill-table-area'>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        size="small"
                        bordered
                    />
                </div>

                {selectedTemplate && selectedTemplate.templateId === 'TPL-01' && (
                    <Card size="small" title="📋 模板详情（标准进口套餐）" style={{ marginTop: '20px' }}>
                        <Row gutter={[24, 12]}>
                            <Col span={8}>模板名称：标准进口套餐</Col>
                            <Col span={8}>状态：<Tag color="green">启用</Tag></Col>
                            <Col span={8}></Col>
                            <Col span={8}>适用场景：进口贸易</Col>
                            <Col span={8}>推荐客户：一般客户</Col>
                            <Col span={8}>优惠等级：标准</Col>
                        </Row>
                        <Divider orientation="left">包含服务</Divider>
                        <List
                            size="small"
                            bordered
                            dataSource={[
                                '1. 进口报关服务    基础费用：3,000 USD  时效：3工作日',
                                '2. 保税仓储服务    费用：150 USD/天     免费期：7天',
                                '3. 货物运输险      费率：0.3%          最低保费：200 USD'
                            ]}
                            renderItem={item => <List.Item>{item}</List.Item>}
                        />
                        <div style={{ marginTop: '10px' }}>
                            <div>套餐优惠：总费用9.5折  VIP客户9折</div>
                            <div>服务承诺：[√] 全程跟踪 [√] 异常预警 [√] 专人服务</div>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ServiceTemplate;
