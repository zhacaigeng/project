import { useCallback } from 'react'
import { Modal } from 'antd'
import { getKycInfo, saveKycInfo, commitKycInfo } from '$api/kyc'
import KycInfoForm from '../kycInfoForm'
import './index.scss'

AddEditKeyModal.defaultProps = {
    title: '提交KYC信息'
}

export default function AddEditKeyModal(props) {
    const { title, visible, onCancel, onFinalCommit, customerId, ...rest } = props;   
    const queryKycInfo = useCallback(() => getKycInfo(customerId), [customerId]);

    function handleClickNext(kycInfo) {
        return saveKycInfo({ customerId, ...kycInfo })
    }

    async function handleFinalSubmit(kycInfo) {
        const res = await commitKycInfo({ customerId, ...kycInfo });
        onFinalCommit && onFinalCommit();
        return res;
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
            width={980}
            maskClosable={false}  
            > 
            <KycInfoForm queryKycInfo={queryKycInfo} onFinal={handleFinalSubmit} onNext={handleClickNext} />                                   
        </Modal>
    )
}
