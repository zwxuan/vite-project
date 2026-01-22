import React, { useEffect, useState } from 'react';
import { Card, Button, Form, message, Tabs, Tag, Descriptions, Dropdown, MenuProps } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import { getWaybillDetail, saveWaybill } from "@/api/freight_forwarding/waybill_management/waybill_service";
import '@/pages/page_list.less';
import dayjs from 'dayjs';

import Overview from './components/Overview';
import BasicInfo from './components/BasicInfo';
import Parties from './components/Parties';
import Cargo from './components/Cargo';
import Transport from './components/Transport';
import Milestones from './components/Milestones';
import Fees from './components/Fees';
import Docs from './components/Docs';
import Exceptions from './components/Exceptions';
import Logs from './components/Logs';

const WaybillCreate: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const isReadonly = searchParams.get('readonly') === 'true';
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        if (id) {
            loadData(id);
        }
    }, [id]);

    const loadData = async (waybillId: string) => {
        setLoading(true);
        try {
            const res = await getWaybillDetail(waybillId);
            if (res.success && res.data) {
                const data = res.data;
                form.setFieldsValue({
                    ...data,
                    etd: data.etd ? dayjs(data.etd) : null,
                    eta: data.eta ? dayjs(data.eta) : null,
                    ...(data as any).isDangerous !== undefined && { isDangerous: (data as any).isDangerous ? 'yes' : 'no' }
                });
            }
        } catch (error) {
            console.error(error);
            message.error('Load failed');
        }
        setLoading(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const res = await saveWaybill(values);
            if (res.success) {
                message.success(i18n.t(LocaleHelper.getWaybillCreateSavedSuccess()));
                navigate('/waybill_management/list');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        message.success(i18n.t(LocaleHelper.getWaybillCreateSubmittedSuccess()));
    };

    const handleAction = (action: string) => {
        message.info(`Action triggered: ${action}`);
    };

    // 定义菜单项
    const menuItems: MenuProps['items'] = [
        {
            key: 'copy',
            label: <div style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => handleAction('Copy')}>{i18n.t(LocaleHelper.getWaybillTemplateCopy())}</div>,
        },
        {
            key: 'archive',
            label: <div style={{ padding: '4px 8px', cursor: 'pointer' }} onClick={() => handleAction('Archive')}>{i18n.t(LocaleHelper.getWaybillArchiveDoArchive())}</div>,
        },
        {
            key: 'void',
            label: <div style={{ padding: '4px 8px', cursor: 'pointer', color: 'red' }} onClick={() => handleAction('Void')}>{i18n.t(LocaleHelper.getWaybillListDelete())}</div>,
        },
    ];

    const items = [
        { key: '1', label: i18n.t(LocaleHelper.getWaybillCreateTabOverview()), children: <Overview /> },
        { key: '2', label: i18n.t(LocaleHelper.getWaybillCreateTabBasic()), children: <BasicInfo /> },
        { key: '3', label: i18n.t(LocaleHelper.getWaybillCreateTabParties()), children: <Parties /> },
        { key: '4', label: i18n.t(LocaleHelper.getWaybillCreateTabCargo()), children: <Cargo /> },
        { key: '5', label: i18n.t(LocaleHelper.getWaybillCreateTabTransport()), children: <Transport /> },
        { key: '6', label: i18n.t(LocaleHelper.getWaybillCreateTabNodes()), children: <Milestones /> },
        { key: '7', label: i18n.t(LocaleHelper.getWaybillCreateTabFees()), children: <Fees /> },
        { key: '8', label: i18n.t(LocaleHelper.getWaybillCreateTabDocs()), children: <Docs /> },
        { key: '9', label: i18n.t(LocaleHelper.getWaybillCreateTabExceptions()), children: <Exceptions /> },
        { key: '10', label: i18n.t(LocaleHelper.getWaybillCreateTabLogs()), children: <Logs /> },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            {i18n.t(LocaleHelper.getWaybillCreateTitle())}: {id || 'WAY-001'}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                {!isReadonly && (
                                    <>
                                        <Button onClick={() => handleAction('Edit')}>{i18n.t(LocaleHelper.getWaybillCreateEdit())}</Button>
                                        <Button onClick={handleSubmit}>{i18n.t(LocaleHelper.getWaybillCreateAudit())}</Button>
                                        <Button type="primary" onClick={handleSave} loading={loading}>{i18n.t(LocaleHelper.getWaybillCreateSave())}</Button>
                                        <Button onClick={() => handleAction('Confirm')}>{i18n.t(LocaleHelper.getWaybillCreateConfirm())}</Button>
                                        <Button onClick={() => handleAction('Sync')}>{i18n.t(LocaleHelper.getWaybillCreateSyncStatus())}</Button>
                                        <Button onClick={() => handleAction('Doc')}>{i18n.t(LocaleHelper.getWaybillCreateGenerateDoc())}</Button>
                                        <Button onClick={() => handleAction('Print')}>{i18n.t(LocaleHelper.getWaybillCreatePrint())}</Button>
                                        <Dropdown menu={{ items: menuItems }}>
                                            <Button>
                                                {i18n.t(LocaleHelper.getWaybillCreateMore())} <DownOutlined />
                                            </Button>
                                        </Dropdown>
                                    </>
                                )}
                                <Button onClick={() => navigate('/waybill_management/list')}>
                                    {i18n.t(LocaleHelper.getWaybillCreateBackToList())}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='nc-bill-table-area'>
                <div style={{ padding: '16px 20px 0 20px' }}>
                    <div style={{ background: '#f5f5f5', padding: '16px', marginBottom: '16px', borderRadius: '4px' }}>
                        <Descriptions size="small" column={4}>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListStatus())}>
                                <Tag color="blue">ISSUED</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListTransportMode())}>
                                <Tag color="cyan">SEA</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateCustomer())}>ABC Trading Co.</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateBusinessType())}>FCL</Descriptions.Item>
                            
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListWaybillNo())}>{id || 'WAY-001'}</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListOrderNo())}>ORD-2024001</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListJobNo())}>JOB-2024001</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillListCarrier())}>COSCO</Descriptions.Item>
                            
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateMbl())}>MBL123456</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateHbl())}>HBL123456</Descriptions.Item>
                            <Descriptions.Item label={i18n.t(LocaleHelper.getWaybillCreateTrackingNo())}>TRK-001</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>

                <Form form={form} layout="vertical" disabled={isReadonly}>
                    <Tabs activeKey={activeTab} onChange={setActiveTab} items={items} />
                </Form>
            </div>
        </div>
    );
};

export default WaybillCreate;