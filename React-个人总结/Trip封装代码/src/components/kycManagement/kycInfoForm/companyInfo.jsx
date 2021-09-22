import React, { useMemo } from 'react'
import Form from '$components/form'
import GridContainer from '$components/common/gridContainer'
import ApproveFields from './approveFields'
import { useKycInfoContext } from './kycInfo'

export default React.forwardRef(function CompanyInfo(props, ref) {
    const { 
        labelCol, 
        wrapperCol, 
        showApproveFields,
        kycInfoDisabled,
        approveInfoDisabled 
    } = props;
    const { kycInfo } = useKycInfoContext();    
    const { kycCompanyInfo } = kycInfo || {};
    const initialValues = useMemo(() => {
        return Object.assign({
            companyName: '',
            companyEnName: '',
            country: '',
            ownership: '',
            businessWebsite: '',
            companyHomePage: '',
            brandName: '',
            staffSize: '',
            customerAddress: '',
            comment: void 0,    // 审批意见
            approveFiles: void 0 // 审批意见
        }, kycCompanyInfo);
    }, [kycCompanyInfo])   

    return (
        <Form
            enableReinitialize
            ref={ref}            
            initialValues={initialValues}         
            labelCol={labelCol}   
            wrapperCol={wrapperCol}>
            <GridContainer colCount={showApproveFields ? 2 : 1}>
                <Form.Item label="企业名称" disabled name="companyName" disabled/>
                <Form.Item label="企业名称（英文）" disabled name="companyEnName"/>
                <Form.Item.SelectCountryArea required label="注册国家/地区" name="country" disabled={kycInfoDisabled} />
                <Form.Item.SelectBizOwnership label="所有权类型" name="ownership" required disabled={kycInfoDisabled}/>
                <Form.Item.Url label="销售平台网址" name="businessWebsite" required disabled={kycInfoDisabled} />
                <Form.Item.Url label="公司官网" name="companyHomePage" disabled={kycInfoDisabled}/>
                <Form.Item label="品牌名称" name="brandName" disabled={kycInfoDisabled} />
                <Form.Item.SelectBizStaffSize label="员工人数" name="staffSize" required disabled={kycInfoDisabled} /> 
                <Form.Item label="公司通讯地址" name="customerAddress" required disabled={kycInfoDisabled} />                
            </GridContainer>
            <If condition={showApproveFields}>
                <ApproveFields disabled={approveInfoDisabled}/>
            </If>   
        </Form>
    )
})