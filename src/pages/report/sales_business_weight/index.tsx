
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


const SalesBusinessWeightReport: React.FC = () => {
    const tableAreaRef = useRef<HTMLDivElement>(null);
    const [businessWeightData, setBusinessWeightData] = useState<any[]>([]);
    const [adaptiveSheetSize, setAdaptiveSheetSize] = useState({ width: 1200, height: 880 });
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/sales_business_weight_data.json');
                if (!response.ok) {
                    throw new Error('数据加载失败');
                }
                const data = await response.json();
                setBusinessWeightData(data);
            } catch (error) {
                console.error('加载数据失败:', error);
                // 可以添加错误提示
            }
        };
        loadData();
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
                "sales_rep"
            ],
            columns: [],
            values: [
                "20'GP",
                "40'GP",
                "40'HC",
                "45'GP",
                "特殊箱种",
                "TEU",
                "票数"
            ],
            valueInCols: true
        },
        meta: [
            {
                field: "20'GP",
                name: "20'GP箱量",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "40'GP",
                name: "40'GP箱量",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "40'HC",
                name: "40'HC箱量",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "45'GP",
                name: "45'GP箱量",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "特殊箱种",
                name: "特殊箱种箱量",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "TEU",
                name: "TEU",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "票数",
                name: "票数",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "sales_rep",
                name: "销售代表"
            }
        ],
        data: businessWeightData
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
                subTotalsDimensions: ['business_date'],
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
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 销售箱量统计表
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
                />
            </div>
        </div>
        
    )
}
export default SalesBusinessWeightReport;
