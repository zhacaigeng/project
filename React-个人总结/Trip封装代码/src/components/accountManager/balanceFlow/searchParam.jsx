
import Form from '$components/form'
import { FilterForm } from '$components/common/list'

import FormItemSelect from '$components/form/formItemSelect'
import {orderTypeOpt} from '$utils/optionsConf'


export default function SearchParam(props) {
    const { callback } = props;
    return (
        <FilterForm initialValues={props.initParams} >
            <Form.Item required={false} label="订单号" name="orderId" />
            <Form.Item.SelectSubjectId name='subjectId' />
            <FormItemSelect options={orderTypeOpt} label="流水类型" name="orderType" />
            <Form.Item.SelectCustomer required={false} />
            <Form.Item.SelectCurrencyCustomerDic name='accountCurrency'  />
            <Form.Item.DateRange required={false} label="交易起止时间" format='YYYY-MM-DD HH:mm:ss' name="dateArr" />
            
        </FilterForm>
    )
}