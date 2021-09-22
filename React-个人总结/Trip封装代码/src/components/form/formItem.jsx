import { useCallback } from 'react'
import { useFormikContext } from 'formik'
import { Row, Col } from 'antd'
import classNames from 'classnames'
import isArray from 'lodash/isArray'
import FormItemLabel from './formItemLabel'
import FormItemInput from './formItemInput'

FormItem.defaultProps = {
    // 布局
    // className,
    // label
    // label, 
    // labelCol,
    // required,
    // formik input
    requiredMessage: '必填',
    placeholder: '请输入'
}

export default function FormItem(props) {
    const { 
        className,
        label, 
        labelCol,
        required, // 是否必填，validate的快捷方式
        requiredMessage, // 必填提示文案
        name,
        ...rest
    } = props;

    const itemClassName = {
        [className]: !!className,
        'ant-form-item': true
    }
    // 默认添加非空校验
    const defaultValidate = useCallback(val => {        
        if(required && (val == null || val === '' || isArray(val) && val.length === 0)) {
            return requiredMessage;
        }
    }, [required, requiredMessage]);    
    
    return (
        <Row className={classNames(itemClassName)}>
            <FormItemLabel 
                label={label} 
                labelCol={labelCol} 
                htmlForm={name} 
                required={required}
                />
            <FormItemInput
                validate={defaultValidate} 
                name={name}
                {...rest} />
        </Row>
    )
}

/**
 * 只布局 
 */
export function FormItemShell(props) {
    const { className, wrapperCol, children } = props;
    const { wrapperCol: gWrapperCol, labelCol } = useFormikContext();
   
    let mergedWrapperCol = wrapperCol || gWrapperCol || {};
    if(mergedWrapperCol.offset == null && labelCol.span) {
        mergedWrapperCol = {
            ...mergedWrapperCol,
            offset: labelCol.span
        }
    }

    return (
        <Row className={className}>
            <Col {...mergedWrapperCol}>
                {
                    children
                }
            </Col>
        </Row>
    )
}