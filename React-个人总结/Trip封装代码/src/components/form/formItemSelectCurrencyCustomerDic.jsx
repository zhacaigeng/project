import { useCallback } from 'react';
import FormItemSelect from './formItemSelect'
import {getCurrencyList} from '$api/commonApi'

/**
 * 币种选择
 * @param {*} props 
 * @returns 
 */

 Comp.defaultProps = {
    label: '币种',
    name: 'currency',
    showSearch: true,
    filterOption: (inputVal, option) => {
        const { value } = option.props;
        const regExp = new RegExp(`^${inputVal}`, 'i');
        return regExp.test(value);
    }
}

export default function Comp(props) {    
    const getOptFun = useCallback(async e => {
        // 币种接口太多了，需要整改
        let currencyList  = await getCurrencyList({});
        return (currencyList || []).map(v => ({title: v, value: v}))
    }, [])
    return <FormItemSelect options={getOptFun} {...props} />
}