import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Popover } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

interface BusinessTableFooterProps {
  summaryColumns: any[]; // 您可能需要更具体的类型
  summaryData?: any[]; // 根据实际情况，您可能需要传入合计数据
  isParentTabActive?: boolean; // 新增属性，用于控制 Popover 的显示
}
// 定义 SumTableFooter 组件, 用于显示合计信息，并可以展开显示详细信息
const SumTableFooterComponent: React.FC<BusinessTableFooterProps> = ({summaryColumns, summaryData = [], isParentTabActive = true }) => {
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (!isParentTabActive) {
      setExpand(false);
    }
  }, [isParentTabActive]);

  const content = (
    <div className='nc-bill-table-area sum_table_footer' style={{margin:'0px'}} >
      <Table
        columns={summaryColumns}
        showSorterTooltip={false}
        dataSource={summaryData}
        pagination={false}
        bordered={true}
      />
    </div>

  );
  return (
    <Row gutter={24}>
      <Col span={10}>
        <span style={{ fontSize: '12px' }}>分币种应收：RMB1568739.80 USD7435355.00 分币种应付： RMB705318.30 USD50976.37</span>
      </Col>
      <Col span={2}></Col>
      <Col span={12} style={{ textAlign: 'right', position: 'relative' }}>
        <span style={{ marginRight: '10px', fontSize: '12px' }}>折合CNY应收: 55090025.00 折合CNY应付: 1067350.79 折合CNY利润: 54022674.21</span>
        <Popover style={{padding:'0px'}} open={expand}
          content={content} >
        </Popover>
        <span style={{ color: '#0073e1', cursor: 'pointer' }} onClick={() => setExpand(!expand)}>
          <i>合计详情</i>
          {expand ? <CaretUpOutlined style={{ fontSize: '16px', marginTop: '6px', color: '#0073e1' }} /> : <CaretDownOutlined style={{ fontSize: '16px', marginTop: '6px', color: '#0073e1' }} />}
        </span>
      </Col>
    </Row>
  );
};

const SumTableFooter = React.memo(SumTableFooterComponent);
export default SumTableFooter;