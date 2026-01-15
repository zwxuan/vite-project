import React from 'react';
import { Tabs } from 'antd';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/locale';
import PendingList from './tabs/pending_list';
import ArchivedQuery from './tabs/archived_query';
import ArchiveStatistics from './tabs/statistics';
import '@/pages/page_list.less';

const WaybillArchive: React.FC = () => {
    const items = [
        {
            key: '1',
            label: i18n.t(LocaleHelper.getWaybillArchivePendingArchiveList()),
            children: <PendingList />,
        },
        {
            key: '2',
            label: i18n.t(LocaleHelper.getWaybillArchiveArchivedQuery()),
            children: <ArchivedQuery />,
        },
        {
            key: '3',
            label: i18n.t(LocaleHelper.getWaybillArchiveArchiveStats()),
            children: <ArchiveStatistics />,
        },
    ];

    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
             <div className="nc-bill-header-area">
                <div className="header-title-search-area">
                    <div className="BillHeadInfoWrap">
                        <span className="bill-info-title" style={{ marginLeft: "10px" }}>
                            <CustomIcon type="icon-Currency" style={{ color: 'red', fontSize: '24px' }} />
                            {i18n.t(LocaleHelper.getWaybillArchiveTitle())}
                        </span>
                    </div>
                </div>
            </div>
            <div style={{ padding: '0 20px' }}>
                <Tabs defaultActiveKey="1" items={items} />
            </div>
        </div>
    );
};
export default WaybillArchive;
