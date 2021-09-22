import { useCallback } from 'react'
import FormItemSelect from './formItemSelect'
import { queryDict } from "$api/kyc"

/**
 * 备付金银行选择
 * @param {*} props 
 * @returns 
 */
FormItemSelectProvisionBank.defaultProps = {
    label: '备付金银行',
    name: 'provisionBank'
}

export default function FormItemSelectProvisionBank(props) {      
    const getOptions = useCallback(async function () {
        const { code, message, result } = await queryDict();
        const provisions = result && result.dict && result.dict.provisions;
        return (provisions || []).map(({ provisionBankCode, provisionBankName }) => ({
            title: provisionBankName,
            value: provisionBankCode
        }))
    }, [])
            
    return <FormItemSelect options={getOptions} {...props} />
}