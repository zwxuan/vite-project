import React, { useState, useEffect, useRef } from 'react';
import { HotTable, HotColumn,HotRendererProps} from '@handsontable/react-wrapper';
import { Button } from 'antd';
import Handsontable from "handsontable";
import { ContextMenu } from 'handsontable/plugins';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { getOrderFeeList,getFeeNameList } from "@/api/financial_basic_data/order_fee_service";
import { OrderFeeItemProps,FeeNameItemProps } from "@/types/order_fee/order_fee";
const FeeQuickInput: React.FC = () => {
    const hotTableRef = useRef<any>(null);

    const [orderFeeList, setOrderFeeList] = useState([] as OrderFeeItemProps[]);
    // 获取order_fee数据
    useEffect(() => {
        const getData = async () => {
            const res = await getOrderFeeList();
            const orderFeeData = res?.data as OrderFeeItemProps[];
            // 设置order_fee台账数据
            setOrderFeeList([...orderFeeData]);
        };

        getData();
    }, []);

    const yellowRenderer: React.FC<HotRendererProps> = ({ instance,TD, row, col, prop, value, cellProperties }) => {
        Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, value, cellProperties);
        TD.style.backgroundColor = '#ffffbb';
        return null;
    };
    const customerRenderer: React.FC<HotRendererProps> = ({ instance,TD, row, col, prop, value, cellProperties }) => {
        Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, value, cellProperties);
            // 获取单元格元数据
        const cellMeta = instance.getCellMeta(row, col);
        console.log(cellMeta);
        // 如果单元格被修改过
        if (cellMeta.isModified) {
            TD.style.color = '#ff1648'; // 修改后的前景色
        }

        // 如果单元格是新增的
        if (cellMeta.isNew) {
            TD.style.color = '#007ace'; // 新增的前景色
        }
        return null;
    };
    const handleAfterChange = (changes: Handsontable.CellChange[] | null, source: Handsontable.ChangeSource) => {
        if (source === 'edit') {
            const hotInstance = hotTableRef.current.hotInstance;
            if (!hotInstance) {
                return;
            }
            const cellProperties:Handsontable.CellProperties[] = hotInstance.getCellsMeta();
            
            changes?.forEach(([row, prop]) => {
                const colType = cellProperties.filter((item:Handsontable.CellProperties) => {
                    return item.prop === prop.toString();
                });
                const cellMeta = hotInstance.getCellMeta(row, colType[0].col);
                cellMeta.isModified = true; // 标记为已修改
            });
            hotInstance.render(); // 重新渲染表格
        }
    };
    // 处理新增行
    const handleAfterCreateRow = (index: number, amount: number, source?: Handsontable.ChangeSource) => {
        if (source === 'ContextMenu.rowAbove' || source === 'ContextMenu.rowBelow') {
            const hotInstance = hotTableRef.current.hotInstance;
            hotInstance.getDataAtRow(index).forEach((_: any, col: number) => {
                const cellMeta = hotInstance.getCellMeta(index, col);
                cellMeta.isNew = true; // 标记为新增
            });
            hotInstance.render(); // 重新渲染表格
        }
    };
    return (
        <div className="ht-theme-main">
            <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    支持excle数据直接复制粘贴
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button>保存</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
                            <div className="u-button-group"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <HotTable
                    ref={hotTableRef}
                    data={orderFeeList}
                    height={'calc(100vh - 160px)'}
                    dropdownMenu={false}
                    hiddenColumns={{
                        indicators: true
                    }}
                    contextMenu={{
                        items: {
                            row_above: {
                                name: '在上方插入',
                            },
                            row_below: {
                                name: '在下方插入',
                            },
                            remove_row: {
                                name: '删除行',
                            },
                            copy: {
                                name: '复制行',
                            },
                            cut: {
                                name: '剪切行',
                            },

                            separator: ContextMenu.SEPARATOR,
                            clear_custom: {
                                name: '清空表格',
                                callback() {
                                    this.clear();
                                },
                            },
                        },
                    }}
                    multiColumnSorting={false}
                    filters={false}
                    rowHeaders={true}
                    headerClassName="htCenter"
                    commentedCellClassName='htLeft'
                    manualRowMove={true}
                    autoWrapRow={true}
                    navigableHeaders={true}
                    themeName="ht-theme-main"
                    afterChange={handleAfterChange}
                    afterCreateRow={handleAfterCreateRow}
                    licenseKey="non-commercial-and-evaluation"
                >
                    <HotColumn
                        data="FeeName"
                        title="费用名称"
                        className="htLeft"
                        type="autocomplete"
                        strict={true}
                        language="zh-cn"
                        width={160}
                        // renderer={yellowRenderer}
                        source={async (query: string, process: (data: string[]) => void) => {
                            // 解决单元格输入中文时，将输入法的英文拼音传入导致检索异常
                            setTimeout(async () => {
                                console.log('Delayed query:', query); // 打印延迟后的 query
                                const res = await getFeeNameList();
                                const orderFeeData = res?.data as FeeNameItemProps[];
                    
                                // 过滤数据（根据 query）
                                const filteredData = orderFeeData.filter((item) =>
                                    item.FeeDisplayName.toLowerCase().includes(query.toLowerCase())
                                );
                    
                                // 处理数据并传递给 Handsontable
                                const uniqueFeeNames = [...new Set(filteredData.map((item) => item.FeeDisplayName))];
                                process(uniqueFeeNames);
                            }, 200); // 延迟 2 秒
                        }}
                    />
                    <HotColumn data="CreditDebit" title='收|支' className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="SettlementObject" title='结算对象' className="htLeft" />
                    <HotColumn data="SettlementType" title='结算类型' className="htLeft" />
                    <HotColumn data="InvoiceTitle" title='开票抬头' className="htLeft" />
                    <HotColumn data="SettlementCompany" title='开票主体' className="htLeft" />
                    <HotColumn data="Currency" title='币制' className="htLeft" />
                    <HotColumn 
                        data="ExchangeRate" 
                        title='汇率' 
                        className="htRight" 
                        type='numeric'  
                        numericFormat={{
                            pattern: '0.000000',
                            culture: 'zh-CN'
                        }} 
                        readOnly={true} 
                        width={100} 
                    />
                    <HotColumn data="UnitPrice" title='单价' type='numeric'  
                        numericFormat={{
                            pattern: '0.0000',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="Quantity" title='数量' type='numeric'  
                        numericFormat={{
                            pattern: '0.0000',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxRate" title='税率' type='numeric'  
                        numericFormat={{
                            pattern: '0.000000',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxAmount" title='税额' type='numeric'  
                        numericFormat={{
                            pattern: '0.00',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxExcludedPrice" title='不含税金额' type='numeric'  
                        numericFormat={{
                            pattern: '0.00',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxIncludedPrice" title='含税金额' type='numeric'  
                        numericFormat={{
                            pattern: '0.00',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="Remarks" title='备注' className="htLeft" width={200} />
                    <HotColumn data="FeeId" title='费用编号' className="htLeft" readOnly={true} />
                </HotTable>
            </div>
        </div>
    )
}
export default FeeQuickInput;