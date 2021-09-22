import React, { useImperativeHandle } from 'react'
import { Form as FormikForm, useFormik, FormikProvider } from 'formik'
import isFunction from 'lodash/isFunction'
import classNames from 'classnames'

const Form = React.forwardRef(function Form(props, ref) {
    const { 
        className,
        layout, 
        labelAlign,
        colon,
        labelCol,
        wrapperCol,
        children,
        ...rest
    } = props;
    const formikbag = useFormik(rest);
    const enhancedFormikbag = {
        layout, // TODO
        labelAlign,
        colon,
        labelCol,
        wrapperCol,
        ...formikbag
    }

    useImperativeHandle(ref, () => enhancedFormikbag);
    
    const formClassName = {
        'formik-from': true,
        'ant-form': true,
        'ant-form-horizontal': true,
        [className]: !!className
    }

    return (
        <FormikProvider value={enhancedFormikbag}>
            <FormikForm className={classNames(formClassName)} noValidate>
                {
                    isFunction(children)
                    ? children(enhancedFormikbag)
                    : children
                }
            </FormikForm>
        </FormikProvider>
    )
})

Form.defaultProps = {
    // 布局
    layout: void 0, // ?
    labelAlign: 'right',
    colon: true,
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
    // The rest is about Formik
    initialValues: {},
    onSubmit: void 0,
}

export default Form;