import { useCallback, useEffect, useState } from 'react';
import FormItemSelect from './formItemSelect'
// VCC付获取所有商户
import { queryCustomerSelectList } from '$api/commission';

/**
 * 商户简称列表选择
 * @param {*} props 
 * @returns 
 */

FormItemSelectVccCustomer.defaultProps = {
    label: '客户',
    name: 'customerId'
}

export default function FormItemSelectVccCustomer(props) {
    const doGetCustomerAll = useCallback(async function () {
        let customerList = await queryCustomerSelectList();
        customerList = (customerList || [])
            .map(({ label, value}) => (
                {
                    title: label,
                    value
                }
            ));
        return customerList;
    }, [])
   
    return <FormItemSelect options={doGetCustomerAll} {...props} />
}