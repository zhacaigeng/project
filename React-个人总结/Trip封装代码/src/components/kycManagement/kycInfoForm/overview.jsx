import CompanyInfo from './companyInfo'
import ContactInfo from './contactInfo'
import BizInfo from './bizInfo'
import BizFile from './bizFile'
import RiskInfo from './riskInfo'

const formLabelCol = { span: 6 }
const formWrapperCol = { span: 12 }
const steps = [
    {
        title: '企业信息',
        content: CompanyInfo
    },
    {
        title: '联系人信息',
        content: ContactInfo
    },
    {
        title: '商业信息',
        content: BizInfo
    },
    {
        title: '资料上传',
        content: BizFile,
    },
    {
        title: '风险信息',
        content: RiskInfo
    }
]

export default function KycInfoOverview(props) {    
    const { showApproveFields } = props;

    return (
        <div className="vcc-kyc-overview">
            <For each="step" of={steps} className="vcc-kyc-overview__panel">
                <div className="vcc-kyc-overview__panel" key={step.title}>
                    <div className="vcc-kyc-overview__title">{step.title}</div>
                    <step.content 
                        labelCol={formLabelCol}
                        wrapperCol={formWrapperCol}
                        kycInfoDisabled
                        approveInfoDisabled
                        showApproveFields={showApproveFields}
                        />
                </div>
            </For>    
        </div>
    )
}