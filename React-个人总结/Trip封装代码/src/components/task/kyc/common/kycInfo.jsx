import { Descriptions } from 'antd'
import useKycInfoByTaskId from '../useKycInfoByTaskId'

export default function KycInfo(props) {
    const { processInstanceId, taskId } = props;
    const kycInfo = useKycInfoByTaskId(processInstanceId, taskId);
    const { companyName, createTime } = kycInfo && kycInfo.kycCompanyInfo || {}

    return (
        <Descriptions>
            <Descriptions.Item label="商户名称">{companyName || '--'}</Descriptions.Item>
            <Descriptions.Item label="KYC资料提交时间">{createTime || '--'}</Descriptions.Item>
        </Descriptions>
    )
}