
import { useState} from 'react';
import { Modal } from 'antd';
import ExcelImportTemplate from './import_template';
interface ModelExcelImportTemplateProps {
    open: boolean;
    onCancel: () => void;
}
const ModelExcelImportTemplate : React.FC<ModelExcelImportTemplateProps> = ({open,onCancel}) => {
    const handleExcelTemplateCancel = () => {
        onCancel();
    };
    return (
        <Modal open={open} title="下载/制作模板"
            onCancel={handleExcelTemplateCancel}
            width={'75%'}
            destroyOnClose={true}
            maskClosable={false}
            footer={(_) => (
            <>
            </>
            )}
        >
            <ExcelImportTemplate />
        </Modal>  
    )
}
export default ModelExcelImportTemplate;