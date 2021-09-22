import { useCallback } from 'react';
import FormItemSelect from './formItemSelect'
// 跨境付获取所有商户
import { getCustomerAll } from '$api/depositApi';

/**
 * 商户简称列表选择
 * @param {*} props 
 * @returns 
 */

FormItemSelectCustomer.defaultProps = {
    label: '商户简称',
    name: 'customerId'
}

export default function FormItemSelectCustomer(props) {
    const {onChange} = props;
    const doGetCustomerAll = useCallback(async function doGetCustomerAll() {
        let customerList = await getCustomerAll();
        customerList = (customerList || [])
            .map(({ customerSimpleName, value}) => (
                {
                    title: customerSimpleName,
                    value
                }
            ));
        return customerList;
    }, [])
   
    return <FormItemSelect onChange={onChange} options={doGetCustomerAll} {...props} />
}