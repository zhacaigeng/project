import React, { useMemo } from 'react'
import Form from '$components/form'
import GridContainer from '$components/common/gridContainer'
import { useKycInfoContext } from './kycInfo'
import ApproveFields from './approveFields'

const formWrapperCol = { span: 16 }

export default React.forwardRef(function ContactInfo(props, ref) {
    const { 
        labelCol,
        wrapperCol, 
        showApproveFields, 
        kycInfoDisabled,
        approveInfoDisabled 
    } = props;
    const { kycInfo } = useKycInfoContext();
    const { kycContactInfo } = kycInfo || {};     
    const initialValues = useMemo(() => {
        return Object.assign({
            techName: '',
            techPosition: '',
            techPhone: '',
            techEmail: '',
            fundName: '',
            fundPosition: '',
            fundPhone: '',
            fundEmail: '',
            authorizerName: '',
            authorizerPosition: '',
            authorizerPhone: '',
            authorizerEmail: '',
            comment: void 0,    // 审批意见
            approveFiles: void 0 // 审批意见
        }, kycContactInfo);
    }, [kycContactInfo])    

    return (
        <Form 
            enableReinitialize
            initialValues={initialValues} 
            labelCol={labelCol}
            wrapperCol={wrapperCol} 
            ref={ref}
            >
            <div className="vcc-kyc-form-group-title">技术对接人</div>
            <GridContainer>
                <Form.Item name="techName" label="姓名" wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
                <Form.Item name="techPosition" label="职位" wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
                <Form.Item name="techPhone" label="电话" wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
                <Form.Item.Email name="techEmail" wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
            </GridContainer>            
            <div className="vcc-kyc-form-group-title">资金对接人</div>
            <GridContainer>
                <Form.Item name="fundName" label="姓名" required wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
                <Form.Item name="fundPosition" label="职位" required wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
                <Form.Item name="fundPhone" label="电话" required wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
                <Form.Item.Email name="fundEmail" required wrapperCol={formWrapperCol} disabled={kycInfoDisabled}/>
            </GridContainer>            
            <div className="vcc-kyc-form-group-title">授权管理员</div>
            <GridContainer>
                <Form.Item name="authorizerName" label="姓名" disabled wrapperCol={formWrapperCol}/>
                <Form.Item name="authorizerPosition" label="职位" disabled wrapperCol={formWrapperCol}/>
                <Form.Item name="authorizerPhone" label="电话" disabled wrapperCol={formWrapperCol}/>
                <Form.Item.Email name="authorizerEmail" disabled formatValidate={false} wrapperCol={formWrapperCol}/>
            </GridContainer>
            <If condition={showApproveFields}>
                <ApproveFields disabled={approveInfoDisabled}/>
            </If>
        </Form>
    )
})

