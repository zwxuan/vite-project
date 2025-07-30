import '@/pages/page_list.less';
import React, { useEffect, useState } from 'react';
import { Input, Button, Table, TableProps } from 'antd';
import { useLocation } from 'react-router-dom';
import '../tab_detail.less'
import { useTableOperations } from '@/hooks/useTableOperations';
import { getDataPermissionColumns } from '../columns';
import { DataPermissionItemProps } from '@/types/dynamic_onfiguration_platform/identity/role_manage';
import {getDataPermissionList} from '@/api/dynamic_onfiguration_platform/identity/role_manage_service';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];
const DataPermission: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orgCode = searchParams.get('orgCode');
    const [dataPermissionList, setDataPermissionList] = useState([] as DataPermissionItemProps[]);
    useEffect(() => {
        const getData = async () => {
            const dataPermissionData = await getDataPermissionList();
            setDataPermissionList([...dataPermissionData]);
        };
        getData();
    }, []);
    const newPartnerRowId = Date.now().toString();
    const dataPermissionOperations = useTableOperations({
        dataList: dataPermissionList,
        setDataList: setDataPermissionList,
        createNewRow: () => ({
            SeqNo: newPartnerRowId,
            DataFullPaths: '',
            Status: ''
        } as DataPermissionItemProps)
    });
    // 使用自定义Hook处理对比字段表格操作
    const columnsPrimaryJobType = getDataPermissionColumns(
        dataPermissionOperations.handleEdit,
        dataPermissionOperations.handleDelete,
        dataPermissionOperations.handleSave,
        dataPermissionOperations.handleCancel,
        dataPermissionOperations.editingKey
    );

    return (

        <div className='nc-bill-table-area' style={{ height: 'calc(100vh - 100px)', background: '#f9fbff' }}>
            <div style={{ textAlign: 'right', margin: '0px 4px' }}>
                <div className="u-button-group">
                    <Button type='primary' size='small' onClick={dataPermissionOperations.handleAdd}>新增</Button>
                </div>
            </div>
            <Table<DataPermissionItemProps>
                columns={columnsPrimaryJobType}
                rowKey={(record) => `${record.SeqNo}`}
                showSorterTooltip={false}
                dataSource={dataPermissionList}
                pagination={false}
                scroll={{ x: 'max-content', y: '130px' }}
                footer={() => ''}
                bordered={true}
            />
        </div>

    );
};

export default DataPermission;
