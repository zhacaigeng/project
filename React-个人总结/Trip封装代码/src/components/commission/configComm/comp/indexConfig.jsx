import React from 'react';
import BasePage from "$pages/BasePage";
import { Form, Icon, Button, Table, Modal, message } from 'antd';
import FormComp from '$components/common/referenceDataOption/formComp'
import {
    queryCommissionConfig,
    resetPassword,
    _ApiServicesComm,
    queryCardType
} from '$api/commission'
    
import { post } from '$api/apiService'
import "./index.scss";

let cardType_options = [
    'GWTTP',
    'GWTTP-MBA',
    'GWTTP-MBG',
    'GWTTP-MBH',
    'GWTTP-MBI',
    'GWTTP-MBJ',
    'MCO',
]
import {cycleTypeOpt} from '$utils/optionsConf'
const apiObj= {
    // 周期配置
    'addCycleConfig': '/vcc/addCycleConfig',
    'updateCycleConfig' :'/vcc/updateCycleConfig',
    // 争议
    'addDisputeFeeConfig': '/vcc/addDisputeFeeConfig',
    'updateDisputeFeeConfig': '/vcc/updateDisputeFeeConfig',
    // 返佣
    'addCommissionConfig': '/vcc/addCommissionConfig',
    'updateCommissionConfig': '/vcc/updateCommissionConfig'
}
const style_01 = {
    marginBottom: '20px'
}
class MoneyMrgIndex extends BasePage {
    static viewName = 'moneyMrgIndex'; // 与路由名称保持一致
    
    constructor(props) {
        super(props);
        this.state = {
            customerList: {},
            selectInfo:{},
            record:'',
            roleList:[],
            modelShowType: '',
            customerList: [],
            showRole: false,
            commissionConfig: {
                commissionCycleConfigVo: null,
                customerId: '',
                customerName: '',
                disputeFeeConfigVoList: null,
                queryCommissionConfigVoList: [],
            },
            apiKey: '',
            currencyList: [],
        };
    }
    componentDidMount() {
        super.componentDidMount()
        this.init()
    }
    // 初始化
    init() {
        // 获取卡类型
        queryCardType({}).then(result=> result.cardType && ( cardType_options = result.cardType ) )
        // 获取所有币种
        this.getCurrencyList({}).then(currencyList=>this.setState({currencyList}));
        // 清空model
        this.setState({record:''})
        // 查询
        this.queryCommissionConfig(this.props.record.customerId||'')
    }
    // 查询当前客户
    queryCommissionConfig  = (customerId)=>{
        queryCommissionConfig({
            params:{customerId}
        }).then(res=>{
            const {code, result} = res;
            code == '000000' ? this.setState({
                commissionConfig: result.commissionConfig||{}
            }):this.msgError(res.message)
        })
    }
    // 封装公共接口
    handleSubmit = async (params) => {   
        const { apiKey } = this.state;     
        let url = apiObj[apiKey];
        if( ['addCommissionConfig', 'updateCommissionConfig'].includes(apiKey) ){
            let cardCommissionRateVoList = cardType_options.map((v, i)=>({
                
                    cardType: v,
                    doCommissionThreshold: params.doCommissionThreshold||'',
                    inCommissionThreshold: params.doCommissionThreshold||'',
                    doCommissionRate: params['doCommissionRate_' + i]||'',
                    inCommissionRate: params['inCommissionRate_' + i ]||''
            }))
           params = {cardCommissionRateVoList};
           apiKey == 'updateCommissionConfig' && (params.primaryId = this.state.record.primaryId||'')
        }
        // 争议配置params
        if(apiKey =='addDisputeFeeConfig' ){
            params = {
                disputeFeeConfigVoList: [
                    {
                        cardGroup: 'VISA',
                        disputeCommitFeeStandardsUsd: params.disputeCommitFeeStandardsUsd_VISA||'',
                        disputeUnCommitFeeStandardsUsd: params.disputeUnCommitFeeStandardsUsd_VISA || '',
                        customerId: this.props.record.customerId||''
                    },
                    {
                        cardGroup: 'MasterCard',
                        disputeCommitFeeStandardsUsd: params.disputeCommitFeeStandardsUsd_MC||'',
                        disputeUnCommitFeeStandardsUsd: params.disputeUnCommitFeeStandardsUsd_MC || '',
                        customerId: this.props.record.customerId||''
                    }
                ]
            }
        }else{
            let {customerId, customerName} = this.props.record
            params = {
                customerId,
                customerName,
                ...params
            }
        }
        let {customerId, customerName} = this.props.record;
        try {
            await post(url, {                
                customerId,
                customerName,
                ...params
            });
            message.success('操作成功');
            this.init();
        } catch(e) {
            message.error(e.message)
        }
    }
    // 渲染
    render() {
        const {currencyList, pageNo, record, roleList, modelShowType='', customerList={}, showRole =false, selectInfo, commissionConfig, columns=[] } = this.state;
        const {commissionCycleConfigVo, customerId, customerName, disputeFeeConfigVoList, queryCommissionConfigVoList=[]} = commissionConfig
        let commissionRateArr = [] ;
        cardType_options.map((v, i)=>{
            commissionRateArr.push({
                title: v ,
                label: v ,
                dataIndex: `doCommissionRate_${i}`,
                key: `doCommissionRate_${i}`,
                required: true,
        
            }) 
            commissionRateArr.push({
                title: ' ',
                label: ' ',
                dataIndex: `inCommissionRate_${i}`,
                key: `inCommissionRate_${i}`,
                required: true,
        
            }) 
        })

        let  form_columns_b = [
            
            ...commissionRateArr,
            {
                title: '阈值',
                label: '阈值',
                dataIndex: 'doCommissionThreshold',
                key: 'doCommissionThreshold',
                required: true,
        
            }
        ]
        const columns_a = [
            {
                label: '卡组织',
                title: '卡组织',
                dataIndex: 'cardGroup',
                key: 'cardGroup',
                required: true,
                disabled: true,
            },
            {
                label: '提交卡组织收费标准',
                title: '提交卡组织收费标准',
                dataIndex: 'disputeCommitFeeStandardsUsd',
                key: 'disputeCommitFeeStandardsUsd',
                required: true,
            },
            {
                label: '未提交卡组织收费标准',
                title: '未提交卡组织收费标准',
                dataIndex: 'disputeUnCommitFeeStandardsUsd',
                key: 'disputeUnCommitFeeStandardsUsd',
                required: true,

            },
            {
                title: '操作',
                label: '操作',
                key: 'status',
                dataIndex: 'status',
                render: (text, record) => (
                    <div>
                        <a onClick={()=>this.setState({
                            apiKey: 'updateDisputeFeeConfig',
                            record,
                            columns: columns_a
                        })}>修改</a>&nbsp;
                    </div>
                    
                ),
            }
        ];
        const columns_b = [
            {
                title: '阶梯',
                label: '阶梯',
                dataIndex: 'level',
                key: 'level'

            },
            {
                title: '卡类型',
                label: '卡类型',
                dataIndex: 'cardType',
                key: 'cardType'

            },
            {
                title: '阈值',
                label: '阈值',
                dataIndex: 'doCommissionThreshold',
                key: 'doCommissionThreshold',
        
            },
            
            
            {
                title: '返点(国内)',
                label: '返点(国内)',
                dataIndex: 'doCommissionRate',
                key: 'doCommissionRate',
        
            },
            
            
            {
                title: '返点(国际)',
                label: '返点(国际)',
                dataIndex: 'inCommissionRate',
                key: 'inCommissionRate',
        
            },
            {
                title: '操作',
                label: '操作',
                key: 'status',
                dataIndex: 'status',
                render: (text, record) => (
                    <div>
                    <a onClick={()=>{
                        // 处理record
                        let _list = queryCommissionConfigVoList.filter(val=>val.level == record.level);
                        let _record = JSON.parse(JSON.stringify(record));
                        cardType_options.map((v, i)=>{
                            let _obj = _list.find(val=>val.cardType == v)||{}
                            record[`doCommissionRate_${i}`] = _obj['doCommissionRate']||'';
                            record[`inCommissionRate_${i}`] = _obj['inCommissionRate']||'';
                        })
                        this.setState({

                        record,
                    }, ()=>{
                        setTimeout(() => {
                            // form_columns_b.map((v=>v.disabled = true))
                            this.setState({
                            
                                apiKey: 'updateCommissionConfig',
                                columns: form_columns_b
                            })
                        }, 100);
                    })
                    }}>修改</a>&nbsp;
                </div>
                    
                ),
            }
        ];
        const columns_c = [
            {
                title: '币种',
                label: '币种',
                dataIndex: 'currencyTypeTxt',
                key: 'currencyTypeTxt',
                options: currencyList,
                type: 'select', 
                'initialValue': 'USD',
                disabled: true

            },
            {
                title: '周期类型',
                label: '周期类型',
                dataIndex: 'cycleType',
                key: 'cycleType',
                type: 'select',
                options: cycleTypeOpt

            },
            {
                title: '展示日',
                label: '展示日',
                dataIndex: 'calDays',
                key: 'calDays',

            },
            
            {
                title: '计算日',
                label: '计算日',
                dataIndex: 'setDays',
                key: 'setDays',

            },
            {
                title: '操作',
                label: '操作',
                key: 'status',
                dataIndex: 'status',
                render: (text, record) => (
                    
                    <div>
                    <a onClick={()=>this.setState({
                        apiKey: 'updateCycleConfig',
                        record,
                        columns: columns_c
                    })}>修改</a>&nbsp;
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
        return  <div>        
        {/* 争议配置 */}
        <div style={{
            marginBottom: '20px'
        }}>
            <Button type="primary" onClick={this.props._callback}>返回</Button>
        </div>
        {
           !disputeFeeConfigVoList &&  <Button style={{...style_01}} onClick={()=>this.setState({
                record: {}, 
                apiKey: 'addDisputeFeeConfig',
                columns: [
                    {
                        label: '提交VISA收费标准',
                        title: '提交VISA收费标准',
                        dataIndex: 'disputeCommitFeeStandardsUsd_VISA',
                        key: 'disputeCommitFeeStandardsUsd_VISA',
                        required: true,
                    },
                    {
                        label: '未提交VISA收费标准',
                        title: '未提交VISA收费标准',
                        dataIndex: 'disputeUnCommitFeeStandardsUsd_VISA',
                        key: 'disputeUnCommitFeeStandardsUsd_VISA',
                        required: true,
        
                    },
                    {
                        label: '提交MC收费标准',
                        title: '提交MC收费标准',
                        dataIndex: 'disputeCommitFeeStandardsUsd_MC',
                        key: 'disputeCommitFeeStandardsUsd_MC',
                        required: true,
                    },
                    {
                        label: '未提交MC收费标准',
                        title: '未提交MC收费标准',
                        dataIndex: 'disputeUnCommitFeeStandardsUsd_MC',
                        key: 'disputeUnCommitFeeStandardsUsd_MC',
                        required: true,
        
                    },
                ]
            })}>新增争议配置</Button>
        }
        <this.Table 
            rowKey={_record => _record.disputeCommitFeeStandardsUsd + _record.disputeCommitFeeStandardsUsd + _record.disputeUnCommitFeeStandardsUsd} 
            columns={columns_a} 
            dataSource={disputeFeeConfigVoList} 
            pagination={false}
        />
        {/* 返佣配置 */}
        <Button style={{...style_01}} onClick={()=>this.setState({
            record: {}, 
            apiKey: 'addCommissionConfig',
            columns: form_columns_b
        })}>新增返佣配置</Button>
        <this.Table 
            rowKey={_record => _record.level + _record.cardType + _record.doCommissionThreshold} 
            columns={columns_b} 
            dataSource={queryCommissionConfigVoList||[]} 
            pagination={false}
        />
        {/* 周期配置 */}
        {
            !commissionCycleConfigVo &&  <Button type="primary" onClick={()=>this.setState({
                record: {}, 
                apiKey: 'addCycleConfig',
                columns: columns_c
            })}>新增周期配置</Button>
        }
        <this.Table 
            rowKey={_record => _record.currencyTypeTxt + _record.cycleType + _record.calDays} 
            columns={columns_c} 
            dataSource={commissionCycleConfigVo && [commissionCycleConfigVo] || [] } 
            pagination={false}
        />
        

        {/* module */}
        <Modal
            title={this.state.apiKey.includes('update')?'编辑':'新增'}
            visible={!!record}
            onCancel={() => this.setState({ record: '' })}
            footer={null}
            destroyOnClose={true}
            
        >
            <div style={{
                height: '700px'
            }}>
                {
                    ['addCommissionConfig', 'updateCommissionConfig'].includes(this.state.apiKey) && <div style={{
                        display: 'flex',
                        paddingBottom: '10px'
                    }}>
                        <div style={{flex: 1, paddingRight: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 700}}>doCommissionRate</div>
                        <div  style={{flex: 1,paddingRight: '10px', textAlign: 'right', fontSize: '16px', fontWeight: 700}}>inCommissionRate</div>
                    </div>
                }
            <FormComp
                    style={{
                        height: '500px'
                    }}
                    ColSpan={['addCommissionConfig', 'updateCommissionConfig'].includes(this.state.apiKey)? 12: 24}
                    record={record}
                    selectCB={id => {
                    }}
                    // 成功回调 
                    sucCB={Obj =>this.handleSubmit(Obj)}
                    // key和title 
                    columns = { [...columns]}
                    // 栅格布局
                    layout={['updateCycleConfig', 'addCycleConfig'].includes(this.state.apiKey)? {
                        labelCol: { span: 6},
                        wrapperCol: { span: 18}
                    }:{
                        labelCol: { span: 10 },
                        wrapperCol: { span: 14}
                    }}>
                    <Form.Item {...tailLayout}  style={{
                        textAlign: 'center'
                    }}>
                        <Button type="primary" htmlType="submit">保存</Button>&nbsp;&nbsp;
                        <Button type="primary" onClick={()=>this.setState({record: ''})}>取消</Button>
                    </Form.Item>
                </FormComp>
            </div>
        </Modal>
    </div>
    }
}
const MoneyMrgIndexView = Form.create({ name: 'moneyMrgIndex' })(MoneyMrgIndex);
export default MoneyMrgIndexView