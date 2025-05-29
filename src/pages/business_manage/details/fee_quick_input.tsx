import React, { useState, useEffect, useRef } from 'react';
import { HotTable, HotColumn,HotRendererProps} from '@handsontable/react-wrapper';
import { Button,Tooltip } from 'antd';
import Handsontable from "handsontable";
import { ContextMenu } from 'handsontable/plugins';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { getOrderFeeList,getFeeNameList } from "@/api/business_manage/order_fee_service";
import { OrderFeeItemProps,FeeNameItemProps } from "@/types/business_manage/order_fee";
const FeeQuickInput: React.FC = () => {
    const hotTableRef = useRef<any>(null);

    const [orderFeeList, setOrderFeeList] = useState([] as OrderFeeItemProps[]);
    // 获取order_fee数据
    useEffect(() => {
        const getData = async () => {
            const orderFeeData = await getOrderFeeList();
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
        // 如果单元格被修改过
        if (cellMeta.isModified) {
            TD.style.color = '#ff1648'; // 修改后的前景色
        }

        // 如果单元格是新增的
        if (cellMeta.isNew) {
            TD.style.color = '#007ace'; // 新增的前景色
        }
        if (cellProperties.type === 'dropdown') {
            // 手动添加自动完成箭头元素
            const arrowDiv = document.createElement('div');
            arrowDiv.className = 'htAutocompleteArrow';
            arrowDiv.setAttribute('aria-hidden', 'true');
            arrowDiv.textContent = '▼';
            TD.appendChild(arrowDiv);
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
                </div>
                <div className="header-button-area">
                    <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
                    <div style={{ display: "flex" }}>
                        <div className="buttonGroup-component">
                            <div className="u-button-group">
                                <Button type="primary" danger >保存</Button>
                            </div>
                        </div>
                        <div className="buttonGroup-component" style={{ marginLeft: "5px" }}>
                            <div className="u-button-group">
                            <Tooltip
                                    title={
                                        <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000'}}>
                                            <ol style={{ color: '#666666', fontSize: '12px' }}>
                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>复制</b></span>支持excle数据直接复制粘贴。</li>
                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>下拉</b></span>支持下拉复制当前行数据填充。</li>
                                                <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>右键</b></span>支持右键菜单功能。</li>
                                            </ol>
                                        </div>
                                    }
                                    color='white'
                                    placement='leftTop'
                                >
                                    <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer',fontSize:'14px' }}></i>
                                </Tooltip>
                            </div>
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
                    rowHeaderWidth={35}
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
                        className="htLeft ellipsis-cell"
                        type="dropdown"
                        strict={true}
                        language="zh-cn"
                        width={120}
                        // renderer={yellowRenderer}
                        source={async (query: string, process: (data: string[]) => void) => {
                            // 解决单元格输入中文时，将输入法的英文拼音传入导致检索异常
                            setTimeout(async () => {
                                console.log('Delayed query:', query); // 打印延迟后的 query
                                const orderFeeData = await getFeeNameList();
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
                    <HotColumn data="CreditDebit" title='收|支' type='dropdown' width={80} source={['[1]收','[2]付']} className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="DomesticForeign" title='国内|国外' type='dropdown' source={['[1]国内','[2]国外']} className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="SettlementObject" title='结算对象' className="htLeft" width={160} renderer={customerRenderer}  />
                    <HotColumn data="SettlementType" title='结算类型' className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="InvoiceTitle" title='开票抬头' className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="SettlementCompany" title='开票主体'  width={160}  className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="ServiceType" type="dropdown" title='服务类型'  source={['[1]海运服务','[2]空运服务','[3]报关服务','[4]仓储服务','[5]陆运服务','[6]铁运服务']}  width={120}  className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="ServiceNumber" title='服务编号'  width={120}  className="htLeft" renderer={customerRenderer}  />
                    <HotColumn data="Currency" title='币制' className="htLeft" renderer={customerRenderer}  />
                    <HotColumn 
                        data="ExchangeRate" 
                        title='汇率' 
                        className="htRight" 
                        type='numeric'  
                        numericFormat={{
                            pattern: '0.000000',
                            culture: 'zh-CN'
                        }} 
                        renderer={customerRenderer} 
                        width={100} 
                    />
                    <HotColumn data="UnitPrice" title='单价' type='numeric'   renderer={customerRenderer} 
                        numericFormat={{
                            pattern: '0.0000',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="Quantity" title='数量' type='numeric'   renderer={customerRenderer} 
                        numericFormat={{
                            pattern: '0.0000',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxRate" title='税率' type='numeric'   renderer={customerRenderer} 
                        numericFormat={{
                            pattern: '0.000000',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxAmount" title='税额' type='numeric'   renderer={customerRenderer} 
                        numericFormat={{
                            pattern: '0.00',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxExcludedPrice" title='不含税金额' type='numeric'   renderer={customerRenderer} 
                        numericFormat={{
                            pattern: '0.00',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="TaxIncludedPrice" title='含税金额' type='numeric'   renderer={customerRenderer} 
                        numericFormat={{
                            pattern: '0.00',
                            culture: 'zh-CN'
                        }} className="htRight" width={100} />
                    <HotColumn data="Remarks" title='备注' className="htLeft" width={200}  renderer={customerRenderer} />
                    <HotColumn data="FeeId" title='费用编号' className="htLeft" readOnly={true}  renderer={customerRenderer} />
                </HotTable>
            </div>
        </div>
    )
}
export default FeeQuickInput;
