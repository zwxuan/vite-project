// InvoicePage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Typography, Input, Space, Button, Radio, Table } from 'antd';
import { HotTable, HotColumn, HotRendererProps } from '@handsontable/react-wrapper';
import Handsontable from "handsontable";
import { ContextMenu } from 'handsontable/plugins';
import 'handsontable/styles/handsontable.min.css';
import 'handsontable/styles/ht-theme-main.min.css';
import { getOrderFeeList, getFeeNameList } from "@/api/business_manage/order_fee_service";
import { OrderFeeItemProps, FeeNameItemProps } from "@/types/business_manage/order_fee/order_fee";
import '@/pages/page_list.less';
import './invoice_detail.less';
const { Title, } = Typography;
const { TextArea } = Input;

const InvoiceDetail: React.FC = () => {
  // 表格列配置
  const hotTableRef = useRef<any>(null);

  const [orderFeeList, setOrderFeeList] = useState([] as OrderFeeItemProps[]);
  // 获取order_fee数据
  useEffect(() => {
    const getData = async () => {
      const orderFeeData = await getOrderFeeList();
      // 设置order_fee台账数据
      setOrderFeeList([...orderFeeData.splice(0, 5)]);
    };

    getData();
  }, []);

  const yellowRenderer: React.FC<HotRendererProps> = ({ instance, TD, row, col, prop, value, cellProperties }) => {
    Handsontable.renderers.TextRenderer(instance, TD, row, col, prop, value, cellProperties);
    TD.style.backgroundColor = '#ffffbb';
    return null;
  };


  const customerRenderer: React.FC<HotRendererProps> = ({ instance, TD, row, col, prop, value, cellProperties }) => {
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
      const cellProperties: Handsontable.CellProperties[] = hotInstance.getCellsMeta();

      changes?.forEach(([row, prop]) => {
        const colType = cellProperties.filter((item: Handsontable.CellProperties) => {
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
    <div className="invoice-review-container" style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)',width: '80%'}}>
      {/* 头部信息 */}
      <div className="invoice-header">
        
        <Row gutter={24}>
          <Col span={8} className='company-info-left-lable'>
            <Row>发票种类：</Row>
            <Row>发票状态：</Row>
          </Col>
          <Col span={8}>
            <Title level={4} style={{color:'red',borderBottom:'3px double red',paddingBottom: '12px'}}>上海增值税普通发票</Title>
          </Col>
          <Col span={8} className='company-info-left-lable'>
            <Row gutter={24}>
              <Col span={8}></Col>
              <Col span={8}>
                发票号码：
              </Col>
              <Col span={8}></Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}></Col>
              <Col span={8}>
                发票日期：
              </Col>
              <Col span={8}></Col>
            </Row>
          </Col>
        </Row>
      </div>


      <Row gutter={24} className="company-info">
        <Col span={1} className='vertical-text'>
          代购单位
        </Col>
        <Col span={11} className='company-info-left'>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>单位名称：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>纳税人识别号：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>地址/电话：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>银行账号：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
        </Col>
        <Col span={1} className='company-info-left vertical-text'>
          密码区
        </Col>
        <Col span={11} className='company-info-left'>
          <TextArea rows={5}>密码</TextArea>
        </Col>
      </Row>
      <Row gutter={[24, 0]} className="company-info-bottom">
        <Col span={24} style={{ padding: '3px 3px' }}>
          <Space>
            <Radio.Group
              name="radiogroup"
              defaultValue={1}
              options={[
                { value: 1, label: '合并明细' },
                { value: 2, label: '显示明细' },
              ]}
            />
            <Button>新增</Button>
            <Button>删除</Button>
            <Button>更新</Button>
          </Space>
        </Col>
      </Row>
      <Row gutter={[24, 0]} className="company-info-bottom">
        <Col span={24}>
          <div className='nc-bill-table-area'>
            <HotTable
              ref={hotTableRef}
              data={orderFeeList}
              height={'200px'}
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
                width={220}
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
              <HotColumn data="CreditDebit" title='规格型号' width={180} className="htLeft" renderer={customerRenderer} />
              <HotColumn data="DomesticForeign" title='单位' type='dropdown' source={['[1]票', '[2]车']} width={100} className="htLeft" renderer={customerRenderer} />
              <HotColumn data="Quantity" title='数量' type='numeric' renderer={customerRenderer}
                numericFormat={{
                  pattern: '0.0000',
                  culture: 'zh-CN'
                }} className="htRight" width={150} />
              <HotColumn data="UnitPrice" title='单价' type='numeric' renderer={customerRenderer}
                numericFormat={{
                  pattern: '0.0000',
                  culture: 'zh-CN'
                }} className="htRight" width={150} />
              <HotColumn data="TaxExcludedPrice" title='不含税金额' type='numeric' renderer={customerRenderer}
                numericFormat={{
                  pattern: '0.00',
                  culture: 'zh-CN'
                }} className="htRight" width={150} />
              <HotColumn data="TaxRate" title='税率' type='numeric' renderer={customerRenderer}
                numericFormat={{
                  pattern: '0.000000',
                  culture: 'zh-CN'
                }} className="htRight" width={150} />
              <HotColumn data="TaxAmount" title='税额' type='numeric' renderer={customerRenderer}
                numericFormat={{
                  pattern: '0.00',
                  culture: 'zh-CN'
                }} className="htRight" width={150} />

              <HotColumn data="TaxIncludedPrice" title='合计' type='numeric' renderer={customerRenderer}
                numericFormat={{
                  pattern: '0.00',
                  culture: 'zh-CN'
                }} className="htRight" width={150} />
            </HotTable>
          </div>
        </Col>
      </Row>
      <Row gutter={[24, 0]} className="company-info-bottom">
        <Col span={3} className='company-info-left-lable'>
          价税合计（大写）
        </Col>
        <Col span={8} className='company-info-left'>
          伍万陆仟元整
        </Col>
        <Col span={4}></Col>
        <Col span={8}>
          <Space size={20}>
            <Space className='company-info-left-lable'>小写</Space> <Space>¥56,000.00</Space>
          </Space>
        </Col>
      </Row>
      <Row gutter={24} className="company-info-bottom">
        <Col span={1} className='vertical-text'>
          销货单位
        </Col>
        <Col span={11} className='company-info-left'>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>单位名称：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>纳税人识别号：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>地址/电话：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
          <Row gutter={24} className='row-margin-top1'>
            <Col span={4} className='company-info-left-lable'>银行账号：</Col>
            <Col span={20} className='company-info-left-text'>
              <Input></Input>
            </Col>
          </Row>
        </Col>
        <Col span={1} className='company-info-left vertical-text'>
          备注 财务备注
        </Col>
        <Col span={11} className='company-info-left'>
          <TextArea rows={2} value={'AFS2007004 / KMTCSHAF703978 / AFS2007004KMTC QINGDAOV.2008S / 2020-08-07SHANGHAI / LOS ANGELES,CA / LOS ANGELES,CA USD:8,000.00 / 汇率:7.00此票只收美金.'}></TextArea>
          <TextArea rows={3}>密码</TextArea>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '20px', textAlign: 'left' }}>
        <Col span={24}>
          <Space size={160} style={{color:'red'}}>
            <Space>收款人<Input></Input></Space>
            <Space>复核人<Input></Input></Space>
            <Space>开票人<Input></Input></Space>
            <Space>销货单位（章）</Space>
          </Space>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginTop: '20px',paddingTop:'20px',borderTop: '1px solid #e8e8e8' }}>
        <Col span={24}>
          <Space size={20}>
            <Space>
              <Button type='primary'>上一张</Button>
              <Button type='primary'>下一张</Button>
            </Space>
            <Space>1/2</Space>
            <Space>
              <Button type='primary'>修改备注</Button>
              <Button type='primary'>差额调整</Button>
              <Button type='primary'>下载</Button>
              <Button type='primary'>选择发票号</Button>
              <Button type='primary'>保存</Button>
              <Button type='primary'>打印</Button>
              <Button type='primary'>全部打印</Button>
              <Button type='primary'>金税导出</Button>
              <Button type='primary'>金税作废</Button>
              {/* <Button>关闭</Button> */}
            </Space>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default InvoiceDetail;