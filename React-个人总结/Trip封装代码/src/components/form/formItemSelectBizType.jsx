import { useCallback } from 'react';
import FormItemSelect from './formItemSelect'
import BusinessType from '$src/enums/businessType'

/**
 * 业务性质
 * @param {*} props 
 * @returns 
 */

FormItemSelectBizType.defaultProps = {
    label: '业务性质',
    name: 'businessType',
    required: true,
    options: BusinessType.toSelectOptions()
}

export default function FormItemSelectBizType(props) {
    return <FormItemSelect {...props} />
}