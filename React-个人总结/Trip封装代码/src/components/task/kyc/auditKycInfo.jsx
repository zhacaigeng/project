import React, { useState, useRef, useCallback } from "react";
import KycInfoForm from "$components/kycManagement/kycInfoForm";
import { getKycInfoByTaskId, auditKycInfo } from '$api/kyc'

/**
 * 初审
 */
export default function AuditKycInfo(props) {
    const { processInstanceId, taskId, closeModal } = props;

    function queryKycInfo() {
        return getKycInfoByTaskId(processInstanceId, taskId);
    }

    async function handleFinalSubmit(kycInfo) {
        await auditKycInfo({ 
            customerInfoDto: kycInfo, 
            taskId, 
            commit: true,
            approvedResult: '1'
        })
        closeModal && closeModal();
    }

    async function handleClickNext(kycInfo) {
        return auditKycInfo({ customerInfoDto: kycInfo, taskId, commit: false })
    }

    return (
        <div>
            <KycInfoForm 
                showApproveFields
                queryKycInfo={queryKycInfo} 
                onFinal={handleFinalSubmit} 
                onNext={handleClickNext} 
                finalBtnText="通过"
                />
        </div>
    )
}