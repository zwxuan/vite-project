import React, { useState, useMemo, useEffect } from 'react';
import { Form, Input, Select, Button, Row, Col, message, Divider, Radio, Tooltip, Table, Modal } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { generateChecklist, getPreEntryList } from '@/api/customs_compliance/supporting_documents_management/checklist_service';
import { PreEntryItem } from '@/types/customs_compliance/supporting_documents_management/checklist';
import { useNavigate } from 'react-router-dom';
import { getColumns, DocOption } from './columns';
import '@/pages/page_list.less';
const ChecklistGeneration: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    // Modal states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [preEntryList, setPreEntryList] = useState<PreEntryItem[]>([]);
    const [modalLoading, setModalLoading] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    // Document Data Definition
    const docData: DocOption[] = useMemo(() => [
        // Basic Docs
        { key: 'invoice', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupBasicDocs()), categoryKey: 'requiredDocs', name: '商业发票', required: true, desc: '正本' },
        { key: 'packing', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupBasicDocs()), categoryKey: 'requiredDocs', name: '装箱单', required: true, desc: '正本' },
        { key: 'contract', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupBasicDocs()), categoryKey: 'requiredDocs', name: '合同', required: true, desc: '复印件' },
        { key: 'bl', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupBasicDocs()), categoryKey: 'requiredDocs', name: '提单', required: true, desc: '正本/电放' },
        { key: 'insurance', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupBasicDocs()), categoryKey: 'requiredDocs', name: '保险单', required: false, desc: 'CIF条款必需' },
        { key: 'weight', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupBasicDocs()), categoryKey: 'requiredDocs', name: '重量单', required: false, desc: '' },
        
        // License Docs
        { key: 'import_license', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupLicense()), categoryKey: 'licenseDocs', name: '进口许可证', required: false, desc: '监管代码: 1' },
        { key: 'quota', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupLicense()), categoryKey: 'licenseDocs', name: '配额证', required: false, desc: '' },
        { key: 'me', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupLicense()), categoryKey: 'licenseDocs', name: '机电证', required: false, desc: '监管代码: O' },
        { key: 'auto', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupLicense()), categoryKey: 'licenseDocs', name: '自动许可证', required: false, desc: '监管代码: 7' },

        // Inspection Docs
        { key: 'entry_clearance', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupInspection()), categoryKey: 'inspectionDocs', name: '入境货物通关单', required: true, desc: '监管代码: A' },
        { key: 'import_inspection', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupInspection()), categoryKey: 'inspectionDocs', name: '进口商品检验', required: true, desc: '监管代码: M' },
        { key: 'health', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupInspection()), categoryKey: 'inspectionDocs', name: '卫生证书', required: false, desc: '' },
        { key: 'phytosanitary', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupInspection()), categoryKey: 'inspectionDocs', name: '植检证书', required: false, desc: '' },

        // Origin Docs
        { key: 'general_origin', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupOrigin()), categoryKey: 'originDocs', name: '一般原产地证', required: false, desc: 'CO' },
        { key: 'china_us', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupOrigin()), categoryKey: 'originDocs', name: '中美原产地证', required: false, desc: '' },
        { key: 'china_eu', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupOrigin()), categoryKey: 'originDocs', name: '中欧原产地证', required: false, desc: '' },

        // Special Docs
        { key: '3c', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupSpecial()), categoryKey: 'specialDocs', name: '3C认证证书', required: false, desc: '强指' },
        { key: 'energy', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupSpecial()), categoryKey: 'specialDocs', name: '能效标识', required: false, desc: '' },
        { key: 'dangerous', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupSpecial()), categoryKey: 'specialDocs', name: '危险品证书', required: false, desc: 'MSDS' },
        { key: 'drug', category: i18n.t(LocaleHelper.getCcsdmChecklistGenerationGroupSpecial()), categoryKey: 'specialDocs', name: '药品注册证', required: false, desc: '' },
    ], []);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([
        'invoice', 'packing', 'contract', 'bl', 'insurance', 
        'import_license', 
        'entry_clearance', 'import_inspection', 
        'general_origin', 
        '3c'
    ]);

    const fetchPreEntryList = async () => {
        setModalLoading(true);
        try {
            const res = await getPreEntryList(searchKeyword);
            if (res.success) {
                setPreEntryList(res.data);
            }
        } finally {
            setModalLoading(false);
        }
    };

    useEffect(() => {
        if (isModalVisible) {
            fetchPreEntryList();
        }
    }, [isModalVisible, searchKeyword]);

    const handlePreEntrySelect = (record: PreEntryItem) => {
        form.setFieldsValue({
            preEntryNo: record.preEntryNo,
            businessType: record.businessType,
            tradeMode: record.tradeMode,
            levyNature: record.levyNature,
            transportMode: record.transportMode,
            originCountry: record.originCountry,
            destinationCountry: record.destinationCountry,
            goodsName: record.goodsName,
            hsCode: record.hsCode,
            supervisionCondition: record.supervisionCondition,
            inspection: record.inspection
        });
        setIsModalVisible(false);
        message.success('已自动填充单证数据');
    };

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            // Map selected keys back to specific arrays
            const payload = {
                ...values,
                requiredDocs: selectedRowKeys.filter(k => docData.find(d => d.key === k)?.categoryKey === 'requiredDocs'),
                licenseDocs: selectedRowKeys.filter(k => docData.find(d => d.key === k)?.categoryKey === 'licenseDocs'),
                inspectionDocs: selectedRowKeys.filter(k => docData.find(d => d.key === k)?.categoryKey === 'inspectionDocs'),
                originDocs: selectedRowKeys.filter(k => docData.find(d => d.key === k)?.categoryKey === 'originDocs'),
                specialDocs: selectedRowKeys.filter(k => docData.find(d => d.key === k)?.categoryKey === 'specialDocs'),
            };

            const res = await generateChecklist(payload);
            if (res.success) {
                message.success(res.message);
                navigate('/supporting_documents_management/document_workbench');
            }
        } catch (error) {
            message.error('Failed to generate checklist');
        } finally {
            setLoading(false);
        }
    };

    const columns = getColumns();

    const preEntryColumns = [
        { title: '预录入号', dataIndex: 'preEntryNo', key: 'preEntryNo' },
        { title: '商品名称', dataIndex: 'goodsName', key: 'goodsName' },
        { title: '业务类型', dataIndex: 'businessType', key: 'businessType', render: (t: string) => t === 'import' ? '进口' : (t === 'export' ? '出口' : '转关') },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className='nc-bill-header-area'>
                <div className='header-title-search-area'>
                    <div className='BillHeadInfoWrap BillHeadInfoWrap-showBackBtn'>
                        <span className='bill-info-title' style={{ display: 'flex', alignItems: 'center' }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                            {i18n.t(LocaleHelper.getCcsdmChecklistGenerationPageTitle())}
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}>
                                                <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                                                    <b>说明</b>
                                                </span>
                                                <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                                                    <li><b>角色：</b>关务操作员、单证专员</li>
                                                    <li><b>数据来源：</b>预录入单证数据、业务系统录入</li>
                                                    <li><b>功能：</b>根据业务类型和商品信息，智能生成所需的随附单证清单。</li>
                                                </ul>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'
                            >
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
                        </span>
                    </div>
                </div>
                <div className='header-button-area'>
                    <span className='button-app-wrapper'></span>
                    <div className='buttonGroup-component'>
                        {/* Actions moved to bottom bar for better UX */}
                    </div>
                </div>
            </div>

            <div className='nc-bill-form-area' style={{ padding: '0 24px 60px 24px' }}>
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
                    businessType: 'import',
                    tradeMode: 'general',
                    transportMode: 'sea',
                    levyNature: 'general_tax',
                    originCountry: 'US',
                    destinationCountry: 'CN',
                    goodsName: '电子测量设备',
                    hsCode: '902830',
                    supervisionCondition: 'A（入境货物通关单）',
                    inspection: 'M（进口商品检验）'
                }}>
                    
                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item name="preEntryNo" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldPreEntryNo())}>
                                <Input.Search 
                                    readOnly 
                                    enterButton="选择预录入" 
                                    onSearch={() => setIsModalVisible(true)} 
                                    onClick={() => setIsModalVisible(true)}
                                    placeholder="请选择预录入单证" 
                                />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="businessType" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldBusinessType())}>
                                <Radio.Group buttonStyle="solid" style={{ width: '100%' }}>
                                    <Radio.Button value="import" style={{ width: '33%', textAlign: 'center' }}>进口</Radio.Button>
                                    <Radio.Button value="export" style={{ width: '33%', textAlign: 'center' }}>出口</Radio.Button>
                                    <Radio.Button value="transit" style={{ width: '33%', textAlign: 'center' }}>转关</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="tradeMode" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldTradeMode())}>
                                <Select options={[{ label: '一般贸易', value: 'general' }, { label: '进料加工', value: 'processing' }]} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="levyNature" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldLevyNature())}>
                                <Select options={[{ label: '一般征税', value: 'general_tax' }, { label: '免税', value: 'exemption' }]} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="transportMode" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldTransportMode())}>
                                <Select options={[{ label: '海运', value: 'sea' }, { label: '空运', value: 'air' }]} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                             <Form.Item name="originCountry" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldOrigin())}>
                                <Select options={[{ label: '美国', value: 'US' }, { label: '德国', value: 'DE' }, { label: '日本', value: 'JP' }, { label: '中国', value: 'CN' }]} showSearch />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                             <Form.Item name="destinationCountry" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldDestination())}>
                                <Select options={[{ label: '中国', value: 'CN' }, { label: '德国', value: 'DE' }]} showSearch />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={24}>
                        <Col span={6}>
                            <Form.Item name="goodsName" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldGoodsName())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="hsCode" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldHsCode())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="supervisionCondition" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldSupervision())}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item name="inspection" label={i18n.t(LocaleHelper.getCcsdmChecklistGenerationFieldInspection())}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Divider dashed style={{ margin: '12px 0' }} />
                    
                    <Table 
                        dataSource={docData} 
                        columns={columns as any[]} 
                        rowKey="key"
                        size="small"
                        pagination={false}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: (keys) => setSelectedRowKeys(keys)
                        }}
                        scroll={{ y: 400 }}
                        bordered
                    />

                </Form>
            </div>

            {/* Sticky Footer for Actions & Summary */}
            <div style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                width: '100%',
                backgroundColor: '#fff',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 24px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1890ff', marginRight: '8px' }}>
                        {i18n.t(LocaleHelper.getCcsdmChecklistGenerationSectionSummary())}
                    </span>
                    <span style={{ color: '#666' }}>
                        {i18n.t(LocaleHelper.getCcsdmChecklistGenerationSummaryText())} {selectedRowKeys.length} 项
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                     <Button onClick={() => message.info('模板已保存')}>{i18n.t(LocaleHelper.getCcsdmChecklistGenerationBtnSave())}</Button>
                    <Button type="primary" danger onClick={() => form.submit()} loading={loading}>
                        {i18n.t(LocaleHelper.getCcsdmChecklistGenerationBtnGenerate())}
                    </Button>
                </div>
            </div>

            <Modal
                title="选择预录入单证"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={800}
            >
                <div style={{ marginBottom: 16 }}>
                    <Input.Search 
                        placeholder="请输入预录入号或商品名称" 
                        onSearch={(val) => setSearchKeyword(val)} 
                        enterButton 
                    />
                </div>
                <Table
                    columns={preEntryColumns}
                    dataSource={preEntryList}
                    loading={modalLoading}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: () => handlePreEntrySelect(record),
                        style: { cursor: 'pointer' }
                    })}
                />
            </Modal>
        </div>
    );
};

export default ChecklistGeneration;
