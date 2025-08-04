
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker, Tabs } from 'antd';
import { BusinessPartnerItemProps } from "@/types/dynamic_configuration_platform/basic_manage/business_partner";
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import ParterBaseInfo from './tab_detail/base_info_tab';
import Contact from './tab_detail/contact_tab';
import ParterCustomer from './tab_detail/customer_tab';
import CreditAccount from './tab_detail/credit_account_tab';
import Contracts from './tab_detail/contracts_tab';
import ParterDocument from './tab_detail/document';
import InvoiceRequirement from './tab_detail/invoice_requirement';
import DeliveryAgent from './tab_detail/delivery_agent';
import SpaceCarrier from './tab_detail/space_carrier';
import EdiConfig from './tab_detail/edi_config';
import VisitCustomer from './tab_detail/visit_customer';
import CustomIcon from '@/components/custom-icon';
import KPIScoreReport from './tab_detail/kpi_source/partner_kpi_score';
interface DetailModalProps {
    open: boolean;
    modalFlag: 'add' | 'edit';
    saving: boolean;
    formData: Partial<BusinessPartnerItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDateChange: (name: string, value: string | Array<string>) => void;
    onNumberChange: (name:string,value: number | null) => void;
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const Detail: React.FC = () => {
    //获取路由参数
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const businessId = searchParams.get('businessId');
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 40px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 详细信息
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" >保存</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <Tabs
                    items={[
                        {
                            label: '基本信息',
                            key: 'base_business',
                            children: <ParterBaseInfo  />,
                        },
                        {
                            label: '联系人',
                            key: 'contact',
                            children: <Contact />,
                        },
                        {
                            label: '客户',
                            key: 'customer',
                            children: <ParterCustomer />,
                        },
                        {
                            label: '信用账款',
                            key: 'credit_account',
                            children: <CreditAccount />,
                        },
                        {
                            label: '合同约号',
                            key: 'contract_no',
                            children: <Contracts />,
                        },
                        {
                            label: '文件资料',
                            key: 'file',
                            children: <ParterDocument />,
                        },
                        {
                            label: '开票要求',
                            key: 'invoice_require',
                            children: <InvoiceRequirement />,
                        },
                        {
                            label: '换单代理',
                            key: 'delivery_agent',
                            children: <DeliveryAgent />,
                        },
                        {
                            label: '舱位承运人',
                            key: 'space_carrier',
                            children: <SpaceCarrier />,
                        },
                        {
                            label: 'EDI配置',
                            key: 'edi_config',
                            children: <EdiConfig />,
                        },
                        {
                            label: '拜访客户',
                            key: 'visit_customer',
                            children: <VisitCustomer />,
                        },
                        {
                            label: 'KPI打分',
                            key: 'kpi_score',
                            children: <KPIScoreReport />,
                        },

                    ]}
                />

            </div>
        </div>
    );
};

export default Detail;
