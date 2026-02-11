import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getHistoryDetail, HistoryItem } from '@/api/customs_compliance/pre_entry_classification/historical_classification_service';
import ClassificationDetailLocale from '@/utils/locale/customs_compliance/pre_entry_classification/classification_detail';
import '@/pages/page_list.less';

const HistoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HistoryItem | null>(null);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (detailId: string) => {
    setLoading(true);
    try {
      const res = await getHistoryDetail(detailId);
      if (res.success && res.data) {
        setData(res.data);
      } else {
        message.error('Failed to load detail');
      }
    } catch (error) {
      message.error('Error loading detail');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
      return <div style={{ textAlign: 'center', padding: '50px' }}><Spin /></div>;
  }

  return (
    <div style={{ height: 'calc(100vh - 80px)', overflowY: 'auto', background: '#f0f2f5' }}>
      <div className="nc-bill-header-area" style={{ background: '#fff', padding: '16px 24px', marginBottom: '16px' }}>
          <div className="header-title-search-area">
              <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn" style={{ display: 'flex', alignItems: 'center' }}>
                  <Button 
                      type="text" 
                      icon={<ArrowLeftOutlined />} 
                      onClick={handleBack} 
                      style={{ marginRight: 8, fontSize: '16px' }}
                  />
                  <span className="bill-info-title" style={{ fontSize: '20px', fontWeight: 500 }}>
                    {i18n.t(LocaleHelper.getHistoricalClassificationPageTitle())} - {i18n.t(LocaleHelper.getDetail())}
                  </span>
              </div>
          </div>
      </div>

      <div style={{ padding: '0 24px 24px' }}>
        <ProDescriptions
            title={i18n.t(ClassificationDetailLocale.getClassificationDetailBasicInfo())}
            dataSource={data || ({} as HistoryItem)}
            columns={[
                { title: i18n.t(LocaleHelper.getHistoricalClassificationInvoiceNo()), dataIndex: 'invoice_no' },
                { title: i18n.t(LocaleHelper.getHistoricalClassificationProductName()), dataIndex: 'product_name' },
                { title: i18n.t(LocaleHelper.getHistoricalClassificationHsCode()), dataIndex: 'hs_code' },
                { title: i18n.t(LocaleHelper.getHistoricalClassificationDeclaredPrice()), render: (_, r) => `${r.currency} ${r.declared_price}` },
            ]}
            column={2}
            style={{ background: '#fff', padding: '24px', marginBottom: '16px', borderRadius: '4px' }}
        />
        
        <ProDescriptions
            title={i18n.t(ClassificationDetailLocale.getClassificationDetailDeclarationInfo())}
            dataSource={data || {}}
            columns={[
                { title: i18n.t(LocaleHelper.getHistoricalClassificationEntryId()), dataIndex: 'entry_id' },
                { title: i18n.t(LocaleHelper.getHistoricalClassificationEntryDate()), dataIndex: 'entry_date' },
                { title: i18n.t(ClassificationDetailLocale.getClassificationDetailTradeMode()), dataIndex: 'trade_mode' },
            ]}
            column={2}
            style={{ background: '#fff', padding: '24px', marginBottom: '16px', borderRadius: '4px' }}
        />

        <ProDescriptions
            title={i18n.t(ClassificationDetailLocale.getClassificationDetailLogisticsInfo())}
            dataSource={data || ({} as HistoryItem)}
            columns={[
                { title: i18n.t(ClassificationDetailLocale.getClassificationDetailOriginCountry()), dataIndex: 'origin_country' },
                { title: i18n.t(ClassificationDetailLocale.getClassificationDetailDestinationCountry()), dataIndex: 'destination_country' },
                { title: i18n.t(ClassificationDetailLocale.getClassificationDetailGrossWeight()), dataIndex: 'gross_weight' },
                { title: i18n.t(ClassificationDetailLocale.getClassificationDetailNetWeight()), dataIndex: 'net_weight' },
            ]}
            column={2}
            style={{ background: '#fff', padding: '24px', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default HistoryDetail;
