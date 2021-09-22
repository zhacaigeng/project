
import Form from '$components/form'

export default function ApproveFields({ disabled }) {
    return (
        <div className="vcc-kyc-form-approve-group">
            <div className="vcc-kyc-form-group-title">审批信息</div>
            <Form.Item.TextArea name="comment" label="审批意见" required disabled={disabled} />
            <Form.Item.Upload name="approveFiles" label="上传审批附件" disabled={disabled} />
        </div>
    )
}