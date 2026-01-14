import React, { useState, useEffect } from 'react';
import { Table, Upload, Button, Select, Card, Row, Col, Space, message, Spin, Tooltip, Checkbox } from 'antd';
import { InboxOutlined, SyncOutlined, DownloadOutlined, RedoOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import './reconciliation.less';
import CodeBoxMeta from '@/components/code-box-meta';
import CustomIcon from '@/components/custom-icon';
import { useNavigate } from 'react-router-dom';

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

// 移除 MatchedDataItem 接口

const { Dragger } = Upload;

const FeeReconciliation: React.FC = () => {
  const [excelData, setExcelData] = useState<ExcelDataItem[]>([]);
  const [systemData, setSystemData] = useState<SystemDataItem[]>([]);
  const [excelColumns, setExcelColumns] = useState<any[]>([]);
  const [systemColumns, setSystemColumns] = useState<any[]>([]);
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [systemHeaders, setSystemHeaders] = useState<string[]>([]);
  const navigate = useNavigate();
  const matchFields: MatchField[] = [
    { excelField: '主单号', systemField: '主单号' },
    { excelField: '费用名称', systemField: '费用名称' },
    { excelField: '币种', systemField: '币制' },
  ];
  const compareFields: CompareField[] = [
    { excelField: '含税价', systemField: '金额' },
  ];
  const handleBack = () => {
    navigate(-1);
  }
  // 模拟获取系统数据
  useEffect(() => {
    // 这里应该是从API获取系统数据
    // 模拟数据
    const mockSystemData = [
      { 对比结果: '未对账', 主单号: 'ASHAYIN200624814E', 费用名称: '装箱费', 金额: 1200, 币制: 'CNY', 日期: '2023-01-15' },
      { 对比结果: '未对账', 主单号: 'BL002', 费用名称: '报关费', 金额: 800, 币制: 'CNY', 日期: '2023-01-16' },
      { 对比结果: '未对账', 主单号: 'SHCR0W809700', 费用名称: '海运费', 金额: 12, 币制: 'USD', 日期: '2023-01-17' },
      { 对比结果: '未对账', 主单号: 'SHCR0W808600', 费用名称: '海运费', 金额: 1500, 币制: 'USD', 日期: '2023-01-18' },
      { 对比结果: '未对账', 主单号: 'BL005', 费用名称: '装卸费', 金额: 600, 币制: 'CNY', 日期: '2023-01-19' },
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
      }));

      setSystemColumns(columns);
    }
  }, []);

  // 定义系统列标题映射
  const systemTitleMap: { [key: string]: string } = {
    '对比结果': '对比结果',
    '主单号': '主单号',
    '费用名称': '费用名称',
    '金额': '金额',
    '币制': '币制',
    '日期': '日期',
  };

  // 更新系统列配置 - 使用中文标题
  useEffect(() => {
    if (systemHeaders.length > 0) {
      const columns = systemHeaders.map((header, index) => ({
        title: systemTitleMap[header] || header, // 使用映射的中文标题，如果不存在则使用原始英文标题
        dataIndex: header,
        key: header,
        width: 100,
        ...(index === 0 ? { fixed: 'left' } : {}),
        onHeaderCell: () => ({ style: { width: '100px' } }),
      }));

      setSystemColumns(columns);
    }
  }, [systemHeaders]);

  // 定义Excel列标题映射
  const excelTitleMap: { [key: string]: string } = {
    '对比结果': '对比结果',
    '主单号': '主单号',
    '费用名称': '费用名称',
    '含税价': '含税价',
    '币种': '币种',
  };

  // 更新Excel列配置 - 使用中文标题
  useEffect(() => {
    if (excelHeaders.length > 0) {
      const columns = excelHeaders.map((header, index) => ({
        title: excelTitleMap[header] || header, // 使用映射的中文标题，如果不存在则使用原始英文标题
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

          // 初始化对比结果字段
          const initialExcelData = (json as ExcelDataItem[]).map(item => ({ ...item, '对比结果': '未对账' }));
          setExcelData(initialExcelData);

          // 设置Excel表头
          if (initialExcelData.length > 0) {
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

    // 验证是否设置了匹配字段
    const validMatchFields = matchFields.filter(field => field.excelField && field.systemField);
    if (validMatchFields.length === 0) {
      message.error('请至少设置一个匹配字段');
      return;
    }

    // 验证是否设置了比较字段
    const validCompareFields = compareFields.filter(field => field.excelField && field.systemField);
    if (validCompareFields.length === 0) {
      message.error('请至少设置一个比较字段');
      return;
    }

    // 创建数据的副本以进行修改
    const updatedExcelData = [...excelData];
    const updatedSystemData = [...systemData];
    const matchedSystemIndices = new Set<number>();

    // 遍历Excel数据
    updatedExcelData.forEach((excelItem, excelIndex) => {
      let matchedSystemItem: SystemDataItem | undefined = undefined;
      let matchedSystemIndex: number | undefined = undefined;

      // 查找匹配的系统数据
      for (let i = 0; i < updatedSystemData.length; i++) {
        // 跳过已匹配的系统数据
        if (matchedSystemIndices.has(i)) continue;

        const systemItem = updatedSystemData[i];
        const isMatch = validMatchFields.every(field => {
          const excelValue = excelItem[field.excelField];
          const systemValue = systemItem[field.systemField];
          return String(excelValue) === String(systemValue);
        });

        if (isMatch) {
          matchedSystemItem = systemItem;
          matchedSystemIndex = i;
          break; // 找到第一个匹配项即可
        }
      }

      let status: MatchStatus = 'default';
      let statusText = '未对账'; // 默认状态文本

      if (matchedSystemItem !== undefined && matchedSystemIndex !== undefined) {
        matchedSystemIndices.add(matchedSystemIndex);
        // 检查比较字段是否一致
        const isEqual = validCompareFields.every(field => {
          const excelValue = excelItem[field.excelField];
          const systemValue = matchedSystemItem![field.systemField];
          return String(excelValue) === String(systemValue);
        });
        status = isEqual ? 'matched-equal' : 'matched-diff';
        statusText = isEqual ? '匹配一致' : '匹配不一致';

        // 更新系统数据的对比结果
        updatedSystemData[matchedSystemIndex]['对比结果'] = statusText;
      } else {
        // 未匹配到系统数据
        status = 'unmatched';
        statusText = '未匹配';
      }
      // 更新Excel数据的对比结果
      updatedExcelData[excelIndex]['对比结果'] = statusText;
    });

    // 处理未被匹配的系统数据
    updatedSystemData.forEach((systemItem, index) => {
      if (!matchedSystemIndices.has(index)) {
        updatedSystemData[index]['对比结果'] = '未匹配';
      }
    });

    // 更新状态以触发重新渲染
    setExcelData(updatedExcelData);
    setSystemData(updatedSystemData);
    message.success('对账完成');
  };

  // 导出对账结果
  const exportReconciliationResult = () => {
    // 检查是否有数据可导出
    if (excelData.length === 0 && systemData.length === 0) {
      message.warning('没有数据可导出');
      return;
    }

    // 创建工作簿
    const wb = XLSX.utils.book_new();

    // 创建Excel数据工作表 (已包含对比结果)
    const excelWs = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, excelWs, 'Excel数据');

    // 创建系统数据工作表 (已包含对比结果)
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

  // 移除 getExcelRowClassName 函数，因为它不再需要基于 matchedData 设置样式
  const getExcelRowClassName = (record: ExcelDataItem, index: number): string => {
    if(record.对比结果 === '未对账' || record.对比结果 === '未匹配'){
      return 'unmatched-row';
    }
    if(record.对比结果 === '匹配不一致'){
      return 'matched-diff-row';
    }
    if(record.对比结果 === '匹配一致'){
      return'matched-equal-row';
    }
    return '';
  };
  
  const getSystemRowClassName = (record: SystemDataItem, index: number): string => {
    if(record.对比结果 === '未对账' || record.对比结果 === '未匹配'){
      return 'unmatched-row';
    }
    if(record.对比结果 === '匹配不一致'){
      return 'matched-diff-row';
    }
    if(record.对比结果 === '匹配一致'){
      return'matched-equal-row';
    }
    return '';
  };

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
            <span className="bill-info-title" style={{ marginLeft: "10px" }}>
              <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} /> 自动对账
              <span style={{marginLeft:'10px',fontSize:'14px',fontWeight:'normal',color:'#007ace'}}>上海大洋行有限公司</span>
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
                      <li style={{ marginBottom: '10px' }}><span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}><b>规则说明</b></span>匹配字段和对比字段是根据对账规则引擎模版。
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
                <label style={{marginRight:'6px'}}>对账规则</label>
                <Select labelInValue style={{ textAlign: 'left', width: '160px',marginRight:'10px' }}
                  options={[
                    { label: '对账规则一', value: '对账规则一' },
                    { label: '对账规则二', value: '对账规则二' },
                    { label: '对账规则三', value: '对账规则三' },
                    { label: '对账规则四', value: '对账规则四' },
                  ]}
                >
                </Select>
                <Button type="primary" onClick={performReconciliation} disabled={excelData.length === 0}>执行对账</Button>
                <Button type="primary" danger onClick={exportReconciliationResult}>导出对账结果</Button>
                <Button onClick={handleBack}>返回</Button>
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
                    rowKey={(record, index) => `excel_${index}`}
                    pagination={false} // 如果数据量大，可以考虑分页
                    bordered
                    rowClassName={getExcelRowClassName}
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
                    rowClassName={getSystemRowClassName}
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