import { useState, useEffect } from 'react'
import { getKycInfoByTaskId } from '$api/kyc'

export default function useKycInfoByTaskId(processInstanceId, taskId) {
    const [kycInfo, setKycInfo] = useState();
    useEffect(() => {
        let unmount = false;
        ;(async () => {
            const res = await getKycInfoByTaskId(processInstanceId, taskId);
            const { result } = res;
            if(!unmount) {
                setKycInfo(result);
            }
        })();

        return () => {
            unmount = true;
        }
    }, [processInstanceId, taskId])
    return kycInfo;
}

