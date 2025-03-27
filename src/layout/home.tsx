
import '@/pages/page_list.less'
import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
import { RedoOutlined, DownOutlined, HourglassOutlined } from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
const Home: React.FC = () => {
    return (
        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: 'calc(100vh - 80px)' }}>
            <div className='nc-bill-table-area'>
                <div className='excel_step'>
                    <Steps
                        items={[
                            {
                                title: '接收委托',
                            },
                            {
                                title: '录入费用',
                            },
                            {
                                title: '费用审核',
                            },
                            {
                                title: '费用对账',
                            },
                            {
                                title: '委托完成',
                            },
                            {
                                title: '费用对账',
                            },
                            {
                                title: '滚动结账',
                            },
                        ]}
                    />
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <div className='excel_step'>
                    <Steps
                        initial={7}
                        items={[
                            {
                                title: '开票收票',
                            },
                            {
                                title: '付款申请',
                            },
                            {
                                title: '实收实付',
                            },
                            {
                                title: '销账',
                            },
                            {
                                title: '委托完成',
                            },
                            {
                                title: '费用对账',
                            },
                            {
                                title: '确认导入',
                            },
                        ]}
                    />
                </div>
            </div>
            <div className='nc-bill-table-area'>
                <div className='excel_step'>
                    <Steps
                        initial={14}
                        items={[
                            {
                                title: '生成凭证',
                            },
                            {
                                title: '发送凭证',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
export default Home;
