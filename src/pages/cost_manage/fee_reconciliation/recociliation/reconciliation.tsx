import React, { useState, useEffect } from 'react';
import { Table, Upload, Button, Select, Card, Row, Col, Space, message, Spin, Tooltip } from 'antd';
import { InboxOutlined, SyncOutlined, DownloadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import * as XLSX from 'xlsx';
import './reconciliation.less';

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

const { Dragger } = Upload;

const FeeReconciliation: React.FC = () => {
  const [excelData, setExcelData] = useState<ExcelDataItem[]>([]);
  const [systemData, setSystemData] = useState<SystemDataItem[]>([]);
  const [excelColumns, setExcelColumns] = useState<any[]>([]);
  const [systemColumns, setSystemColumns] = useState<any[]>([]);
  const [matchFields, setMatchFields] = useState<MatchField[]>([{ excelField: '', systemField: '' }]);
  const [compareFields, setCompareFields] = useState<CompareField[]>([{ excelField: '', systemField: '' }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [excelHeaders, setExcelHeaders] = useState<string[]>([]);
  const [systemHeaders, setSystemHeaders] = useState<string[]>([]);
  const [matchedData, setMatchedData] = useState<{excel: ExcelDataItem, system: SystemDataItem, matched: boolean}[]>([]);

  // 模拟获取系统数据
  useEffect(() => {
    // 这里应该是从API获取系统数据
    // 模拟数据
    const mockSystemData = [
      { id: '001', billNumber: 'BL001', feeName: '装箱费', amount: 1200, currency: 'CNY', date: '2023-01-15' },
      { id: '002', billNumber: 'BL002', feeName: '报关费', amount: 800, currency: 'CNY', date: '2023-01-16' },
      { id: '003', billNumber: 'BL003', feeName: '运输费', amount: 3500, currency: 'CNY', date: '2023-01-17' },
      { id: '004', billNumber: 'BL004', feeName: '仓储费', amount: 1500, currency: 'CNY', date: '2023-01-18' },
      { id: '005', billNumber: 'BL005', feeName: '装卸费', amount: 600, currency: 'CNY', date: '2023-01-19' },
    ];

    setSystemData(mockSystemData);

    // 设置系统数据表头
    if (mockSystemData.length > 0) {
      const headers = Object.keys(mockSystemData[0]);
      setSystemHeaders(headers);

      const columns = headers.map(header => ({
        title: header,
        dataIndex: header,
        key: header,
        render: (text: any, record: any) => {
          const matchResult = getMatchResult(record, header);
          return (
            <span style={{ color: matchResult.color }}>
              {text}
            </span>
          );
        }
      }));

      setSystemColumns(columns);
    }
  }, []);

  // 更新系统列配置（当匹配字段或比较字段变化时）
  useEffect(() => {
    if (systemHeaders.length > 0) {
      const columns = systemHeaders.map(header => ({
        title: header,
        dataIndex: header,
        key: header,
        render: (text: any, record: any) => {
          const matchResult = getMatchResult(record, header);
          return (
            <span style={{ color: matchResult.color }}>
              {text}
            </span>
          );
        }
      }));

      setSystemColumns(columns);
    }
  }, [matchFields, compareFields, matchedData]);

  // 更新Excel列配置（当匹配字段或比较字段变化时）
  useEffect(() => {
    if (excelHeaders.length > 0) {
      const columns = excelHeaders.map(header => ({
        title: header,
        dataIndex: header,
        key: header,
        render: (text: any, record: any) => {
          const matchResult = getExcelMatchResult(record, header);
          return (
            <span style={{ color: matchResult.color }}>
              {text}
            </span>
          );
        }
      }));

      setExcelColumns(columns);
    }
  }, [matchFields, compareFields, matchedData]);

  // 获取匹配结果（用于渲染颜色）
  const getMatchResult = (record: SystemDataItem, field: string) => {
    // 默认黑色（未匹配）
    let result = { matched: false, color: 'black' };
    
    // 查找匹配的Excel数据
    const matchedItem = matchedData.find(item => item.system === record);
    
    if (matchedItem) {
      // 已匹配上
      result.matched = true;
      
      // 检查当前字段是否是比较字段
      const isCompareField = compareFields.some(cf => cf.systemField === field);
      
      if (isCompareField) {
        // 找到对应的Excel比较字段
        const compareField = compareFields.find(cf => cf.systemField === field);
        if (compareField) {
          const excelValue = matchedItem.excel[compareField.excelField];
          const systemValue = record[field];
          
          // 比较值是否相同
          if (excelValue === systemValue) {
            result.color = 'green'; // 相同显示绿色
          } else {
            result.color = 'red'; // 不同显示红色
          }
        }
      }
    }
    
    return result;
  };

  // 获取Excel数据匹配结果（用于渲染颜色）
  const getExcelMatchResult = (record: ExcelDataItem, field: string) => {
    // 默认黑色（未匹配）
    let result = { matched: false, color: 'black' };
    
    // 查找匹配的系统数据
    const matchedItem = matchedData.find(item => item.excel === record);
    
    if (matchedItem) {
      // 已匹配上
      result.matched = true;
      
      // 检查当前字段是否是比较字段
      const isCompareField = compareFields.some(cf => cf.excelField === field);
      
      if (isCompareField) {
        // 找到对应的系统比较字段
        const compareField = compareFields.find(cf => cf.excelField === field);
        if (compareField) {
          const excelValue = record[field];
          const systemValue = matchedItem.system[compareField.systemField];
          
          // 比较值是否相同
          if (excelValue === systemValue) {
            result.color = 'green'; // 相同显示绿色
          } else {
            result.color = 'red'; // 不同显示红色
          }
        }
      }
    }
    
    return result;
  };

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
          
          // 设置Excel表头
          if (json.length > 0) {
            const headers = Object.keys(json[0] as object);
            setExcelHeaders(headers);
            
            const columns = headers.map(header => ({
              title: header,
              dataIndex: header,
              key: header,
            }));
            
            setExcelColumns(columns);
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

  // 添加匹配字段
  const addMatchField = () => {
    setMatchFields([...matchFields, { excelField: '', systemField: '' }]);
  };

  // 更新匹配字段
  const updateMatchField = (index: number, field: 'excelField' | 'systemField', value: string) => {
    const newMatchFields = [...matchFields];
    newMatchFields[index][field] = value;
    setMatchFields(newMatchFields);
  };

  // 删除匹配字段
  const removeMatchField = (index: number) => {
    if (matchFields.length > 1) {
      const newMatchFields = [...matchFields];
      newMatchFields.splice(index, 1);
      setMatchFields(newMatchFields);
    }
  };

  // 添加比较字段
  const addCompareField = () => {
    setCompareFields([...compareFields, { excelField: '', systemField: '' }]);
  };

  // 更新比较字段
  const updateCompareField = (index: number, field: 'excelField' | 'systemField', value: string) => {
    const newCompareFields = [...compareFields];
    newCompareFields[index][field] = value;
    setCompareFields(newCompareFields);
  };

  // 删除比较字段
  const removeCompareField = (index: number) => {
    if (compareFields.length > 1) {
      const newCompareFields = [...compareFields];
      newCompareFields.splice(index, 1);
      setCompareFields(newCompareFields);
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
    const matched: {excel: ExcelDataItem, system: SystemDataItem, matched: boolean}[] = [];
    
    // 遍历Excel数据
    excelData.forEach(excelItem => {
      // 查找匹配的系统数据
      const matchedSystemItem = systemData.find(systemItem => {
        // 所有匹配字段都必须相等
        return validMatchFields.every(field => {
          const excelValue = excelItem[field.excelField];
          const systemValue = systemItem[field.systemField];
          return excelValue === systemValue;
        });
      });
      
      if (matchedSystemItem) {
        matched.push({
          excel: excelItem,
          system: matchedSystemItem,
          matched: true
        });
      } else {
        // 未匹配到系统数据
        matched.push({
          excel: excelItem,
          system: {} as SystemDataItem,
          matched: false
        });
      }
    });
    
    // 查找未匹配的系统数据
    systemData.forEach(systemItem => {
      const isMatched = matched.some(item => item.system === systemItem);
      if (!isMatched) {
        matched.push({
          excel: {} as ExcelDataItem,
          system: systemItem,
          matched: false
        });
      }
    });
    
    setMatchedData(matched);
    setLoading(false);
    message.success('对账完成');
  };

  // 导出对账结果
  const exportReconciliationResult = () => {
    if (matchedData.length === 0) {
      message.warning('没有对账结果可导出');
      return;
    }
    
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    
    // 创建Excel数据工作表
    const excelWs = XLSX.utils.json_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, excelWs, 'Excel数据');
    
    // 创建系统数据工作表
    const systemWs = XLSX.utils.json_to_sheet(systemData);
    XLSX.utils.book_append_sheet(wb, systemWs, '系统数据');
    
    // 创建对账结果工作表
    const resultData = matchedData.map(item => {
      const result: any = {};
      
      // 添加Excel数据字段
      excelHeaders.forEach(header => {
        result[`Excel_${header}`] = item.excel[header] || '';
      });
      
      // 添加系统数据字段
      systemHeaders.forEach(header => {
        result[`System_${header}`] = item.system[header] || '';
      });
      
      // 添加匹配状态
      result['匹配状态'] = item.matched ? '已匹配' : '未匹配';
      
      return result;
    });
    
    const resultWs = XLSX.utils.json_to_sheet(resultData);
    XLSX.utils.book_append_sheet(wb, resultWs, '对账结果');
    
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

  return (
    <div className="fee-reconciliation-container">
      <Spin spinning={loading}>
        <Card title="费用对账" extra={<Button type="primary" icon={<DownloadOutlined />} onClick={exportReconciliationResult}>导出对账结果</Button>}>
          <div className="upload-section">
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
              <p className="ant-upload-hint">支持 .xlsx, .xls 格式的Excel文件</p>
            </Dragger>
          </div>
          
          <div className="config-section">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="匹配字段配置" size="small" extra={<Button type="link" onClick={addMatchField}>添加</Button>}>
                  {matchFields.map((field, index) => (
                    <Row key={index} gutter={8} style={{ marginBottom: '8px' }}>
                      <Col span={10}>
                        <Select
                          placeholder="选择Excel字段"
                          style={{ width: '100%' }}
                          value={field.excelField}
                          onChange={(value) => updateMatchField(index, 'excelField', value)}
                        >
                          {excelHeaders.map(header => (
                            <Select.Option key={header} value={header}>{header}</Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={10}>
                        <Select
                          placeholder="选择系统字段"
                          style={{ width: '100%' }}
                          value={field.systemField}
                          onChange={(value) => updateMatchField(index, 'systemField', value)}
                        >
                          {systemHeaders.map(header => (
                            <Select.Option key={header} value={header}>{header}</Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={4}>
                        <Button 
                          danger 
                          type="link" 
                          disabled={matchFields.length <= 1}
                          onClick={() => removeMatchField(index)}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="比较字段配置" size="small" extra={<Button type="link" onClick={addCompareField}>添加</Button>}>
                  {compareFields.map((field, index) => (
                    <Row key={index} gutter={8} style={{ marginBottom: '8px' }}>
                      <Col span={10}>
                        <Select
                          placeholder="选择Excel字段"
                          style={{ width: '100%' }}
                          value={field.excelField}
                          onChange={(value) => updateCompareField(index, 'excelField', value)}
                        >
                          {excelHeaders.map(header => (
                            <Select.Option key={header} value={header}>{header}</Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={10}>
                        <Select
                          placeholder="选择系统字段"
                          style={{ width: '100%' }}
                          value={field.systemField}
                          onChange={(value) => updateCompareField(index, 'systemField', value)}
                        >
                          {systemHeaders.map(header => (
                            <Select.Option key={header} value={header}>{header}</Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={4}>
                        <Button 
                          danger 
                          type="link" 
                          disabled={compareFields.length <= 1}
                          onClick={() => removeCompareField(index)}
                        >
                          删除
                        </Button>
                      </Col>
                    </Row>
                  ))}
                </Card>
              </Col>
            </Row>
            
            <div className="action-section">
              <Button 
                type="primary" 
                icon={<SyncOutlined />} 
                onClick={performReconciliation}
                disabled={excelData.length === 0}
              >
                执行对账
              </Button>
              
              <Tooltip title="对比相同的显示绿色，对比不同的显示红色，没有匹配上的显示黑色">
                <Button type="link">查看颜色说明</Button>
              </Tooltip>
            </div>
          </div>
          
          <div className="result-section">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Excel数据" size="small" bodyStyle={{ maxHeight: '500px', overflow: 'auto' }}>
                  <Table 
                    dataSource={excelData} 
                    columns={excelColumns} 
                    rowKey={(record, index) => `excel_${index}`}
                    size="small"
                    pagination={{ pageSize: 10 }}
                  />
                </Card>
              </Col>
              
              <Col span={12}>
                <Card title="系统数据" size="small" bodyStyle={{ maxHeight: '500px', overflow: 'auto' }}>
                  <Table 
                    dataSource={systemData} 
                    columns={systemColumns} 
                    rowKey={(record, index) => `system_${index}`}
                    size="small"
                    pagination={{ pageSize: 10 }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default FeeReconciliation;