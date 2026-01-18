import '@/pages/page_list.less';
import React from 'react';
import { Card, Row, Col, Statistic, Rate, List } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';

const ServicePerformance: React.FC = () => {
    // Mock Data for Service Stats
    const serviceStats = [
        { title: i18n.t(LocaleHelper.getStandaloneServiceCustomsClearance()), value: '156 Orders', income: '436,800 USD', time: '2.8 Days' },
        { title: i18n.t(LocaleHelper.getStandaloneServiceWarehousing()), value: '89 Orders', income: '267,000 USD', time: '15 Days' },
        { title: i18n.t(LocaleHelper.getStandaloneServiceDocumentation()), value: '234 Orders', income: '117,000 USD', time: '1.5 Days' },
        { title: i18n.t(LocaleHelper.getStandaloneServiceInsurance()), value: '178 Orders', income: '53,400 USD', time: '0.5 Days' },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getServicePerformanceTitle())}
                        </span>
                    </div>
                </div>
                <div className="header-button-area">
                    <span className="u-button">
                        <RedoOutlined className='iconfont' />
                    </span>
                </div>
            </div>
            
            <AdvancedSearchForm fields={fields} onSearch={() => {}} />
            
            <div style={{ padding: '0 20px 20px 20px' }}>
                <Card title={i18n.t(LocaleHelper.getServicePerformanceServiceTypeStats())} style={{ marginBottom: 20 }}>
                    <List
                        grid={{ gutter: 16, column: 4 }}
                        dataSource={serviceStats}
                        renderItem={item => (
                            <List.Item>
                                <Card title={item.title}>
                                    <p>{item.value}</p>
                                    <p>{i18n.t(LocaleHelper.getServicePerformanceTotalIncome())}: {item.income}</p>
                                    <p>{i18n.t(LocaleHelper.getServicePerformanceAvgDuration())}: {item.time}</p>
                                </Card>
                            </List.Item>
                        )}
                    />
                    <div style={{ marginTop: 20, textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                        Total: 702 Orders | Total Income: 1,099,200 USD | Avg Unit Price: 1,566 USD
                    </div>
                </Card>

                <Card title={i18n.t(LocaleHelper.getServicePerformanceCustomerSatisfaction())}>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic title="Overall Satisfaction" value={4.2} suffix="/ 5.0" />
                            <Rate disabled defaultValue={4.2} allowHalf />
                        </Col>
                        <Col span={6}>
                            <Statistic title={i18n.t(LocaleHelper.getServicePerformanceResponseTimeliness())} value={4.8} suffix="/ 5.0" />
                            <Rate disabled defaultValue={4.8} allowHalf />
                        </Col>
                        <Col span={6}>
                            <Statistic title={i18n.t(LocaleHelper.getServicePerformanceServiceQuality())} value={4.1} suffix="/ 5.0" />
                            <Rate disabled defaultValue={4.1} allowHalf />
                        </Col>
                        <Col span={6}>
                            <Statistic title={i18n.t(LocaleHelper.getServicePerformancePriceReasonableness())} value={3.8} suffix="/ 5.0" />
                            <Rate disabled defaultValue={3.8} allowHalf />
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    );
};

export default ServicePerformance;
