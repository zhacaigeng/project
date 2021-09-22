import React, { useContext, useEffect, useReducer, useCallback } from 'react'
import isFunction from 'lodash/isFunction'
import isArray from 'lodash/isArray'
import uniqueId from 'lodash/uniqueId'

const KycInfoContext = React.createContext();

export const KycInfoContextProvider = KycInfoContext.Provider;

export function useKycInfoContext() {
    return useContext(KycInfoContext);
}

function urlsToFiles(urls) {
    return urls && urls.filter(url => !!url)
        .map(url => ({
            uid: uniqueId('_file_'),
            url,
            status: 'done'
        }))
}

function reducer(state, action) {
    return Object.assign({}, state, action.preload);
}

export function useKycInfo(queryKycInfo) {
    const [state, dispatch] = useReducer(reducer, { isLoading: true });

    useEffect(() => {
        let umount = false, kycInfo;
        ;(async () => {
            try {
                const { result } = await queryKycInfo();
                kycInfo = result;               
                const { 
                    kycCompanyInfo,
                    kycContactInfo,
                    kycBusinessInfo, 
                    kycBusinessFile,
                    riskAssessment,
                } = kycInfo || {};
                // 审批文件
                [
                    kycCompanyInfo, 
                    kycContactInfo, 
                    kycBusinessInfo, 
                    kycBusinessFile,
                    riskAssessment,                    
                ].forEach(field => {                    
                    if(field && isArray(field.approveFiles)) {
                        field.approveFiles = urlsToFiles(field.approveFiles)
                    }
                })                
                // 给结算银行增加唯一Key
                if(kycBusinessInfo && kycBusinessInfo.kycBankInfo) {
                    kycBusinessInfo.kycBankInfo.forEach(bankInfo => {
                        bankInfo.key = uniqueId();
                    })
                }
                // 商业文件 https://3x.ant.design/components/upload-cn/#components-upload-demo-fileList
                if(kycBusinessFile) {
                    [
                        'companyRegisterCer',
                        'businessRegisterCer',
                        'annualReturn',
                        'memorandumAssociation',
                        'financialReport',
                        'structureChart',
                        'shareholdersRegister',
                        'businessCer'
                    ].forEach(key => {
                        kycBusinessFile[key] = urlsToFiles(kycBusinessFile[key])
                    });
                }
            } catch(e) {
                console.error(e);
            } finally {
                if(!umount) {
                    dispatch({ preload: { isLoading: false, kycInfo }});
                }
            }
        })()

        return () => {
            umount = true;
        }
    }, [queryKycInfo]);

    const updateKycInfo = useCallback(values => {
        dispatch({ 
            preload: { 
                kycInfo: Object.assign({}, state.kycInfo, values)
            }
        })
    })

    return {
        ...state,
        updateKycInfo
    }
}

export default function KycInfo(props) {
    const { queryKycInfo, children } = props;
    const kycInfo = useKycInfo(queryKycInfo);

    return (
        <KycInfoContextProvider value={kycInfo}>
            {
                isFunction(children)
                ? children(kycInfo)
                : children
            }
        </KycInfoContextProvider>
    )
}