import React from 'react';
import BasePage from "../../../../pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, Modal, Divider, Steps, Tabs, Tag, Popover   } from 'antd';
import { formatAmount } from '$utils/utils';
import "./index.scss";
import FormComp from '../../common/referenceDataOption/formComp'
import {queryFxOrderList, channelDelivery, orderStatusOptions, orderStatusOptions_b, queryFxFlowList, fxTypeOpt_a, fxTypeOpt_b} from '$api/moneyApi'
import moment from 'moment'
const { TabPane } = Tabs;
let initParams = {
    orderId: '',
    currencyType: '',
    status: '',
    orderStartTime: '',
    orderEndTime: '',
    provisionBank: '',
    customerAbbreviation: '',
}

let sellFilePath = ''
let buyFilePath = ''
let bool_01 = true;
let _funName = queryFxOrderList
const sourceOpt = [
    {label: '仅换汇', value: 'NORMAL'},
    {label: '换汇&VCC充值', value: 'FX_CREDIT'},
]
import List from '$components/common/list'
import SearchParam from './searchParam';
class MoneyMrgIndex extends BasePage {
    static viewName = 'moneyMrgIndex'; // 与路由名称保持一致
    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            isFirstTab: true,
            record:{},
            fxOrder: {},
            currencyList: []
        };
        this.refList = React.createRef()

    }
    componentDidMount() {
        super.componentDidMount()
        console.log(this.props)
    }
    shouldComponentUpdate(nextProps, nextState){
        // 指控缓存的path
        nextState.visible_a && (
            sellFilePath='',
            buyFilePath=''
        )
        return true
    }
    callback=(index)=>{
        this.setState({
            isFirstTab: index < 2
        }, e=>this.refList.current.reloadData())
        // 回调再进行调用
    }
    // 渠道交割
    channelDelivery = (success=false)=>{
        // 拒绝不用加参数 成功需要参数
        if(bool_01){
            (!success || sellFilePath && buyFilePath) ? 
            (   
                bool_01 = false,
                channelDelivery({
                    params:{
                        orderId: this.state.record.orderId||'',
                        fxType: this.state.record.fxType||'',
                        success,
                        sellFilePath,
                        buyFilePath,
                    }
                }).then(e=>{
                    bool_01 = true
                    this.setState({visible_a: false});
                    this.init()
                }).catch(e=>{
                    bool_01 = true;
                    this.msgError(e && e.message||'系统异常')
                })
            ):
            this.msgError('请上传交割资料')
        }
        
    }
    // 渲染
    render() {
        
        const {pageNum, fxOrder,currencyList, customerList=[], isFirstTab=false} = this.state;
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        const tailLayout = {
            wrapperCol: { offset: 2, span: 16 },
        };
        
        _funName = isFirstTab ?  queryFxOrderList: queryFxFlowList
        const statusOpt = isFirstTab ? orderStatusOptions: orderStatusOptions_b
        const fxTypeOpt = isFirstTab ? fxTypeOpt_a: fxTypeOpt_b
        
        const columns_a = [
            ...this.columnsFormat([
                ['订单号', 'orderId'],
                !!isFirstTab?
                [
                    '订单来源', 'source', txt=>this._optionsFind(txt, sourceOpt), 'select', sourceOpt
                ]:['流水号', 'flowNo'],
                ['卖出币种', 'sellCurrType', '', 'select', currencyList],
                ['买入币种', 'buyCurrType', '', 'select', currencyList],
                ['订单状态', 'orderStatus', txt=>this._optionsFind(txt, statusOpt), 'select', statusOpt],
                ['换汇类型', 'fxType', txt=>this._optionsFind(txt, fxTypeOpt), 'select', fxTypeOpt],
                ['换汇渠道', 'channel']
                
            ]),
            {
                key: 'rangepicker', 
                label: '交易起止时间', 
                type: 'rangepicker', 
                require: true, 
                format: 'YYYY-MM-DD HH:mm:ss',
                showTime: true,
                keys: ['orderStartTime', 'orderEndTime']
            }
        ];
        console.log(columns_a)
        
        const columns_b = [
            ...columns_a,
            {
                title: '商户简称',
                dataIndex: 'customerAbbreviation',
                key: 'customerAbbreviation',
            },
            {
                title: '卖出金额',
                key: 'sellAmount',
                dataIndex: 'sellAmount'
            },
            {
                title: '买入金额',
                key: 'buyAmount',
                dataIndex: 'buyAmount'
            },
            {
                title: '交易汇率',
                key: 'fxRate',
                dataIndex: 'fxRate'
            },
            {
                title: '订单时间',
                key: 'orderTime',
                dataIndex: 'orderTime'
            }
        ];
        return (
            <div>
                 
                <Tabs defaultActiveKey="1" onChange={this.callback}>
                    <TabPane tab="换汇业务流水" key="1">
                        
                       
                    
                    </TabPane>
                    <TabPane tab="换汇渠道流水" key="2">
                        
                        {
                            this.state.visible_a &&
                        <Modal
                            width='70%'
                            visible={true}
                            title={'交割'} 
                            onCancel={e=>this.setState({visible_a: false})} 
                            // footer={null}
                            footer={[
                                <Button key="submit" type="primary"  onClick={()=>this.channelDelivery(true)} >
                                通过
                                </Button>,
                                <Button onClick={()=>this.channelDelivery(false)}>
                                拒绝
                                </Button>
                            ]}
                            
                        >   
                        <div className='modalNotice'>银行流水凭证上传</div>
                        <div className='modalCont'>
                            <this.Upload  ButtonTxt={'卖出凭证'} callback={response=>{
                            response.code == '000000' && (sellFilePath = response.result.filePath)
                        }} />

                        <this.Upload ButtonTxt={'买入凭证'} callback={response=>{
                            response.code == '000000' && (buyFilePath = response.result.filePath)
                        }} />
                        </div>
                        
                        </Modal>
                        }
                        
                        
                    </TabPane>
                </Tabs>
                        <List
                            ref={this.refList}
                            filterForm={<SearchParam isFirstTab={!!isFirstTab} initParams={initParams} callback={e => e} />}
                            rowKey={(record) => record.orderId + record.subjectName + record.orderType + record.currencyDesc}
                            columns={[
                                ...columns_b, 
                                _funName == queryFxFlowList ?
                                {
                                    title: '操作',
                                    key: 'action',
                                    fixed: 'right',
                                    dataIndex: 'action',
                                    width: '10%',
                                    render: (text, row) => (
                                        <div>
                                            {
                                                // 换汇渠道交割
                                                row.orderStatus == 0 &&
                                                <Button type="primary" onClick={e=>{
                                                    bool_01 = true;
                                                    this.setState({
                                                        visible_a: true, 
                                                        record: row, 
                                                    })
                                                }} >交割</Button>
                                            }
                                            &nbsp;
                                            {
                                                (row.buyFilePath || row.sellFilePath) && 
                                                <Popover placement="top" title={'选择'} content={<div>
                                                    
                                                    {
                                                        row.sellFilePath && <p onClick={e=>window.open(row.sellFilePath)}>
                                                            <a href="#">卖出凭证</a>
                                                        </p>
                                                    }
                                                    {
                                                        row.buyFilePath && <p onClick={e=>window.open(row.buyFilePath)}>
                                                            <a href="#">买入凭证</a>
                                                        </p>
                                                    }
                                                </div>} trigger="click">
                                                    <Button>预览</Button>
                                                </Popover>
                                            }
                                        </div>
                                    )
                                }:{}
                            ]}
                            fetchData={async (pageNoObj, params) => {
                                params && (initParams = params)
                                params =  {
                                    ...initParams,
                                    orderStartTime: initParams.dateArr && initParams.dateArr[0] || '',
                                    orderEndTime: initParams.dateArr && initParams.dateArr[1] || '',
                                    pageNum: pageNoObj.current || 1,
                                    pageSize: 10,
                                },
                                delete params.dateArr
                                let result = await _funName({
                                    params
                                })
                                console.log(result)
                                // 吐出去
                                const {
                                    fxOrder={}, 
                                    fxFlow={}
                                } = result;
                                return {
                                    list: fxFlow.fxOrderList || fxOrder.fxOrderList || [],
                                    total: fxFlow.totalCount || fxOrder.totalCount|| 0,
                                }
                            }}
                        />
                
            </div>
        )
    }
}
const MoneyMrgIndexView = Form.create({ name: 'moneyMrgIndex' })(MoneyMrgIndex);
export default MoneyMrgIndexView