import { useCallback } from 'react'
import FormItemSelect from './formItemSelect'
import { queryDict } from "$api/kyc"

/**
 * 备付金银行-币种选择
*/
export default function FormItemSelectProvisionBankCurrency(props) {    
    const { provisionBankCode } = props;    
    const getOptions = useCallback(async function () {
        if(!provisionBankCode) {
            return;
        }
        const { code, message, result } = await queryDict();
        const provisions = result && result.dict && result.dict.provisions;
        const provisionBank = (provisions || [])
            .find(provision => provision.provisionBankCode === provisionBankCode);
        const { currencyTxtList } = provisionBank || {};
        return (currencyTxtList || []).map(currency => ({
            title: currency,
            value: currency
        }))    
    }, [provisionBankCode])
            
    return <FormItemSelect options={getOptions} {...props} />
}