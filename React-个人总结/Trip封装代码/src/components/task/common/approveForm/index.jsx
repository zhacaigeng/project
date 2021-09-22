import { useRef, useCallback } from 'react'
import { message } from 'antd'
import Form from '$components/form'
import { ActionPass, ActionReject } from '$components/task/common/actions'
import ActionRow from '$components/task/common/actionsRow'
import ApproveFields from "$components/kycManagement/kycInfoForm/approveFields";
import { passDeposit } from '$api/depositApi'

const initialValues = {
    comment: void 0,
    approveFiles: void 0
}

export function useApproveHandle(options) {
    const { taskId, formUrl, onSuccess } = options;

    const doSubmitApproveResult = useCallback(async function (pass, extParam) {
        try {            
            const res = await passDeposit({
                params: Object.assign({
                    taskId,
                    formUrl,
                    approvedResult: pass ? 1 : 0
                }, extParam)
            })
            message.success('操作成功');
            onSuccess && onSuccess();
            return res;
        } catch(e) {
            console.error(e);
            message.error(e.message);
        }
    }, [taskId, formUrl, onSuccess]);

    const handleApprovePass = useCallback(function (extParam) {
        return doSubmitApproveResult(true, extParam);
    }, [doSubmitApproveResult])
    
    const handleApproveReject = useCallback(function (extParam) {
        return doSubmitApproveResult(false, extParam);
    }, [doSubmitApproveResult]);

    return { handleApprovePass, handleApproveReject }
}

/**
 * 审批表单 
 */
export default function ApproveForm(props) {
    const { taskId, formUrl, closeModal } = props;
    const formRef = useRef();
    const { 
        handleApprovePass, 
        handleApproveReject
    } = useApproveHandle({ taskId, formUrl, onSuccess: closeModal })

    async function handleSubmit() {
        try {
            const errors = formRef.current.validateForm();
            if(errors && Object.keys(errors).length !== 0) {
                throw new Error('表单校验失败');
            } 
            const { comment, approveFiles } = formRef.current.values;
            await handleApprovePass({
                comment,
                riskFile: approveFiles
            })
        } catch(e) {
            console.error(e);
            message.error(e.message);
        }
    }

    return (
        <Form initialValues={initialValues} ref={formRef}>
            <ApproveFields />
            <ActionRow>
                <ActionPass htmlType='submit' onClick={handleSubmit}/>
                <ActionReject onClick={handleApproveReject}/>
            </ActionRow>
        </Form>
    )
}