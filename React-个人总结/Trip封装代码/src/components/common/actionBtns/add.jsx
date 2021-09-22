import { Button } from "antd";

Add.defaultProps = {
    icon: 'plus',
    type: 'primary'
}

export default function Add(props) {
    return <Button {...props} />
}