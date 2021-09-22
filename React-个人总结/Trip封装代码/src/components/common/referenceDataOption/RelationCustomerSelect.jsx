import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getVccRelationCustomer } from "$api/commonApi"

const Option = Select.Option;

export default function RelationCustomerSelect(props) {
    const [relationCustomerList, setRelationCustomerList] = useState();
    useEffect(() => {
        let mounted = true;
        (() => {
            getVccRelationCustomer({
                success: data => {
                    if (data && data.result && data.result.data) {
                        const tempData = data.result.data.map(customer => ({
                            text: customer.customerName,
                            value: customer.customerId
                        }));
                        setRelationCustomerList(tempData)
                    }
                },
                error: e => {
                    console.error(e);
                }
            })
        })()

        return () => {
            mounted = false;
        }
    }, [])

    return (
        <Select
            showSearch
            style={{minWidth:"150px"}}
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
            {...props}          
        >
            <Option key="" value={""}>--请选择--</Option>
            <For each="item" of={relationCustomerList || []}>
                <Option key={item.value}>{item.text}</Option>
            </For>
        </Select>
    )
}