import React from 'react';
import BasePage from "../../../../pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, message, Modal, Divider, Steps, Tabs, Tag   } from 'antd';
import { getDemoList, deleteGoods } from '$api/demo';
import { formatAmount } from '$utils/utils';
import "./index.scss";
import FormComp from '../../common/referenceDataOption/formComp'
import {queryProvisionAccountPage} from '$api/moneyApi'
const { TabPane } = Tabs;
const options_b = [
    {label: '充值待清算账户', value: 'RECHARG_FOR_SETTLE'},
    {label: '换汇待清算账户', value: 'EXCHANGE_TRANSITION'},
    {label: '提现待清算账户', value: 'WITHDRAW_FOR_SETTLE'},
]
let queryBusinessAccountPage_params = {
    accountId:'',
    currencyType:'',
    bankCode:'',
}
class MoneyMrgIndex extends BasePage {
    static viewName = 'moneyMrgIndex'; // 与路由名称保持一致
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            currencyList: [],
            account: {
                
            }
        };

    }
    componentDidMount() {
        super.componentDidMount()
        this.init()
        console.log(this.props)
    }
    // 初始化
    init() {
        // 获取所有的币种
        this.getCurrencyList({}).then(currencyList=>this.setState({
            currencyList,
        }))
    }
    // 内部账户流水list
    queryProvisionAccountPage = (pageNo, params) => {
        params && (queryBusinessAccountPage_params = params)
        queryProvisionAccountPage({
            params:{
                ...queryBusinessAccountPage_params,
                pageNo,
                pageSize: 10
            }
        }).then(res => {
            const {
                code, 
                message,
                result
            } = res;
            code == '000000' && result.account ?
            this.setState({
                account: result.account,
                pageNo,
            }): this.msgError(message||'系统异常')
            
        })
    }
    
    onChangeRadio = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        }, ()=>{
            // 查询当前币种的汇款信息
        });
    };
    // 渲染
    render() {
        const { currencyList, account, pageNo } = this.state;
        const columns_b = [
            {
                title: '订单号',
                dataIndex: 'accountId',
                key: 'accountId',
            },
            {
                title: '银行名',
                dataIndex: 'bankName',
                key: 'bankName',
            },
            {
                title: '银行号',
                dataIndex: 'bankCode',
                key: 'bankCode',
            },
            {
                title: '金额',
                dataIndex: 'balance',
                key: 'balance',
            },
            {
                title: '发起时间',
                key: 'createTime',
                dataIndex: 'createTime'
            },
            {
                title: '币种',
                key: 'currencyType',
                dataIndex: 'currencyType'
            },
        ];
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        const tailLayout = {
            wrapperCol: { offset: 2, span: 16 },
        };
        return (
            <>
                <FormComp 
                    style={{
                        marginBottom: '100px'
                    }}
                        // 成功回调 
                        sucCB={Obj =>this.queryProvisionAccountPage(1, Obj)}
                        // key和title 
                        columns={[
                            {key: 'accountId', label: 'ID', type: 'input'},
                            {key: 'currencyType', label: '币种', type: 'select', options: currencyList},
                            {key: 'bankCode', label: '类型', type: 'input',},
                        ]} 
                        // 栅格布局
                        layout={{
                            labelCol: { span: 5 },
                            wrapperCol: { span: 15}
                        }}>
                    </FormComp>
                    <this.Table 
                        columns={columns_b} 
                        dataSource={account['list']} 
                        style={{
                            marginTop: '50px'
                        }} 
                        pagination={{
                            'total': account['totalCount'] || 0 ,
                            'onChange': i => this.queryProvisionAccountPage(i),
                            'current': pageNo || 1
                        }}
                    />
            </>
        )
    }
}
const MoneyMrgIndexView = Form.create({ name: 'moneyMrgIndex' })(MoneyMrgIndex);
export default MoneyMrgIndexView