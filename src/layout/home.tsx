
import '@/pages/page_list.less'
import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
const Home: React.FC = () => {
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)'}}>
            <div className='nc-bill-table-area' style={{marginTop:'40px'}}>
                <img src='/fms_workflow.svg' />
            </div>
        </div>
    )
}
export default Home;
