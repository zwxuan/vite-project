
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space,DatePicker, Tabs } from 'antd';
import { BusinessPartnerItemProps } from "@/types/basic_manage/business_partner";
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import ParterBaseInfo from './tab_detail/base_info_tab';
import Contact from './tab_detail/contact_tab';
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
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
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
                            label: '信用账款',
                            key: 'credit_account',
                            children: '信用账款',
                        },
                        {
                            label: '合同约号',
                            key: 'contract_no',
                            children: '合同约号',
                        },
                        {
                            label: '文件资料',
                            key: 'file',
                            children: '文件资料',
                        },
                        {
                            label: '开票要求',
                            key: 'invoice_require',
                            children: '开票要求',
                        },
                        {
                            label: '换单代理',
                            key: 'change_agent',
                            children: '换单代理',
                        },
                        {
                            label: '舱位承运人',
                            key: 'cargo_carrier',
                            children: '舱位承运人',
                        },
                        {
                            label: '舱位代理',
                            key: 'cargo_agent',
                            children: '舱位代理',
                        },
                        {
                            label: 'EDI配置',
                            key: 'edi_config',
                            children: 'EDI配置',
                        },
                        {
                            label: '拜访客户',
                            key: 'visit_customer',
                            children: '拜访客户',
                        },
                    ]}
                />

            </div>
        </div>
    );
};

export default Detail;
