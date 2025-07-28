
import '@/pages/page_list.less';
import React, { useState, useEffect, useRef } from 'react';
import { Aggregation, ColCellStyle, S2DataConfig, type S2RenderOptions, type SpreadSheet } from '@antv/s2';
import { CustomColHeadCell, CustomRowHeadCell, CustomCornerCell, CustomDataCell } from '../custom_col_cell';
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


const DepartmentBusinessWeightReport: React.FC = () => {
    const tableAreaRef = useRef<HTMLDivElement>(null);
    const [businessWeightData, setBusinessWeightData] = useState<any[]>([]);
    const [adaptiveSheetSize, setAdaptiveSheetSize] = useState({ width: 1200, height: 880 });
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/department_business_weight_data.json');
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
        const initialWidth = currentTableArea.clientWidth - 10;
        const initialHeight = currentTableArea.clientHeight - 180;
        if (initialWidth > 0 && initialHeight > 0) {
            setAdaptiveSheetSize({ width: initialWidth, height: initialHeight });
        }
    }, []);


    const s2DataConfig: S2DataConfig = {
        fields: {
            rows: ["department", "operation_department"],
            columns: [],
            values: [
                "20gp_quantity",
                "40gp_quantity",
                "45gp_quantity",
                "40hc_quantity",
                "20ot_quantity",
                "40ot_quantity",
                "20fr_quantity",
                "40fr_quantity",
                "20rf_quantity",
                "40rf_quantity",
                "20tk_quantity",
                "40tk_quantity",
                "teu",
                "ticket_count",
                "usd_profit",
                "rmb_profit",
                "total_profit",
                "usd_receivable",
                "rmb_receivable",
                "usd_payable",
                "rmb_payable",
                "total_receivable",
                "total_payable"
            ],
            valueInCols: true
        },
        meta: [
            {
                field: "20gp_quantity",
                name: "20'GP",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "40gp_quantity",
                name: "40'GP",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "45gp_quantity",
                name: "45'GP",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "40hc_quantity",
                name: "40'HC",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "20ot_quantity",
                name: "20'OT",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "40ot_quantity",
                name: "40'OT",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "20fr_quantity",
                name: "20'FR",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "40fr_quantity",
                name: "40'FR",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "20rf_quantity",
                name: "20'RF",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "40rf_quantity",
                name: "40'RF",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "20tk_quantity",
                name: "20'TK",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "40tk_quantity",
                name: "40'TK",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "teu",
                name: "TEU",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "ticket_count",
                name: "票数",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "usd_profit",
                name: "USD 利润",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "rmb_profit",
                name: "RMB 利润",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "total_profit",
                name: "总利润",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "usd_receivable",
                name: "USD 应收",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "rmb_receivable",
                name: "RMB 应收",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "usd_payable",
                name: "USD 应付",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "rmb_payable",
                name: "RMB 应付",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "total_receivable",
                name: "应收合计",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "total_payable",
                name: "应付合计",
                formatter: (value) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value));
                }
            },
            {
                field: "department",
                name: "接单部门"
            },
            {
                field: "operation_department",
                name: "操作部门"
            },
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
                subTotalsDimensions: ['department'],
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
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }} ref={tableAreaRef}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 接单部门箱量利润汇总表
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
            <Divider style={{ borderColor: '#7cb305' }}></Divider>
            <div className="nc-bill-table-area">
                <SheetComponent
                    dataCfg={s2DataConfig}
                    options={s2Options}
                />
            </div>
        </div>

    )
}
export default DepartmentBusinessWeightReport;
