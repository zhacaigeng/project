import React, { useMemo } from 'react'
import Form from '$components/form'
import { useKycInfoContext } from './kycInfo'
import ApproveFields from './approveFields'

export default React.forwardRef(function BizFile(props, ref){
    const { 
        labelCol, 
        wrapperCol, 
        showApproveFields,
        kycInfoDisabled,
        approveInfoDisabled
    } = props;
    const { kycInfo } = useKycInfoContext();
    const { kycBusinessFile } = kycInfo || {};
    const initialValues = useMemo(() => {
        return Object.assign({
            companyRegisterCer: void 0,
            businessRegisterCer: void 0,
            annualReturn: void 0,
            memorandumAssociation: void 0,
            financialReport: void 0,
            structureChart: void 0,
            shareholdersRegister: void 0,
            businessCer: void 0,
            // 审批相关
            companyRegisterNo: void 0, // 公司注册证书号码
            companyRegisterDate: void 0, // 公司成立日期
            companyRegisterAddress: void 0, // 公司注册地址
            companyRegisterCapital: void 0, // 注册资本
            corporateName: void 0, // 法人名称
            structureContent: void 0, // 公司股权架构图内容
            sharedholderName: void 0, // 股东、董事名称
            comment: void 0,    // 审批意见
            approveFiles: void 0 // 审批意见
        }, kycBusinessFile);
    }, [kycBusinessFile]);

    return (
        <Form
            enableReinitialize
            ref={ref} 
            initialValues={initialValues}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            >
            <Form.Item.Upload 
                label="公司注册证书" 
                name="companyRegisterCer" 
                required 
                disabled={kycInfoDisabled}
                demoPic="//pages.trip.com/Moxcard/vcc/companyRegisterCer.demo.png"
                />
            <If condition={showApproveFields}>
                <Form.Item label="公司注册证书号码" name="companyRegisterNo" disabled={approveInfoDisabled}/>
                <Form.Item.DatePicker label="公司成立日期" name="companyRegisterDate" required disabled={approveInfoDisabled} />
            </If>
            <Form.Item.Upload 
                label="商业登记证" 
                name="businessRegisterCer" 
                required 
                disabled={kycInfoDisabled}
                demoPic="//pages.trip.com/Moxcard/vcc/businessRegisterCer.demo.png"
                />
            <If condition={showApproveFields}>
                <Form.Item.TextArea label="公司注册地址" name="companyRegisterAddress" disabled={approveInfoDisabled} />
            </If>
            <Form.Item.Upload label="年度申报表" name="annualReturn" required disabled={kycInfoDisabled}/>
            <If condition={showApproveFields}>
                <Form.Item label="注册资本" name="companyRegisterCapital" required disabled={approveInfoDisabled} />
                <Form.Item label="法人名称" name="corporateName" disabled={approveInfoDisabled} />
            </If>
            <Form.Item.Upload label="公司章程" 
                name="memorandumAssociation" 
                required 
                disabled={kycInfoDisabled}                
                demoPic="//pages.trip.com/Moxcard/vcc/memorandumAssociation.demo.png"
                />
            <Form.Item.Upload 
                label="财务报告" 
                name="financialReport"
                required 
                disabled={kycInfoDisabled}
                uploadDesc="需提供近三年经审计财务报表、近期财务报表以及财务变动情况说明（成立不足三年的客户提供成立以来年度报表）。"
                />
            <Form.Item.Upload 
                label="股权架构图" 
                name="structureChart" 
                required 
                disabled={kycInfoDisabled}
                uploadDesc="公司股权架构图上需要体现公司所有股权大于等于10% 的最终受益人信息，且股权百分比（%）信息必须体现"
                />
            <If condition={showApproveFields}>
                <Form.Item.TextArea 
                    label="公司股权架构图内容" 
                    name="structureContent" 
                    placeholder="请输入持股10%以上的公司名称和最终受益人，以 ；分割，如A ；B；C。该字段为后续需要进行排黑的信息。"
                    required
                    disabled={approveInfoDisabled}
                    />
            </If>
            <Form.Item.Upload 
                label="股东，董事名册"
                name="shareholdersRegister" 
                required 
                disabled={kycInfoDisabled} 
                uploadDesc="需提供所有董事、股东（超过10%股份）、实益拥有人、授权签字人的身份证件（签字或盖章），有效住址采用身份证住址且在复印件上备注为有效住址"
                />
            <If condition={showApproveFields}>
                <Form.Item.TextArea 
                    label="股东、董事名称" 
                    name="sharedholderName" 
                    placeholder="以 ；分割，如A ；B；C。该字段为后续需要进行排黑的信息。"
                    required
                    disabled={approveInfoDisabled}
                    />
            </If>
            <Form.Item.Upload label="行业资质证明" name="businessCer" disabled={kycInfoDisabled} />
            <If condition={showApproveFields}>
                <ApproveFields disabled={approveInfoDisabled} />
            </If>
        </Form>
    )
})