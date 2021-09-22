import { DatePicker } from 'antd'
import moment from 'moment';
import FormItem from './formItem'
import { useFormikContext } from 'formik'

FormItemDatePicker.defaultProps = {
}

export default function FormItemDatePicker(props) {
    const {
        name,
        onChange
    } = props;
    const { setFieldValue, setFieldTouched } = useFormikContext();
    // 自定义handleChange, 覆盖formik field.onChange
    function handleChange(_, dateStrings) {                              
        setFieldValue(name, dateStrings);
        onChange && onChange(val);
    }

    function handleBlur(val) {        
        setFieldTouched(name, true, false);
    }

    return (
        <FormItem {...props} onChange={handleChange} onBlur={handleBlur}>
            {
                props => {
                    let { value } = props;
                    value = value && moment(value);
                    return <DatePicker {...props} value={value} />
                }
            }
        </FormItem>
    )
}
