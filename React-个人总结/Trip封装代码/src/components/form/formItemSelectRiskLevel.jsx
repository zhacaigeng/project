import { useCallback } from 'react';
import FormItemSelect from './formItemSelect'
import RiskLevel from '$src/enums/riskLevel'

/**
 * 风险级别
 * @param {*} props 
 * @returns 
 */

 FormItemSelectRiskLevel.defaultProps = {
    label: '风险级别',
    name: 'riskLevel',
    options: RiskLevel.toSelectOptions()
}

export default function FormItemSelectRiskLevel(props) {
    return <FormItemSelect {...props} />
}