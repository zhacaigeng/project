import React, { useMemo } from 'react'
import { Button, Row, Col } from 'antd'
import uniqueId from 'lodash/uniqueId'
import Form from '$components/form'
import GridContainer from '$components/common/gridContainer'
import { isSwiftCode } from '$utils/validator'
import { useKycInfoContext } from './kycInfo'
import BusinessType from '$src/enums/businessType'
import ApproveFields from './approveFields'

const getBankInfoInitialValues = () => {
    return {
        key: uniqueId(),
        bankName: '',
        accountName: '',
        accountNo: '',
        currency: '',
        swiftCode: '',
        bankCode: ''
    }
}

export default React.forwardRef(function BizInfo(props, ref) {
    const { 
        labelCol, 
        wrapperCol, 
        showApproveFields,
        kycInfoDisabled,
        approveInfoDisabled  
    } = props;
    const { kycInfo } = useKycInfoContext();
    const { kycBusinessInfo } = kycInfo || {};
    const initialValues = useMemo(() => {
        let defaultValues = {
            businessType: '',
            businessTypeOther: '',
            productService: '',
            paymentPurpose: '',
            monthlyPaymentCount: '',
            monthlyPaymentAmount: '',
            singlePaymentAverAmount: '',
            singlePaymentMaxAmount: '',
            branchOfficeCountry: [], // 多选
            paymentCountry: [], // 多选
            kycBankInfo: [],        
            comment: void 0,    // 审批意见
            approveFiles: void 0 // 审批意见
        }
        if(kycBusinessInfo) {
            defaultValues = Object.keys(defaultValues).reduce((initialValues, key) => {
                initialValues[key] = kycBusinessInfo[key] == null 
                    ? defaultValues[key] 
                    : kycBusinessInfo[key];
                return initialValues;
            }, defaultValues)
        }        
        return defaultValues;
    }, [kycBusinessInfo]);

    return (
        <Form
            enableReinitialize
            ref={ref} 
            initialValues={initialValues}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
            >
            {
                ({ values, setFieldValue }) => {
                    const { businessType, kycBankInfo } = values
                    function handleAddBankInfo() {                        
                        setFieldValue('kycBankInfo', [...kycBankInfo, {...getBankInfoInitialValues()}])
                    }

                    function handleDelBankInfo(key) {
                        setFieldValue('kycBankInfo', kycBankInfo.filter(kycBankInfo => kycBankInfo.key !== key))
                    }

                    return (
                        <>
                            <Form.Item.SelectBizType disabled={kycInfoDisabled}/>                        
                            <If condition={businessType === BusinessType.other}>
                                <Form.Item 
                                    name="businessTypeOther" 
                                    label="其他业务" 
                                    required 
                                    disabled={kycInfoDisabled} 
                                    />
                            </If>
                            <Form.Item name="productService" label="提供的产品和服务" required disabled={kycInfoDisabled} />
                            <Form.Item.SelectPaymentPurpose disabled={kycInfoDisabled}/>
                            <Form.Item.SelectMonthlyPaymentCount disabled={kycInfoDisabled}/>
                            <Form.Item.SelectMonthlyPaymentAmount disabled={kycInfoDisabled}/>
                            <Form.Item.SelectSinglePaymentAverAmount disabled={kycInfoDisabled}/>
                            <Form.Item.SelectSinglePaymentMaxAmount disabled={kycInfoDisabled}/>
                            <Form.Item.SelectCountryArea 
                                name="paymentCountry" 
                                label="主要付款的国家地区" 
                                mode="multiple" 
                                disabled={kycInfoDisabled}
                                required
                                />
                            <Form.Item.SelectCountryArea 
                                name="branchOfficeCountry" 
                                label="分公司/子公司的国家 （如有）" 
                                mode="multiple" 
                                disabled={kycInfoDisabled}
                                />                                                                                  
                            <Row>
                                <Col span={6}>
                                    <div className="vcc-kyc-form-group-title">结算银行</div>
                                </Col>
                                <Col span={6}>   
                                    <If condition={!kycInfoDisabled}>
                                        <Button 
                                            icon="plus"
                                            onClick={handleAddBankInfo} 
                                            disabled={kycInfoDisabled}
                                            >添加结算银行</Button>
                                    </If>
                                </Col>
                            </Row>
                            <If condition={kycBankInfo && kycBankInfo.length}>
                                <div className="vcc-kyc-form__bank-list">
                                    <For each="bankInfo" index="index" of={kycBankInfo}>
                                        <div className="vcc-kyc-form__bank-group" key={kycBankInfo[index].key}>
                                            <GridContainer>
                                                <Form.Item name={`kycBankInfo[${index}].bankName`} label="银行名称" labelCol={{ span: 8 }} disabled={kycInfoDisabled}/>
                                                <Form.Item name={`kycBankInfo[${index}].accountName`} label="银行户名" labelCol={{ span: 8 }} disabled={kycInfoDisabled}/>
                                                <Form.Item name={`kycBankInfo[${index}].accountNo`} label="银行账号" labelCol={{ span: 8 }} disabled={kycInfoDisabled}/>
                                                <Form.Item.SelectCurrency name={`kycBankInfo[${index}].currency`} labelCol={{ span: 8 }} disabled={kycInfoDisabled}/>
                                                <Form.Item name={`kycBankInfo[${index}].swiftCode`} label="SWIFT Code" labelCol={{ span: 8 }} disabled={kycInfoDisabled}/>
                                                <Form.Item name={`kycBankInfo[${index}].bankCode`} label="Bank Code(如果适用)" labelCol={{ span: 8 }} disabled={kycInfoDisabled}/>
                                            </GridContainer>
                                            <If condition={!kycInfoDisabled}>
                                                <div className="vcc-kyc-form__del-bank-btn" >
                                                    <Button
                                                        type="link" 
                                                        onClick={() => handleDelBankInfo(kycBankInfo[index].key)}
                                                        >删除</Button>
                                                </div>
                                            </If>
                                        </div>
                                    </For>
                                </div>
                            </If>                            
                            <If condition={showApproveFields}>
                                <ApproveFields disabled={approveInfoDisabled}/>
                            </If>
                        </>
                    )
                }
            }            
        </Form>
    )
})