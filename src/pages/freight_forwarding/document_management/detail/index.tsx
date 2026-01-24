
import React, { useEffect, useState } from 'react';
import { Button, Tabs, Spin, Space, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { DocumentService } from "@/api/freight_forwarding/document_management/document_service";
import { DocumentDetail as DocumentDetailType } from "@/types/freight_forwarding/document_management";
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import BasicInfo from './components/BasicInfo';

const { TabPane } = Tabs;

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<DocumentDetailType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      DocumentService.getDocumentDetail(id).then(res => {
        if (res.success) {
          setData(res.data);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !data) {
    return <Spin style={{ width: '100%', marginTop: 100 }} />;
  }

  return (
    <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed Header */}
      <div className="nc-bill-header-area" style={{ flexShrink: 0 }}>
        <div className="header-title-search-area">
            <div className="BillHeadInfoWrap BillHeadInfoWrap-showBackBtn">
                <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                    <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                    {i18n.t(LocaleHelper.getDocumentDetailTitle())} - {data.code}
                </span>
            </div>
        </div>
        <div className="header-button-area">
            <div className="buttonGroup-component">
                <div className="u-button-group">
                    <Button onClick={() => navigate(-1)}>Back</Button>
                    <Button type="primary" onClick={() => navigate(`/document_management/create?id=${data.id}`)}>Edit</Button>
                    <Button>Print</Button>
                    <Button>Export</Button>
                </div>
            </div>
        </div>
      </div>

      {/* Body with Scroll */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', backgroundColor: '#f0f2f5' }}>
        {/* Summary Block */}
        <div style={{ padding: '16px', background: '#fff', marginBottom: '16px', borderRadius: '4px' }}>
            <BasicInfo data={data} />
        </div>

        {/* Tabs */}
        <div style={{ background: '#fff', padding: '16px', borderRadius: '4px', minHeight: 400 }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={i18n.t(LocaleHelper.getDocumentDetailCargo())} key="1">
                    <p>Cargo Info Content Placeholder</p>
                    <p>{data.cargo || 'No cargo info'}</p>
                </TabPane>
                <TabPane tab={i18n.t(LocaleHelper.getDocumentDetailTransport())} key="2">
                    <p>Transport Info Content Placeholder</p>
                    <p>{data.transport || 'No transport info'}</p>
                </TabPane>
                <TabPane tab={i18n.t(LocaleHelper.getDocumentDetailFiles())} key="3">
                    <p>Attachments List Placeholder</p>
                    <ul>
                        {data.attachments?.map(f => <li key={f.id}>{f.name}</li>)}
                    </ul>
                </TabPane>
                <TabPane tab={i18n.t(LocaleHelper.getDocumentDetailLogs())} key="4">
                    <p>Operation Logs Placeholder</p>
                    <ul>
                        {data.logs?.map(l => <li key={l.id}>{l.time} - {l.operator} - {l.action}</li>)}
                    </ul>
                </TabPane>
                <TabPane tab={i18n.t(LocaleHelper.getDocumentDetailVersions())} key="5">
                    <p>Version History Placeholder</p>
                    <ul>
                        {data.versions?.map(v => <li key={v.id}>{v.version} - {v.create_time}</li>)}
                    </ul>
                </TabPane>
            </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
