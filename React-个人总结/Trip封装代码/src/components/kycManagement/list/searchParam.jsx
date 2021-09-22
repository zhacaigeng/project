import Form from '$components/form'
import { FilterForm } from '$components/common/list'

const initialValues = {
    customerId: '',
    chineseName: '',
    status: '',
    createTimeRange: '',
    updateTimeRange: ''
}

export default function SearchParam(props) {
    return (
        <FilterForm initialValues={initialValues} colCount={5}>
            <Form.Item.SelectCustomer required={false} /> 
            <Form.Item required={false} label="商户名称（中文）" name="chineseName" />
            <Form.Item.SelectKycStatus label="KYC状态" name="status" />
            <Form.Item.DateRange required={false} label="创建时间" name="createTimeRange" />
            <Form.Item.DateRange required={false} label="更新时间" name="updateTimeRange" />                
        </FilterForm>
    )
}