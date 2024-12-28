
import { Modal } from 'antd';
import ExcelImport from './import';
interface ModelExcelImportProps {
    open: boolean;
    businessType?: string;//后期添加实现，根据类型判断模板类型
    onCancel: () => void;
    importType: number;// 1 新增，2 覆盖更新，3 覆盖更新和新增
}
const ModelExcelImport : React.FC<ModelExcelImportProps> = ({open,onCancel,businessType,importType}) => {
    console.log(businessType);
    const handleExcelCancel = () => {
        onCancel();
    };
    return (
        <Modal open={open} title="下载/制作模板"
            onCancel={handleExcelCancel}
            width={'75%'}
            destroyOnClose={true}
            maskClosable={false}
            footer={(_) => (
            <>
            </>
            )}
        >
            <ExcelImport importType={importType} />
        </Modal>  
    )
}
export default ModelExcelImport;