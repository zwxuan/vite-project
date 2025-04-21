import React, { useState, useEffect } from 'react';
import { Table, Upload, Button, Select, Card, Row, Col, Space, message, Spin, Tooltip, Checkbox } from 'antd';
import { InboxOutlined, SyncOutlined, DownloadOutlined, RedoOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import './reconciliation.less';
import CodeBoxMeta from '@/components/code-box-meta';
import CustomIcon from '@/components/custom-icon';

interface ExcelDataItem {
  [key: string]: any;
}

interface SystemDataItem {
  [key: string]: any;
}

interface MatchField {
  excelField: string;
  systemField: string;
}

interface CompareField {
  excelField: string;
  systemField: string;
}

// 定义匹配状态类型
type MatchStatus = 'matched-equal' | 'matched-diff' | 'unmatched' | 'default';

interface MatchedDataItem {
  excel: ExcelDataItem;
  system: SystemDataItem;
  matched: boolean;
  status: MatchStatus; // 添加状态字段
}

const { Dragger } = Upload;

const FeeReconciliation: React.FC = () => {
  const [excelData, setExcelData] = useState<ExcelDataItem[]>([]);
  const [systemData, setSystemData] = useState<SystemDataItem[]>([]);
  const [excelColumns, setExcelColumns] = useState<any[]>([]);
  const [systemColumns, setSystemColumns] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [systemHeaders, setSystemHeaders] = useState<string[]>([]);
  // 更新 matchedData 状态类型
  const [matchedData, setMatchedData] = useState<MatchedDataItem[]>([]);

  const matchFields:MatchField[] = [
    { excelField: '发票号码', systemField: 'billNumber' },
    { excelField: '费用名称', systemField: 'feeName' },
    { excelField: '币种', systemField: '币制' },
  ];
  const compareFields:CompareField[] = [
    { excelField: '金额', systemField: 'amount' },
    { excelField: '单价', systemField: 'price' },
  ];
  // 模拟获取系统数据
  useEffect(() => {
    // 这里应该是从API获取系统数据
    // 模拟数据
    const mockSystemData = [
      { 对比结果: '', 主单号: 'BL001', 费用名称: '装箱费', 金额: 1200, 币制: 'CNY', 日期: '2023-01-15' },
      { 对比结果: '', 主单号: 'BL002', 费用名称: '报关费', 金额: 800, 币制: 'CNY', 日期: '2023-01-16' },
      { 对比结果: '', 主单号: 'BL003', 费用名称: '运输费', 金额: 3500, 币制: 'CNY', 日期: '2023-01-17' },
      { 对比结果: '', 主单号: 'BL004', 费用名称: '仓储费', 金额: 1500, 币制: 'CNY', 日期: '2023-01-18' },
      { 对比结果: '', 主单号: 'BL005', 费用名称: '装卸费', 金额: 600, 币制: 'CNY', 日期: '2023-01-19' },
    ];

    setSystemData(mockSystemData);

    // 设置系统数据表头 - 移除颜色渲染逻辑
    if (mockSystemData.length > 0) {
      const headers = Object.keys(mockSystemData[0]);
      setSystemHeaders(headers);

      const columns = headers.map((header, index) => ({
        title: header,
        dataIndex: header,
        key: header,
        width: 100,
        onHeaderCell: () => ({ style: { width: '100px' } }),
        ...(index === 0 ? { fixed: 'left' } : {}),
        // 移除 render 函数以取消颜色高亮
      }));

      setSystemColumns(columns);
    }
  }, []);

  // 更新系统列配置 - 移除颜色相关逻辑和依赖
  useEffect(() => {
    if (systemHeaders.length > 0) {
      const columns = systemHeaders.map((header, index) => ({
        title: header,
        dataIndex: header,
        key: header,
        width: 100,
        ...(index === 0 ? { fixed: 'left' } : {}),
        onHeaderCell: () => ({ style: { width: '100px' } }),
      }));
      
      setSystemColumns(columns);
    }
  }, [systemHeaders]);

  // 更新Excel列配置 - 移除颜色渲染逻辑
  useEffect(() => {
    if (excelHeaders.length > 0) {
      const columns = excelHeaders.map((header, index) => ({
        title: header,
        dataIndex: header,
        key: header,
        width: '100px',
        ...(index === 0 ? { fixed: 'left' } : {}),
      }));
      setExcelColumns(columns);
    }
  }, [excelHeaders]);

  // 处理Excel文件上传
  const handleExcelUpload: UploadProps['onChange'] = (info) => {
    const { status } = info.file;

    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }

    if (status === 'done') {
      message.success(`${info.file.name} 文件上传成功`);
      // 解析Excel文件
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          setExcelData(json as ExcelDataItem[]);
          setMatchedData([]); // 清空之前的对账结果

          // 设置Excel表头
          if (json.length > 0) {
            const headers = Object.keys(json[0] as object);
            headers.unshift('对比结果'); // 在数组开头添加 '对比结果'
            setExcelHeaders(headers);
          }
        } catch (error) {
          console.error('解析Excel文件失败:', error);
          message.error('解析Excel文件失败');
        }
      };
      reader.readAsArrayBuffer(info.file.originFileObj as Blob);
    } else if (status === 'error') {
      message.error(`${info.file.name} 文件上传失败`);
    }
  };

  // 执行对账
  const performReconciliation = () => {
    setLoading(true);

    // 验证是否设置了匹配字段
    const validMatchFields = matchFields.filter(field => field.excelField && field.systemField);
    if (validMatchFields.length === 0) {
      message.error('请至少设置一个匹配字段');
      setLoading(false);
      return;
    }

    // 验证是否设置了比较字段
    const validCompareFields = compareFields.filter(field => field.excelField && field.systemField);
    if (validCompareFields.length === 0) {
      message.error('请至少设置一个比较字段');
      setLoading(false);
      return;
    }

    // 执行匹配逻辑
    const newMatchedData: MatchedDataItem[] = [];
    const matchedSystemIndices = new Set<number>();

    // 遍历Excel数据
    excelData.forEach((excelItem, excelIndex) => {
      let matchedSystemItem: SystemDataItem | undefined = undefined;
      let matchedSystemIndex: number | undefined = undefined;

      // 查找匹配的系统数据
      for (let i = 0; i < systemData.length; i++) {
        const systemItem = systemData[i];
        const isMatch = validMatchFields.every(field => {
          const excelValue = excelItem[field.excelField];
          const systemValue = systemItem[field.systemField];
          // 注意：这里可能需要更复杂的比较逻辑（例如，忽略大小写、类型转换）
          return String(excelValue) === String(systemValue);
        });

        if (isMatch) {
          matchedSystemItem = systemItem;
          matchedSystemIndex = i;
          break; // 找到第一个匹配项即可
        }
      }

      let status: MatchStatus = 'default';
      if (matchedSystemItem !== undefined && matchedSystemIndex !== undefined) {
        matchedSystemIndices.add(matchedSystemIndex);
        // 检查比较字段是否一致
        const isEqual = validCompareFields.every(field => {
          const excelValue = excelItem[field.excelField];
          const systemValue = matchedSystemItem![field.systemField];
          // 注意：这里可能需要更复杂的比较逻辑
          return String(excelValue) === String(systemValue);
        });
        status = isEqual ? 'matched-equal' : 'matched-diff';
        newMatchedData.push({
          excel: excelItem,
          system: matchedSystemItem,
          matched: true,
          status: status
        });
      } else {
        // 未匹配到系统数据
        status = 'unmatched';
        newMatchedData.push({
          excel: excelItem,
          system: {} as SystemDataItem, // 空对象表示未匹配
          matched: false,
          status: status
        });
      }
    });

    setMatchedData(newMatchedData);
    setLoading(false);
    message.success('对账完成');
  };

  // 导出对账结果
  const exportReconciliationResult = () => {
    if (matchedData.length === 0 && excelData.length === 0 && systemData.length === 0) {
      message.warning('没有数据可导出');
      return;
    }

    // 创建工作簿
    const wb = XLSX.utils.book_new();

    // 创建包含状态的Excel数据工作表
    const excelDataWithStatus = excelData.map(excelItem => {
      const matchedEntry = matchedData.find(item => item.excel === excelItem);
      let statusText = '未对账';
      if (matchedEntry) {
        switch (matchedEntry.status) {
          case 'matched-equal': statusText = '匹配一致'; break;
          case 'matched-diff': statusText = '匹配不一致'; break;
          case 'unmatched': statusText = '未匹配'; break;
        }
      }
      return { ...excelItem, 对账状态: statusText };
    });
    const excelWs = XLSX.utils.json_to_sheet(excelDataWithStatus);
    XLSX.utils.book_append_sheet(wb, excelWs, 'Excel数据');

    // 创建系统数据工作表
    const systemWs = XLSX.utils.json_to_sheet(systemData);
    XLSX.utils.book_append_sheet(wb, systemWs, '系统数据');

    // 导出Excel文件
    XLSX.writeFile(wb, '对账结果.xlsx');
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.xlsx,.xls',
    customRequest: ({ file, onSuccess }) => {
      setTimeout(() => {
        onSuccess && onSuccess('ok');
      }, 0);
    },
    onChange: handleExcelUpload,
  };

  // 获取Excel表格行的类名
  const getExcelRowClassName = (record: ExcelDataItem, index: number): string => {
    return '';
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: "10px" }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 自动对账
              <Tooltip
                title={
                  <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                    <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                      <li style={{ marginBottom: '10px', color: 'green' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>绿色</b></span>表示对账结果一致。
                      </li>
                      <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>黑色</b></span>表示未找到对应费用。
                      </li>
                      <li style={{ marginBottom: '10px', color: 'red' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>红色</b></span>表示金额不一致。
                      </li>
                      <li style={{ marginBottom: '10px', color: 'orange' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>橙色</b></span>表示手工对账完成。
                      </li>
                      <li style={{ marginBottom: '10px'}}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>规则说明</b></span>匹配字段和对比字段是根据对账规则引擎模版。
                      </li>
                    </ol>
                  </div>
                }
                color='white'>
                <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
              </Tooltip>
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
            <div className="buttonGroup-component">
              <div className="u-button-group">
                <Button type="primary" onClick={performReconciliation} disabled={excelData.length === 0}>执行对账</Button>
                <Button type="primary" danger onClick={exportReconciliationResult}>导出对账结果</Button>
              </div>
            </div>
            <div className="buttonGroup-component" style={{ marginLeft: "10px" }}>
              <div className="u-button-group"></div>
            </div>
            <span className="u-button">
              <RedoOutlined className='iconfont' />
            </span>
          </div>
        </div>
      </div>
      <div className="nc-bill-search-area">
        <div className="search-area-contant">
          <div className="item-contant" style={{ display: "block", textAlign: "left" }}>
            <Space>
              <Checkbox.Group
                name="radiogroup"
                defaultValue={[1]}
                options={[
                  { value: 1, label: '显示对账全部费用' },
                  { value: 2, label: '显示对账一致费用' },
                  { value: 3, label: '显示对账不一致费用' },
                  { value: 4, label: '显示未匹配费用' },
                ]}
              />
            </Space>
          </div>
        </div>
      </div>
      <div className='nc-bill-table-area'>
        <div className="upload-section">
          <Dragger {...uploadProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
            <p className="ant-upload-hint">支持 .xlsx, .xls 格式的Excel文件</p>
          </Dragger>
        </div>
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <CodeBoxMeta title='Excel导入数据'>
                <div style={{ textAlign: 'left', margin: '6px 4px' }}>

                </div>
                <div className='nc-bill-table-area'>
                  <Table
                    dataSource={excelData}
                    columns={excelColumns}
                    rowKey={(record, index) => `excel_${index}`} // 使用字符串作为唯一标识符
                    pagination={false} // 如果数据量大，可以考虑分页
                    bordered
                    scroll={{ x: 'max-content', y: 'calc(100vh - 580px)' }}
                  />
                </div>
              </CodeBoxMeta>
            </Col>

            <Col span={12}>
              <CodeBoxMeta title='系统数据'>
                <div style={{ textAlign: 'left', margin: '6px 4px' }}>

                </div>
                <div className='nc-bill-table-area'>
                  <Table
                    dataSource={systemData}
                    columns={systemColumns}
                    rowKey={(record, index) => `system_${index}`}
                    pagination={false}
                    bordered
                    // rowClassName={getExcelRowClassName} // 应用行样式
                    scroll={{ x: 'max-content', y: 'calc(100vh - 580px)' }}
                  />
                </div>
              </CodeBoxMeta>
            </Col>
          </Row>
        </div>
      </div>

    </div>
  );
};

export default FeeReconciliation;