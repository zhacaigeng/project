import { useCallback } from 'react';
import FormItemSelect from './formItemSelect'
// 商户的开卡币种，结算币种
import { queryCusCurrencyInfo } from '$api/commonApi';

/**
 * 开卡币种
 */
FormItemSelectVccCustomerCardCurrency.defaultProps = {
    label: '开卡币种',
    name: 'cardCurrency'
}
export function FormItemSelectVccCustomerCardCurrency(props) {
    return <FormItemSelectVccCustomerCurrency {...props} dictIndex="0" />    
}

/**
 * 结算币种
 */
FormItemSelectVccCustomerSettleCurrency.defaultProps = {
    label: '结算币种',
    name: 'settleCurrency'
}
export function FormItemSelectVccCustomerSettleCurrency(props) {
    return <FormItemSelectVccCustomerCurrency {...props} dictIndex="1" />    
}


function FormItemSelectVccCustomerCurrency(props) {
    const { customerId, dictIndex } = props;

    const doGetCustomerAll = useCallback(async function () {
        // [cardCurrencySet, settleCurrencySet]
        let dict;
        try {
            dict = await queryCusCurrencyInfo(customerId);
        } catch(e) {
            console.error(e);
        }        
        let list = dict && dict[dictIndex];
        list = (list || [])
            .map(({ label, value}) => (
                {
                    title: label,
                    value
                }
            ));
        return list;
    }, [customerId, dictIndex])
   
    return <FormItemSelect options={doGetCustomerAll} {...props} />
}