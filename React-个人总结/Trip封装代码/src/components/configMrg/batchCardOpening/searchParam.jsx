import { FilterForm } from '$components/common/list'
import Form from '$components/form'
import { AddBtn } from '$components/common/actionBtns'

export default function SearchForm(props) {
    const { onAddBatch } = props;
    const initialValues = {
        customerId: void 0,
        createTime: []
    }

    return (
        <FilterForm 
            initialValues={initialValues}
            labelCol={{ span: 8 }} 
            wrapperCol={{ span: 16 }}
            extraAction={<AddBtn onClick={onAddBatch}>新增批量开卡</AddBtn>}
            className=""
        >
            <Form.Item.SelectVccCustomer placeholder=""/>
            <Form.Item.DateRange label="创建时间" name="createTime"/>
        </FilterForm>
    )
}