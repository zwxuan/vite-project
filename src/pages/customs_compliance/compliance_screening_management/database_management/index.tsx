import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import CustomIcon from '@/components/custom-icon';

const DatabaseManagement: React.FC = () => {
  const columns = [
    { title: '数据库名称', dataIndex: 'name', key: 'name' },
    { title: '版本', dataIndex: 'version', key: 'version' },
    { title: '记录数', dataIndex: 'count', key: 'count' },
    { title: '最后更新', dataIndex: 'lastUpdate', key: 'lastUpdate' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (text: string) => <Tag color="blue">{text}</Tag> },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>更新</a>
          <a>详情</a>
        </Space>
      ),
    },
  ];

  const data = [
    { key: '1', name: 'OFAC', version: 'v2023.10.01', count: '15,000', lastUpdate: '2023-10-01', status: '正常' },
    { key: '2', name: 'BIS', version: 'v2023.09.28', count: '8,500', lastUpdate: '2023-09-28', status: '正常' },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <CustomIcon type="icon-Currency" />
              <span>数据库管理</span>
            </div>
          </div>
           <div className="header-button-area">
             <div className="button-app-wrapper">
              <div className="buttonGroup-component">
                 <div className="u-button-group">
                    <Button type="primary">手动更新</Button>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nc-bill-table-area">
        <Table columns={columns} dataSource={data} bordered size="small" />
      </div>
    </div>
  );
};
export default DatabaseManagement;
