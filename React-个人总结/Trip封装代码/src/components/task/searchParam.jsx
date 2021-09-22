import Form from '$components/form'
import { FilterForm } from '$components/common/list'

const initialValues = {
    businessTypeList: void 0
}
const labelCol = { span: 4 }
const wrapperCol = { span: 20 }

export default function SearchParam() {      
    return (
        <FilterForm 
            initialValues={initialValues} 
            labelCol={labelCol} 
            wrapperCol={wrapperCol} 
            colCount={2} 
            actionsColScale={false}
            className="vcc-task-list__filter-form"
            >
            <Form.Item.SelectProcessBizType name="businessTypeList" />
        </FilterForm>
    )
}