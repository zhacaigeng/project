import { useState, useRef } from 'react'
import { Steps, Button, Row, Col, message, Spin } from 'antd'
import KycInfo, { useKycInfoContext } from './kycInfo'
import CompanyInfo from './companyInfo'
import ContactInfo from './contactInfo'
import BizInfo from './bizInfo'
import BizFile from './bizFile'
import RiskInfo from './riskInfo'
import Overview from './overview'
import { HasRiskTransaction } from '$src/enums/riskTransaction'
import './index.scss'

function filesToUrls(files) {
    return files && files.filter(file => !!file && !!file.url).map(({ url }) => url);
}

const formLabelCol = { span: 6 }
const formWrapperCol = { span: 12 }
const steps = [
    {
        title: '企业信息',
        content: CompanyInfo,
        key: 'kycCompanyInfo',
        toApiParam: values => {            
            values.approveFiles = filesToUrls(values.approveFiles);
            return values;            
        }
    },
    {
        title: '联系人信息',
        content: ContactInfo,
        key: 'kycContactInfo',
        toApiParam: values => {
            values.approveFiles = filesToUrls(values.approveFiles);
            return values;            
        }
    },
    {
        title: '商业信息',
        content: BizInfo,
        key: 'kycBusinessInfo',
        toApiParam: values => {
            values.approveFiles = filesToUrls(values.approveFiles);
            return values;            
        }
    },
    {
        title: '资料上传',
        content: BizFile,
        key: 'kycBusinessFile',
        toApiParam: values => {
            [
                'companyRegisterCer',
                'businessRegisterCer',
                'annualReturn',
                'memorandumAssociation',
                'financialReport',
                'structureChart',
                'shareholdersRegister',
                'businessCer',
                'approveFiles'
            ].forEach(key => {
                values[key] = filesToUrls(values[key])
            });
            return values;
        }
    },
    {
        title: '风险信息',
        content: RiskInfo,
        key: 'riskAssessment',
        toApiParam: values => {
            const { riskTransactionList, blacklist } = values;
            values.ifRiskTransaction = riskTransactionList && riskTransactionList.length 
                ? HasRiskTransaction.YES
                : HasRiskTransaction.NO;    
            values.ifBlackList = blacklist && blacklist.length
                ? HasRiskTransaction.YES
                : HasRiskTransaction.NO;   
            values.approveFiles = filesToUrls(values.approveFiles);
            return values;
        }
    },
    {
        title: '信息总览',
        content: Overview      
    }
]

// 接口参数转化
function toApiParams(params) {
    // copy一份，避免对原数据造成影响
    params = { ...params };
    Object.keys(params).forEach(key => {
        try {
            const stepConfig = steps.find(step => step.key === key);
            if(stepConfig && stepConfig.toApiParam) {            
                params[key] = stepConfig.toApiParam({ ...params[key] })
            }
        } catch(e) {
            console.error(key, e);
        }
    });
    return params;
}

KycInfoForm.defaultProps = {
    prevBtnText: '上一步',
    nextBtnText: '下一步',
    finalBtnText: '提交',
    submitSuccessMsg: '提交成功',
    showApproveFields: false // 是否展示审批表单
}

export default function(props) {
    const { queryKycInfo, ...rest } = props;
    return (
        <KycInfo queryKycInfo={queryKycInfo}>
            <KycInfoForm {...rest} />
        </KycInfo>
    )
}

function KycInfoForm(props) {
    const { 
        onNext, 
        onFinal, 
        prevBtnText, 
        nextBtnText, 
        finalBtnText, 
        submitSuccessMsg,
        showApproveFields,
        kycInfoDisabled,
        approveInfoDisabled
    } = props;
    const { isLoading, kycInfo, updateKycInfo } = useKycInfoContext();
    const contentRef = useRef();
    const [loading, setLoading] = useState();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const lastStepIndex = steps.length - 1;
    const isLastStep = currentStepIndex === lastStepIndex;
    const computedNextBtnText = isLastStep ? finalBtnText : nextBtnText;
    const computedPrevBtnText = currentStepIndex === 0 ? false : prevBtnText;
    const currentStep = steps[currentStepIndex];
    const Content = currentStep.content;

    function handleClickPrev() {
        setCurrentStepIndex(currentStepIndex - 1);                
    }

    async function doSubmitKycInfo(params) {
        params = toApiParams(params);
        await onFinal(params);
        message.success(submitSuccessMsg);
    }

    async function doSaveKycInfo(params) {
        const values = contentRef.current.values;
        // 校验当前表单
        const touched = Object.keys(values).reduce((touched, key) => {
            touched[key] = true;
            return touched;
        }, {});
        const errors = await contentRef.current.setTouched(touched, true);
        if(errors && Object.keys(errors).length !== 0) {
            console.error(errors);
            throw new Error('表单数据校验失败');
        }
        // 缓存
        updateKycInfo({
            [currentStep.key]: values
        });
        params[currentStep.key] = values;
        // 提交
        params = toApiParams(params);
        await onNext(params);
        setCurrentStepIndex(currentStepIndex + 1);
    }

    async function handleClickNext() {
        try {            
            setLoading(true);
            await (isLastStep ? doSubmitKycInfo : doSaveKycInfo)(kycInfo);            
        } catch(e) {
            console.error(e);
            message.error(e.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Spin spinning={isLoading} delay={50} >
            <div className="vcc-kyc-form-steps">
                <Steps current={currentStepIndex} size="small">
                    <For each="step" of={steps}>
                        <Steps.Step key={step.title} title={step.title}/>
                    </For>
                </Steps>
            </div>
            <div className="vcc-kyc-form-wrapper">
                <Content 
                    ref={isLastStep ? null : contentRef}
                    labelCol={formLabelCol}
                    wrapperCol={formWrapperCol}
                    showApproveFields={showApproveFields}
                    kycInfoDisabled={kycInfoDisabled}
                    approveInfoDisabled={approveInfoDisabled}
                    />
            </div>
            <Row gutter={16} type="flex" justify="end" className="vcc-kyc-form-btn-wrapper">
                <Col>
                    <If condition={!!computedPrevBtnText}>
                        <Button disabled={loading} onClick={handleClickPrev}>{computedPrevBtnText}</Button>
                    </If>
                </Col>
                <Col>
                    <Button loading={loading} type="primary" onClick={handleClickNext}>{computedNextBtnText}</Button>
                </Col>
            </Row>
        </Spin>
    )
}