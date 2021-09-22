import KycInfo from "$components/kycManagement/kycInfoForm/kycInfo"
import KycInfoOverview from '$components/kycManagement/kycInfoForm/overview'
import ApproveForm from "../common/approveForm"
import { getKycInfoByTaskId } from '$api/kyc'
import ApproveLog from '../common/approveLog'

/**
 * KYC复审
 */
export default function AuditKycInfoConfirm(props) {
    const { processInstanceId, taskId } = props;
    
    function queryKycInfo() {
        return getKycInfoByTaskId(processInstanceId, taskId);
    }

    return (
        <div>
            <KycInfo queryKycInfo={queryKycInfo}>
                <KycInfoOverview kycInfoDisabled approveInfoDisabled showApproveFields />
            </KycInfo>
            <ApproveLog processInstanceId={processInstanceId} />
            <ApproveForm {...props} />
        </div>
    )
}