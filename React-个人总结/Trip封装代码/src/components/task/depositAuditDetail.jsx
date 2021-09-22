import React from 'react';
import BasePage from "../../../pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, Cascader, message, Modal, Divider, Steps, Checkbox, Descriptions, InputNumber } from 'antd';
import { isEmptyObject } from '$utils/utils';
import { values } from 'mobx';
import { getDepositAuditDetail,passDeposit } from '$api/depositApi';
import ApproveLog from './common/approveLog'
import Desc from '$components/common/desc'
const viewModel_api = {
    'deposit': getDepositAuditDetail,
}

const Option = Select.Option;
const FormItem = Form.Item;
const { Step } = Steps;
const { confirm } = Modal;

class DepositAuditDetail extends BasePage {
    static viewName = 'depositAuditDetail'; // 与路由名称保持一致
    constructor(props) {
        super(props);
        this.state = {
            taskId: props.record.taskId,
            viewModel:props.viewModel,
            instanceId:props.record.processInstanceId,
            depositInfo: {},
            formUrl:''
        };
    }
    componentDidMount() {
        super.componentDidMount()
        this.init()
    }
    // 初始化
    init() {
        this.showDetail();
    }
    showDetail = e => {
        const { taskId ,instanceId} = this.state;
        const fun_name = viewModel_api[this.props.record.businessType]||Function;
        fun_name({
            params: {
                taskId: taskId===undefined?'':taskId,
                instanceId: instanceId===undefined?'':instanceId
            },
            success: data => {
                if (data.code === "000000") {
                    this.setState({
                        depositInfo: data.result.orderInfo||data.result.data||{},
                        taskId: taskId,
                        instanceId:instanceId,
                        formUrl:data.result.formUrl
                    });
                } else {
                    message.error(data.message);
                }
            },
            error: e => {
                message.error('系统异常');
            }
        });
    }

    //审批通过
    applyPass = (obj) => {
        const { closeModal } = this.props;
        const { taskId ,formUrl} = this.state;
        confirm({
            title: '审批提示',
            content: '确认审批？',
            onOk() {
                const txtReject = document.getElementById("txtReject").value;
              //  console.log(obj);
              //  debugger;
                passDeposit({
                    params: {
                        taskId: taskId,
                        formUrl:formUrl,
                        comment:txtReject,
                        approvedResult:obj===true?1:0
                    },
                    success: data => {
                        if (data.code === "000000") {
                            message.success('审批成功');
                            closeModal && closeModal();
                        } else {
                            message.error(data.message);
                        }
                    },
                    error: e => {
                        message.error('系统异常')
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
        const { depositInfo = {} ,viewModel} = this.state;

        return (
            <div>
                <div style={{ width: '98%' ,marginLeft: '10px'}}>
                    <Desc title="充值信息" options={[
                                {label: '商户ID', key: 'customerId'},
                                {label: '商户简称', key: 'customerName'},
                                {label: '充值币种', key: 'currencyType'},
                                
                                {label: '入账备付金银行', key: 'bankName'},
                                {label: '充值金额', key: 'amount'},
                                {label: '申请时间', key: 'createTime', },
                                {label: '来源', key: 'source'},
                                {label: '风险分数', key: 'riskPoint'},
                                {label: '风险描述', key: 'riskMessage'},
                                {label: '充值订单号', key: 'orderId', span: 2},

                                
                            ]}
                            otherDescItem={viewModel==='edit' && <Descriptions.Item label="备注" span={3}><Input id="txtReject" /> </Descriptions.Item>}
                            data={depositInfo} />
                    <ApproveLog processInstanceId={this.props.record.processInstanceId||''}  />
                    {
                        depositInfo.filePath &&  <Button type='primary' onClick={()=>window.open(depositInfo.filePath)}>文件预览</Button>
                    }

                    {viewModel==='edit'?
                    <div style={{ width: '90%', textAlign: 'center', }}>
                    <Button type="primary" style={{ marginRight: '10px' }} onClick={()=>this.applyPass(true)}>
                        通过</Button>
                    <Button type="danger" style={{ marginRight: '10px' }} onClick={()=>this.applyPass(false)}>
                        拒绝</Button>
                </div>
                    :null}

                    
                </div>
            </div>
        )
    }
}
const DepositAuditDetailView = Form.create({ name: 'DepositAuditDetails' })(DepositAuditDetail);
export default DepositAuditDetailView