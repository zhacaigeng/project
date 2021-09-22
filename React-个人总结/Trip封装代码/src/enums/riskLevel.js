const RiskLevel = {
    LOW:    'LOW',      // 低风险
    MIDDLE: 'MIDDLE',   // 中风险
    HIGH:   'HIGH'      //高风险
}

const RiskLevelDesc = {
    [RiskLevel.LOW]:    '低风险',   // 低风险
    [RiskLevel.MIDDLE]: '中风险',   // 中风险
    [RiskLevel.HIGH]:   '高风险'    //高风险
}

const getDesc = RiskLevel.getDesc = val => RiskLevelDesc[val];

RiskLevel.toSelectOptions = () => {
    return Object.keys(RiskLevelDesc).map(key => ({
        value: key,
        title: RiskLevelDesc[key]
    }))
}

export default RiskLevel;