import { Button } from 'antd'

ActionCancel.defaultProps = {
    children: '取消'
}

export default function ActionCancel(props) {
    return <Button {...props} />
}