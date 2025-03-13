import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Tabs, Row, Col, Select, Input, DatePicker,Button,ConfigProvider  } from 'antd';
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import zhCN from 'antd/es/locale/zh_CN'; // 引入中文语言包
import zh from 'antd/es/date-picker/locale/zh_CN';
import FeeTab from './fee_tab';
import { Space } from 'antd/lib';
import './charging_standard.less'

const { RangePicker } = DatePicker;

const zh_CNLocale: typeof zh = {
    ...zh,
    lang: {
      ...zh.lang,
      locale: 'zh_CN',
      fieldDateFormat: 'YYYY-MM-DD',
      fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
      yearFormat: 'YYYY 年',
      monthFormat: 'MM 月',
      cellYearFormat: 'YYYY',
      "shortWeekDays": ["日", "一", "二", "三", "四", "五", "六"],
    },
  };

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
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>业务类型</label>
                                    <Select style={{ flex: 1 }} options={[
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
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>拼箱类型</label>
                                    <Select style={{ flex: 1 }} options={[
                                        { "value": "1", "label": "一主多分" },
                                        { "value": "2", "label": "一主一分" },
                                        { "value": "3", "label": "直单" },
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>货物类型</label>
                                    <Select style={{ flex: 1 }}
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
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>有效日期</label>
                                    <RangePicker locale={zh_CNLocale} style={{ flex: 1 }} placeholder={['开始日期','结束日期']} />
                                </div>

                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>方案名称</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>

                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>方案说明</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>部门</label>
                                    <Select
                                        mode="multiple"
                                        maxTagCount={3}
                                        value={value}
                                        style={{ flex: 1 }}
                                        onChange={setValue}
                                        placeholder=""
                                        options={[
                                            { value: "1", label: "单证部" },
                                            { value: "2", label: "结算部" },
                                            { value: "3", label: "财务部" },
                                            { value: "4", label: "拼箱部" },
                                            { value: "5", label: "海运事业部/北美航线" },
                                            { value: "6", label: "空运事业部/西安分公司/航线部" },
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>起运港</label>
                                    <Select style={{ flex: 1 }} options={[
                                        {value:'CNTAO',label:'青岛港'},
                                        {value:'CNSZN',label:'深圳'},
                                        {value:'JPYOK',label:'横滨'},
                                        {value:'ESBCN',label:'巴塞罗那港'},
                                        {value:'JPSMZ',label:'SHIMIZU,JAPAN'},
                                        {value:'IDSRG',label:'三宝垄'},
                                        {value:'MYSAN',label:'山打根'},
                                        {value:'JPKOB',label:'神户'},
                                        {value:'CNSZX',label:'SHENZHEN,CHINA'},
                                        {value:'GBLGP',label:'伦敦门户港'},
                                        {value:'FRFOS',label:'福斯'},                                        
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>目的港</label>
                                    <Select style={{ flex: 1 }} options={[
                                        {value:'CNTAO',label:'青岛港'},
                                        {value:'CNSZN',label:'深圳'},
                                        {value:'JPYOK',label:'横滨'},
                                        {value:'ESBCN',label:'巴塞罗那港'},
                                        {value:'JPSMZ',label:'SHIMIZU,JAPAN'},
                                        {value:'IDSRG',label:'三宝垄'},
                                        {value:'MYSAN',label:'山打根'},
                                        {value:'JPKOB',label:'神户'},
                                        {value:'CNSZX',label:'SHENZHEN,CHINA'},
                                        {value:'GBLGP',label:'伦敦门户港'},
                                        {value:'FRFOS',label:'福斯'},
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>海外仓</label>
                                    <Select style={{ flex: 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "亚马逊" },
                                            { "value": "2", "label": "万邑通（Winit）" },
                                            { "value": "3", "label": "谷仓（GoodCang）" },
                                            { "value": "4", "label": "递四方（4PX）" },
                                            { "value": "5", "label": "飞鸟国际（Birdsnest）" },
                                            { "value": "6", "label": "斑马物流（Zebra）" },
                                            { "value": "7", "label": "顺丰国际（SF International）" }
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>HSCode</label>
                                    <Input style={{ flex: 1 }}></Input>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>委托单位</label>
                                    <Select style={{ flex: 1 }} options={[
                                        {value:'200710169',label:'莫仕连接器（成都）有限公司'},
                                        {value:'ZT20100137',label:'GEBR. KEMPER GMBH + CO. KG'},
                                        {value:'ZT24080480',label:'深州冀衡药业有限公司'},
                                        {value:'ZT23100431',label:'金石易服（香港）有限公司'},
                                        {value:'ZT24051195',label:'广州市昊链快销供应链有限公司'},
                                        {value:'ZT24080971',label:'正大供应链有限公司'},
                                        {value:'5354213636',label:'烟台北方安德利果汁股份有限公司'},
                                        {value:'ZT23110693',label:'北京涂多多电子商务股份有限公司'},
                                        {value:'ZT25010283',label:'湖南宏工智能科技有限公司'},
                                        {value:'ZT24100917',label:'涂多多（青岛）跨境电子商务有限公司'},
                                        {value:'GT14040159',label:'威海翔远贸易有限公司'},
                                        {value:'ZT24121014',label:'河南省四通锅炉有限公司'},
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>承运人</label>
                                    <Select style={{ flex : 1 }} options={[
                                        {value:'200710169',label:'莫仕连接器（成都）有限公司'},
                                        {value:'ZT20100137',label:'GEBR. KEMPER GMBH + CO. KG'},
                                        {value:'ZT24080480',label:'深州冀衡药业有限公司'},
                                        {value:'ZT23100431',label:'金石易服（香港）有限公司'},
                                        {value:'ZT24051195',label:'广州市昊链快销供应链有限公司'},
                                        {value:'ZT24080971',label:'正大供应链有限公司'},
                                        {value:'5354213636',label:'烟台北方安德利果汁股份有限公司'},
                                        {value:'ZT23110693',label:'北京涂多多电子商务股份有限公司'},
                                        {value:'ZT25010283',label:'湖南宏工智能科技有限公司'},
                                        {value:'ZT24100917',label:'涂多多（青岛）跨境电子商务有限公司'},
                                        {value:'GT14040159',label:'威海翔远贸易有限公司'},
                                        {value:'ZT24121014',label:'河南省四通锅炉有限公司'},                                        
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>订舱代理</label>
                                    <Select style={{ flex : 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "德迅（Kuehne + Nagel）" },
                                            { "value": "2", "label": "丹马士（DHL Global Forwarding）" },
                                            { "value": "3", "label": "中外运（Sinotrans）" },
                                            { "value": "4", "label": "泛亚班拿（Panalpina）" },
                                            { "value": "5", "label": "捷富凯（Geodis）" },
                                            { "value": "6", "label": "康捷空（Expeditors）" }
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>换单代理</label>
                                    <Select style={{ flex : 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "德迅（Kuehne + Nagel）" },
                                            { "value": "2", "label": "丹马士（DHL Global Forwarding）" },
                                            { "value": "3", "label": "中外运（Sinotrans）" },
                                            { "value": "4", "label": "泛亚班拿（Panalpina）" },
                                            { "value": "5", "label": "捷富凯（Geodis）" },
                                            { "value": "6", "label": "康捷空（Expeditors）" }
                                        ]}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={24} style={{paddingRight:'6px'}}>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>指定货代理</label>
                                    <Select style={{ flex:1 }} options={[
                                        { "value": "1", "label": "德铁信可（DB Schenker）" },
                                        { "value": "2", "label": "日通国际（Nippon Express）" },
                                        { "value": "3", "label": "近铁国际（Kintetsu World Express）" },
                                        { "value": "4", "label": "乔达国际（GEODIS）" },
                                        { "value": "5", "label": "罗宾逊全球物流（C.H. Robinson）" }
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>航线|区域</label>
                                    <Select style={{ flex : 1 }} options={[
                                        { "value": "1", "label": "亚洲-北美航线" },
                                        { "value": "2", "label": "欧洲-南美航线" },
                                        { "value": "3", "label": "中东-非洲航线" },
                                        { "value": "4", "label": "亚太区域内航线" },
                                        { "value": "5", "label": "跨大西洋航线" }
                                    ]}></Select>
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>目的港代理</label>
                                    <Select style={{ flex : 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "洛杉矶港代理（Port of Los Angeles Agent）" },
                                            { "value": "2", "label": "鹿特丹港代理（Port of Rotterdam Agent）" },
                                            { "value": "3", "label": "新加坡港代理（Port of Singapore Agent）" },
                                            { "value": "4", "label": "上海港代理（Port of Shanghai Agent）" },
                                            { "value": "5", "label": "汉堡港代理（Port of Hamburg Agent）" }
                                        ]}
                                    />
                                </div>
                            </Col>
                            <Col span={6}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <label>可用公司</label>
                                    <Select style={{ flex : 1 }}
                                        showSearch
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[
                                            { "value": "1", "label": "集团分公司1" },
                                            { "value": "2", "label": "集团青岛子公司" },
                                            { "value": "3", "label": "集团分公司2" },
                                            { "value": "4", "label": "集团上海子公司" },
                                            { "value": "5", "label": "集团分公司3" },
                                            { "value": "6", "label": "集团北京分公司" }
                                        ]}
                                    />
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

export default ChargingStandard;