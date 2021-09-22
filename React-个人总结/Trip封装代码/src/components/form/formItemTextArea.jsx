import { Input } from 'antd'
import FormItem from './formItem'

FormItemTextArea.defaultProps = {
    autoSize: {
        minRows: 2, 
        maxRows: 6
    }
}

export default function FormItemTextArea(props) {   
    return (
        <FormItem {...props}>
            {
                props => <Input.TextArea {...props} />
            }
        </FormItem>
    )
}
