import { useState, useEffect } from 'react';
import { Select } from 'antd'
import FormItem from './formItem'
import isFunction from 'lodash/isFunction'
import { useFormikContext } from 'formik'

const { Option } = Select;

/**
 * 选择列表，支持数据动态获取
 * @returns 
 */
export default function FormItemSelect(props) {
    const {
        name,
        onChange,
        onBlur,
    } = props;
    const formik = useFormikContext();

    function handleChange(val) {                        
        formik.setFieldValue(name, val);
        onChange && onChange(val);
    }

    function handleBlur(evt) {
        formik.setFieldTouched(name, true);
        onBlur && onBlur(evt);
    }

    return (
        <FormItem
            {...props} 
            onChange={handleChange}
            onBlur={handleBlur}
            >
            {
                props => <FormikSelect {...props} />
            }
        </FormItem>
    )
}

FormikSelect.defaultProps = {
    allowClear: true,
    showSearch: true,
    optionFilterProp: 'children',
    filterOption: (input, option) => new RegExp(input, 'i').test(option.props.children)
}

function FormikSelect(props) {
    const { 
        name, 
        options, 
        disabled,
        ...rest 
    } = props;
    const [selectOptions, setSelectOptions] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        let unmount = false;
        ;(async () => {
            let unmount, selectOptions;
            try {
                selectOptions = await (isFunction(options) ? options() : options);
            } catch(e) {
                console.error(e);
            } finally {
                if(!unmount) {
                    setSelectOptions(selectOptions);
                    setLoading(false);
                }
            }
        })();

        return () => {
            unmount = true
        }
    }, [options])


    return (
        <Select 
            disabled={disabled} 
            name={name}
            {...rest}>
            <If condition={selectOptions}>
                <For each="option" of={selectOptions}>
                    <Option 
                        key={option.value} 
                        value={option.value} 
                        disabled={option.disabled}
                        >
                        {option.title||option.label||''}
                    </Option>
                </For>
            </If>
        </Select>
    )
}