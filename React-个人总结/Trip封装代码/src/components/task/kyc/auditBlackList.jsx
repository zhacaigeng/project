/**
 * 中黑后合规审批
 */
import ApproveLog from '../common/approveLog'
import List from '$components/common/list'
import { ActionPass, ActionReject } from '../common/actions'
import ActionWrapper from '../common/actionsRow'
import { useApproveHandle } from '../common/approveForm'
import useKycInfoByTaskId from './useKycInfoByTaskId'
import KycInfo from './common/kycInfo'

const tableCols = [
    { 
        title: '中黑名单',
        dataIndex: 'name'
    },
    {
        title: '中黑详情',
        dataIndex: 'blackInfo'
    }
];

export default function AuditBlackList(props) {
    const { processInstanceId, taskId, formUrl, closeModal } = props;
    const { handleApprovePass, handleApproveReject } = useApproveHandle({ taskId, formUrl, onSuccess: closeModal })
    const kycInfo = useKycInfoByTaskId(processInstanceId, taskId);
    const { kycScreenInfo } = kycInfo || {};
    const { riskCheckDetail } = kycScreenInfo || {};

    return (
        <div>
            <KycInfo processInstanceId={processInstanceId} taskId={taskId} />
            <div className="vcc-task-panel__title">排黑详情</div>
            <List 
                columns={tableCols}
                rowKey={record => record}
                dataSource={riskCheckDetail}
                pagination={false}
            />
            <ApproveLog processInstanceId={processInstanceId} />
            <ActionWrapper>
                <ActionPass onClick={handleApprovePass} />
                <ActionReject onClick={handleApproveReject} />
            </ActionWrapper>
        </div>
    );
}