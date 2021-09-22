import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getCustomerDict } from "$api/commonApi"

const Option = Select.Option;

export default function CustomerDictSelect(props) {
    const { value, onChange, dictName } = props;
    const [customerDictList, setCustomerDict] = useState();

    useEffect(() => {
        let mounted = true;
        ;(() => {
            getCustomerDict({
                success: data => {
                    const { result } = data;
                    const { dict } = result;
                    const list = dict && dict[dictName];
                    if(mounted && list && list.length) {
                        setCustomerDict(list.map(item => ({
                            text: item,
                            value: item
                        })))
                    }
                },
                error: e => {
                    console.error(e);
                }
            })
        })();

        return () => {
            mounted = false;
        }
    }, [dictName])

    return (
        <Select
            showSearch
            mode={false}
            optionFilterProp="children"
            onChange={onChange}
            value={value}
            filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
        >
            <Option key="" value={""}>--请选择--</Option>
            <For each="item" of={customerDictList || []}>
                <Option key={item.value}>{item.text}</Option>
            </For>
        </Select>
    )
}