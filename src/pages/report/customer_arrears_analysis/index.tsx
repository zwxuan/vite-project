
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


const CustomerArrearsAnalysisReport: React.FC = () => {
    const tableAreaRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<any[]>([]);
    const [adaptiveSheetSize, setAdaptiveSheetSize] = useState({ width: 1200, height: 880 });
    useEffect(() => {
        fetch('/data/customer_arrears_analysis_data.json')
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            });
    }, []);
    useEffect(() => {
        const currentTableArea = tableAreaRef.current;
        if (!currentTableArea) return;

        // const resizeObserver = new ResizeObserver(entries => {
        //     for (let entry of entries) {
        //         const { width, height } = entry.contentRect;
        //         // Ensure width and height are positive to avoid issues with S2
        //         if (width > 0 && height > 0) {
        //             setAdaptiveSheetSize({ width, height });
        //         }
        //     }
        // });

        // resizeObserver.observe(currentTableArea);

        // Set initial size based on the container's current dimensions
        const initialWidth = currentTableArea.clientWidth;
        const initialHeight = currentTableArea.clientHeight-180;
        if (initialWidth > 0 && initialHeight > 0) {
            setAdaptiveSheetSize({ width: initialWidth, height: initialHeight });
        }

        // return () => {
        //     if (currentTableArea) {
        //         resizeObserver.unobserve(currentTableArea);
        //     }
        //     resizeObserver.disconnect();
        // };
    }, []);


    const s2DataConfig: S2DataConfig = {
        fields: {
        rows: ["sales_rep", "settlement_unit"],
        columns: [],
        values: [
            "unbilled_cny_before_nov2024",
            "unbilled_usd_before_nov2024",
            "unbilled_cny_nov2024",
            "unbilled_usd_nov2024",
            "unbilled_cny_dec2024",
            "unbilled_usd_dec2024",
            "unbilled_cny_jan2025",
            "unbilled_usd_jan2025",
            "unbilled_cny_feb2025",
            "unbilled_usd_feb2025",
            "unbilled_cny.mar2025",
            "unbilled_usd.mar2025",
            "unbilled_cny_apr2025",
            "unbilled_usd_apr2025",
            "unbilled_cny_may2025",
            "unbilled_usd_may2025"
        ],
        "valueInCols": true
    },
    meta: [
        {
            field: "unbilled_cny_before_nov2024",
            name: "2024年11月以前未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd_before_nov2024",
            name: "2024年11月以前未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_cny_nov2024",
            name: "2024年11月未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd_nov2024",
            name: "2024年11月未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_cny_dec2024",
            name: "2024年12月未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd_dec2024",
            name: "2024年12月未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_cny_jan2025",
            name: "2025年1月未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd_jan2025",
            name: "2025年1月未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_cny_feb2025",
            name: "2025年2月未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd_feb2025",
            name: "2025年2月未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_cny.mar2025",
            name: "2025年3月未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd.mar2025",
            name: "2025年3月未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_cny_apr2025",
            name: "2025年4月未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd_apr2025",
            name: "2025年4月未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_cny_may2025",
            name: "2025年5月未收人民币",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "unbilled_usd_may2025",
            name: "2025年5月未收美圆",
            formatter: (value, record, meta) => {return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))}
        },
        {
            field: "sales_rep",
            name: "销售代表"
        },
        {
            field: "settlement_unit",
            name: "结算单位"
        }
    ],
        data: data
    };

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
                subTotalsDimensions: ["sales_rep", "settlement_unit"],
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
    // const onMounted = (spreadsheet: SpreadSheet) => {
    //     console.log('onMounted:', spreadsheet);
    // };

    // const onUpdate = (renderOptions: S2RenderOptions) => {
    //     console.log('onUpdate:', renderOptions);

    //     return renderOptions;
    // };

    // const onUpdateAfterRender = (renderOptions: S2RenderOptions) => {
    //     console.log('onUpdateAfterRender:', renderOptions);
    // };

    const handleSearch = (values: any) => {
        console.log('handleSearch', values);
    };

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 客户欠账分析
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
export default CustomerArrearsAnalysisReport;
