import { Col } from 'antd'
import { useFormikContext } from 'formik'
import classNames from 'classnames'
import isString from 'lodash/isString'

export default function FormItemLabel(props) {    
    const { 
        labelCol, 
        required,
        label,
        htmlFor
    } = props;
    const { 
        hideRequiredMark,
        labelAlign,
        colon,
        labelCol: gLabelCol,
    } = useFormikContext();

    const mergedLabelCol = labelCol || gLabelCol;
    const itemLabelClassName = {
        'ant-form-item-label': true,
        'ant-form-item-label-left': labelAlign === 'left'
    }
    const labelClassName = {        
        'ant-form-item-required': required,
        'ant-form-item-no-colon': colon === false        
    }

    return (
        <If condition={!!label}>
            <Col className={classNames(itemLabelClassName)} {...mergedLabelCol} >
                <label
                    htmlFor={htmlFor} 
                    title={isString(label) ? label : ''}
                    className={classNames(labelClassName)}
                    >
                    {
                        label 
                    }
                </label>
            </Col>
        </If>        
    )
}