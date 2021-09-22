import React from 'react';
import BasePage from "../../../pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, Cascader, Modal, Divider, Steps, Checkbox, Descriptions, InputNumber } from 'antd';
import { clickTrackLog } from '$common/ubt';
import { isEmptyObject } from '$utils/utils';
import { values } from 'mobx';
import { 
    getMerchant, 
    getWithdrawQuery, 
    fxQuery, 
    customerUpdatePass, 
    createAuthFeeVerify,
    updateAuthFeeVerify, 
    deleteAuthFeeVerify,
    customerUpdateReject,
    adjustCommissionVerify, 
    deleteMccGroupVerify,
    commissionPostVerify, 
    fxConfQuery, 
    payeeQuery, 
    payoutFeeTaskQuery, 
    billInfo, 
    payoutTaskQuery,
    chargeBackInfo,
    queryPayoutChannelList
 } from '$api/merchantApi';
import { getInstanceQuery } from '$api/taskApi';
import { passDeposit } from '$api/depositApi';
import {orderStatusOptions} from '$api/moneyApi'
import Log from './common/approveLog'
import urlConfig from '$config/url';
import { backListStatusOpt, subjectTypeOpt, settleModeOpt, chargeWayOpt, billStatusOpt } from '$utils/optionsConf';
// 组件
import DescriptionsPayout from './comp/descriptions_payout'
import Desc from '$components/common/desc'
import './index.scss'
let riskFile = ''

const Option = Select.Option;
const FormItem = Form.Item;
const { Step } = Steps;
const { confirm } = Modal;
const columns_a = [
    {
        title: '任务节点',
        dataIndex: 'activityName',
        key: 'activityName',
    },
    {
        title: '审批人',
        dataIndex: 'operator',
        key: 'operator',
    },
    {
        title: '审批时间',
        dataIndex: 'endTime',
        key: 'endTime'
    },
    {
        title:'审批结果',
        dataIndex: 'approvedResult',
        key: 'approvedResult',
        render: v => (v ? '':'不') + '通过'

    },
    {
        title: '审批意见',
        key: 'comment',
        dataIndex: 'comment',
        render: v =>  v && v.constructor == Array ? v.join(): v &&  JSON.stringify(v) || ''
        // render: (record) => (
        //     <div>
        //     <a onClick={()=>this.jumpPage('/money/recharge')}>充值</a>&nbsp;
        //     <a onClick={()=>this.jumpPage('/money/withdraw')}>提现</a><br/>&nbsp;
        //     </div>
            
        // ),
    },
];
// 全部封装
function _formatViewInit (viewName, edit){
    let _arr = [
        {
            view: 'fx',
            title: '换汇',
            functionName_01: fxQuery,
            columns: [
                {label: '订单号', key: 'orderId'},
                {label: '客户简称', key: 'customerAbbreviation'},
                {label: '卖出金额', key: 'sellAmount'},
                {label: '卖出币种', key: 'sellCurrType'},
                {label: '买入金额', key: 'buyAmount'},
                {label: '买入币种', key: 'buyCurrType'},
                {label: '渠道', key: 'channel'},
                {label: '状态', key: 'orderStatus', options: orderStatusOptions},
                {label: '提交时间', key: 'orderTime'},
                {label: '汇率', key: 'fxRate'}
            ]
        },
        {
            view: 'withdraw',
            title: '提现',
            functionName_01: getWithdrawQuery,
            columns: [
                {label: '提现订单号', key: 'orderId'},
                {label: '提现商户简称', key: 'customerName'},
                {label: '提现商户端号', key: 'customerId'},
                {label: '提现币种', key: 'currencyType'},
                {label: '提现金额', key: 'amount'},
                {label: '提交时间', key: 'createTime'},
                {label: '备付金银行', key: 'provisionBankName'},
                {label: '提现银行', key: 'withdrawBankName'},
                {label: '提现账号', key: 'withdrawBankNo'},
                {label: '风险分数', key: 'riskPoint'},
                {label: '风险描述', key: 'riskMessage'}
            ]
        },
        
        {
            view: 'adjustCommission',
            title: '调整返佣',
            functionName_01:  edit? adjustCommissionVerify: getInstanceQuery,
            columns: [
                {label: '调整返佣币种', key: 'currencyTypeTxt'},
                {label: '调整返佣id', key: 'id'},
                {label: '调整返佣调整后的奖励金额', key: 'newAmt'},
                {label: '调整返佣原奖励金额', key: 'oldAmt'},
            ]
        },
        {
            view: 'rebatePost',
            title: '客戶返佣入账',
            functionName_01: edit? commissionPostVerify: getInstanceQuery,
            columns: [
                {label: '客戶返佣入账id', key: 'customerId'},
                {label: '客戶返佣入账月份', key: 'billMonth'}
            ]
        },
        {
            view: 'markup',
            title: 'markUp申请',
            functionName_01: fxConfQuery
            
        },
        {
            view: 'payee',
            title: '收款人审核',
            functionName_01: payeeQuery,
            columns: (data)=>{
                return [
                
                {label: '收款人类型', key: 'subjectType', options: subjectTypeOpt},
                {label: '收款人行所在国家地区', key: 'bankCountry'},
                {label: '币种', key: 'currency'},
                {label: '付款方式', key: 'paymentType'},
                ...data.subjectType == 'C'?
                [
                    {label: '企业名称', key: 'companyName'}
                ]:[
                    {label: '个人姓', key: 'lastName'},
                    {label: '个人名', key: 'firstName'}
                ],
                {label: 'swiftCode', key: 'swiftCode'},
                {label: '账户名', key: 'accountName'},
                {label: '银行代码', key: 'bankCode'},
                {label: '银行名称', key: 'bankName'},
                {label: '银行账号', key: 'bankAccount'},
                {label: 'iban', key: 'iban'},
                {label: '收款人国家', key: 'payeeCountry'},
                {label: '收款人地址', key: 'payeeAddress',},
                {label: '收款人城市', key: 'payeeCity'},
                {label: '收款人简称', key: 'nickName'},
                {label: '个人邮箱', key: 'emailAddress'}
                ]
            }
        },
        {
            view: 'feeConf',
            title: '手续费配置',
            functionName_01: payoutFeeTaskQuery,
            columns: [
                
                {label: '商户', key: 'customerId'},
                {label: '收费类型', key: 'chargeType'},
                {label: '收费模式', key: 'chargeWay', options: chargeWayOpt},
                {label: '比例费比例', key: 'chargeScale'},
                {label: '创建时间', key: 'createTime'},
                {label: '简称', key: 'customerSimpleName'},
                {label: '固定费金额', key: 'fixChargeAmt'},
                {label: '固定费币种', key: 'fixChargeCurrencyCode'},
                
                {label: '付款类型', key: 'payoutType'},
                // {label: '银行代码', key: 'serialNo'},
                {label: '结算模式', key: 'settleMode', options: settleModeOpt},
                {label: '更新时间', key: 'updateTime'},
                {label: '操作', key: 'isDelete', options: [
                    { label: '删除', value: true },
                    { label: '新增/编辑', value: false },
                ]},
            ]
        },
        {
            view: 'commissionFeePost',
            title: '手续费入账流程',
            functionName_01: billInfo,
            columns: [
                
                {label: '客户ID', key: 'customerId'},
                {label: '客户名', key: 'customerName'},
                {label: '手续费金额', key: 'billAmount'},
                {label: '手续费币种', key: 'billCurrency'},
                {label: '周期', key: 'billDate'},
                {label: '账单ID', key: 'billId'},
                {label: '状态', key: 'billStatus', options: billStatusOpt},
                {label: '入账时间', key: 'postDate'},
                
                {label: '笔数', key: 'refDetailCount'}
            ]
        },
        
        {
            view: 'payout',
            title: '付款流程',
            functionName_01: payoutTaskQuery,
            columns: []
        },
        {
            view: 'deleteMccGroup',
            title: '删除MCC组',
            functionName_01: edit? deleteMccGroupVerify: getInstanceQuery,
            columns: [
                
                {label: 'id', key: 'id'},
                {label: '客户id', key: 'customerId'},
                {label: '客户名称', key: 'customerName'},
                {label: '组别', key: 'mccGroup'},
                {label: '组别描述', key: 'groupDesc'},
                {label: '状态', key: 'activeFlag', options:[
                    {label: '未激活', value: 0},
                    {label: '激活', value: 1},
                ]}
            ]
        },
        {
            view: 'authFeeConfigCreate',
            title: '创建授权费用配置',
            functionName_01: edit? createAuthFeeVerify: getInstanceQuery,
            columns: [
                {label: '商户ID', key: 'customerId'},
                {label: '币种', key: 'authFeeCryCode'},
                {label: '计费', key: 'authFee'},
                {label: '卡类型', key: 'cardType'},
            ]
        },
        {
            view: 'authFeeConfigDelete',
            title: '删除授权费用配置',
            functionName_01: edit? deleteAuthFeeVerify: getInstanceQuery,
            columns: [
                {label: '商户ID', key: 'customerId'},
                {label: '币种', key: 'authFeeCryCode'},
                {label: '计费', key: 'authFee'},
                {label: '卡类型', key: 'cardType'},
            ]
        },
        {
            view: 'authFeeConfigUpdate',
            title: '修改授权费用配置',
            functionName_01: edit? updateAuthFeeVerify: getInstanceQuery,
            columns: [
                {label: '商户ID', key: 'customerId'},
                {label: '币种', key: 'authFeeCryCode'},
                {label: '计费', key: 'authFee'},
                {label: '卡类型', key: 'cardType'},
            ]
        },
        {
            
            view: 'chargeBackProcess',
            title: 'PayOut退单流程',
            functionName_01: chargeBackInfo,
            columns: [
                {label:'客户id', key: 'customerId'},
                {label: '退单流水号', key: 'orderId'},
                {label: '原付款流水号', key: 'refOrderId'},
                {label: '原渠道流水号', key: 'refChannelFlow'},
                {label: '退单状态', key: 'status', 
                options: backListStatusOpt},
                {label: '渠道退单金额', key: 'channelRefundAmount'},
                {label: '渠道退单币种', key: 'channelRefundCurrency'},
                {label: '客户退单币种', key: 'customerRefundCurrency'},
                {label: '客户退单金额', key: 'customerRefundAmount'},
                {label: '原因', key: 'remark'},
            ]
        }
        
    ]
    return _arr.find((v, i)=>v.view == viewName ) ||{}
}
class MerchantEditAudit extends BasePage {
    static viewName = 'MerchantEditAudit'; // 与路由名称保持一致
    constructor(props) {
        super(props);
        this.state = {
            taskId: props.record.taskId,
            instanceId:props.record.processInstanceId,
            merchantInfo: {},
        };
        // 布尔值初始化
        this.channel_bool_01 = ['渠道路由'].includes(this.props.taskName);
        this.channel_bool_02 = ['付款结果处理'].includes(this.props.taskName);
        // 收款人审核 edit 需要上传附件
        this.channel_bool_03 =  this.props.viewModel=='edit' && ['收款人审核'].includes(this.props.record.processName);

    }
    componentDidMount() {
        super.componentDidMount()
        this.init()
    }
    // 初始化
    init() {
        this.showDetail();
        // payout 查看 枚举值
        this.channel_bool_01 && queryPayoutChannelList().then(result=>this.setState({
            PayoutChannelList: result.data
        }))
        
        // '付款结果更新'  approvedResult：  0   拒绝往->下走 
        // '付款结果处理' approvedResult： 1 重发->打回原点  approvedResult： 0 付款失败->流程结束 
    }
    showDetail = e => {
       const _fun = _formatViewInit(this.props.viewName, this.props.viewModel=='edit')['functionName_01']||Function;
       let params =  {instanceId: this.state.instanceId};
       this.props.viewModel=='edit' && Object.assign(params, { taskId:this.state.taskId })
       _fun({
            params,
        }).then(res=>{
            const {message, code, result} = res;
            const {
                orderInfo='', 
                adjustCommissionVerifyVo={}, 
                commissionPostVerifyVo={}, 
                data,
                filePath='',
                payee='',
                deleteMccGroupVerifyVo={}
            } = result;
            code === "000000" ? 
            this.setState({
                merchantInfo: commissionPostVerifyVo.reqVo || 
                adjustCommissionVerifyVo.adjustCommissionVo|| 
                data && data.varMap || 
                orderInfo ||
                payee ||
                deleteMccGroupVerifyVo.deleteMccGroupReqVo||
                data||{},
                filePath,
            }):
            this.msgError(message)
        })
    }

    //审批通过
    applyPass = e => {
        const {closeModal} = this.props;
        const {taskId='',api='',channelId='' } = this.state;
        const txtReject = document.getElementById("txtReject").value;
        if (!e && (txtReject === null || txtReject === '')) {
            this.msgWarn('请输入拒绝原因')
            return;
        }
        if(this.channel_bool_03 && !riskFile){
            return this.msgError('请上传审核附件')
        }
        confirm({
            title: '审批提示',
            content: e ? '通过 ?':'拒绝 ?',
            onOk:() => {
              //  console.log(obj);
              //  debugger;
                passDeposit({
                    params: {
                        taskId,
                        formUrl:this.props.record.formUrl||'',
                        comment:txtReject,
                        approvedResult: e ? 1: 0,
                        riskFile,
                        ... this.channel_bool_01 ? {
                            api,
                            channelId,
                        }:{}
                    },
                    success: data => {
                        if (data.code === "000000") {
                            this.msgSucc('审批成功');
                            closeModal && closeModal();
                        } else {
                            this.msgError(data.message)
                        }
                    },
                    error: e => {
                        this.msgError('系统异常')
                    }
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    // 渲染
    render() {
        const {  merchantInfo = {}, PayoutChannelList=[] } = this.state;
        const _title = _formatViewInit(this.props.viewName)['title']||''
        const list_01 = _formatViewInit(this.props.viewName)['columns']||[]
        const {channel_bool_01} = this;
        return (
            <div>
                <div style={{
                     
                    color: 'rgba(0,0,0,0.85)',
                    width: '98%',
                }}>
                    <div style={{
                        
                        fontWeight: 'bold', 
                        marginBottom: '20px',
                        fontSize: '16px'
                    }}>{`${_title}订单-审核`}</div>
                    {
                        _title == '付款流程'?
                        <>
                            <DescriptionsPayout merchantInfo={merchantInfo} />
                        </>:
                        <>
                            {
                                <Desc title={_title} options={list_01.constructor == Function?list_01(merchantInfo):  list_01 } data={merchantInfo} />
                                // list_01.map((v, i)=>{
                                //     return <div key={i}>
                                //                 <div style={{marginBottom: '5px'}} >{v.label||''}</div>
                                //                 <div style={{
                                //                     marginBottom: '5px', 
                                //                     fontWeight: 'bold', 
                                //                     fontSize: '16px'
                                //                 }}>
                                //                     {
                                //                         v.options ?
                                //                         (v.options.find(option=>option.value == merchantInfo[v.key])||{})['label']||'':
                                //                         merchantInfo[v.key] || ''
                                //                     }
                                //                 </div>
                                //             </div>
                                // })
                            }
                            {
                                merchantInfo.commissionPostVoList && <this.Table 
                                columns={[
                                    ...this.columnsFormat([
                                        ['币种', 'currencyTypeTxt'],
                                        ['消费金额', 'purchaseAmt'],
                                        ['markUp费用', 'markupAmt'],
                                        ['消费退款', 'refundAmt'],
                                        ['消费争议', 'disputeSuccessAmt'],
                                        ['争议失败', 'disputeFailedAmt'],
                                        ['本币金额', 'principalAmt'],
                                        ['等值美金', 'principalUsdAmt'],
                                        ['奖励金额', 'commissionAmt'],
                                    ])
                                ]} 
                                dataSource={ merchantInfo.commissionPostVoList|| []} 
                                pagination={false} />
                            }
                            {
                                // 换汇配置下载框
                                ['markUp申请'].includes(_title) && <Button type='primary' onClick={()=>window.open(urlConfig.cppapi + '/fxConf/fxFileDownload?filePath='+ this.state.filePath)}>下载</Button>
                            }
                        </>
                    }
                    {
                        <Log processInstanceId={this.props.record.processInstanceId||''}  />
                    }
                    
                    {
                        this.props.viewModel=='edit' &&
                        <>
                            {
                                this.channel_bool_03 && <>
                                <div className='uploadFile'>上传附件</div>
                                    <this.Upload callback={response=>{
                                    console.log(response)
                                    response.code == '000000' && (riskFile = response.result.filePath)
                                }} />
                                </>
                            }
                            {
                                channel_bool_01 && 
                                <div style={{
                                    marginBottom: '20px'
                                }}>
                                    关联渠道: &nbsp;
                                    <Select defaultValue="" style={{width: '120px'}} onChange={e=>this.setState({
                                        api: JSON.parse(e).api,
                                        channelId: JSON.parse(e).channelId
                                        })}>
                                            {
                                                PayoutChannelList.map(v=><Option value={JSON.stringify(v)} key={v.channelId} >{v.channelName}</Option>)
                                            }
                                        
                                    </Select>
                                </div>
                            }
                            <Descriptions title="审批意见" style={{ textAlign: 'left', marginLeft: '10px' }} style={{
                                marginLeft: '0',
                                marginTop: '20px'
                            }}>
                                <Descriptions.Item label="原因"><Input id="txtReject" style={{
                                    width: '300px'
                                }} /> </Descriptions.Item>
                            </Descriptions>
                            <div style={{ width: '90%', textAlign: 'center', }}>
                                <Button type="primary" style={{ marginRight: '10px' }} onClick={e=>this.applyPass(true)}>
                                {
                                    this.channel_bool_02 ?'重发':'通过'
                                }
                                </Button>
                                {
                                    ! ( _title == '换汇'||channel_bool_01 ) && <Button type="danger" style={{ marginRight: '10px' }} onClick={e=>this.applyPass(false)}>
                                        {
                                            this.channel_bool_02?'付款失败':'拒绝'
                                        }
                                    </Button>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        )
    }
}
const MerchantEditAuditView = Form.create({ name: 'MerchantEditAuditName' })(MerchantEditAudit);
export default MerchantEditAuditView
