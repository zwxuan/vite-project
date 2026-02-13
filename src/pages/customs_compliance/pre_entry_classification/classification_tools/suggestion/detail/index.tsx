import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Descriptions, Button, Card, Spin, message, Progress } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import LocaleHelper from '@/utils/locale';
import i18n from '@/i18n';
import { getSuggestionDetail } from '@/api/customs_compliance/pre_entry_classification/classification_suggestion_service';
import { ClassificationSuggestion } from '@/types/customs_compliance/pre_entry_classification/classification_suggestion';
import '@/pages/page_list.less';

const SuggestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClassificationSuggestion | null>(null);

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  const fetchData = async (detailId: string) => {
    setLoading(true);
    try {
      const res = await getSuggestionDetail(detailId);
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
      <div className="nc-bill-header-area">
          <div className="header-title-search-area">
              <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                  <span className="bill-info-title" style={{ marginLeft: '10px' }}>
                    {i18n.t(LocaleHelper.getClassificationSuggestionPageTitle())} - {i18n.t(LocaleHelper.getDetail())}
                  </span>
              </div>
          </div>
          <div className="header-button-area">
              <div className="buttonGroup-component">
                  <div className="u-button-group">
                      <Button icon={<ArrowLeftOutlined />} onClick={handleBack}>返回</Button>
                  </div>
              </div>
          </div>
      </div>

      <div style={{ padding: '24px' }}>
        <Card bordered={false}>
            {data ? (
              <Descriptions bordered column={2}>
                <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionProductName())}>
                  {data.product_name}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionHsCode())}>
                  {data.hs_code}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionConfidence())}>
                   <Progress percent={data.confidence} size="small" style={{ width: 100 }} />
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionSource())}>
                  {data.source}
                </Descriptions.Item>
                <Descriptions.Item label={i18n.t(LocaleHelper.getClassificationSuggestionCreateTime())}>
                  {data.create_time}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {data.status}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <div>No Data</div>
            )}
        </Card>
      </div>
    </div>
  );
};

export default SuggestionDetail;
