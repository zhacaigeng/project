import React from 'react';
import BasePage from "$pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, Modal, Divider, Steps, Tabs, Tag, Alert, message   } from 'antd';
import "./index.scss";
import ModalComp from '$components/ModalComp'
const { TabPane } = Tabs;
import moment from 'moment';
import {queryFeeConfig, createFeeConfig, dict, deleteFeeConfig} from '$api/configMrg'
const Tit = '收款方';

import {chargeWayOpt, settleModeOpt, payoutTypeOpt, chargeTypeOpt} from '$utils/optionsConf'
class paymentConf extends BasePage {
    static viewName = 'paymentConf'; // 与路由名称保持一致
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            withdrawOrder:{},
            record: '',
            _data:{
                country:[],
                currency:[],
                iban:[],
            },
            subjectType: '',
            // 付款方式
            paymentConfType:'',
            bankCountry: '',
            currency: ''
        };
        this.queryPayeeList_params = {
            customerId: '',
            payoutType: '',
            settleMode: '',
            createStartTime: '',
            createEndTime: '',
            updateStartTime:'',
            updateEndTime: '',
        }
    }
    componentDidMount() {
        super.componentDidMount()
        this.init()
        console.log(this)
    }
    // 初始化
    init() {
        // 查询所有商户
        this.getCustomerAll({}).then(customerList=>this.setState({customerList}))
        // 查询币种枚举
        dict({}).then(result=>result.currency && this.setState({currencyList: result.currency}))
        // 初始化
        this.queryFeeConfig(1)
    }
    TabsChange=(i)=>{
        i > 1  && this.queryFeeConfig(1)
    }
    onChangeRadio = e => {
        console.log('radio checked', e);
        this.setState({
            currency: e,
        }, ()=>{
            // 查询当前币种的汇款信息
        });
    };
    // list
    queryFeeConfig = (pageNo, params) => {
        this.setState({
            visible_b: false, 
            record: ''
        })
        params && (this.queryPayeeList_params = params)
        queryFeeConfig({
            params: {
                ...this.queryPayeeList_params,
                pageNo,
                pageSize: 10
            }
            
        }).then(result=>{
            result.data ? 
            this.setState({
                withdrawOrder: result.data,
                pageNo,
            }): this.msgError(message)
            
            
            console.log(result)
        })
    }
    // 创建用户
    createAndEdit = (params) => {
        console.log(params)
        // params.roles && ( params.roles = JSON.stringify(params.roles) )
        const {modelShowType, record} = this.state;
        const fun  = modelShowType == 'edit'? createFeeConfig: createFeeConfig
        fun({
            params
        }).then(result => this.queryFeeConfig(1))
    }
    
    // 跳转
    // 渲染
    render() {
        const { currency, withdrawOrder, pageNo, visible_b=false, _data, subjectType, paymentConfTypeList=[], paymentConfType='', bankCountry, customerId='', customerList=[], record='', currencyList=[], chargeWay=''} = this.state;
        console.log(_data, bankCountry)
        let columns_a = [
            {
                title: '商户简称',
                dataIndex: 'customerSimpleName',
                key: 'customerId',
                type: 'select',
                options: customerList.map(v=>({
                    value: v.value||'',
                    label: v.customerSimpleName||''
                })),
                disabled: !!record
            },
            {
                title: '付款类型',
                dataIndex: 'payoutType',
                key: 'payoutType',
                type: 'select',
                options: payoutTypeOpt,
                disabled: !!record
            },
            {
                title: '结算模式',
                dataIndex: 'settleMode',
                key: 'settleMode',
                type: 'select',
                options: settleModeOpt,
                render: txt=>this._optionsFind(txt, settleModeOpt),
                disabled: !!record
            }
        ];
        const tailLayout = {
            wrapperCol: { offset: 2, span: 16 },
        };
        
        return (
            <div>
                <div style={{height: '150px'}}>
                            {
                                // antd Form组件源码横向全都用float，造成严重干扰
                                <this.FormComp 
                                    // 成功回调 
                                    sucCB={Obj=> this.queryFeeConfig(1, Obj)}
                                    // key和title 
                                    columns={[
                                        ...columns_a,
                                        {
                                            key: 'rangepicker01', 
                                            label: '创建起止时间', 
                                            type: 'rangepicker', 
                                            require: true, 
                                            format: 'YYYY-MM-DD HH:mm:ss',
                                            showTime: true,
                                            keys: ['createStartTime', 'createEndTime']
                                        },
                                        {
                                            key: 'rangepicker02', 
                                            label: '更新起止时间', 
                                            type: 'rangepicker', 
                                            require: true, 
                                            format: 'YYYY-MM-DD HH:mm:ss',
                                            showTime: true,
                                            keys: ['updateStartTime', 'updateEndTime']
                                        }
                                    ]} 
                                    otherButton={<Button type="primary" onClick={e=>this.setState({visible_b: true, record: ''})} >添加</Button>}
                                    // 栅格布局
                                    layout={{
                                        labelCol: { span: 10 },
                                        wrapperCol: { span: 14}
                                    }}>
                                </this.FormComp>
                            }
                        </div>
                        <this.Table 
                            columns={[
                                ...columns_a, 
                                {
                                    title: '固定费金额',
                                    key: 'fixChargeAmt',
                                    dataIndex: 'fixChargeAmt'
                                },
                                
                                {
                                    title: '比例费比例',
                                    key: 'chargeScale',
                                    dataIndex: 'chargeScale',
                                },
                                {
                                    title: '收费模式',
                                    key: 'chargeWay',
                                    dataIndex: 'chargeWay',
                                    type: 'select',
                                    options: chargeWayOpt,
                                    render: txt=>this._optionsFind(txt, chargeWayOpt)
                                },
                                
                                
                                
                                // {
                                //     title: '固定费币种',
                                //     key: 'fixChargeCurrencyCode',
                                //     dataIndex: 'fixChargeCurrencyCode'
                                // },
                                
                                
                                {
                                    title: '创建时间',
                                    key: 'createTime',
                                    dataIndex: 'createTime'
                                },
                                {
                                    title: '更新时间',
                                    key: 'updateTime',
                                    dataIndex: 'updateTime'
                                },
                                
                                {
                                    title: '操作',
                                    key: 'act',
                                    dataIndex: 'act',
                                    render: (v, _record)=><>
                                        {/* <this.Button type='primary' onClick={e=>this.setState({customerId: _record.customerId })}>详情</this.Button>&nbsp;&nbsp; */}
                                        <this.Button type='primary' onClick={e=>this.setState({
                                            visible_b: true,
                                            chargeWay: _record.chargeWay||'',
                                            record: _record
                                        })}>编辑</this.Button>&nbsp;&nbsp;
                                        <this.Popconfirm
                                            title="确认删除"
                                            onConfirm={()=>{
                                                deleteFeeConfig({
                                                    params:{
                                                        serialNo: _record.serialNo||''
                                                    }
                                                }).then(this.init)
                                            }}
                                            okText="确认"
                                            cancelText="取消"
                                        >
                                            <a href="#" >
                                            <this.Button type='primary'>删除</this.Button>
                                            </a>
                                        </this.Popconfirm>
                                        
                                    </>
                                }
                            ]} 
                            dataSource={withdrawOrder['list']||[]} 
                            pagination={{
                                'total': withdrawOrder['totalCount'] || 0 ,
                                'onChange': i => this.queryFeeConfig(i),
                                'current': pageNo || 1
                            }}
                        />
                { visible_b && 
                <Modal
                    style={{
                        width: '100%'
                    }}
                    width='70%'
                    visible={true}
                    title={record?'编辑': '添加'} 
                    onCancel={()=>this.setState({
                        visible_b: false,
                        record: ''
                    })} 
                    footer={null}  
                    
                >
                    <div 
                    style={{
                        height: '400px',
                        overflow: 'auto'
                    }}>
                    <this.FormComp 
                    
                    record={record||{}}
                        ColSpan={24}
                        ref='FormCompModal'
                        // 成功回调 
                        sucCB={obj=>this.createAndEdit({
                            ...obj, 
                            ...record?{serialNo: record.serialNo||''}:{}
                        })}
                        radioCB={(val, key)=>{
                            this.setState({[key]: val})
                        }}
                        selectCB={(val, key)=>{
                            console.log(val, key, ['bankCountry', 'currency'].includes(key) );
                            // 收费模式联动效果
                            ['chargeWay'].includes(key) && this.setState({
                                [key]: val
                            })
                        }}
                        // key和title 
                        columns={[
                            ...columns_a, 
                            {
                                title: '收费类型',
                                key: 'chargeType',
                                dataIndex: 'chargeType',
                                type: 'select',
                                options: chargeTypeOpt,
                                disabled: !!record
                            },
                            {
                                title: '收费模式',
                                key: 'chargeWay',
                                dataIndex: 'chargeWay',
                                type: 'select',
                                options: chargeWayOpt,
                            },
                            ...(
                                chargeWay != 'SCALE_MODE'? [
                                    {
                                        title: '固定费金额',
                                        key: 'fixChargeAmt',
                                        dataIndex: 'fixChargeAmt'
                                    },
                                    {
                                        title: '固定费币种',
                                        key: 'fixChargeCurrencyCode',
                                        dataIndex: 'fixChargeCurrencyCode',
                                        type: 'select',
                                        options: currencyList||[]
                                    }
                                ]:[]
                            ),
                            ...(
                                chargeWay !=  'FIX_MODEL' ? [
                                    {
                                        title: '比例费比例',
                                        key: 'chargeScale',
                                        dataIndex: 'chargeScale',
                                        addonAfter: '%'
                                    }
                                ]:[]
                            )
                            
                        ]} 
                        okTxt={'保存'}
                        // 栅格布局
                        layout={{
                            labelCol: { span: 10 },
                            wrapperCol: { span: 14}
                        }}>
                    </this.FormComp>
                    </div>
                </Modal>
                }
                
            </div>
        )
    }
}
const paymentConfView = Form.create({ name: 'paymentConf' })(paymentConf);
export default paymentConfView