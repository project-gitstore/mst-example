import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import { Button, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import style from './index.module.less';
import type { RcFile, UploadProps } from 'antd/es/upload';

// import { postAction } from "Core/axios";

/**
 * 上传文件 props 与antdesin Upload props一致，并新增了一下属性
 * @param fileChange () => viod 文件上传变化时执行的函数
 * @param fileList UploadFile[] 当前文件列表
 * @param uploadBtnTitle string 上传文件按钮文案
 * @param wrongFormat string 文件格式错误提示
 * @param wrongExcess string 文件超出规定大小提示
 * @param acceptTypes string[] 支持的文件格式
 * @param maxExcess number 支持文件上传的最大限制
 * remind
*/
interface propsType {
    fileChange:Function;
    fileOption?:any;
    fileList:any;
    uploadBtnTitle?: string;
    wrongFormat?: string;
    wrongExcess?: string;
    acceptTypes?: string[];
    maxExcess?: number;
    remind?:string;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadFiles = (fileProps:propsType & any ) => {
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-xxx',
          percent: 50,
          name: 'image.png',
          status: 'uploading',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ]);
    const [responseList, setResponseList] = useState<any[]>([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const  { 
        maxCount, 
        wrongFormat, 
        wrongExcess, 
        acceptTypes, 
        maxExcess,
        remind,
        listType
    } = fileProps;

    // 获取上传文件列表
    const handleChange: UploadProps['onChange'] = info => {
        let newFileList = [...info.fileList];
        newFileList.map((f) => {
            if (f.status && f?.hasOwnProperty('response')) {
                f.status = 'done'
            } else {
                f.status = 'error'
                responseList.forEach((r) => {
                    if (r.uid === f.uid) {
                        f.response = r.response;
                        f.status = 'done'
                    }
                })
            }
        });
        let files = newFileList.filter(f => f.status === 'done');
        setFileList(newFileList);
        if (info?.file?.hasOwnProperty('response')) {
            fileProps.fileChange(files);
        }
    };

    // 上传文件之前校验
    const beforeUpload = (file: RcFile) => {
        return checkFileFormat(acceptTypes, file) && checkExcess(maxExcess, file)
    };

    // 校验是否支持文件格式
    const checkFileFormat = (acceptTypesArg:string[],fileArg:RcFile) => {
        let isFileFormat = true;
        if (acceptTypesArg?.length > 0) {
            isFileFormat = acceptTypes.includes(fileArg.type);
            if (!isFileFormat) {
              message.warning(wrongFormat ||  '上传文件格式不支持');
            }
        }
        return isFileFormat 
    }

    // 校验文件大小是否超出设定大小
    const checkExcess = (maxExcessArg:number, fileArg:RcFile) => {
        let isExcess = fileArg.size / 1024 / 1024 < maxExcessArg;
        if (!isExcess) {
            message.warning(wrongExcess || '超出上传文件大小限制');
        }
        return isExcess
    } 

    // 将图片上传到服务器并获取图片地址
    const customRequest = async (options:any) => {
        const { onSuccess, onError, file } = options;
        if (!file) {
            return false;
        }
        let formData = new FormData();
        formData.append('file',file)
        // let res = await postAction(`/management/v1/digital-content/file/upload`,formData)
        // if (res.success) {
        //     let newResponseList = responseList;
        //     newResponseList.push({uid:file.uid,response:res})
        //     setResponseList(newResponseList)
        //     onSuccess(res);
        // } else {
        //     onError(res)
        // }
    }

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const props = Object.assign({...fileProps}, {
        action: '',
        customRequest: customRequest,
        onChange: handleChange,
        beforeUpload:beforeUpload,
        onPreview: handlePreview,
        fileList:fileList
    })
    // "antd": "^5.3.1",
    // ^4.24.2

    const handleCancel = () => setPreviewOpen(false);

    const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    return (
        <div className={style.uploadFilesBox}>
            <Upload {...props} >
                { uploadButton }
                {/* {
                    listType === 'picture-circle' ?  (
                        <div><PlusOutlined  />上传文件</div>
                    ) :
                    <Button disabled = {fileList?.length >= maxCount} type='primary' icon={<PlusOutlined  />}>{fileProps.uploadBtnTitle || '上传附件'}</Button>
                } */}
            </Upload>
            <div className = {style.remind}>{remind || '支持.doc,.docx,xls,.xlsx,.pdf,.png,.jpg,.jpeg类型文件，最多20个，30M以内'}</div>
            <Modal open={previewOpen} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    ); 
}
export default UploadFiles;