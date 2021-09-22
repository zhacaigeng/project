import { Button } from "antd";

ResetForm.defaultProps = {
    icon: 'undo',
    htmlType: 'reset',
    children: '重置'
}

export default function ResetForm(props) {
    return <Button {...props} />
}