
import Form from '$components/form'
import { FilterForm } from '$components/common/list'
import { AddBtn } from '$components/common/actionBtns'
import FormItemSelect from '$components/form/formItemSelect'


export default function SearchParam(props) {
    const { callback = e => e } = props;
    return (
        <FilterForm initialValues={props.initParams} extraAction={<AddBtn onClick={callback}>创建</AddBtn>} >
            <Form.Item required={false} label="订单号" name="orderId" />
            <FormItemSelect options={[
                { label: '处理中', value: '0' }, 
                { label: '成功', value: '1' }, 
                { label: '失败', value: '2' }
            ]} label="订单状态" name="orderType" />
            <Form.Item.SelectCustomer required={false} />
            
        </FilterForm>
    )
}