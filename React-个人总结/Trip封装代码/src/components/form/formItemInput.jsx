import { useEffect } from 'react'
import { Col, Input } from 'antd'
import { useFormikContext, ErrorMessage } from 'formik'
import classNames from 'classnames'
import isFunction from 'lodash/isFunction'

FormItemInput.defaultProps = {
    // 布局
    // The rest is about Formik 
}

export default function FormItemInput(props) {
    const { wrapperCol, ...rest } = props;
    const { children, name } = rest;
    const { wrapperCol: gWrapperCol } = useFormikContext();
    const mergedWrapperCol = wrapperCol || gWrapperCol;
    const baseClassName = 'ant-form-item';
    const itemInputClassName = {
        [`${baseClassName}-control`]: true,        
    }
   
    return (
        <Col {...mergedWrapperCol} className={classNames(itemInputClassName)}>
            <Choose>
                <When condition={!!name}>
                    <FormItemWithInput {...rest} />
                </When>
                <Otherwise>
                    {
                        children
                    }
                </Otherwise>
            </Choose>            
        </Col>
    ) 
}

function FormItemWithInput(props) {
    const baseClassName = 'ant-form-item';
    const { 
        name, 
        children,
        validate: validateFn,
        ...rest
    } = props;
    const formik = useFormikContext();
    const { 
        getFieldProps,
        getFieldMeta, 
        registerField, 
        unregisterField 
    } = formik;
    const field = formik.getFieldProps(props);
    const meta = formik.getFieldMeta(name);
    const inputClassName = {
        [`${baseClassName}-control`]: true,
        'has-error': meta.touched && meta.error
    }
    
    useEffect(() => {
        registerField(name, {
            validate: validateFn
        });
        return () => {
            unregisterField(name);
        }
    }, [name, validateFn, registerField, unregisterField]);

    const inputProps = { ...field, ...rest };    
    return (
        <div className={classNames(inputClassName)}>
            <div className={`${baseClassName}-control-input-content`}>
                {
                    isFunction(children)
                    ? children(inputProps)
                    : children
                    ? React.cloneElement(children, inputProps)
                    : <Input allowClear {...inputProps} />
                }
            </div>
            <ErrorMessage name={field.name}>
                {
                    msg => <div className="ant-form-explain">{msg}</div>
                }
            </ErrorMessage>
        </div>
    )
}