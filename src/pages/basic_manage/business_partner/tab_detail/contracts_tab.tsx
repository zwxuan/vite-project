
import '@/pages/page_list.less';
import React, { useState,useEffect } from 'react';
import { Table,Button,Dropdown, Space,Modal,Form,Input,InputNumber,Select,Progress,notification, Radio } from 'antd';
import type { MenuProps,TableProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ContractsManageItemProps } from "@/types/basic_manage/contracts_manage";
import { getContractsManageList,saveContractsManage } from "@/api/basic_manage/contracts_manage_service";
import { requestWithProgress } from "@/api/request";
import {RedoOutlined,DownOutlined,HourglassOutlined} from '@ant-design/icons';
import CustomIcon from "@/components/custom-icon";
import i18n from '@/i18n';
import LocaleHelper from '@/utils/localeHelper';
import {getContractsColumns } from './columns';

const Contracts : React.FC = () => {

    // 合同管理数据
    const [contractsManageList, setContractsManageList] = useState([] as ContractsManageItemProps[]);
    
    // 获取合同管理数据
    useEffect(() => {
        const getData = async () => {
            const contractsManageData = await getContractsManageList();
            // 设置合同管理台账数据
            setContractsManageList([...contractsManageData]);
        };
        getData();
    }, []);
    
    const columnsType = getContractsColumns(()=>{}, ()=>{});
    

    


    return (
        <div  style={{overflowY: 'auto',overflowX:'hidden', height: 'calc(100vh - 120px)'}}>
            <div className='nc-bill-table-area'>
                <Table<ContractsManageItemProps>
                    columns={columnsType}
                    rowKey={(record) => `${record.ContractId}`}
                    showSorterTooltip={false}
                    dataSource={contractsManageList}
                    loading={contractsManageList.length === 0}
                    pagination={false}
                    scroll={{ x: 'max-content', y: 'calc(100vh - 340px)' }}
                    footer={() => '底部汇总信息'}
                    bordered={true}
                />
            </div>
        </div>
        
        
    )
}
export default Contracts;
