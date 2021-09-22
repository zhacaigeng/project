import { Radio } from 'antd'
import FormItem from './formItem'

/**
 * RadioGroup Form
 * @param {*} props 
 * @returns 
 */
export default function FormItemRadioGroup(props) {
    const { children } = props;
    return (
        <FormItem {...props}>
            {
                props => <Radio.Group {...props} children={children} />
            }
        </FormItem>
    )
}