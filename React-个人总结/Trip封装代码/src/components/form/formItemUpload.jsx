import { useState } from 'react'
import { Upload, Button, Icon, Modal, Spin, message } from 'antd'
import isString from 'lodash/isString'
import FormItem from './formItem'
import { useFormikContext } from 'formik'
import { fileUpload } from '$api/depositApi'
import PreviewFile, { useSupportPreview } from '$components/common/previewFile'

/**
 * Antd file状态
 * https://3x.ant.design/components/upload-cn/#onChange
 */
const FileStatus = {
    uploading:  'uploading',
    done:       'done',
    error:      'error',
    removed:    'removed'
}

export default function FormItemUpload(props) { 
    const { label } = props;
    return (
        <FormItem {...props}>
            {
                props => <FormikUpload {...props} label={label} />
            }
        </FormItem>
    )
}

FormikUpload.defaultProps = {
    listType: 'picture',
    uploadTip: '支持的文件类型：PDF, Word, JPG, JPEG, PNG, BMP，不超过10MB',
    maxSize: 1024 * 1024 * 10,
    demoPic: '',
    demoPicBtnText: '查看示例',
    showUploadList: false,
    maxCount: 10,
    hideUploadWhenDisabled: true,
    customRequest: async function(arg) {
        const { file, onProgress, onError, onSuccess, headers} = arg;        
        try {
            const res = await fileUpload(file, { 
                headers, 
                onUploadProgress: evt => {
                    evt.percent = Math.round((evt.loaded * 100) / evt.total)
                    onProgress(evt);
                }
            });
            onSuccess(res);
        } catch(e) {
            onError(e);
            message.error('上传失败，请重试');
        }
    }
}

function FormikUpload(props) {
    const { 
        uploadDesc,
        uploadTip, 
        demoPic,
        demoPicBtnText,
        demoPicPreviewTitle,
        maxCount,
        maxSize,
        fileLabel,
        label,
        name,
        value, 
        children,
        disabled,
        beforeUpload = defaultBeforeUpload,
        hideUploadWhenDisabled,
        ...rest 
    } = props;
    const { setFieldValue } = useFormikContext();

    function defaultBeforeUpload(file, fileList) {        
        // Size
        if(maxSize && file.size > maxSize) {
            file.validateError = true;
            message.error(`文件上传失败！${uploadTip}`);
            return false;
        }
        // TODO 格式
        return true;
    }

    function handleChange({ file, fileList }) {   
        debugger             
        const { status } = file;        
        fileList = fileList.slice( maxCount ? -maxCount : 0)
        .filter(file => !file.validateError)
        .map(file => {
            if(!file.url && file.response && file.response.result) {
                file.url = file.response.result.filePath;
            }
            return file;
        });
        setFieldValue(name, fileList);
    }

    function handleDelFile(uid) {        
        const fileList = value && value.filter(file => file.uid !== uid); 
        setFieldValue(name, fileList);       
    }

    return (
        <div>
            <If condition={!!uploadDesc}>
                <p className="formik-from-upload__desc">{uploadDesc}</p>
            </If>
            <div className="formik-from-upload__tip-wrapper">
                <If condition={!!uploadTip}>
                    <p className="formik-from-upload__tip">{uploadTip}</p>
                </If>
                <If condition={demoPicBtnText && demoPic }>
                    <PreviewFile url={demoPic} title={demoPicPreviewTitle || label}>
                        <Button type="link" className="formik-from-upload__demo-btn">{demoPicBtnText}</Button>
                    </PreviewFile>          
                </If>
            </div>
            <div className="formik-from-upload__content">
                <div className="formik-from-upload__operate">
                    <label className="formik-from-upload__field-label">{fileLabel}</label>
                    <If condition={!(disabled && hideUploadWhenDisabled)}>
                        <Upload {...rest} 
                            name={name}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                            disabled={disabled} 
                            fileList={value} 
                            showUploadList={false}>
                            <Button 
                                icon="plus" 
                                disabled={disabled}
                                className="formik-from-upload__btn"
                                >添加文件</Button>
                        </Upload>
                    </If>                    
                </div>
                <Choose>
                    <When condition={value && value.length}>
                        <div className="formik-from-upload__files">
                            <For each="file" of={value}>
                                <FileItem 
                                    key={file.uid} 
                                    {...file} 
                                    disabled={disabled}
                                    onDel={() => handleDelFile(file.uid)}
                                    />
                            </For>
                        </div>
                    </When>
                    <When condition={disabled}> 
                        <span className="formik-from-upload__tip">空空如也</span>
                    </When>
                </Choose>
            </div>           
        </div>
    )
}

function FileItem(props) {
    const { onDel, disabled, uid, status, name, url } = props;
    const supportPreview = useSupportPreview(url);

    return (
        <Spin spinning={FileStatus.uploading === status} size="small">
            <div className={`formik-from-upload__file formik-from-upload__file--${status}`}>
                <div className="formik-from-upload__file-avatar">
                    <Choose>
                        <When condition={supportPreview}>
                            <img src={url} />
                        </When>
                        <Otherwise>
                            <Icon type="picture"/>
                        </Otherwise>
                    </Choose>
                </div>
                <div className="formik-from-upload__file-content">
                    <div className="formik-from-upload__file-name">{name || ''}</div>                    
                    <div className="formik-from-upload__file-op">                        
                        <PreviewFile url={url} name={name}>
                            <Button title="预览" type="link" className="formik-from-upload__file-op-btn">
                                <Icon type="eye" />
                            </Button>
                        </PreviewFile>
                        <If condition={!disabled}>
                            <Button
                                title="删除"
                                type="link" 
                                onClick={onDel}
                                className="formik-from-upload__file-op-btn">
                                <Icon type="delete" />
                            </Button>
                        </If>
                    </div>
                </div>
            </div>
        </Spin>
    )
}
