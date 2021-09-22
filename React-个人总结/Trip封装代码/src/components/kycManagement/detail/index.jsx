import { useCallback, useState } from 'react'
import { Drawer, Spin } from 'antd'
import KycInfo from "$components/kycManagement/kycInfoForm/kycInfo"
import KycInfoOverview from '$components/kycManagement/kycInfoForm/overview'
import { getKycInfo } from '$api/kyc'

export default function KycInfoDetail(props) {
    const { customerId, visible, onClose } = props;
    const [spinning, setSpinning] = useState(true)
    const queryKycInfo = useCallback(async () => {    
        if(!visible) {
            return
        }
        try {
            setSpinning(true);
            return await getKycInfo(customerId);
        } finally {
            setSpinning(false);
        }
    }, [visible, customerId]);
   
    return (
        <Drawer
            title="KYC详情"
            visible={visible}
            onClose={onClose}
            width="980px"
            >
            <Spin spinning={spinning}>
                <KycInfo queryKycInfo={queryKycInfo}>
                    <KycInfoOverview kycInfoDisabled />
                </KycInfo>
            </Spin>
        </Drawer>
    )
}