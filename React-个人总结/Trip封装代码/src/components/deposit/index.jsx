import React from 'react';
import BasePage from "../../../pages/BasePage";
import { Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, message, Modal, Divider, Steps, Tabs, Tag, Pagination, InputNumber } from 'antd';
import Form from '$components/form'
import { formatAmount, isEmptyObject, transJsonToArr } from '$utils/utils';
import { getMerchant } from '$api/merchantApi';
import { submitDeposit, queryDepositOrderList } from '$api/depositApi';
import SearchParam from './searchParam'
import List from '$components/common/list'
let filePath;
let initParams = {
    customerId: '',
    orderType: '',
    orderId: '',
}
import FormItemSelect from '$components/form/formItemSelect'
export default class DepositIndex extends BasePage {
    static viewName = 'DepositIndex'; // 与路由名称保持一致
    constructor(props) {
        super(props);
        this.state = {
            data_a: [],
            modal1Visible: false,
            modalEditVisible: false,
            totalCount: 0,
            merchantInfo: {},
            customerId: '',
            customerList: [],
            currencyList: [],
            provisionName: '',
        };

    }
    componentDidMount() {
        super.componentDidMount();
    }


    depositAdd = (e) => this.setState({ modalEditVisible: true})
    // 查币种和银行
    handleChange = (it) => {
        getMerchant({
            params: {
                customerId: it
            },
            success: data => {
                if (data.code === "000000") {
                    let currencyTemp = [];
                    currencyTemp = JSON.parse(data.result.customerInfo.accountCurrency.replace(/^(\s|')+|(\s|')+$/g, ''));

                    const tempData = currencyTemp.map(cu => ({
                        label: cu,
                        value: cu
                    }));
                    this.setState({
                        currencyList: tempData,
                        provisionName: data.result.customerInfo.provisionName
                    });
                    //console.log(transJsonToArr(data.result.customerInfo.accountCurrency.replace(/^(\s|')+|(\s|')+$/g, '')));
                } else {
                    message.error(data.message);
                }
            },
            error: e => {
                message.error('查询异常')
            }
        });

    };
    // 提交
    handleSubmit = (values) => {
        submitDeposit({
            params: {
                values:{
                    ...values,
                    filePath: values.filePath[0] && values.filePath[0].url ||'' ,
                }
            },
            success: data => {
                if (data.code == "000000") {
                    message.success('创建成功');
                    this.setState({
                        modalEditVisible: false
                    });
                } else {
                    message.error(data.message);
                }
            },
            error: e => {
                message.error(e&&e.message||'系统异常');
            }
        });
    };
    // 渲染
    render() {
        const { data_a, totalCount, pageNum, merchantInfo,record } = this.state;

        console.log(Form)
        return (
            <div>
                <div onClick={this.depositAdd}>

                </div>

                <div>
                    <Modal
                        title="充值订单-创建"
                        style={{ top: 20 }}
                        visible={this.state.modalEditVisible}
                        width='50%'
                        maskClosable={true}
                        destroyOnClose={true}
                        onCancel={() => this.setState({ modalEditVisible: false })}
                        footer={null}
                    >
                        <div style={{ width: "50%" }}>
                            <Form 
                                layout={'horizontal'} 
                                onSubmit={this.handleSubmit} 
                                enableReinitialize
                                labelCol={{span: 10}}
                                wrapperCol={{span: 14}}
                            >
                                <Form.Item.SelectCustomer required onChange={this.handleChange} />
                                <Form.Item label="入账备付金银行" name="amount" disabled value={this.state.provisionName||''} />
                                <FormItemSelect options={this.state.currencyList} label="充值币种" name="currencyType" />
                                <Form.Item required label="充值金额" name="amount"/>
                                <Form.Item required label="银行流水编号" name="bankReferenceId" />
                                 <Form.Item.Upload 
                                    label="银行流水凭证上传" 
                                    name="filePath" 
                                    required 
                                    disabled={false}
                                    demoPic="//pages.trip.com/Moxcard/vcc/companyRegisterCer.demo.png"
                                    />
                                
                                <Button type="primary" htmlType="submit">
                                    保存</Button>
                                <Button style={{ marginLeft: 8 }} onClick={() => this.setState({ modalEditVisible: false })}>
                                    取消</Button>

                            </Form>
                        </div>
                    </Modal>
                </div>
            </div>

        )
    }
}
