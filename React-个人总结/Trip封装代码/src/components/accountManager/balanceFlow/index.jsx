import React from 'react';
import { formatAmount } from '$utils/utils';
import "./index.scss";
import { getAccountFlow} from '$api/accountManager'
import {orderTypeOpt} from '$utils/optionsConf'
import List from '$components/common/list'
import SearchParam from './searchParam';
import {columnsFormat} from '$utils/utils'
let initParams = {
    orderId: '',
    subjectId: '',
    orderType: '',
    customerId: '',
    accountCurrency: '',
    dateArr: []
}

export default class BalanceFlow extends React.Component {
    // 渲染
    render = e => (
        <List
            filterForm={<SearchParam initParams={initParams} callback={e => e} />}
            rowKey={(record) => record.orderId + record.subjectName + record.orderType + record.currencyDesc}
            columns={columnsFormat([
                ['订单号', 'orderId'],
                ['科目', 'subjectName'],
                ['流水类型', 'orderType', (txt) => (orderTypeOpt.find((v) => v.value == txt) || {}).label || ''],
                ['商户简称', 'customerName'],
                ['商户编号', 'customerId'],
                ['交易金额', 'amount', (txt, record) => `${formatAmount(txt)} ${record.currencyDesc}`],
                ['交易后余额', 'currentBalance', (txt, record) => `${formatAmount(txt)} ${record.currencyDesc}`],
                ['记账时间', 'createDateStr'],
            ])}
            fetchData={async (pageNoObj, params) => {
                params && (initParams = params)
                let result = await getAccountFlow({
                    params: {
                        ...initParams,
                        beginDateStr: initParams.dateArr[0] || '',
                        endDateStr: initParams.dateArr[1] || '',
                        pageNo: pageNoObj.current || 1,
                        pageSize: 10,
                    },
                })
                // 吐出去
                return {
                    list: result.data || [],
                    total: result.count || 0,
                }
            }}
        />
    )
}