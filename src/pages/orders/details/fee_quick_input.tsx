import { HotTable, HotColumn } from '@handsontable/react-wrapper';
import { BaseRenderer } from 'handsontable/renderers';
import Handsontable from "handsontable";
import { ContextMenu } from 'handsontable/plugins';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';

const FeeQuickInput: React.FC = () => {

    type AddClassesToRows = (
        TD: HTMLTableCellElement,
        row: number,
        column: number,
        prop: number | string,
        value: any,
        cellProperties: Handsontable.CellProperties
    ) => void;

    const addClassesToRows: AddClassesToRows = (
        TD,
        row,
        column,
        prop,
        value,
        cellProperties
    ) => {
        // Adding classes to `TR` just while rendering first visible `TD` element
        if (column !== 0) {
            return;
        }

        const parentElement = TD.parentElement;

        if (parentElement === null) {
            return;
        }

        // Add class to odd TRs
        if (row % 2 === 0) {
            Handsontable.dom.addClass(parentElement, "odd");
        } else {
            Handsontable.dom.removeClass(parentElement, "odd");
        }
    };
    const data = [
        [
            false,
            "Tagcat",
            "United Kingdom",
            "Classic Vest",
            "11/10/2020",
            "01-2331942",
            true,
            "172",
            2,
            "39",
            7,
            2
        ],
        [
            true,
            "Zoomzone",
            "Indonesia",
            "Cycling Cap",
            "03/05/2020",
            "88-2768633",
            true,
            "188",
            6,
            "39",
            7,
            2
        ],
        [
            true,
            "Meeveo",
            "United States",
            "Full-Finger Gloves",
            "27/03/2020",
            "51-6775945",
            true,
            "162",
            1,
            "39",
            7,
            3
        ],
        [
            false,
            "Buzzdog",
            "Philippines",
            "HL Mountain Frame",
            "29/08/2020",
            "44-4028109",
            true,
            "133",
            7,
            "39",
            7,
            1
        ],
        [
            true,
            "Katz",
            "India",
            "Half-Finger Gloves",
            "02/10/2020",
            "08-2758492",
            true,
            "87",
            1,
            "39",
            7,
            3
        ],
        [
            false,
            "Jaxbean",
            "China",
            "HL Road Frame",
            "28/09/2020",
            "84-3557705",
            false,
            "26",
            8,
            "39",
            7,
            1
        ],
        [
            false,
            "Wikido",
            "Brazil",
            "HL Touring Frame",
            "24/06/2020",
            "20-9397637",
            false,
            "110",
            4,
            "39",
            7,
            1
        ],
        [
            false,
            "Browsedrive",
            "United States",
            "LL Mountain Frame",
            "13/03/2020",
            "36-0079556",
            true,
            "50",
            4,
            "39",
            7,
            4
        ],
        [
            false,
            "Twinder",
            "United Kingdom",
            "LL Road Frame",
            "06/04/2020",
            "41-1489542",
            false,
            "160",
            6,
            "39",
            7,
            1
        ],
        [
            false,
            "Jetwire",
            "China",
            "LL Touring Frame",
            "01/02/2020",
            "37-1531629",
            true,
            "30",
            8,
            "39",
            7,
            5
        ],
        [
            false,
            "Chatterpoint",
            "China",
            "Long-Sleeve Logo Jersey",
            "14/07/2020",
            "25-5083429",
            true,
            "39",
            7,
            "39",
            7,
            2
        ],
        [
            false,
            "Twinder",
            "Egypt",
            "Men's Bib-Shorts",
            "31/08/2020",
            "04-4281278",
            false,
            "96",
            6,
            "39",
            7,
            1
        ],
        [
            false,
            "Midel",
            "United States",
            "Men's Sports Shorts",
            "27/06/2020",
            "55-1711908",
            true,
            "108",
            10,
            "39",
            7,
            3
        ],
        [
            false,
            "Yodo",
            "India",
            "ML Mountain Frame",
            "16/03/2020",
            "58-8360815",
            false,
            "46",
            1,
            "39",
            7,
            1
        ],
        [
            false,
            "Camido",
            "Russia",
            "ML Mountain Frame-W",
            "13/09/2020",
            "10-3786104",
            true,
            "97",
            8,
            "39",
            7,
            3
        ],
        [
            false,
            "Eire",
            "Thailand",
            "ML Road Frame",
            "10/04/2020",
            "45-1186054",
            true,
            "161",
            1,
            "39",
            7,
            4
        ],
    ];
    const yellowRenderer: BaseRenderer = (instance, td, ...rest) => {
        Handsontable.renderers.TextRenderer(instance, td, ...rest);
        td.style.backgroundColor = '#ffffbb';
    };
    return (
        <div className="ht-theme-main">
            <div className="nc-bill-header-area">
                支持excle数据直接复制粘贴
            </div>
            <div className='nc-bill-table-area'>
                <HotTable
                    data={data}
                    height={'calc(100vh - 160px)'}
                    colWidths={[170, 222, 130, 120, 120, 130, 156, 156, 156]}
                    colHeaders={[
                        "费用名称",
                        "收支",
                        "结算对象",
                        "结算主体",
                        "币制",
                        "汇率",
                        "单价",
                        "数量",
                        "金额",
                    ]}
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
                    cells={function (_, col) {
                        if (col === 0) {
                            this.renderer = yellowRenderer;

                            return { renderer: this.renderer };
                        }

                        return {};
                    }}
                    multiColumnSorting={false}
                    filters={false}
                    rowHeaders={true}
                    headerClassName="htCenter"
                    commentedCellClassName='htLeft'
                    beforeRenderer={addClassesToRows}
                    manualRowMove={true}
                    autoWrapRow={true}
                    navigableHeaders={true}
                    themeName="ht-theme-main"
                    licenseKey="non-commercial-and-evaluation"
                >
                    <HotColumn
                        data={1}
                        className="htLeft"
                        type="dropdown"
                        strict={true}
                        // source={(query: string, process: (data: string[]) => void) => {
                        //     fetch('https://handsontable.com/docs/scripts/json/autocomplete.json')
                        //         .then((response) => response.json())
                        //         .then((response) => {
                        //             // 过滤数据（根据 query）
                        //             const filteredData = response.data.filter((item: string) =>
                        //                 item.toLowerCase().includes(query.toLowerCase())
                        //             );
                        //             // 处理数据并传递给 Handsontable
                        //             process(filteredData);
                        //         })
                        //         .catch((error) => {
                        //             console.error('Error fetching dropdown data:', error);
                        //         });
                        // }}
                    />
                    <HotColumn data={3} />
                    <HotColumn data={4} type="date" allowInvalid={false} />
                    <HotColumn data={6} type="checkbox" className="htCenter" headerClassName="htCenter" />
                    <HotColumn data={7} type="numeric" className="htRight" />
                    <HotColumn data={5} />
                    <HotColumn data={2} />
                    <HotColumn data={8} />
                    <HotColumn data={9} />
                </HotTable>
            </div>
        </div>
    )
}
export default FeeQuickInput;