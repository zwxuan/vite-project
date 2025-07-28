
import React, { useState } from 'react';
import { Tabs, Card, Button, Dropdown, Space, Tooltip } from 'antd';
import { DownOutlined, RedoOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { exportItems } from './menu_items';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import Port from './tab_detail/port/index'
import EDIPort from './tab_detail/edi_port/index'
import AMSPort from './tab_detail/ams_port';
import CustomIcon from '@/components/custom-icon';
const BaseSeaPort: React.FC = () => {
    const [activeTabKey, setActiveTabKey] = useState('business_all');
    //获取路由参数
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const handleSearch = (values: any) => {
        console.log('handleSearch', values);
    };

    // 当切换 Tabs 时调用此方法
    const handleTabChange = (key: string) => {
        // tabs切换是隐藏合计table信息，增加这个代码后页面切换有卡顿的问题
        setActiveTabKey(key);
    };
    return (
        <div>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{marginLeft: "10px"}}>
                            <CustomIcon type="icon-Currency"  style={{color:'red',fontSize:'24px'}} /> 海港
                            <Tooltip
                                title={
                                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                                        <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>海运港口</b></span>海运港口是供船舶停泊、装卸货物和乘客的场所，是国际物流的重要节点。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>EDI港口</b></span>过EDI技术实现港口作业流程的数字化和自动化，提升效率并减少人为错误。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>AMS港口</b></span>指需要遵守AMS申报规则的港口，通常是美国港口或与美国贸易密切相关的港口。
                                            </li>
                                            <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>总结</b></span>海运港口是物理空间，提供物流服务；EDI港口是技术驱动的港口，优化信息流；MS港口是美国海关监管下的特殊港口，强调合规性。
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
                                <input type="checkbox" className='u-checkbox-middle' /><label className="u-checkbox-label u-checkbox-label-middle">显示停用</label>
                            </label>
                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{ items: exportItems }}>
                                <Button>
                                    <Space>
                                        导出
                                        <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <div className='nc-bill-table-area'>
                <Tabs size='middle' type="card" onChange={handleTabChange}
                    getPopupContainer={() => document.body}
                    items={[
                        {
                            label: '港口',
                            key: 'port',
                            children: <Port  />,
                        },
                        {
                            label: 'EDI港口',
                            key: 'edi_port',
                            children: <EDIPort  />,
                        },
                        {
                            label: 'AMS港口',
                            key: 'ams_port',
                            children: <AMSPort  />,
                        },
                    ]}
                />

            </div>
        </div>
    );
};

export default BaseSeaPort;
