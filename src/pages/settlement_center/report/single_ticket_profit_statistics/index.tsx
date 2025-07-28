
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


const SingleTicketProfitStatisticsReport: React.FC = () => {
    const tableAreaRef = useRef<HTMLDivElement>(null);
    const [businessWeightData, setBusinessWeightData] = useState<any[]>([]);
    const [adaptiveSheetSize, setAdaptiveSheetSize] = useState({ width: 1200, height: 880 });
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetch('/data/single_ticket_profit_statistics_data.json');
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
        const initialWidth = currentTableArea.clientWidth-10;
        const initialHeight = currentTableArea.clientHeight-180;
        if (initialWidth > 0 && initialHeight > 0) {
            setAdaptiveSheetSize({ width: initialWidth, height: initialHeight });
        }
    }, []);


    const s2DataConfig: S2DataConfig = {
        fields: {
            rows: [
                "business_no",
                "principal",
                "sales_rep",
                "port_of_destination",
                "sailing_date",
                "container_type_quantity",
                "consolidation_type",
                "business_type",
            ],
            columns: [],
            values: [
                "rmb_revenue",
                "rmb_cost",
                "rmb_profit",
                "usd_revenue",
                "usd_cost",
                "usd_profit",
                "other_currency_rmb_revenue",
                "other_currency_rmb_cost",
                "other_currency_rmb_profit",
                "total_revenue",
                "total_cost",
                "total_profit",
                "teu"
            ],
            valueInCols: true
        },
        meta: [
            {
                field: "business_no",
                name: "业务单号"
            },
            {
                field: "principal",
                name: "委托单位"
            },
            {
                field: "sales_rep",
                name: "销售代表"
            },
            {
                field: "port_of_destination",
                name: "目的港"
            },
            {
                field: "sailing_date",
                name: "开航日期"
            },
            {
                field: "container_type_quantity",
                name: "箱型箱量"
            },
            {
                field: "consolidation_type",
                name: "拼整类型"
            },
            {
                field: "business_type",
                name: "业务类型"
            },
            {
                field: "rmb_revenue",
                name: "RMB收入",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "rmb_cost",
                name: "RMB成本",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "rmb_profit",
                name: "RMB利润",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "usd_revenue",
                name: "USD收入",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "usd_cost",
                name: "USD成本",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "usd_profit",
                name: "USD利润",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "other_currency_rmb_revenue",
                name: "其它币种折合RMB收入",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "other_currency_rmb_cost",
                name: "其它币种折合RMB成本",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "other_currency_rmb_profit",
                name: "其它币种折合RMB利润",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "total_revenue",
                name: "总收入",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "total_cost",
                name: "总成本",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "total_profit",
                name: "总利润",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
            },
            {
                field: "teu",
                name: "TEU",
                formatter: (value, record, meta) => {
                    return new Intl.NumberFormat('zh-CN', { style: 'decimal' }).format(Number(value))
                },
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
                subTotalsDimensions: [''],
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
        style: {
            colCell: {
                // 固定配置: 每列 220px
                width: 220,
              },
        },
        conditions: {
            text: [
              {
                field: /.+_date$/,
                mapping(fieldValue, data) {
                  return {
                    textAlign:'center',
                  };
                },
              },
            ],
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
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}  ref={tableAreaRef}>
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 单票利润统计
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
            <div className="nc-bill-table-area">
                <SheetComponent
                    dataCfg={s2DataConfig}
                    options={s2Options}
                />
            </div>
        </div>
        
    )
}
export default SingleTicketProfitStatisticsReport;
