import React, { useState } from 'react';
import { Table, Tag, Space, Button, Tooltip, message, Drawer, Descriptions } from 'antd';
import CustomIcon from '@/components/custom-icon';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import AdvancedSearchForm from '@/components/search-form';
import { getColumns } from './columns';
import { getSearchFields } from './search_fields';

const DatabaseManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [updatingKeys, setUpdatingKeys] = useState<string[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentDetail, setCurrentDetail] = useState<any>(null);

  const handleManualUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(i18n.t(LocaleHelper.getSuccess()));
    }, 2000);
  };

  const handleRowUpdate = (key: string) => {
    setUpdatingKeys((prev) => [...prev, key]);
    setTimeout(() => {
      setUpdatingKeys((prev) => prev.filter((k) => k !== key));
      message.success(i18n.t(LocaleHelper.getSuccess()));
    }, 2000);
  };

  const handleShowDetail = (record: any) => {
    setCurrentDetail(record);
    setDetailVisible(true);
  };

  const handleCloseDetail = () => {
    setDetailVisible(false);
    setCurrentDetail(null);
  };

  const handleSearch = (values: any) => {
    console.log('Search values:', values);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success(i18n.t(LocaleHelper.getSuccess()));
    }, 500);
  };

  const data = [
    {
      key: '1',
      name: 'OFAC SDN List',
      issuingAuthority: 'US Treasury',
      type: 'Sanctions',
      version: 'v2023.10.01',
      count: '15,000',
      lastUpdate: '2023-10-01',
      status: i18n.t(LocaleHelper.getDatabaseManagementStatusNormal()),
      description: 'Specially Designated Nationals and Blocked Persons List (SDN) Human Readable Lists'
    },
    {
      key: '2',
      name: 'BIS Entity List',
      issuingAuthority: 'US Commerce',
      type: 'Export Control',
      version: 'v2023.09.28',
      count: '8,500',
      lastUpdate: '2023-09-28',
      status: i18n.t(LocaleHelper.getDatabaseManagementStatusNormal()),
      description: 'Entities subject to the Export Administration Regulations (EAR) requirements'
    },
    {
      key: '3',
      name: 'EU Consolidated List',
      issuingAuthority: 'EU Commission',
      type: 'Sanctions',
      version: 'v2023.10.05',
      count: '12,300',
      lastUpdate: '2023-10-05',
      status: i18n.t(LocaleHelper.getDatabaseManagementStatusUpdating()),
      description: 'Consolidated list of persons, groups and entities subject to EU financial sanctions'
    },
    {
      key: '4',
      name: 'UN Security Council Consolidated List',
      issuingAuthority: 'UN Security Council',
      type: 'Sanctions',
      version: 'v2023.10.02',
      count: '5,000',
      lastUpdate: '2023-10-02',
      status: i18n.t(LocaleHelper.getDatabaseManagementStatusNormal()),
      description: 'Consolidated United Nations Security Council Sanctions List'
    },
    {
      key: '5',
      name: 'FBI Most Wanted',
      issuingAuthority: 'US Justice',
      type: 'Law Enforcement',
      version: 'v2023.09.30',
      count: '500',
      lastUpdate: '2023-09-30',
      status: i18n.t(LocaleHelper.getDatabaseManagementStatusError()),
      description: 'FBI Most Wanted Terrorists and Fugitives'
    },
  ];

  return (
    <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
      <div className="nc-bill-header-area">
        <div className="header-title-search-area">
          <div className="BillHeadInfoWrap">
            <div className="bill-info-title">
              <span>
                <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px', marginRight: '8px' }} />
                {i18n.t(LocaleHelper.getDatabaseManagementPageTitle())}
                <Tooltip
                  title={
                    <div className='rul_title_tooltip' style={{ backgroundColor: '#fff', color: '#000' }}>
                      <ol style={{ color: '#666666', fontSize: '12px', paddingLeft: '2px' }}>
                        <li style={{ marginBottom: '10px' }}>
                          <span style={{ marginRight: '10px', backgroundColor: '#f1f1f1', padding: '2px 10px' }}>
                            <b>{i18n.t(LocaleHelper.getDatabaseManagementPageHelpLabel())}</b>
                          </span>
                          <ul style={{ listStyleType: 'circle', paddingLeft: '20px', marginTop: '10px', lineHeight: '1.8' }}>
                            <li><b>{i18n.t(LocaleHelper.getDatabaseManagementPageHelpRole())}</b>{i18n.t(LocaleHelper.getDatabaseManagementPageHelpRoleDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getDatabaseManagementPageHelpOrigin())}</b>{i18n.t(LocaleHelper.getDatabaseManagementPageHelpOriginDesc())}</li>
                            <li><b>{i18n.t(LocaleHelper.getDatabaseManagementPageHelpFunc())}</b>{i18n.t(LocaleHelper.getDatabaseManagementPageHelpFuncDesc())}</li>
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
                <Button onClick={() => handleSearch({})}>
                  {i18n.t(LocaleHelper.getDatabaseManagementBtnRefresh())}
                </Button>
                <Button type="primary" loading={loading} onClick={handleManualUpdate}>
                  {i18n.t(LocaleHelper.getDatabaseManagementBtnManualUpdate())}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdvancedSearchForm
        fields={getSearchFields() as any}
        onSearch={handleSearch}
      />
      <div className="nc-bill-table-area">
        <Table
          columns={getColumns(updatingKeys, handleRowUpdate, handleShowDetail)}
          dataSource={data}
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

      <Drawer
        title={i18n.t(LocaleHelper.getDatabaseManagementBtnDetails())}
        placement="right"
        onClose={handleCloseDetail}
        open={detailVisible}
        width={600}
      >
        {currentDetail && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColName())}>{currentDetail.name}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColIssuingAuthority())}>{currentDetail.issuingAuthority}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColType())}>
              <Tag>{currentDetail.type}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColVersion())}>{currentDetail.version}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColCount())}>{currentDetail.count}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColLastUpdate())}>{currentDetail.lastUpdate}</Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColStatus())}>
              <Tag color={
                currentDetail.status === i18n.t(LocaleHelper.getDatabaseManagementStatusNormal()) ? 'green' :
                  currentDetail.status === i18n.t(LocaleHelper.getDatabaseManagementStatusUpdating()) ? 'orange' : 'red'
              }>{currentDetail.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label={i18n.t(LocaleHelper.getDatabaseManagementColDescription())}>{currentDetail.description}</Descriptions.Item>
          </Descriptions>
        )}
      </Drawer>
    </div>
  );
};

export default DatabaseManagement;
