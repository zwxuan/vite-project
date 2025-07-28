/**
 * @description excel自定义模板
*/
import React, { useState, useEffect } from 'react';
import { Table, Button, Checkbox, Tag, Collapse, Form, Input, Select, Row, Col, Popover, InputNumber, Space, Tooltip } from 'antd';
import type { TableColumnsType, TableProps, InputNumberProps } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { ImportTemplateFieldItem } from "@/types/dynamic_onfiguration_platform/system_manage/import_template";
import { getTemplateFieldList } from "@/api/dynamic_onfiguration_platform/basic_manage/currency_service";
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
interface CustomExcelTemplateProps {
  title: string
  readonly?: boolean
  formType?: 'add' | 'update'
}
const { Option } = Select
const CustomeExcelTemplate: React.FC<CustomExcelTemplateProps> = ({ title, readonly = false, formType = 'add' }) => {

  // 模板数据
  const [templateFieldsList, setTemplateFieldsList] = useState([] as ImportTemplateFieldItem[]);
  const [currencyKey, setCurrencyKey] = useState('');
  const [moveNumber, setMoveNumber] = useState<string | number | null>('1');
  // 获取模板数据
  useEffect(() => {
    // 获取模板字段数据
    const getData = async () => {
      const templateData = await getTemplateFieldList();
      // 设置模板字段数据
      setTemplateFieldsList([...templateData]);
    };
    getData();
  }, []);

  const handleCheckboxChange = (e: CheckboxChangeEvent, fieldName: string, key: string) => {

    const updatedTemplateFieldsList = templateFieldsList.map(field =>
      field.FieldCode === key ? { ...field, [fieldName]: e.target.checked } : field
    );
    setTemplateFieldsList(updatedTemplateFieldsList);

  };

  const handleSelectAllChange = (e: CheckboxChangeEvent, fieldName: string) => {
    const updatedTemplateFieldsList = templateFieldsList.map(field =>
      ({ ...field, [fieldName]: e.target.checked })
    );
    setTemplateFieldsList(updatedTemplateFieldsList);
  };

  const handMoveFieldOrder = (direction: 'up' | 'down' | 'move', count: number) => {
    if (currencyKey === '') return;
    const index = templateFieldsList.findIndex(field => field.FieldCode === currencyKey);
    if (index === -1) return templateFieldsList;

    let newIndex: number = 0;
    if (direction === 'move') {
      newIndex = count - 1;
    }
    else {
      newIndex = index + (direction === 'up' ? -count : count);
    }
    newIndex = Math.max(0, Math.min(newIndex, templateFieldsList.length - 1));

    const [movedField] = templateFieldsList.splice(index, 1);
    templateFieldsList.splice(newIndex, 0, movedField);

    // 更新 SerialNo 字段以保持与数组顺序一致
    const updatedTemplateFieldsList = templateFieldsList.map((field, i) => ({
      ...field,
      SerialNo: i + 1
    }));
    setTemplateFieldsList(updatedTemplateFieldsList);
  };
  const handOnMoveRowChange: InputNumberProps['onChange'] = (value) => {
    setMoveNumber(value);
  };
  const columnsType: TableColumnsType<ImportTemplateFieldItem> = [
    {
      title: '序号',
      dataIndex: 'SerialNo',
      align: 'center',
      width: '60px',
    },
    {
      title: '字段名称',
      dataIndex: 'FieldName',
      align: 'left',
      width: '100px',
    },
    {
      title: '系统必填',
      dataIndex: 'IsSystemRequired',
      align: 'center',
      width: 100,
      render: (text) => {
        if (!text) {
          return <Tag color='green'>否</Tag>;
        } else {
          return <Tag color='red'>是</Tag>;
        }
      },
    },
    {
      title: (
        <Checkbox
          checked={templateFieldsList.every(item => item.IsSetRequired)}
          indeterminate={!templateFieldsList.every(item => item.IsSetRequired) && templateFieldsList.some(item => item.IsSetRequired)}
          onChange={(e) => handleSelectAllChange(e, 'IsSetRequired')}
          disabled={readonly}
        >是否设置必填
        </Checkbox>
      ),
      render: (_, record) => (
        <Checkbox
          checked={record.IsSetRequired}
          onChange={(e) => handleCheckboxChange(e, 'IsSetRequired', record.FieldCode)}
          disabled={readonly}
        />
      ),
      align: 'center',
      width: '140px',
    },
    {
      title: (
        <Checkbox
          checked={templateFieldsList.every(item => item.IsInclude)}
          indeterminate={!templateFieldsList.every(item => item.IsInclude) && templateFieldsList.some(item => item.IsInclude)}
          onChange={(e) => handleSelectAllChange(e, 'IsInclude')}
          disabled={readonly}
        >是否列入模板
        </Checkbox>
      ),
      render: (_, record) => (
        <Checkbox
          checked={record.IsInclude}
          onChange={(e) => handleCheckboxChange(e, 'IsInclude', record.FieldCode)}
          disabled={readonly}
        />
      ),
      align: 'center',
      width: '140px',
    },
    {
      title: '组件类型',
      dataIndex: 'ComponentType',
      align: 'left',
    },
    {
      title: '字段编码',
      dataIndex: 'FieldCode',
      align: 'left',
    }
  ];

  //表格选中和取消时触发的函数
  const rowSelection: TableRowSelection<ImportTemplateFieldItem> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log('onchange');
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(selected, selectedRows, selectedRows);
      setCurrencyKey(record.FieldCode);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log('onallselect');
      console.log(selected, selectedRows, changeRows);
    },
    type: 'radio',
    columnWidth: 25,
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 280px)' }}>
      <div className="nc-bill-table-area">
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          items={[{
            key: '1', label: '模板设置',
            children: (
              <>
                <Row gutter={24} style={{ paddingRight: '6px', marginBottom: '2px' }}>
                  <Col span={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label className='item-lable-title' style={{width:'100px',textAlign:'right'}}>模板版本号</label>
                      <Input placeholder="请输入模板版本号" name='templateVersion' disabled={readonly} style={{ flex: 1 }} />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label className='item-lable-title' style={{width:'100px',textAlign:'right'}}>模板名称</label>
                      <Input placeholder="请输入模板名称" name='templateName' disabled={readonly} style={{ flex: 1 }} />
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label className='item-lable-title'style={{width:'100px',textAlign:'right'}}>模板编号</label>
                      <Input placeholder="请输入模板编号" disabled={readonly} style={{ flex: 1 }} />
                    </div>
                  </Col>
                </Row>
                <Row gutter={24} style={{ paddingRight: '6px', marginBottom: '2px' }}>
                  <Col span={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label className='item-lable-title'style={{width:'100px',textAlign:'right'}}>国家/地区</label>
                      <Select placeholder="请选择国家/地区" style={{ flex: 1 }} disabled={readonly}>
                        <Option value="China">中国</Option>
                        <Option value="USA">美国</Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <label className='item-lable-title'style={{width:'100px',textAlign:'right'}}>唯一性字段</label>
                      <Select placeholder="请选择唯一性字段" disabled={readonly} style={{ flex: 1 }}>
                        <Option value="id">id</Option>
                      </Select>

                    </div>
                  </Col>
                  <Col span={8}>
                  </Col>
                </Row>
              </>
            )
          }]}
        />
      </div>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <span className='span_custom_template_title'>{title}({formType === 'add' ? '新增' : '更新'})</span>
        </div>
        <div className="header-button-area">
          <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div className="buttonGroup-component" style={readonly ? { display: 'none' } : {}}>
              <Button style={{ margin: "0px 5px" }} onClick={() => handMoveFieldOrder('up', 1)}>上移</Button>
              <Button style={{ margin: "0px 5px" }} onClick={() => handMoveFieldOrder('down', 1)}>下移</Button>
              <Popover content={(
                <Row>
                  <Col span={24}>
                    移动到 第 <InputNumber min={1} style={{ width: '60px', marginLeft: '3px', marginRight: '3px' }} max={templateFieldsList.length} defaultValue={1} onChange={handOnMoveRowChange} />行
                    <Space style={{ marginLeft: '10px', color: '#007ace', cursor: 'pointer' }} onClick={(_) => handMoveFieldOrder('move', Number(moveNumber))}>确定</Space>
                    {/* <Space style={{marginLeft:'5px',color:'#007ace',cursor:'pointer'}}>取消</Space> */}
                  </Col>
                </Row>
              )} title="" trigger="click" placement="bottomRight">
                <Button style={{ margin: "0px 5px" }}>移动到</Button>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className='nc-bill-table-area'>
        <Table<ImportTemplateFieldItem>
          columns={columnsType}
          rowSelection={{ ...rowSelection }}
          rowKey={(record) => record.FieldCode}
          dataSource={templateFieldsList}
          pagination={false}
          scroll={{ x: 'max-content', y: 'calc(100vh - 240px)' }}
          footer={() => ''}
          showSorterTooltip={false}
          bordered={true}
        />
      </div>
    </div>


  )
}
export default CustomeExcelTemplate;