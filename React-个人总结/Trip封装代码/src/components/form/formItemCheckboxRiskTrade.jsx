import FormItemCheckboxGroup from './formItemCheckboxGroup'
import RiskTransactionEnum from '$src/enums/riskTransaction'

/**
 * 风险交易
 * @param {*} props 
 * @returns 
 */
FormItemRiskTrade.defaultProps = {
    name: 'riskTransactionList',
    label: '风险交易',
    vertical: true,
    options: RiskTransactionEnum
        .toSelectOptions()
        .map(({ title: label, value }) => ({ value, label }))
}

export default function FormItemRiskTrade(props) {
    return <FormItemCheckboxGroup {...props} />
}