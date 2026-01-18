import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ServiceSelection } from './components/ServiceSelection';
import { CustomerInfo } from './components/CustomerInfo';
import { CargoInfo } from './components/CargoInfo';
import { TransportConfig } from './components/TransportConfig';
import { StandaloneConfig } from './components/StandaloneConfig';
import { FinancialInfo } from './components/FinancialInfo';
import { Remarks } from './components/Remarks';
import CustomIcon from "@/components/custom-icon";
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const OrderDetail: React.FC = () => {
    const navigate = useNavigate();
    const [serviceCategory, setServiceCategory] = useState<'comprehensive' | 'standalone'>('comprehensive');

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                 <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getOrderDetailTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button>{i18n.t(LocaleHelper.getOrderDetailSave())}</Button>
                                <Button>{i18n.t(LocaleHelper.getOrderDetailPreview())}</Button>
                                <Button type="primary">{i18n.t(LocaleHelper.getOrderDetailSubmit())}</Button>
                                <Button onClick={handleBack}>{i18n.t(LocaleHelper.getOrderDetailCancel())}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='nc-bill-table-area' style={{ padding: '20px' }}>
                <ServiceSelection 
                    serviceCategory={serviceCategory} 
                    setServiceCategory={setServiceCategory} 
                />
                
                {serviceCategory === 'comprehensive' && <TransportConfig />}
                {serviceCategory === 'standalone' && <StandaloneConfig />}

                <CustomerInfo />
                <CargoInfo />
                
                {/* Placeholder for Detailed Standalone Service Configs if implemented fully dynamic */}
                {/* e.g. <CustomsDetail />, <WarehouseDetail /> based on selection in StandaloneConfig */}

                {/* Placeholder for Service Combination Config */}
                
                <FinancialInfo />
                <Remarks />
            </div>
        </div>
    );
};

export default OrderDetail;
