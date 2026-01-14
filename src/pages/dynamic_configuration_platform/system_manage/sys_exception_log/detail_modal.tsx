
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button, Space, DatePicker, DescriptionsProps, Descriptions } from 'antd';
import { SysExceptionLogItemProps } from "@/types/dynamic_configuration_platform/system_manage/sys_exception_log";
import dayjs from 'dayjs';
interface DetailModalProps {
    open: boolean;
    saving: boolean;
    formData: Partial<SysExceptionLogItemProps>;
    onCancel: () => void;
    onOk: (values: any) => void;
}

const DetailModal: React.FC<DetailModalProps> = ({
    open,
    saving,
    formData,
    onCancel,
    onOk,
}) => {
    const items: DescriptionsProps['items'] = [
        {
            label: '用户编码',
            span: 'filled',
            children: `${formData.UserCode || '-'}`,
        },
        {
            label: '用户名',
            span: 'filled',
            children: `${formData.UserName || '-'}`,
        },
        {
            label: '领域',
            span: 'filled',
            children: `${formData.Domain || '-'}`,
        },
        {
            label: '应用',
            span: 'filled',
            children: `${formData.Application || '-'}`,
        },
        {
            label: '服务',
            span: 'filled',
            children: `${formData.Service || '-'}`,
        },
        {
            label: '异常类型',
            span: 'filled',
            children: `${formData.ExceptionLvl || '-'}`,
        },
        {
            label: '异常信息',
            labelStyle: { width: '160px',height:'300px' },
            span: 'filled',
            children: `${formData.ExceptionMsg || '-'}`,
        },
        {
            label: '请求地址',
            span: 'filled',
            children: `${formData.RequestUrl || '-'}`,
        },
        {
            label: '请求参数',
            span: 'filled',
            children: `${formData.RequestParam || '-'}`,
        },
        {
            label: '请求头',
            span: 'filled',
            children: `${formData.RequestHeader || '-'}`,
        },
        {
            label: '请求IP',
            span: 'filled',
            children: `${formData.IpAddress || '-'}`,
        },
        {
            label: '请求时间',
            span: 'filled',
            children: `${formData.ExceptionTime ? dayjs(formData.ExceptionTime).format('YYYY-MM-DD HH:mm:ss') : '-'}`,
        },
        {
            label: '操作设备',
            span: 'filled',
            children: `${formData.OperateDevice || '-'}`,
        },
        {
            label: '状态',
            span: 'filled',
            children: `${formData.Status || '-'}`,
        },
    ];
    return (
        <Modal
            open={open}
            title={"异常日志详情"}
            onCancel={onCancel}
            width={'95%'}
            destroyOnClose={true}
            maskClosable={false}
            closable={!saving}
            footer={[
                <Button type="primary" onClick={onCancel}>
                    关闭
                </Button>,
            ]}
        >
            <div className="nc-bill-search-area" style={{ height: '650px',overflowY:'auto',overflowX:'hidden' }}>
                <Descriptions bordered size="small" items={items} />
            </div>
        </Modal>
    );
};

export default DetailModal;
