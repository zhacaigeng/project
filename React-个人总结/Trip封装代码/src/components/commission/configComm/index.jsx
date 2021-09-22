import React from 'react';
import BasePage from "../../../../pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, Modal, Divider, Steps, Tabs, Tag   } from 'antd';
import { getDemoList, deleteGoods } from '$api/demo';
import { formatAmount } from '$utils/utils';
import "./index.scss";
import FormComp from '../../common/referenceDataOption/formComp'
import {
    queryCustomerList, 
    queryCustomerSelectList,
} from '$api/commission'
import IndexConfig from './comp/indexConfig'
const { TabPane } = Tabs;

let options_c =  [
    {label: '正常', value: 'NORM'},
    {label: '锁定', value: 'LOCK'},
    {label: '全部锁定', value: 'FULK'},
]
let options_d =  [
    {label: 'VIP会员', value: '1'},
    {label: '普通会员', value: '2'}
]
let queryCustomerAccountPage_params = {
    customerId: '',
    customerName: '',
}
class MoneyMrgIndex extends BasePage {
    static viewName = 'moneyMrgIndex'; // 与路由名称保持一致
    
    constructor(props) {
        console.log(props)
        super(props);
        this.FormCompRef = React.createRef()
        this.state = {
            customerList: {
                
            },
            selectInfo:{},
            record:{},
            modal1Visible: false,
            customerList: [],
            options_a: [],
        };

    }
    componentDidMount() {
        super.componentDidMount()
        this.init()
    }
    // 初始化
    init() {
        // 查询所有人
        queryCustomerSelectList().then(arr=>{
            this.setState({
                options_a: arr
            })
        })
        // 查询list
        this.queryCustomerList(1)
    }
    showModal = (record={}) => {
        this.setState({
            modal1Visible: true,
            record,
        })
    }
    // 查询list
    queryCustomerList = (pageNo, params) => {
        this.setState({modal1Visible: false})
        params && (queryCustomerAccountPage_params = params)
        queryCustomerList({
            params:{
                ...queryCustomerAccountPage_params,
                pageNo,
                pageSize: 10
            }
        }).then(res => {
            const {
                code, 
                message,
                result
            } = res;
            code == '000000' ?
            this.setState({
                customerList: result.customerList|| {},
                pageNo,
            }): this.msgError(message||'系统异常')
            
        })
    }
    // 渲染
    render() {
        const {pageNo, record, customerList={},  selectInfo, modal1Visible,options_a=[] } = this.state;
        const columns_a = [
            {
                title: '客户名',
                dataIndex: 'customerName',
                key: 'customerName'
            },
            {
                title: '客户ID',
                dataIndex: 'customerId',
                key: 'customerId'

            },
            {
                title: '状态',
                dataIndex: 'customerStatus',
                key: 'customerStatus',
                render: txt => (options_c.find(v=>v.value == txt) || {})['label'] || ''

            },
            {
                title:'等级',
                dataIndex: 'customerLevel',
                key: 'customerLevel',
                render: txt => (options_d.find(v=>v.value == txt) || {})['label'] || ''
            },
            {
                title: '操作',
                key: 'status',
                dataIndex: 'status',
                render: (text, record) => (
                    <div>
                        <a onClick={()=>this.showModal(record)}>奖励金&争议手续费</a>&nbsp;
                    </div>
                    
                ),
            }
        ];
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        const tailLayout = {
            wrapperCol: { offset: 2, span: 16 },
        };
        return  !modal1Visible? <>
                    {/* 顶部search */}
                    <FormComp
                        style={{
                            height: '100px'
                        }}
                        ref={this.FormCompRef}
                        // 成功回调 
                        sucCB={Obj =>this.queryCustomerList(1, Obj)}
                        // key和title 
                        columns = { [
                            {key: 'customerId', label: '客户', type: 'select', options: options_a},
                        ]}
                        
                        // 栅格布局
                        layout={{
                            labelCol: { span: 5 },
                            wrapperCol: { span: 15}
                        }}>
                    </FormComp>
                    {/* table */}
                    <this.Table 
                        rowKey={_record => _record.customerId + _record.email + _record.userName} 
                        columns={columns_a} 
                        dataSource={customerList['vccCustomerVoList']||[]} 
                        pagination={{
                            'total': customerList['totalCount'] || 0 ,
                            'onChange': i => this.queryCustomerList(i),
                            'current': pageNo || 1
                        }}
                    />
                </>:
                <IndexConfig record={record} _callback={()=>this.setState({modal1Visible: false})} />
    }
}
const MoneyMrgIndexView = Form.create({ name: 'moneyMrgIndex' })(MoneyMrgIndex);
export default MoneyMrgIndexView