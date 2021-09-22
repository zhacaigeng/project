import React from 'react';
import { BasePage } from '@ctrip/nfes';
import {message, Alert, Popconfirm, Button} from 'antd'
import {getCurrencyList, queryCusCurrencyInfo} from '$api/commonApi'
// 跨境付获取所有客户
import { getCustomerAll } from '$api/depositApi';
// vcc获取所有客户
import {
    queryCustomerSelectList,
} from '$api/commission'
import {queryPayoutSupport} from '$api/moneyApi'
// 引入封装好的表单组件
import FormComp from '$components/common/referenceDataOption/formComp'
import Table from '$components/common/referenceDataOption/table'
import Upload from '$components/common/referenceDataOption/Upload'
import {columnsFormat} from '$utils/utils'
export default class IndexPage extends BasePage {
    msgError = (text='系统异常')=> message.error(text);
    msgSucc = message.success;
    msgWarn = message.warn;
    // 获取所有币种疯转公共方法
    getCurrencyList = getCurrencyList;
    getCustomerAll = getCustomerAll; //cpp
    queryCustomerSelectList = queryCustomerSelectList //vcc
    // payout获取基础数据
    queryPayoutSupport = queryPayoutSupport
    // vcc获取开卡币种
    queryCusCurrencyInfo = queryCusCurrencyInfo
    // 格式化表单
    columnsFormat = columnsFormat
    // 挂载父组件上
    FormComp = FormComp;
    Upload = Upload;
    Alert = Alert;
    Popconfirm = Popconfirm;
    Button = Button;
    Table = Table;

    async getInitialState(ctx) {
        return {}
    }

    componentDidMount() {}
    
    _optionsFind = (val='', options=[])=>(options.find(v=>v.value == val)||{}).label||''
    // 参考nfes的goto方法,自动加上了语言参数
    jumpPage() {
        const i18nLang = __NEXT_DATA__.props.i18nLang;
        const arr = [...arguments];
        try {
            if (arr.length === 1) {
                arr[1] = {};
            } else if (arr.length === 2) {
                if (typeof arr[1] !== 'object') {
                    arr[2] = false;
                    arr[3] = {};
                }
            } else if (arr.length === 3) {
                arr[3] = {};
            }
            const opt = arr[arr.length - 1] || {};
            opt["lang"] = i18nLang;
            this.goto(...arr);
        } catch (e) {
            console.log(e)
        }
    }
}
