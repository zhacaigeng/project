import React, { useState, useEffect } from 'react'
import { Modal, Icon } from 'antd'
import useSupportPreview from './useSupportPreview'
import './index.scss'

export { useSupportPreview }

/**
 * 预览文件
 */
export default function PreviewFile(props) {
    const { title, name, url, children } = props;
    const [visible, setVisible] = useState(false);
    const supportPreview = useSupportPreview(url);

    function showModal() {
        setVisible(true);
    }

    function hideModal() {
        setVisible(false);
    }

    return (
        <If condition={url}>
            <span onClick={showModal}>
                {
                    children
                }
            </span>
            <Modal 
                title={title}
                visible={visible} 
                footer={null} 
                maskClosable
                onCancel={hideModal}
                width="40%"
                >
                <div className="vcc-preview-file__content">
                    <Choose>
                        <When condition={supportPreview}>                        
                            <img src={url} className="vcc-preview-file__img" />
                        </When>
                        <Otherwise>
                            <Icon type="file-image" className="vcc-preview-file__default-img"/>
                            <div className="vcc-preview-file__desc">.{(url || '').split('.').pop()}文件类型不支持预览</div>
                            <a href={url} target="_blank">下载后预览</a>                            
                        </Otherwise>
                    </Choose>
                </div>
            </Modal>
        </If>
    )
}