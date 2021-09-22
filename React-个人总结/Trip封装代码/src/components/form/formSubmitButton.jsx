import { Button } from 'antd'
import { useFormik, useFormikContext } from 'formik'

FormSubmitButton.defaultProps = {
    type: 'primary',
    htmlType: 'submit',       
}

export default function FormSubmitButton(props) {
    const { isSubmitting } = useFormikContext();    
    return <Button loading={isSubmitting} {...props} />
}