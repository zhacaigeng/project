import { useCallback } from 'react';
import FormItem from './formItem'
import isURL from 'validator/lib/isURL'

FormItemUrl.defaultProps = {
    formatValidate: true,
    placeholder: '例如：www.website.com'
}

export default function FormItemUrl(props) {
    const { formatValidate, label, required, ...rest } = props;    
    const defaultValidate = useCallback(val => {
        if(required && (val == null || val === '')) {
            return `请填写${label}`;
        }
        if(val && formatValidate && !isURL(val)) {
            return `请填写正确的${label}`;
        }
    }, [required]);

    return <FormItem validate={defaultValidate} label={label} required={required} {...rest} />
}
