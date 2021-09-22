import { Checkbox } from 'antd'
import FormItem from './formItem'
import { useFormikContext } from 'formik'
import classNames from 'classnames'

/**
 * CheckboxGroup Form
 * @param {*} props 
 * @returns 
 */
FormItemCheckboxGroup.defaultProps = {
    vertical: false
}

export default function FormItemCheckboxGroup(props) {
    const { vertical, name, className, onChange, ...rest } = props;
    const { setFieldValue } = useFormikContext();
    const computedClassName = classNames(className, {
        'formik-from__checkbox-group--vertical': vertical
    })
    

    function handleChange(checkedValues) {
        setFieldValue(name, checkedValues);
        onChange && onChange(checkedValues);
    }

    return (
        <FormItem {...rest} name={name} className={computedClassName} onChange={handleChange}>
            {
                props => <Checkbox.Group {...props} />
            }
        </FormItem>
    )
}