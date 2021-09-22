/**
 * 录入风险值
 */
import { message as messageAntd } from 'antd'
import Form from '$components/form'
import ActionsRow from '../common/actionsRow'
import { ActionPass, ActionCancel } from '../common/actions'
import ApproveLog from '../common/approveLog'
import { enterRiskScore } from '$api/kyc'
import KycInfo from './common/kycInfo'

/**
 * 如何获取custoerId, kyc创建时间, 商户名称
 * @param {*} props 
 * @returns 
 */
export default function EnterRiskScore(props) {
    const { taskId, processInstanceId, closeModal } = props;
    const initialValues = {
        riskScore: '',
        riskLevel: '',
        riskFileList: void 0
    }

    async function handleSubmit(values) {        
        try {
            let { riskScore, riskLevel, riskFileList } = values;
            riskFileList = riskFileList && riskFileList.map(({ url }) => url);
            const { code, message } = await enterRiskScore({
                taskId,
                riskScore, 
                riskLevel,
                riskFileList
            })
            if(code !== '000000') {
                throw new Error(message)
            }
            messageAntd.success('提交成功');
            closeModal && closeModal();
        } catch(e) {
            console.error(e);
            messageAntd.error('提交失败');
        }
    }

    return (
        <div>
            <KycInfo processInstanceId={processInstanceId} taskId={taskId} />
            <div className="vcc-task-panel__title">录入风险分值</div>
            <Form initialValues={initialValues} onSubmit={handleSubmit} wrapperCol={{ span: 12 }}>
                <Form.Item label="风险分数" name="riskScore" required/>
                <Form.Item.SelectRiskLevel required/>
                <Form.Item.Upload label="上传风险等级附件" name="riskFileList" required/>
                <ApproveLog processInstanceId={processInstanceId} />
                <ActionsRow>
                    <ActionPass htmlType="submit" skipConfirm/>
                    <ActionCancel onClick={closeModal} />
                </ActionsRow>
            </Form>
        </div>
    )
}