import { useCallback } from 'react';
import { useFormik, useFormikContext } from 'formik'
import FormItemSelect from './formItemSelect'
import { queryDict } from "$api/kyc"

/**
 * 币种选择
 * @param {*} props 
 * @returns 
 */

 FormItemSelectCurrency.defaultProps = {
    label: '币种',
    name: 'currency',
    showSearch: true,
    filterOption: (inputVal, option) => {
        const { value } = option.props;
        const regExp = new RegExp(`^${inputVal}`, 'i');
        return regExp.test(value);
    }
}

export default function FormItemSelectCurrency(props) {    
    const { values } = useFormikContext();
    const getOptions = useCallback(async function () {
        const { code, message, result } = await queryDict();
        const currencyList = result && result.dict && result.dict.currencyList;
        return (currencyList || []).map(currency => ({
            title: currency,
            value: currency
        }))
    }, [])
        
    return <FormItemSelect options={getOptions} {...props} />
}