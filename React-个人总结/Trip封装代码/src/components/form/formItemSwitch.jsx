import { Switch } from 'antd'
import FormItem from './formItem'
import { useFormikContext } from 'formik'

/**
 * Switch
 * @returns 
 */
FormItemSwitch.defaultProps = {
    checkedChildren: '是',
    unCheckedChildren: '否',
    checkedValue: true, // 扩展下
    unCheckedValue: false
}

export default function FormItemSwitch(props) {
    const {
        name,
        onChange,
        checkedValue,
        unCheckedValue
    } = props;
    const { setFieldValue } = useFormikContext();
    // 自定义handleChange, 覆盖formik field.onChange
    function handleChange(val) {    
        val = val ? checkedValue : unCheckedValue;                      
        setFieldValue(name, val);
        onChange && onChange(val);
    }

    return (
        <FormItem {...props} onChange={handleChange} >
            {
                props => <FormikSwitch {...props} />
            }
        </FormItem>
    )
}

function FormikSwitch(props) {
    const { value, checkedValue, unCheckedValue: _, ...rest } = props;
    const checked = value === checkedValue;
    return (
        <Switch {...rest} checked={checked} />
    )
}