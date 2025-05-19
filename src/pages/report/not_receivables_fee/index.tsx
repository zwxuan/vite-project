
import '@/pages/page_list.less';
import React, { useState, useEffect, useRef } from 'react';
import { Aggregation, ColCellStyle, S2DataConfig, type S2RenderOptions, type SpreadSheet } from '@antv/s2';
import { CustomColHeadCell,CustomRowHeadCell,CustomCornerCell,CustomDataCell } from '../custom_col_cell';
import { SheetComponent, SheetComponentOptions } from '@antv/s2-react';
import '@antv/s2-react/dist/s2-react.min.css';
import { Button, Divider, Dropdown, Space } from 'antd';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import AdvancedSearchForm from "@/components/search-form";
import { fields } from './search_fields';
import { exportItems } from './menu_items';


const NotReceivablesFeeReport: React.FC = () => {
    const tableAreaRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any[]>([]);
    const [adaptiveSheetSize, setAdaptiveSheetSize] = useState({ width: 1200, height: 880 });
    useEffect(() => {
        fetch('/data/not_receivables_fee_data.json')
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, []);
    useEffect(() => {
        const currentTableArea = tableAreaRef.current;
        if (!currentTableArea) return;
        const initialWidth = currentTableArea.clientWidth;
        const initialHeight = currentTableArea.clientHeight-180;
        if (initialWidth > 0 && initialHeight > 0) {
            setAdaptiveSheetSize({ width: initialWidth, height: initialHeight });
        }
    }, []);


    const s2DataConfig: S2DataConfig = {
        fields: {
            rows: [
                "settlement_object",
                "work_number",
                "etd",
                "invoice_number",
                "master_number",
                "expense_name"
            ],
            columns: [],
            values: [
                "unreceived_cny",
                "unreceived_usd",
                "unreceived_hkd",
                "unreceived_eur",
                "unreceived_jpy"
            ],
            valueInCols: true
        },
        meta: [
            {
                field: "unreceived_cny",
                name: "未收（人民币）",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "unreceived_usd",
                name: "未收（美金）",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "unreceived_hkd",
                name: "未收（港币）",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "unreceived_eur",
                name: "未收（欧元）",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "unreceived_jpy",
                name: "未收（日元）",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "settlement_object",
                name: "结算对象"
            },
            {
                field: "work_number",
                name: "工作号"
            },
            {
                field: "etd",
                name: "ETD"
            },
            {
                field: "invoice_number",
                name: "发票号"
            },
            {
                field: "master_number",
                name: "主单号"
            },
            {
                field: "expense_name",
                name: "费用名称"
            }
        ],
        data: data
    }

    const s2Options: SheetComponentOptions = {
        width: adaptiveSheetSize.width,
        height: adaptiveSheetSize.height,
        
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
                subTotalsDimensions: ['settlement_object', 'work_number', 'etd', 'invoice_number', 'master_number', 'expense_name'],
            },
        },
        colCell: (node, spreadsheet, headerConfig) => {
            return new CustomColHeadCell(node, spreadsheet, headerConfig);
        },
        rowCell: (node, spreadsheet, headerConfig) => {
            return new CustomRowHeadCell(node, spreadsheet, headerConfig);
        },
        cornerCell: (node, spreadsheet, headerConfig) => {
            return new CustomCornerCell(node, spreadsheet, headerConfig);
        },
        dataCell: (spreadsheet, dataCellConfig) => {
            return new CustomDataCell(spreadsheet, dataCellConfig);
        },
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
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 未收对账表（按费用明细）
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
                        <div className="divider-button-wrapper">
                            <Dropdown menu={{items:exportItems}}>
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
            <Divider style={{ borderColor: '#7cb305' }}></Divider>
            <div className="nc-bill-table-area" ref={tableAreaRef}>
                <SheetComponent
                    dataCfg={s2DataConfig}
                    options={s2Options}
                    // onMounted={onMounted}
                    // onUpdate={onUpdate}
                    // onUpdateAfterRender={onUpdateAfterRender}
                />
            </div>
        </div>
        
    )
}
export default NotReceivablesFeeReport;
