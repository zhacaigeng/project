/**
 * 风险交易
 */
const RiskTransaction = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5'
]

const RiskTransactionDesc = [
    '欺诈类交易',
    '可疑交易',
    '复杂、金额异常大或异常交易',
    '现金密集型交易',
    '短期交易频率较高',
    '金额分布异常类交易'
]

const getDesc = RiskTransaction.getDesc = val => RiskTransactionDesc[val]

RiskTransaction.toSelectOptions = () => {    
    return RiskTransaction.map(value => {
        return {
            title: getDesc(value),
            value
        }
    })
}

export default RiskTransaction;

export const HasRiskTransaction = {
    YES:    '1',
    NO:     '0'
}

export const HasRiskTransactionDesc = {
    [HasRiskTransaction.YES]:    '是',
    [HasRiskTransaction.NO]:     '否'
}

HasRiskTransaction.getDesc = val => HasRiskTransactionDesc[val]

