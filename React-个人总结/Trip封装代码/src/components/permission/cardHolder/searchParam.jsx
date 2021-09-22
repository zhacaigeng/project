
import Form from '$components/form'
import { FilterForm } from '$components/common/list'
import { AddBtn } from '$components/common/actionBtns'

const initialValues = {
    loginName: '',
    userName: '',
    customerId: ''
}

export default function SearchParam(props) {
    const { onAddUser } = props;
    return (
        <FilterForm initialValues={initialValues} extraAction={<AddBtn onClick={onAddUser}>新增用户</AddBtn>}>
            <Form.Item required={false} label="登录名" name="loginName" />
            <Form.Item required={false} label="用户名" name="userName" />
            <Form.Item.SelectCustomer required={false} />
        </FilterForm>
    )
}