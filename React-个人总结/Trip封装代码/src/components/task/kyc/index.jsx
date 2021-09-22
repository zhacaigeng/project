import KycTaskNodeType from './util/kycTaskNodeType'
import AuditKycInfo from './auditKycInfo'
import AuditKycInfoConfirm from './auditKycInfoConfirm'
import AuditBlackList from './auditBlackList'
import EnterRiskScore from './enterRriskScore'
import ConfigProduct from './configProduct'

export default function KycTask(props) {
    const { record, closeModal } = props;
    const { taskName } = record;    
    let Node = null;
    switch(taskName) {
        case KycTaskNodeType.auditFirst:
            Node = AuditKycInfo;
            break;
        case KycTaskNodeType.grcAudit:
        case KycTaskNodeType.grcAuditConfirm:
            Node = AuditBlackList;
            break;
        case KycTaskNodeType.enterRiskScore:
            Node = EnterRiskScore;
            break;
        case KycTaskNodeType.configProduct:
            Node = ConfigProduct;
            break;
        default:
            Node = AuditKycInfoConfirm;
    }
    
    return <Node {...record} closeModal={closeModal} />
}