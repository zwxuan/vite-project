import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Row, Col, Select, Input, DatePicker,Button,Checkbox, Radio, Space, Tooltip  } from 'antd';
import {DatePickerZH} from '@/components/date-picker/index';
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import zhCN from 'antd/es/locale/zh_CN'; // 引入中文语言包
import zh from 'antd/es/date-picker/locale/zh_CN';
import CurrencyTab from './currency_tab';
import '@/pages/page_list.less';
import './currency.less'
import { useNavigate } from 'react-router-dom';

const items = [
    {
        label: `币种`,
        key: 'currency_tab',
        children: <CurrencyTab />,
    },
];


const AccountDetail: React.FC = () => {
    const [value, setValue] = useState([]);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/basic_company/base_corporate_fund_account');
    };
    return (
        <>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 企业资金账户详情
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>银行账号</b></span>
                                                <p>定义：银行账号是银行为客户开设的用于资金存取和转账的唯一识别码。</p>
                                                <p>结构：通常由一串数字组成，长度和格式因银行和地区而异。例如，在美国，一个典型的储蓄或支票账户号码可能是10-12位数字；而在其他国家，这个数字可能更长或更短。</p>
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>国际银行账号（IBAN）</b></span>
                                                <p>定义：IBAN是一种国际标准化的银行账户编号方式，旨在简化跨境支付和提高交易准确性。</p>
                                                <p>结构：IBAN由两部分组成——国家代码（两位字母）和基本的国家特定格式的账户号码（通常为一系列数字和可能的字母）。总长度通常为22个字符（包括国家代码），但某些国家的IBAN可能稍长或稍短。例如，德国的IBAN以“DE”开头，后跟18位字符的账户信息。</p>
                                            </li>
                                        </ol>
                                    </div>
                                }
                                color='white'>
                                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                            </Tooltip>
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
                                <Button>取消</Button>
                                <Button onClick={handleBack}>返回</Button>
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
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>开户类型</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "银行开户" },
                                        { "value": "2", "label": "结算中心开户" },
                                        { "value": "3", "label": "财务公司" },
                                        { "value": "4", "label": "其他金融机构" },
                                        { "value": "5", "label": "数币钱包" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>所属组织</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "集团总部" },
                                        { "value": "2", "label": "青岛子公司" },
                                        { "value": "3", "label": "上海分公司" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>开户组织</label>
                                    <Select style={{ flex: 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "集团总部" },
                                            { "value": "2", "label": "青岛子公司" },
                                            { "value": "4", "label": "上海分公司" },
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>账号编码</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>

                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>账户名称</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>银行账号</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>开户名</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>开户行</label>
                                    <Select style={{ flex: 1 }} options={[
                                        {value:'CNTAO',label:'青岛银行郑州路支行'},
                                        {value:'CNSZN',label:'深圳银行青年路支行'},
                                        {value:'JPYOK',label:'中国工商银行安庆分行司下坡支行'},
                                        {value:'ESBCN',label:'中国建设银行杭州大厦支行'},
                                        {value:'JPSMZ',label:'中国建设银行上海大厦支行'},
                                    ]}></Select>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>电票代理行</label>
                                    <Select style={{ flex: 1 }} options={[
                                        {value:'CNTAO',label:'青岛银行郑州路支行'},
                                        {value:'CNSZN',label:'深圳银行青年路支行'},
                                        {value:'JPYOK',label:'中国工商银行安庆分行司下坡支行'},
                                        {value:'ESBCN',label:'中国建设银行杭州大厦支行'},
                                        {value:'JPSMZ',label:'中国建设银行上海大厦支行'},
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>银行类别</label>
                                    <Select style={{ flex: 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "中国银行" },
                                            { "value": "2", "label": "中国工商银行" },
                                            { "value": "3", "label": "中国建设银行" },
                                            { "value": "4", "label": "中国农业银行" },
                                            { "value": "5", "label": "中国交通银行" },
                                            { "value": "6", "label": "中国民生银行" },
                                            { "value": "7", "label": "中国光大银行" }
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>开户省</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>开户市</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>联行号</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>电票代理联行号</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>账户性质</label>
                                    <Select style={{ flex : 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "基本" },
                                            { "value": "2", "label": "一般" },
                                            { "value": "3", "label": "临时" },
                                            { "value": "4", "label": "专用" },
                                            { "value": "5", "label": "其他" },
                                            { "value": "6", "label": "第三方账户" }
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>账户类型</label>
                                    <Select style={{ flex:1 }} options={[
                                        { "value": "1", "label": "活期" },
                                        { "value": "2", "label": "定期" },
                                        { "value": "3", "label": "通知" },
                                        { "value": "4", "label": "保证金" },
                                    ]}></Select>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}} className='ant-tranfer-row'>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>账户用途</label>
                                    <Select style={{ flex : 1 }} options={[
                                        { "value": "1", "label": "收入户" },
                                        { "value": "2", "label": "支出户" },
                                        { "value": "3", "label": "收支户" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>开户日期</label>
                                    <DatePickerZH style={{ flex: 1 }} placeholder={'开户日期'} />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>纳税登记</label>
                                    <Radio.Group
                                        name="radiogroup"
                                        defaultValue={1}
                                        style={{ flex: 1,textAlign:'left' }}
                                        options={[
                                            { value: 1, label: '否' },
                                            { value: 2, label: '是' },
                                        ]}
                                    />
                                    
                                    
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={24}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>备注</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <Tabs defaultActiveKey="1" items={items} />
        </>



    );
};

export default AccountDetail;