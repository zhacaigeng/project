import { useCallback } from 'react';
import FormItem from './formItem'
import isEmail from 'validator/lib/isEmail'

FormItemEmail.defaultProps = {
    label: '邮箱',
    name: 'email',
    maxLength: 50,
    formatValidate: true
}

export default function FormItemEmail(props) {
    const { required, formatValidate, ...rest } = props;    
    const defaultValidate = useCallback(val => {
        if(required && (val == null || val === '')) {
            return '必填';
        }
        if(val && formatValidate && !isEmail(val)) {
            return '格式错误';
        }
    }, [required]);

    return <FormItem validate={defaultValidate} required={required} {...rest} />
}
