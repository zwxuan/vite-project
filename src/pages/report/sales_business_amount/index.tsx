
import '@/pages/page_list.less';
import React, { useState, useEffect } from 'react';
import { Aggregation, type S2RenderOptions, type SpreadSheet } from '@antv/s2';
import { SheetComponent, SheetComponentOptions } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';
import { Button, Divider, Dropdown, Space } from 'antd';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import AdvancedSearchForm from "@/components/search-form";

import { fields } from './search_fields';
import CodeBoxMeta from '@/components/code-box-meta';
const SalesBusinessAmountReport: React.FC = () => {

    const [data, setData] = useState<any>('');

    fetch('sales_business_amount_data.json')
        .then((res) => res.json())
        .then((res) => {
            setData(res);
        });

    const s2Options: SheetComponentOptions = {
        width: 600,
        height: 480,
        totals: {
            row: {
                showGrandTotals: true,
                showSubTotals: true,
                calcGrandTotals: {
                    // 设置总计汇总计算方式为求和
                    aggregation: Aggregation.SUM,
                  },
                  calcSubTotals: {
                    // 设置小计汇总计算方式为求和
                    aggregation: Aggregation.SUM,
                  },
                subTotalsDimensions: ['province'],
            },
        },
    };
    const onMounted = (spreadsheet: SpreadSheet) => {
        console.log('onMounted:', spreadsheet);
    };

    const onUpdate = (renderOptions: S2RenderOptions) => {
        console.log('onUpdate:', renderOptions);

        return renderOptions;
    };

    const onUpdateAfterRender = (renderOptions: S2RenderOptions) => {
        console.log('onUpdateAfterRender:', renderOptions);
    };

    const handleSearch = (values: any) => {
        console.log('handleSearch', values);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 业务对比分析表
                        </span>
                    </div>
                    <span className="orgunit-customize-showOff" style={{ marginLeft: "10px" }}>
                        <div style={{ display: "inline" }}>

                        </div>
                    </span>
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>

                        <span className="u-button">
                            <RedoOutlined className='iconfont' />
                        </span>
                    </div>
                </div>
            </div>
            <AdvancedSearchForm fields={fields} onSearch={handleSearch} />
            <Divider style={{ borderColor: '#7cb305' }}></Divider>
            <div className="nc-bill-table-area">
                <SheetComponent
                    dataCfg={data}
                    options={s2Options}
                    onMounted={onMounted}
                    onUpdate={onUpdate}
                    onUpdateAfterRender={onUpdateAfterRender}
                />,
            </div>
        </div>
    )
}
export default SalesBusinessAmountReport;
