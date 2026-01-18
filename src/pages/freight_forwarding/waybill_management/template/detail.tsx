import React, { useState } from 'react';
import { Button, Card, Form, Input, Select, Tabs, Table, Switch, Timeline, Tag, message, Row, Col, Divider, Descriptions, List, Space, InputNumber, Radio, Menu } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { WaybillTemplateItem } from "@/types/freight_forwarding/waybill_management/template";
import { PlusOutlined, DeleteOutlined, SettingOutlined, PrinterOutlined, FileSearchOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { Option } = Select;

const WaybillTemplateDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEdit = !!id;
    const [form] = Form.useForm();
    const [validationRules, setValidationRules] = useState([
        { key: '1', ruleName: 'Weight Check', trigger: 'Save', condition: 'Weight > 0', expression: 'weight > 0', level: 'Error', errorMessage: 'Weight must be positive' },
        { key: '2', ruleName: 'Container Check', trigger: 'Submit', condition: 'Container No Pattern', expression: 'regex(containerNo)', level: 'Warning', errorMessage: 'Invalid Container No' },
    ]);
    const [permissions, setPermissions] = useState([
        { key: '1', role: 'Manager', user: 'All', permission: 'Read/Write' },
        { key: '2', role: 'Operator', user: 'User A', permission: 'Read Only' },
    ]);
    const [selectedFieldGroup, setSelectedFieldGroup] = useState('basic');

    // Mock Data for Fields Config
    const mockFieldsConfig = [
        { key: '1', fieldName: 'Shipper', fieldKey: 'shipper', type: 'Text', mandatory: true, visible: true, editable: true, defaultValue: '', source: 'Manual' },
        { key: '2', fieldName: 'Consignee', fieldKey: 'consignee', type: 'Text', mandatory: true, visible: true, editable: true, defaultValue: '', source: 'Master Data' },
        { key: '3', fieldName: 'Notify Party', fieldKey: 'notify', type: 'Text', mandatory: false, visible: true, editable: true, defaultValue: 'Same as Consignee', source: 'Formula' },
        { key: '4', fieldName: 'Place of Receipt', fieldKey: 'por', type: 'Select', mandatory: true, visible: true, editable: true, defaultValue: 'Shanghai', source: 'API' },
    ];

    // Mock Data for Print Mapping
    const mockPrintMapping = [
        { key: '1', fieldName: 'Shipper', placeholder: '${shipper}' },
        { key: '2', fieldName: 'Consignee', placeholder: '${consignee}' },
        { key: '3', fieldName: 'Gross Weight', placeholder: '${gross_weight}' },
    ];

    // Mock Data for Change Log
    const mockChangeLog = [
        { key: '1', time: '2024-01-01 10:00', action: 'Created', user: 'Admin', version: 'v1.0', details: 'Initial creation' },
        { key: '2', time: '2024-01-02 14:30', action: 'Updated', user: 'User1', version: 'v1.1', details: 'Updated field config' },
    ];

    const handleSave = () => {
        form.validateFields().then(() => {
            message.success(i18n.t(LocaleHelper.getWaybillTemplateSave()) + ' Success');
            navigate('/waybill_management/template/list');
        });
    };

    const handleCancel = () => {
        navigate(-1);
    };

    const handleAddValidationRule = () => {
        setValidationRules([...validationRules, { key: Date.now().toString(), ruleName: '', trigger: 'Save', condition: '', expression: '', level: 'Error', errorMessage: '' }]);
    };

    const handleDeleteValidationRule = (key: string) => {
        setValidationRules(validationRules.filter(item => item.key !== key));
    };

    const handleAddPermission = () => {
        setPermissions([...permissions, { key: Date.now().toString(), role: '', user: '', permission: 'Read Only' }]);
    };

    const handleDeletePermission = (key: string) => {
        setPermissions(permissions.filter(item => item.key !== key));
    };

    const columnsFields = [
        { title: i18n.t(LocaleHelper.getWaybillTemplateFieldName()), dataIndex: 'fieldName', key: 'fieldName' },
        { title: i18n.t(LocaleHelper.getWaybillTemplateFieldKey()), dataIndex: 'fieldKey', key: 'fieldKey' },
        { title: i18n.t(LocaleHelper.getWaybillTemplateFieldType()), dataIndex: 'type', key: 'type' },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateFieldMandatory()), 
            dataIndex: 'mandatory', 
            key: 'mandatory',
            render: (val: boolean) => <Switch checked={val} size="small" />
        },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateFieldVisible()), 
            dataIndex: 'visible', 
            key: 'visible',
            render: (val: boolean) => <Switch checked={val} size="small" />
        },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateFieldEditable()), 
            dataIndex: 'editable', 
            key: 'editable',
            render: (val: boolean) => <Switch checked={val} size="small" />
        },
        { title: i18n.t(LocaleHelper.getWaybillTemplateFieldDefault()), dataIndex: 'defaultValue', key: 'defaultValue', render: (text: string) => <Input defaultValue={text} size="small" /> },
        { title: i18n.t(LocaleHelper.getWaybillTemplateFieldSource()), dataIndex: 'source', key: 'source' },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateAction()), 
            key: 'action', 
            render: () => <Button type="link" size="small" icon={<SettingOutlined />} />
        },
    ];

    const columnsValidation = [
        { title: i18n.t(LocaleHelper.getWaybillTemplateRuleName()), dataIndex: 'ruleName', key: 'ruleName', render: (text: string) => <Input defaultValue={text} /> },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateTriggerTiming()), 
            dataIndex: 'trigger', 
            key: 'trigger',
            render: (text: string) => (
                <Select defaultValue={text || 'Save'} style={{ width: 100 }}>
                    <Option value="Save">Save</Option>
                    <Option value="Submit">Submit</Option>
                </Select>
            )
        },
        { title: i18n.t(LocaleHelper.getWaybillTemplateCondition()), dataIndex: 'condition', key: 'condition', render: (text: string) => <Input defaultValue={text} /> },
        { title: i18n.t(LocaleHelper.getWaybillTemplateExpression()), dataIndex: 'expression', key: 'expression', render: (text: string) => <Input defaultValue={text} /> },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateLevel()), 
            dataIndex: 'level', 
            key: 'level',
            render: (text: string) => (
                <Select defaultValue={text || 'Error'} style={{ width: 100 }}>
                    <Option value="Error">Error</Option>
                    <Option value="Warning">Warning</Option>
                    <Option value="Info">Info</Option>
                </Select>
            )
        },
        { title: i18n.t(LocaleHelper.getWaybillTemplateErrorMessage()), dataIndex: 'errorMessage', key: 'errorMessage', render: (text: string) => <Input defaultValue={text} /> },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateAction()), 
            key: 'action', 
            render: (_: any, record: any) => <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeleteValidationRule(record.key)} />
        },
    ];

    const columnsPrintMapping = [
        { title: i18n.t(LocaleHelper.getWaybillTemplateFieldName()), dataIndex: 'fieldName', key: 'fieldName' },
        { title: 'Placeholder', dataIndex: 'placeholder', key: 'placeholder', render: (text: string) => <Input defaultValue={text} /> },
    ];

    const columnsPermissions = [
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateRole()), 
            dataIndex: 'role', 
            key: 'role',
            render: (text: string) => (
                <Select defaultValue={text || 'Manager'} style={{ width: 120 }}>
                    <Option value="Manager">Manager</Option>
                    <Option value="Operator">Operator</Option>
                    <Option value="Sales">Sales</Option>
                </Select>
            )
        },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateUser()), 
            dataIndex: 'user', 
            key: 'user',
            render: (text: string) => (
                <Select defaultValue={text || 'All'} style={{ width: 150 }}>
                    <Option value="All">All Users</Option>
                    <Option value="User A">User A</Option>
                    <Option value="User B">User B</Option>
                </Select>
            )
        },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateTabPermissions()), 
            dataIndex: 'permission', 
            key: 'permission',
            render: (text: string) => (
                <Select defaultValue={text || 'Read Only'} style={{ width: 120 }}>
                    <Option value="Read/Write">{i18n.t(LocaleHelper.getWaybillTemplatePermissionWrite())}</Option>
                    <Option value="Read Only">{i18n.t(LocaleHelper.getWaybillTemplatePermissionRead())}</Option>
                    <Option value="Hidden">{i18n.t(LocaleHelper.getWaybillTemplatePermissionHidden())}</Option>
                </Select>
            )
        },
        { 
            title: i18n.t(LocaleHelper.getWaybillTemplateAction()), 
            key: 'action', 
            render: (_: any, record: any) => <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDeletePermission(record.key)} />
        },
    ];

    const columnsChangeLog = [
        { title: i18n.t(LocaleHelper.getWaybillTemplateTime()), dataIndex: 'time', key: 'time' },
        { title: i18n.t(LocaleHelper.getWaybillTemplateRole()), dataIndex: 'user', key: 'user' }, // Assuming user column for now
        { title: i18n.t(LocaleHelper.getWaybillTemplateAction()), dataIndex: 'action', key: 'action' },
        { title: i18n.t(LocaleHelper.getWaybillTemplateVersion()), dataIndex: 'version', key: 'version' },
        { title: 'Detail', dataIndex: 'details', key: 'details' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            {i18n.t(LocaleHelper.getWaybillTemplateDetail())}: 海运标准模板 (SEA_STD)
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" onClick={handleSave}>{i18n.t(LocaleHelper.getWaybillTemplateSave())}</Button>
                                <Button>{i18n.t(LocaleHelper.getWaybillTemplateCreateVersion())}</Button>
                                <Button>{i18n.t(LocaleHelper.getWaybillTemplateEnable())}/{i18n.t(LocaleHelper.getWaybillTemplateDisable())}</Button>
                                <Button>{i18n.t(LocaleHelper.getWaybillTemplateCopy())}</Button>
                                <Button>预览录入页</Button>
                                <Button>预览打印</Button>
                                <Button>导出模板包</Button>
                                <Button>更多 <CustomIcon type="icon-Down" /></Button>
                                <Button onClick={handleCancel}>{i18n.t(LocaleHelper.getWaybillTemplateBack())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='nc-bill-table-area'>
                <div style={{ padding: '16px 20px 0 20px' }}>
                    <div style={{ background: '#f5f5f5', padding: '16px', marginBottom: '16px', borderRadius: '4px' }}>
                        <Descriptions size="small" column={4}>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateStatus())}>
                                <Tag color="green">{i18n.t(LocaleHelper.getWaybillTemplateActive())}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateVersion())}>v12</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateTransportMode())}>海运</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateTemplateType())}>标准模板</Descriptions.Item>
                            
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateCreatedBy())}>张三</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateUpdatedAt())}>2024-03-15 17:20</Descriptions.Item>
                            <Descriptions.Item label="修改人">李四</Descriptions.Item>
                            <Descriptions.Item label="最近修改">2024-03-18 09:10</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>

                <Tabs defaultActiveKey="1" items={[
                    {
                        label: i18n.t(LocaleHelper.getWaybillTemplateTabBasic()),
                        key: '1',
                        children: (
                            <Form form={form} layout="vertical" initialValues={{ templateType: 'BOOKING', transportMode: 'SEA', status: 'ENABLED' }} style={{ padding: '0 20px' }}>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateTemplateName())} name="templateName" rules={[{ required: true }]}>
                                            <Input placeholder={i18n.t(LocaleHelper.getWaybillTemplateEnterName())} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateTemplateCode())} name="templateCode" rules={[{ required: true }]}>
                                            <Input placeholder="Enter template code" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateTransportMode())} name="transportMode">
                                            <Select>
                                                <Option value="SEA">Sea</Option>
                                                <Option value="AIR">Air</Option>
                                                <Option value="RAIL">Rail</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateTemplateType())} name="templateType">
                                            <Select>
                                                <Option value="BOOKING">Booking</Option>
                                                <Option value="ARRIVAL">Arrival Notice</Option>
                                                <Option value="LOADING">Loading List</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="币种默认" name="currency">
                                            <Select defaultValue="USD">
                                                <Option value="USD">USD</Option>
                                                <Option value="CNY">CNY</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="时区" name="timezone">
                                            <Select defaultValue="UTC+8">
                                                <Option value="UTC+8">UTC+8</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateDescription())} name="description">
                                            <Input.TextArea rows={4} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item label="是否内置" name="isBuiltin" valuePropName="checked">
                                            <Switch disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="是否默认" name="isDefault" valuePropName="checked">
                                            <Switch />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    },
                    
                    {
                        label: i18n.t(LocaleHelper.getWaybillTemplateTabRules()),
                        key: '2',
                        children: (
                            <Form layout="vertical" style={{ padding: '0 20px' }}>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplatePriority())} name="priority">
                                            <InputNumber style={{ width: '100%' }} defaultValue={10} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateMatchStrategy())} name="strategy">
                                            <Select defaultValue="Exact">
                                                <Option value="Exact">Exact Match</Option>
                                                <Option value="Fuzzy">Fuzzy Match</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateMutexGroup())} name="mutexGroup">
                                            <Input placeholder="Enter mutex group" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider orientation="left">Condition Group A (AND)</Divider>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateCustomer())}>
                                            <Select mode="multiple" placeholder="Select Customers" defaultValue={['All']}>
                                                <Option value="All">All Customers</Option>
                                                <Option value="CUST001">Customer A</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateCargoType())}>
                                            <Select placeholder="Select Cargo Type" defaultValue="General">
                                                <Option value="General">General Cargo</Option>
                                                <Option value="Dangerous">Dangerous Goods</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider orientation="left">Condition Group B (AND)</Divider>
                                <Row gutter={24}>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateOrigin())}>
                                            <Select showSearch placeholder="Select Origin" defaultValue="CNSHA">
                                                <Option value="CNSHA">Shanghai</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label={i18n.t(LocaleHelper.getWaybillCreateDestination())}>
                                            <Select showSearch placeholder="Select Destination" defaultValue="USLAX">
                                                <Option value="USLAX">Los Angeles</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        )
                    },

                    {
                        label: i18n.t(LocaleHelper.getWaybillTemplateTabFields()),
                        key: '3',
                        children: (
                            <Row gutter={24} style={{ padding: '0 20px' }}>
                                <Col span={4} style={{ borderRight: '1px solid #f0f0f0' }}>
                                    <Menu 
                                        mode="inline" 
                                        selectedKeys={[selectedFieldGroup]} 
                                        onClick={({ key }) => setSelectedFieldGroup(key)}
                                        style={{ borderRight: 0 }}
                                    >
                                        <Menu.Item key="basic">{i18n.t(LocaleHelper.getWaybillTemplateTabBasic())}</Menu.Item>
                                        <Menu.Item key="parties">Parties</Menu.Item>
                                        <Menu.Item key="cargo">Cargo</Menu.Item>
                                        <Menu.Item key="transport">Transport</Menu.Item>
                                    </Menu>
                                </Col>
                                <Col span={20}>
                                    <Table dataSource={mockFieldsConfig} columns={columnsFields} pagination={false} size="small" scroll={{ x: 'max-content' }} />
                                </Col>
                            </Row>
                        )
                    },

                    {
                        label: i18n.t(LocaleHelper.getWaybillTemplateTabValidation()),
                        key: '4',
                        children: (
                            <div style={{ padding: '0 20px' }}>
                                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddValidationRule}>
                                        {i18n.t(LocaleHelper.getWaybillTemplateAddRule())}
                                    </Button>
                                </div>
                                <Table dataSource={validationRules} columns={columnsValidation} pagination={false} size="small" scroll={{ x: 'max-content' }} />
                            </div>
                        )
                    },

                    {
                        label: i18n.t(LocaleHelper.getWaybillTemplateTabPrint()),
                        key: '5',
                        children: (
                            <Row gutter={24} style={{ padding: '0 20px' }}>
                                <Col span={8}>
                                    <Card title="Settings" size="small">
                                        <Form layout="vertical">
                                            <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplatePaperSize())}>
                                                <Select defaultValue="A4">
                                                    <Option value="A4">A4</Option>
                                                    <Option value="Letter">Letter</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateOrientation())}>
                                                <Radio.Group defaultValue="Portrait">
                                                    <Radio value="Portrait">Portrait</Radio>
                                                    <Radio value="Landscape">Landscape</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                            <Form.Item label={i18n.t(LocaleHelper.getWaybillTemplateLanguage())}>
                                                <Select defaultValue="Bilingual">
                                                    <Option value="En">English</Option>
                                                    <Option value="Zh">Chinese</Option>
                                                    <Option value="Bilingual">Bilingual</Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item label="File">
                                                    <Button icon={<FileSearchOutlined />}>{i18n.t(LocaleHelper.getWaybillTemplateUploadBtn())}</Button>
                                            </Form.Item>
                                        </Form>
                                    </Card>
                                </Col>
                                <Col span={16}>
                                    <Card title="Field Mapping" size="small">
                                        <Table dataSource={mockPrintMapping} columns={columnsPrintMapping} pagination={false} size="small" />
                                    </Card>
                                </Col>
                            </Row>
                        )
                    },

                    {
                        label: i18n.t(LocaleHelper.getWaybillTemplateTabPermissions()),
                        key: '6',
                        children: (
                            <div style={{ padding: '0 20px' }}>
                                <Card title={i18n.t(LocaleHelper.getWaybillTemplateVersionInfo())} size="small" style={{ marginBottom: 16 }} extra={<Button type="primary" size="small">{i18n.t(LocaleHelper.getWaybillTemplateCreateVersion())}</Button>}>
                                    <Descriptions column={2} size="small">
                                        <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateCurrentVersion())}>v1.0</Descriptions.Item>
                                        <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateStatus())}><Tag color="green">Active</Tag></Descriptions.Item>
                                        <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateApprovalNeeded())}>
                                            <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked />
                                        </Descriptions.Item>
                                        <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillTemplateApprover())}>Manager A</Descriptions.Item>
                                    </Descriptions>
                                </Card>
                                <div style={{ marginBottom: 16, textAlign: 'right' }}>
                                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPermission}>
                                        {i18n.t(LocaleHelper.getWaybillTemplateAddPermission())}
                                    </Button>
                                </div>
                                <Table dataSource={permissions} columns={columnsPermissions} pagination={false} size="small" scroll={{ x: 'max-content' }} />
                            </div>
                        )
                    },

                    {
                        label: i18n.t(LocaleHelper.getWaybillTemplateTabChangeLog()),
                        key: '7',
                        children: (
                            <div style={{ padding: '0 20px' }}>
                                <Table dataSource={mockChangeLog} columns={columnsChangeLog} pagination={false} size="small" scroll={{ x: 'max-content' }} />
                            </div>
                        )
                    }
                ]} />
            </div>
        </div>
    );
};

export default WaybillTemplateDetail;