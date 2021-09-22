
import Form from '$components/form'
import { FilterForm } from '$components/common/list'

import FormItemSelect from '$components/form/formItemSelect'
import {orderTypeOpt} from '$utils/optionsConf'
import {queryFxOrderList, channelDelivery, orderStatusOptions, orderStatusOptions_b, queryFxFlowList, fxTypeOpt_a, fxTypeOpt_b} from '$api/moneyApi'

export default function SearchParam(props) {
    
    const { callback, isFirstTab } = props;
    console.log(isFirstTab)
    const statusOpt = isFirstTab ? orderStatusOptions: orderStatusOptions_b
    const fxTypeOpt = isFirstTab ? fxTypeOpt_a: fxTypeOpt_b
    return (
        <FilterForm initialValues={props.initParams} >
            {
                !isFirstTab && <Form.Item.SelectCustomer required={false} /> 
            }
            <Form.Item required={false} label="订单号" name="orderId" />
            {
                !!isFirstTab?
                <FormItemSelect options={[
                    {label: '仅换汇', value: 'NORMAL'},
                    {label: '换汇&VCC充值', value: 'FX_CREDIT'}
                ]} label="订单来源" name="source" />:
                <Form.Item required={false} label="流水号" name="flowNo" />
            }
            <Form.Item.SelectCurrencyCustomerDic name='sellCurrType' label='卖出币种' />
            <Form.Item.SelectCurrencyCustomerDic name='buyCurrType' label='买入币种' />
            
            <FormItemSelect options={statusOpt} label="订单状态" name="orderStatus" />
            <FormItemSelect options={fxTypeOpt} label="换汇类型" name="fxType" />
            <Form.Item  label="换汇渠道" name="channel" />
            <Form.Item.DateRange  label="交易起止时间" format='YYYY-MM-DD HH:mm:ss' name="dateArr" />
            <Form.Item required={false} label="订单号" name="orderId" />
            <Form.Item.SelectCurrencyCustomerDic name='currencyType' label='交易币种' />
            
            <FormItemSelect options={[
                {label: '处理中', value: '0'},
                {label: '成功', value: '1'},
                {label: '失败', value: '2'}
            ]} label="订单状态" name="status" />
            <Form.Item.DateRange  label="交易起止时间" format='YYYY-MM-DD HH:mm:ss' name="dateArr" />
            <Form.Item  label="备付金银行" name="provisionBank" />
            <Form.Item  label="客户简称" name="customerAbbreviation" />
            
        </FilterForm>
    )
}