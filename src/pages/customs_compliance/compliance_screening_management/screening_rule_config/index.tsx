import React, { useState } from 'react';
import { Table, Button, Tooltip, message, Modal, Form, Input, Select, Radio, Tabs, Checkbox, Slider, Row, Col } from 'antd';
import CustomIcon from '@/components/custom-icon';
import AdvancedSearchForm from '@/components/search-form';
import { getSearchFields } from './search_fields';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getColumns } from './columns';
import '@/pages/page_list.less';

interface RuleData {
  key: string;
  name: string;
  desc?: string;
  scope: string; // Summary string for display
  bizTypes?: string[];
  entities?: string[];
  countries?: string[];
  algorithm: string;
  accuracy: string; // Display string e.g. "85%"
  minScore?: number;
  lists?: string[];
  status: string;
  lastModified: string;
}

const ScreeningRuleConfig: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RuleData[]>([
    { 
        key: '1', 
        name: '标准筛查规则', 
        desc: '适用于一般进口业务的通用筛查规则',
        scope: '全部业务', 
        bizTypes: ['进口', '出口'],
        entities: ['发货人', '收货人'],
        algorithm: '模糊匹配', 
        accuracy: '85%', 
        minScore: 85,
        lists: ['UN Consolidated', 'OFAC SDN', 'EU Sanctions'],
        status: '启用', 
        lastModified: '2023-10-01' 
    },
    { 
        key: '2', 
        name: '高风险客户规则', 
        desc: '针对高风险地区或客户的严格筛查',
        scope: '特定客户', 
        bizTypes: ['出口'],
        entities: ['收货人', '通知人'],
        algorithm: '精确匹配', 
        accuracy: '95%', 
        minScore: 95,
        lists: ['OFAC SDN', 'UK HMT'],
        status: '启用', 
        lastModified: '2023-09-28' 
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useState<any>({});

  const handleSearch = (values: any) => {
    setSearchParams(values);
  };

  const filteredData = data.filter(item => {
    const matchName = !searchParams.name || item.name.toLowerCase().includes(searchParams.name.toLowerCase());
    const matchStatus = !searchParams.status || item.status === searchParams.status;
    return matchName && matchStatus;
  });

  const handleEdit = (record: RuleData) => {
    setEditingKey(record.key);
    // Transform summary fields back to form fields if needed, 
    // but here we store detailed data in record directly.
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleCopy = (record: RuleData) => {
    const newRecord = { ...record, key: Date.now().toString(), name: `${record.name} (Copy)` };
    setData([...data, newRecord]);
    message.success(i18n.t(LocaleHelper.getSuccess()));
  };

  const handleCreate = () => {
    setEditingKey(null);
    form.resetFields();
    // Set realistic defaults
    form.setFieldsValue({ 
        status: '启用', 
        minScore: 80, 
        algorithm: '模糊匹配',
        bizTypes: ['进口', '出口'],
        entities: ['发货人', '收货人'],
        lists: ['UN Consolidated', 'OFAC SDN']
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then(values => {
      const now = new Date().toISOString().split('T')[0];
      
      // Calculate summary fields for display
      const accuracy = `${values.minScore}%`;
      const scope = values.bizTypes?.length === 2 ? '全部业务' : values.bizTypes?.join(', ');

      const recordData = {
          ...values,
          accuracy,
          scope,
          lastModified: now
      };

      if (editingKey) {
        const newData = [...data];
        const index = newData.findIndex(item => item.key === editingKey);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, { ...item, ...recordData });
          setData(newData);
          message.success(i18n.t(LocaleHelper.getSuccess()));
        }
      } else {
        const newData = [...data];
        newData.push({
          key: Date.now().toString(),
          ...recordData,
        });
        setData(newData);
        message.success(i18n.t(LocaleHelper.getSuccess()));
      }
      setIsModalOpen(false);
    });
  };

  const columns = getColumns(handleEdit, handleCopy);

  const tabItems = [
    {
        key: 'basic',
        label: i18n.t(LocaleHelper.getScreeningRuleConfigTabBasic()),
        children: (
            <>
                <Form.Item name="name" label={i18n.t(LocaleHelper.getScreeningRuleConfigColName())} rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="desc" label={i18n.t(LocaleHelper.getScreeningRuleConfigFieldDesc())}>
                    <Input.TextArea rows={3} />
                </Form.Item>
                <Form.Item name="status" label={i18n.t(LocaleHelper.getScreeningRuleConfigColStatus())} rules={[{ required: true }]}>
                    <Radio.Group>
                        <Radio value="启用">{i18n.t(LocaleHelper.getScreeningRuleConfigStatusActive())}</Radio>
                        <Radio value="停用">{i18n.t(LocaleHelper.getScreeningRuleConfigStatusInactive())}</Radio>
                    </Radio.Group>
                </Form.Item>
            </>
        )
    },
    {
        key: 'scope',
        label: i18n.t(LocaleHelper.getScreeningRuleConfigTabScope()),
        children: (
            <>
                <Form.Item name="bizTypes" label={i18n.t(LocaleHelper.getScreeningRuleConfigFieldBizTypes())}>
                    <Checkbox.Group options={['进口', '出口', '转关', '国内运输']} />
                </Form.Item>
                <Form.Item name="entities" label={i18n.t(LocaleHelper.getScreeningRuleConfigFieldEntities())}>
                    <Select mode="multiple" options={[
                        { label: '发货人', value: '发货人' },
                        { label: '收货人', value: '收货人' },
                        { label: '通知人', value: '通知人' },
                        { label: '承运人', value: '承运人' },
                        { label: '支付方', value: '支付方' },
                    ]} />
                </Form.Item>
                <Form.Item name="countries" label={i18n.t(LocaleHelper.getScreeningRuleConfigFieldCountries())}>
                    <Select mode="multiple" placeholder="留空则适用于所有国家" options={[
                        { label: 'Iran', value: 'IR' },
                        { label: 'North Korea', value: 'KP' },
                        { label: 'Russia', value: 'RU' },
                        { label: 'Cuba', value: 'CU' },
                    ]} />
                </Form.Item>
            </>
        )
    },
    {
        key: 'matching',
        label: i18n.t(LocaleHelper.getScreeningRuleConfigTabMatching()),
        children: (
            <>
                <Form.Item name="algorithm" label={i18n.t(LocaleHelper.getScreeningRuleConfigFieldAlgorithm())} rules={[{ required: true }]}>
                    <Select options={[
                        { label: '模糊匹配 (Fuzzy)', value: '模糊匹配' },
                        { label: '精确匹配 (Exact)', value: '精确匹配' },
                        { label: '语音匹配 (Soundex)', value: '语音匹配' },
                    ]} />
                </Form.Item>
                <Form.Item name="minScore" label={i18n.t(LocaleHelper.getScreeningRuleConfigFieldMinScore())}>
                    <Row>
                        <Col span={12}>
                            <Slider min={0} max={100} marks={{ 0: '0', 80: '80', 100: '100' }} />
                        </Col>
                        <Col span={4}>
                            <Input value={form.getFieldValue('minScore')} style={{ marginLeft: 16 }} suffix="%" readOnly />
                        </Col>
                    </Row>
                </Form.Item>
            </>
        )
    },
    {
        key: 'lists',
        label: i18n.t(LocaleHelper.getScreeningRuleConfigTabLists()),
        children: (
            <Form.Item name="lists" label={i18n.t(LocaleHelper.getScreeningRuleConfigFieldIncludeLists())}>
                 <Select mode="multiple" style={{ width: '100%' }} options={[
                        { label: 'UN Consolidated List', value: 'UN Consolidated' },
                        { label: 'US OFAC SDN List', value: 'OFAC SDN' },
                        { label: 'EU Consolidated List', value: 'EU Sanctions' },
                        { label: 'UK HMT List', value: 'UK HMT' },
                        { label: 'AU DFAT List', value: 'AU DFAT' },
                        { label: 'World Bank Debarred', value: 'World Bank' },
                        { label: 'FBI Most Wanted', value: 'FBI Wanted' },
                    ]} />
            </Form.Item>
        )
    }
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <span>
                <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                {i18n.t(LocaleHelper.getScreeningRuleConfigPageTitle())}
                <Tooltip
                  title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                        <li style={{ marginBottom: '10px' }}>
                          <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                            <b>{i18n.t(LocaleHelper.getScreeningRuleConfigPageHelpLabel())}</b>
                          </span>
                          <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                            <li><b>{i18n.t(LocaleHelper.getScreeningRuleConfigPageHelpRole())}</b>{i18n.t(LocaleHelper.getScreeningRuleConfigPageHelpRoleDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getScreeningRuleConfigPageHelpOrigin())}</b>{i18n.t(LocaleHelper.getScreeningRuleConfigPageHelpOriginDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getScreeningRuleConfigPageHelpFunc())}</b>{i18n.t(LocaleHelper.getScreeningRuleConfigPageHelpFuncDesc())}</li>
                            <li>
                                <b>匹配算法示例：</b>
                                <ul style={{ listStyleType: 'disc', paddingLeft: '15px', marginTop: '5px' }}>
                                    <li><b>模糊匹配 (Fuzzy)：</b>阈值设为 85% 时，"International Trade Co." 可匹配 "Intl Trade Company" (相似度约 90%)；适用于拼写差异或缩写场景。</li>
                                    <li><b>精确匹配 (Exact)：</b>要求字符完全一致。"ABC Logistics" 仅匹配 "ABC Logistics"，不匹配 "ABC Logistics Inc."。</li>
                                    <li><b>语音匹配 (Soundex)：</b>基于发音相似性。"Smith" 可匹配 "Smyth" 或 "Smythe"；适用于人名拼写变体。</li>
                                </ul>
                            </li>
                          </ul>
                        </li>
                      </ol>
                    </div>
                  }
                  color='white'
                >
                  <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer', marginLeft: '10px' }}></i>
                </Tooltip>
              </span>
            </div>
          </div>
        </div>
        <div className="header-button-area">
            <span className="button-app-wrapper header-button-area-button-app-wrapper"></span>
            <div style={{ display: "flex" }}>
                <div className="buttonGroup-component">
                    <div className="u-button-group">
                        <Button type="primary" onClick={handleCreate}>{i18n.t(LocaleHelper.getScreeningRuleConfigBtnNew())}</Button>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <AdvancedSearchForm fields={getSearchFields() as any} onSearch={handleSearch} />

      <div className="nc-bill-table-area">
        <Table 
            columns={columns} 
            dataSource={filteredData} 
            loading={loading}
            bordered 
            size="small"
            pagination={{
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `Total ${total} items`,
            }}
            scroll={{ x: 'max-content', y: 'calc(100vh - 350px)' }}
        />
      </div>

      <Modal
        title={editingKey ? i18n.t(LocaleHelper.getScreeningRuleConfigBtnEdit()) : i18n.t(LocaleHelper.getScreeningRuleConfigBtnNew())}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancel}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
            <Tabs defaultActiveKey="basic" items={tabItems} />
        </Form>
      </Modal>
    </div>
  );
};

export default ScreeningRuleConfig;
