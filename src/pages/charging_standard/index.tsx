import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Row, Col, Select, Input, DatePicker,Button } from 'antd';
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import FeeTab from './fee_tab';
import { Space } from 'antd/lib';
import './charging_standard.less'

const { RangePicker } = DatePicker;
const items = [
    {
        label: `费用明细`,
        key: 'fee_tab',
        children: <FeeTab />,
    },
];
const ChargingStandard: React.FC = () => {
    const [value, setValue] = useState([]);
    return (
        <>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 计费标准
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{marginLeft: "10px"}}>
                        <div style={{display: "inline"}}>
                            <label className="u-checkbox nc-checkbox">
                                
                            </label>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{display: "flex"}}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger>保存</Button>
                            </div>
                        </div> 
                        <div className="buttonGroup-component" style={{marginLeft: "10px"}}>
                            <div className="u-button-group"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="nc-bill-search-area" style={{ paddingTop: '10px' }}>
                <div className="search-area-contant">
                    <div className="item-charging-container">
                        <Row gutter={24}>
                            <Col span={6}>
                                <Space>
                                    <label>业务类型</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "海运出口" },
                                        { "value": "2", "label": "海运进口" },
                                        { "value": "3", "label": "空运出口" },
                                        { "value": "4", "label": "空运进口" },
                                        { "value": "5", "label": "铁路出口" },
                                        { "value": "6", "label": "铁路进口" },
                                        { "value": "7", "label": "FBA海运" },
                                        { "value": "8", "label": "FBA空运" },
                                        { "value": "9", "label": "FBA铁路" },
                                        { "value": "10", "label": "综合物流" }
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>拼箱类型</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "一主多分" },
                                        { "value": "2", "label": "一主一分" },
                                        { "value": "3", "label": "直单" },
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>货物类型</label>
                                    <Select style={{ width: '260px' }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "普货" },
                                            { "value": "2", "label": "危险品" },
                                            { "value": "3", "label": "托盘" },
                                            { "value": "4", "label": "挂衣箱" },
                                            { "value": "5", "label": "大件货" },
                                            { "value": "6", "label": "温控货物" }
                                        ]}
                                    />
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>有效日期</label>
                                    <RangePicker style={{ width: '260px' }} />
                                </Space>

                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Space>
                                    <label>方案名称</label>
                                    <Input style={{ width: '160px' }}></Input>
                                </Space>
                            </Col>

                            <Col span={6}>
                                <Space>
                                    <label>方案说明</label>
                                    <Input style={{ width: '320px' }}></Input>
                                </Space>
                            </Col>
                            <Col span={12}>
                                <Space>
                                    <label>部门</label>
                                    <Select
                                        mode="multiple"
                                        maxTagCount={3}
                                        value={value}
                                        style={{ width: '660px' }}
                                        onChange={setValue}
                                        placeholder="Please select"
                                        options={[
                                            { value: "1", label: "单证部" },
                                            { value: "2", label: "结算部" },
                                            { value: "3", label: "财务部" },
                                            { value: "4", label: "拼箱部" },
                                            { value: "5", label: "海运事业部/北美航线" },
                                            { value: "6", label: "空运事业部/西安分公司/航线部" },
                                        ]}
                                    />
                                </Space>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Space>
                                    <label>起运港</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "海运出口" },
                                        { "value": "2", "label": "海运进口" },
                                        { "value": "3", "label": "空运出口" },
                                        { "value": "4", "label": "空运进口" },
                                        { "value": "5", "label": "铁路出口" },
                                        { "value": "6", "label": "铁路进口" },
                                        { "value": "7", "label": "FBA海运" },
                                        { "value": "8", "label": "FBA空运" },
                                        { "value": "9", "label": "FBA铁路" },
                                        { "value": "10", "label": "综合物流" }
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>目的港</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "一主多分" },
                                        { "value": "2", "label": "一主一分" },
                                        { "value": "3", "label": "直单" },
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>海外仓</label>
                                    <Select style={{ width: '260px' }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "普货" },
                                            { "value": "2", "label": "危险品" },
                                            { "value": "3", "label": "托盘" },
                                            { "value": "4", "label": "挂衣箱" },
                                            { "value": "5", "label": "大件货" },
                                            { "value": "6", "label": "温控货物" }
                                        ]}
                                    />
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>HSCode</label>
                                    <Input style={{ width: '160px' }}></Input>
                                </Space>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Space>
                                    <label>委托单位</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "海运出口" },
                                        { "value": "2", "label": "海运进口" },
                                        { "value": "3", "label": "空运出口" },
                                        { "value": "4", "label": "空运进口" },
                                        { "value": "5", "label": "铁路出口" },
                                        { "value": "6", "label": "铁路进口" },
                                        { "value": "7", "label": "FBA海运" },
                                        { "value": "8", "label": "FBA空运" },
                                        { "value": "9", "label": "FBA铁路" },
                                        { "value": "10", "label": "综合物流" }
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>承运人</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "一主多分" },
                                        { "value": "2", "label": "一主一分" },
                                        { "value": "3", "label": "直单" },
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>订舱代理</label>
                                    <Select style={{ width: '260px' }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "普货" },
                                            { "value": "2", "label": "危险品" },
                                            { "value": "3", "label": "托盘" },
                                            { "value": "4", "label": "挂衣箱" },
                                            { "value": "5", "label": "大件货" },
                                            { "value": "6", "label": "温控货物" }
                                        ]}
                                    />
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>换单代理</label>
                                    <Select style={{ width: '260px' }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "普货" },
                                            { "value": "2", "label": "危险品" },
                                            { "value": "3", "label": "托盘" },
                                            { "value": "4", "label": "挂衣箱" },
                                            { "value": "5", "label": "大件货" },
                                            { "value": "6", "label": "温控货物" }
                                        ]}
                                    />
                                </Space>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={6}>
                                <Space>
                                    <label>指定货代理</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "海运出口" },
                                        { "value": "2", "label": "海运进口" },
                                        { "value": "3", "label": "空运出口" },
                                        { "value": "4", "label": "空运进口" },
                                        { "value": "5", "label": "铁路出口" },
                                        { "value": "6", "label": "铁路进口" },
                                        { "value": "7", "label": "FBA海运" },
                                        { "value": "8", "label": "FBA空运" },
                                        { "value": "9", "label": "FBA铁路" },
                                        { "value": "10", "label": "综合物流" }
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>航线|区域</label>
                                    <Select style={{ width: '160px' }} options={[
                                        { "value": "1", "label": "一主多分" },
                                        { "value": "2", "label": "一主一分" },
                                        { "value": "3", "label": "直单" },
                                    ]}></Select>
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>目的港代理</label>
                                    <Select style={{ width: '260px' }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "普货" },
                                            { "value": "2", "label": "危险品" },
                                            { "value": "3", "label": "托盘" },
                                            { "value": "4", "label": "挂衣箱" },
                                            { "value": "5", "label": "大件货" },
                                            { "value": "6", "label": "温控货物" }
                                        ]}
                                    />
                                </Space>
                            </Col>
                            <Col span={6}>
                                <Space>
                                    <label>可用公司</label>
                                    <Select style={{ width: '260px' }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "普货" },
                                            { "value": "2", "label": "危险品" },
                                            { "value": "3", "label": "托盘" },
                                            { "value": "4", "label": "挂衣箱" },
                                            { "value": "5", "label": "大件货" },
                                            { "value": "6", "label": "温控货物" }
                                        ]}
                                    />
                                </Space>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </>



    );
};

export default ChargingStandard;