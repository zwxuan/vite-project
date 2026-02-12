import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Button, Descriptions } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
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
        <Descriptions
            title={i18n.t(ClassificationDetailLocale.getClassificationDetailBasicInfo())}
            bordered
            items={[
                { label: i18n.t(LocaleHelper.getHistoricalClassificationInvoiceNo()), children: data?.invoice_no || '-' },
                { label: i18n.t(LocaleHelper.getHistoricalClassificationProductName()), children: data?.product_name || '-' },
                { label: i18n.t(LocaleHelper.getHistoricalClassificationHsCode()), children: data?.hs_code || '-' },
                { label: i18n.t(LocaleHelper.getHistoricalClassificationDeclaredPrice()), children: `${data?.currency || '-'} ${data?.declared_price || '-'}` },
            ]}
            column={2}
            style={{ background: '#fff', padding: '24px', marginBottom: '16px', borderRadius: '4px' }}
        />
        
        <Descriptions
            title={i18n.t(ClassificationDetailLocale.getClassificationDetailDeclarationInfo())}
            bordered
            items={[
                { label: i18n.t(LocaleHelper.getHistoricalClassificationEntryId()), children: data?.entry_id || '-' },
                { label: i18n.t(LocaleHelper.getHistoricalClassificationEntryDate()), children: data?.entry_date || '-' },
                { label: i18n.t(ClassificationDetailLocale.getClassificationDetailTradeMode()), children: data?.trade_mode || '-' },
            ]}
            column={2}
            style={{ background: '#fff', padding: '24px', marginBottom: '16px', borderRadius: '4px' }}
        />

        <Descriptions
            title={i18n.t(ClassificationDetailLocale.getClassificationDetailLogisticsInfo())}
            bordered
            items={[
                { label: i18n.t(ClassificationDetailLocale.getClassificationDetailOriginCountry()), children: data?.origin_country || '-' },
                { label: i18n.t(ClassificationDetailLocale.getClassificationDetailDestinationCountry()), children: data?.destination_country || '-' },
                { label: i18n.t(ClassificationDetailLocale.getClassificationDetailGrossWeight()), children: `${data?.gross_weight || '-'}` },
                { label: i18n.t(ClassificationDetailLocale.getClassificationDetailNetWeight()), children: `${data?.net_weight || '-'}` },
            ]}
            column={2}
            style={{ background: '#fff', padding: '24px', borderRadius: '4px' }}
        />
      </div>
    </div>
  );
};

export default HistoryDetail;
