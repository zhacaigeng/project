import { useCallback } from 'react';
import { useFormik, useFormikContext } from 'formik'
import FormItemSelect from './formItemSelect'
import { queryDict } from "$api/kyc"

/**
 * 国家/地区
 * @param {*} props 
 * @returns 
 */

 FormItemSelectCountryArea.defaultProps = {
    label: '国家/地区',
    name: 'countryArea',
    showSearch: true,
    filterOption: (inputVal, option) => {
        const { value, children } = option.props;
        const regExp = new RegExp(`^${inputVal}`, 'i');
        return regExp.test(value) || regExp.test(children);
    }
}

export default function FormItemSelectCountryArea(props) {    
    const { values } = useFormikContext();
    const getOptions = useCallback(async function () {
        const { code, message, result } = await queryDict();
        const countryList = result && result.dict && result.dict.countryList;
        return (countryList || []).map(countryArea => ({
            title: countryArea.value,
            value: countryArea.code
        }))
    }, [])
    
    return <FormItemSelect options={getOptions} {...props} />
}