import React from 'react'
import { Icon } from 'antd'
import Form from '$components/form'
import { useKycInfoContext } from './kycInfo'
import ApproveFields from './approveFields'


export default React.forwardRef(function RiskAssessment(props, ref) {
    const { showApproveFields, kycInfoDisabled, approveInfoDisabled } = props;
    const { kycInfo } = useKycInfoContext();
    const { riskAssessment } = kycInfo || {};

    const initialValues = Object.assign({
        riskTransactionList: '',
        blacklist: ''
    }, riskAssessment)

    return (
        <Form
            enableReinitialize
            ref={ref}
            initialValues={initialValues}
            wrapperCol={{ offset: 2, span: 20 }}>            
            {
                ({ values }) => (
                    <>
                        <div className="vcc-kyc-form-group-title">
                            是否曾被监管机构/金融机构/媒体曝光以下交易
                        </div>
                        <Form.Item.CheckboxRiskTrade label="" name="riskTransactionList" disabled={kycInfoDisabled} />
                        <div className="vcc-kyc-form-group-title">
                            客户/实益拥有人/控股公司/公司董事/高级行政人员(行政总裁)/授权签字人或以上人士的亲属及关系密切人士是否被列入以下名单
                        </div>
                        <Form.Item.CheckboxBlackList
                            label=""
                            name="blacklist"
                            disabled={kycInfoDisabled}
                            />
                        <If condition={showApproveFields}>
                            <ApproveFields disabled={approveInfoDisabled} />
                        </If>
                    </>
                )
            }
        </Form>
    )
})