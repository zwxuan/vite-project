import React, { useState, useEffect, useRef } from 'react';
import { HotTable, HotColumn,HotRendererProps} from '@handsontable/react-wrapper';
import { Button,Tooltip } from 'antd';
import Handsontable from "handsontable";
import HyperFormula from 'hyperformula';
import { ContextMenu } from 'handsontable/plugins';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { getKpiScoreReportList } from "@/api/dynamic_onfiguration_platform/basic_manage/kpi_score_report_service";
import { KpiScoreReportItemProps } from "@/types/dynamic_onfiguration_platform/basic_manage/kpi_score_report";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import './partner_kpi_score.less'
const KPIScoreReport: React.FC = () => {
    const hotTableRef = useRef<any>(null);

    const [kpiScoreList, setKpiScoreList] = useState([] as KpiScoreReportItemProps[]);
    // 获取order_fee数据
    useEffect(() => {
        const getData = async () => {
            const kpiScoreData = await getKpiScoreReportList();
            // 设置order_fee台账数据
            setKpiScoreList([...kpiScoreData]);
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
        <div className="ht-theme-main" style={{paddingTop: '20px'}}>
            <div className='nc-bill-table-area'>
                <HotTable
                    ref={hotTableRef}
                    data={kpiScoreList}
                    height={'calc(100vh - 140px)'}
                    dropdownMenu={false}
                    formulas={{
                        engine: HyperFormula,
                    }}
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
                    <HotColumn data="AssessmentDimension" title={i18n.t(LocaleHelper.getKpiScoreReportAssessmentDimension())} className="htLeft ellipsis-cell" width={120} readOnly={true}/>
                    <HotColumn data="IndicatorKpi" title={i18n.t(LocaleHelper.getKpiScoreReportIndicatorKpi())} width={180} className="htLeft" renderer={customerRenderer} readOnly={true} />
                    <HotColumn data="Weight" title={i18n.t(LocaleHelper.getKpiScoreReportWeight())}  className="htRight"  width={160}  renderer={customerRenderer} readOnly={true} />
                    <HotColumn data="TargetValue" title={i18n.t(LocaleHelper.getKpiScoreReportTargetValue())} className="htRight" width={160} renderer={customerRenderer} readOnly={true} />
                    <HotColumn data="ActualValue" title={i18n.t(LocaleHelper.getKpiScoreReportActualValue())} className="htRight" width={160}  renderer={customerRenderer} readOnly={true} />
                    <HotColumn data="ScoringRule" title={i18n.t(LocaleHelper.getKpiScoreReportScoringRule())} className="htLeft" width={160}  renderer={customerRenderer} readOnly={true} />
                    <HotColumn data="AutoScore" title={i18n.t(LocaleHelper.getKpiScoreReportAutoScore())}  width={160}  className="htRight" renderer={customerRenderer} readOnly={true} />
                    <HotColumn data="ManualScore" title={i18n.t(LocaleHelper.getKpiScoreReportManualCorrection())}  width={160}  className="htRight cell_write_background"  />
                    <HotColumn data="FinalScore" title={i18n.t(LocaleHelper.getKpiScoreReportFinalScore())}  width={160}  className="htRight" renderer={customerRenderer}  readOnly={true} />
                </HotTable>
            </div>
        </div>
    )
}
export default KPIScoreReport;
