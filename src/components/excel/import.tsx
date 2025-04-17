import React, { useState } from 'react';
import { Row, Col,Steps,Button,Upload,message,Tooltip,Radio } from 'antd';
import { FundViewOutlined,InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
const { Dragger } = Upload;
interface ExcelImportProps {
    importType: number;// 1 新增，2 覆盖更新，3 覆盖更新和新增
}
const ExcelImport: React.FC<ExcelImportProps> = ({ importType }) => {
    const [current, setCurrent] = useState(1);

    const onChange = (value: number) => {
      console.log('onChange:', value);
      setCurrent(value);
    };

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        accept:".xls,.xlsx",
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };
    // 币制数据
    return (
        <>
            <Row>
                <Col span={24}>
                    <div className='excel_step'>
                        <Steps
                            current={current}
                            onChange={onChange}
                            items={[
                            {
                                title: "文件上传",
                            },
                            {
                                title: '前置校验',
                            },
                            {
                                title: '确认导入',
                            },
                            ]}
                        />
                    </div>
                    <div className='excel_desc'>
                        <p>文件导入注意事项</p>
                        <p>1. 支持.xlsx格式/zip附件文件；文件大小在1GB以内，若超出限制，建议分批导入；</p>
                        <p>2. 手工码说明：用来表示不同页签的数据之间的关联关系，手工码的值不会保存到数据库；</p>
                        <p>3. 更多导入功能和模板配置说明，请查看帮助文档。</p>
                    </div>
                    <div className='excel_rule'>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <span className='rule_tilte_info'>
                                导入规则
                                <Tooltip
                                    title={
                                        <div className='rul_title_tooltip' style={{backgroundColor:'#fff',color:'#000'}}>
                                            <ol style={{color:'#666666',fontSize:'12px',paddingLeft:'2px'}}>
                                                <li style={{marginBottom:'10px'}}><span style={{marginRight:'10px',backgroundColor:'#f1f1f1',padding:'2px 10px'}}><b>新增</b></span>根据唯一性校验字段，将Excel模板中录入的数据按新增规则进行校验入库。
                                                </li>
                                                <li style={{marginBottom:'10px'}}><span style={{marginRight:'10px',backgroundColor:'#f1f1f1',padding:'2px 10px'}}><b>覆盖更新</b></span>根据唯一性校验字段，覆盖更新系统中已存在的数据。例如，如果Excel模板中某行某单元格含有空格，系统中对应行有数据，选择覆盖更新后会清空已有数据。
                                                </li>
                                                <li style={{marginBottom:'10px'}}><span style={{marginRight:'10px',backgroundColor:'#f1f1f1',padding:'2px 10px'}}><b>覆盖更新和新增</b></span>根据唯一性校验字段判断系统中的数据，进行覆盖更新或新增操作。例如，Excel模板含有11条数据，其中10条在系统中已存在，1条是新增数据。选择【覆盖更新和新增】后，10条已有数据将被覆盖更新，另外1条将以新增方式保存入库。
                                                </li>
                                            </ol>
                                        </div>
                                    }
                                    color='white'
                                    overlayInnerStyle={{width:'400px'}}
                                    >
                                    <i className='iconfont icon-bangzhutishi' style={{ cursor: 'pointer' }}></i>
                                </Tooltip>
                            </span>
                            <span className='rule_tilte_info'>
                                <Radio.Group name="radiogroup" defaultValue={importType} disabled>
                                    <Radio value={1}>新增</Radio>
                                    <Radio value={2}>覆盖更新</Radio>
                                    <Radio value={3}>覆盖更新和新增</Radio>
                                </Radio.Group>
                            </span> 
                        </div>
                        <div style={{display:'flex',alignItems:'center',marginRight:'15px'}}>
                            <Button style={{marginRight:'10px'}}>查看导入日志</Button>
                            <FundViewOutlined style={{fontSize:'16px'}} />
                        </div>
                    </div>
                    <div className='excel_upload'>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">拖拽或点击上传</p>
                            <p className="ant-upload-hint">
                                支持.xlsx格式/zip附件文件；文件大小在1GB以内，若超出限制，建议分批导入；
                            </p>
                        </Dragger>
                    </div>
                </Col>
            </Row>
            <Row style={{height:'200px'}}>
            
            </Row>
        </>
    )
}
export default ExcelImport;