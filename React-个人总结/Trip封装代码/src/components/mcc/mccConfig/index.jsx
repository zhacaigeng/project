import React from 'react';
import BasePage from "../../../../pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, Modal, Divider, Steps, Tabs, Tag   } from 'antd';
import { getDemoList, deleteGoods } from '$api/demo';
import { formatAmount } from '$utils/utils';
import "./index.scss";
import { queryCustomerSelectList } from '$api/commission'
import {queryMccList, addMcc,
    updateMcc,
    batchUploadMcc,
    deleteMcc} from '$api/mcc'
const { TabPane } = Tabs;
const options_b = [
    {label: '激活', value: '1'},
    {label: '未激活', value: '0'},
]
let options_c =  [
    {label: 'MasterCard', value: 'MasterCard'},
    {label: 'VISA', value: 'VISA'},
]
let options_d =  [
    {label: 'VIP会员', value: '1'},
    {label: '普通会员', value: '2'}
]
let allList = []
class MccConfig extends BasePage {
    static viewName = 'MccConfig'; // 与路由名称保持一致
    
    constructor(props) {
        console.log(props)
        super(props);
        this.FormCompRef = React.createRef()
        this.state = {
            customerList: {
                dataList:[]
            },
            selectInfo:{},
            record:'',
            modal1Visible: false,
            options_a: [],
            selectedRowKeys: props.selectedRowKeys||[]
        };

    }
    componentDidMount() {
        super.componentDidMount()
        this.init()
        console.log(this.props)
    }
    // 初始化
    init() {
        this.queryCustomerAccountPage_params = {
            mccCode: '',
            cardGroup: '',
        }
        // 查询所有人
        queryCustomerSelectList().then(arr=>{
            this.setState({
                options_a: arr
            })
        })
        // 查询list
        this.queryMccList(1)
    }
    showModal = async (record='', closeBool) => {
        closeBool ? 
        this.setState({
            modal1Visible: false,
            record: '',
        }):
        this.setState({
            modal1Visible: true,
            record,
        })
    }
    // 查询list
    queryMccList = (pageNo, params) => {
        this.showModal('', true);
        params && (this.queryCustomerAccountPage_params = params)
        queryMccList({
            params:{
                ...this.queryCustomerAccountPage_params,
                pageNo,
                pageSize: 10,
                needPage: !this.props.hiddenAct
            }
        }).then(
            result => {
                console.log(result)
                result && this.setState({
                    customerList: result || {},
                    pageNo,
                })
                // 存储所有的
                !this.queryCustomerAccountPage_params.mccCode && !this.queryCustomerAccountPage_params.cardGroup && (allList = result)
            }
        )
    }
    createAndEdit = (params={}) => {
        const _funName = this.state.record ? updateMcc: addMcc;
        _funName({
            params
        }).then(result=>{
            this.msgSucc('success')
            this.queryMccList(1)
        })
        
    }
    // 渲染
    render() {
        const {pageNo, record, customerList={},  selectInfo, modal1Visible=false,options_a=[], modelShowType,selectedRowKeys } = this.state;
        const {hiddenAct = false} = this.props;
        console.log(customerList.dataList)
        const columns_a = [
            {
                title: '商户code',
                dataIndex: 'mccCode',
                key: 'mccCode',
                disabled: !!record,
                required: modal1Visible,
                maxLength: 4
            },
            
            
            {
                title: '卡组',
                dataIndex: 'cardGroup',
                key: 'cardGroup',
                type: 'radio',
                options: options_c,
                required: modal1Visible,

            },
        ];
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        const tailLayout = {
            wrapperCol: { offset: 2, span: 16 },
        };
        return  <>
                    {/* 顶部search */}
                    <this.FormComp
                        style={{
                            height: '100px'
                        }}
                        ref={this.FormCompRef}
                        otherButton={!hiddenAct &&<Button type='primary' onClick={e=>this.showModal('')}>新增</Button>}
                        // 成功回调 
                        sucCB={Obj =>this.queryMccList(1, Obj)}
                        // key和title 
                        columns = {columns_a}
                        
                        // 栅格布局
                        layout={{
                            labelCol: { span: 5 },
                            wrapperCol: { span: 15}
                        }}>
                    </this.FormComp>
                    {
                    !hiddenAct &&
                    <this.Upload 
                        url='/vcc/batchUploadMcc' 
                        type='upload' 
                        ButtonTxt='导入'
                        callback={response=>{
                            response.code == '000000' && this.init()
                        }}
                    />
                    }
                    {/* table */}
                    <this.Table 
                        // rowKey={_record => _record.customerId + _record.email + _record.userName} 
                        rowSelection={hiddenAct ?{
                            onChange: (_selectedRowKeys, _selectedRows) => {
                                // 处理数据
                                let newArr = _selectedRowKeys.map(v=>{
                                    let _arr = v.split('$');
                                    return allList['dataList'].find(v_index=>v_index.mccCode == _arr[0] && v_index.cardGroup == _arr[1])
                                })
                                console.log(newArr)
                                this.props.selectedRowKeysCB && this.props.selectedRowKeysCB(newArr)
                                this.setState({
                                    selectedRowKeys: _selectedRowKeys
                                })
                                console.log(`selectedRowKeys: ${_selectedRowKeys}`, 'selectedRows: ', _selectedRows);
                            },
                            selectedRowKeys: selectedRowKeys[0] && selectedRowKeys || [],
                            getCheckboxProps: record => ({
                                disabled: false, // Column configuration not to be checked
                                name: record.mccDesc,
                            }),
                        }:null}
                        rowKey={_record=>_record.mccCode + '$' + _record.cardGroup }
                        columns={[
                            ...columns_a,
                            {
                                title: '描述',
                                dataIndex: 'mccDesc',
                                key: 'mccDesc'

                            },
                            
                            {
                                title: '是否激活',
                                dataIndex: 'activeFlag',
                                key: 'activeFlag',
                                type: 'radio',
                                options: options_b,
                                render: val => this._optionsFind(val, options_b)

                            }, 
                            !hiddenAct ? {
                                title: '操作',
                                key: 'status',
                                dataIndex: 'status',
                                render: (text, record) => (
                                    <div>
                                        {/* <a onClick={() => { this.jumpPage('/customerList', { id: record.id }) }}>Markup费</a>&nbsp; */}
                                        <a onClick={()=>this.showModal(record)}>编辑</a>&nbsp;
                                        <this.Popconfirm
                                            title="确认?"
                                            onConfirm={()=>deleteMcc({params: {
                                                mccCode: record.mccCode||'',
                                                cardGroup: record.cardGroup||''
                                            }}).then(result=>this.queryMccList(1))}
                                            onCancel={()=>{}}
                                            okText="确认"
                                            cancelText="取消"
                                        >
                                            <a href="#">删除</a>
                                        </this.Popconfirm>&nbsp;
                                    </div>
                                    
                                ),
                            }:{}
                        ]} 
                        scroll={!hiddenAct? {}: { x: 'calc(700px + 50%)', y: 350 }}
                        dataSource={customerList['dataList']||[]} 
                        pagination={!hiddenAct?{
                            'total': customerList['totalCount'] || 0 ,
                            'onChange': i => this.queryMccList(i),
                            'current': pageNo || 1
                        }:false}
                    />
                    {
                        modal1Visible && 
                        <Modal
                        title={record? '编辑': '新增'}
                        visible={this.state.modal1Visible}
                        onCancel={() => this.showModal('', true)}
                        footer={null}
                        destroyOnClose={true}
                        
                    >
                        <div>
                        <this.FormComp
                                style={{
                                    height: '500px'
                                }}
                                ColSpan={24}
                                record={record}
                                selectCB={id => {
                                }}
                                // 成功回调 
                                sucCB={Obj =>this.createAndEdit(Obj)}
                                // key和title 
                                columns = { [
                                    ...columns_a, 
                                    {
                                        title: '描述',
                                        dataIndex: 'mccDesc',
                                        key: 'mccDesc',
                                        required: true,
                        
                                    },
                                    
                                    {
                                        title: '是否激活',
                                        dataIndex: 'activeFlag',
                                        key: 'activeFlag',
                                        type: 'radio',
                                        options: options_b,
                                        render: val => this._optionsFind(val, options_b),
                                        required: true,
                        
                                    }
                                ]}
                                // 栅格布局
                                layout={{
                                    labelCol: { span: 5 },
                                    wrapperCol: { span: 15}
                                }}>
                                <Form.Item {...tailLayout}  style={{
                                    textAlign: 'center'
                                }}>
                                    <Button type="primary" htmlType="submit">保存</Button>&nbsp;&nbsp;
                                    <Button type="primary" onClick={() => this.showModal('', true)}>取消</Button>
                                </Form.Item>
                            </this.FormComp>
                        </div>
                    </Modal>
                    }
                </>
    }
}
const MccConfigView = Form.create({ name: 'MccConfig' })(MccConfig);
export default MccConfigView