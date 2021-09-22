import { Button } from "antd";

Search.defaultProps = {
    icon: 'search',
    type: 'primary',
    htmlType: 'submit',
    children: '查询'
}

export default function Search(props) {
    return <Button {...props} />
}