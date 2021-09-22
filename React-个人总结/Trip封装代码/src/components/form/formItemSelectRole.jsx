import { useCallback } from 'react';
import { useFormik, useFormikContext } from 'formik'
import FormItemSelect from './formItemSelect'
// 跨境付获取所有商户
import { queryAllRoles } from '$api/permission'

/**
 * 商户列表选择
 * @param {*} props 
 * @returns 
 */

 FormItemSelectRole.defaultProps = {
    label: '角色',
    name: 'roles',
    mode: 'multiple',
    customerIdKey: "customerId" // 表单里商户ID key
}

export default function FormItemSelectRole(props) {    
    const { values } = useFormikContext();
    const { customerIdKey, ...rest } = props;
    const customerId = values[customerIdKey];
    const getCustomerAll = useCallback(async function getCustomerAll() {
        if(!customerId) {
            return;
        }
        const { code, message, result } = await queryAllRoles(customerId);
        const { data } = result;
        return (data || []).map(({ roleName, roleCode }) => ({
            title: roleName,
            value: roleCode
        }))
    }, [customerId])
    
    return <FormItemSelect options={getCustomerAll} {...rest} />
}