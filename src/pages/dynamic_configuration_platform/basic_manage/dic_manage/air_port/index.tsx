
import React, { useState } from 'react';
import { Tabs, Card, Button, Dropdown, Space } from 'antd';
import { DownOutlined, RedoOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { exportItems } from './menu_items';
import AdvancedSearchForm from '@/components/search-form';
import { fields } from './search_fields';
import Port from './tab_detail/port/index'
import AMSPort from './tab_detail/ams_port';
import CustomIcon from '@/components/custom-icon';
const BaseAirPort: React.FC = () => {
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

export default BaseAirPort;
