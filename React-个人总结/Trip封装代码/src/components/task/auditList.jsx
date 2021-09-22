import React from 'react';
import BasePage from "../../../pages/BasePage"
import { Icon, Button, Modal } from 'antd'
import { getAuditList, getMyAuditList, getMySubmitList } from '$api/taskApi'
import ProcessBizType from '$src/enums/processBizType'
import List from '$components/common/list'
import SearchParam from './searchParam'
import MerchantAuditDetail from "../task/merchantAuditDetail"
import MerchantEditAudit from "../task/merchantEditAudit"
import DepositAuditDetail from "../task/depositAuditDetail"
import MerchantDetail from "../merchant/merchantDetail"
import ModelComp from './modelComp'
import TaskKyc from './kyc'

const commonTableCols = [
    {
        title: '任务流水号',
        dataIndex: 'processInstanceId'
    },
    {
        title: '任务类型',
        dataIndex: 'processName'
    },
    {
        title: '标题',
        dataIndex: 'title'
    },
    
    {
        title: '任务节点',
        dataIndex: 'taskName'
    }
]

const diffs = {
    '待审批': {
        queryApi: getAuditList,
        tableCols: [
            ...commonTableCols,
            {
                title: '申请人',
                dataIndex: 'processCreator'
            },
            {
                title: '申请时间',
                dataIndex: 'createDate'
            }
        ]
    },
    '我的审批': {
        queryApi: getMyAuditList,
        tableCols: [
            ...commonTableCols,
            {
                title: '申请人',
                dataIndex: 'processCreator',
            }, 
            {
                title: '任务开始时间',
                dataIndex: 'processCreateDateStr'
            },
            {
                title: '任务结束时间',
                dataIndex: 'processEndDateStr'
            },
            {
                title: '是否结束',
                dataIndex: 'finished',
                render: (text, row) => (
                    <div>
                        {
                            row.finished === true 
                            ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> 
                            : <Icon type="minus-circle" theme="outlined" />
                        }
                    </div>
                )
            }
        ]
    },
    '我的提交': {
        queryApi: getMySubmitList,
        tableCols: [
            ...commonTableCols,
            {
                title: '任务开始时间',
                dataIndex: 'processCreateDateStr'
            },
            {
                title: '任务结束时间',
                dataIndex: 'processEndDateStr'
            }
        ]
    }
}

export default class AuditList extends BasePage {

    static viewName = 'AuditList'; // 与路由名称保持一致

    constructor(props) {
        super(props);
        this.state = {
            modal1Visible: false,
            record: {},
        };
        this.listRef = React.createRef();
    }

    showDetail = record => {
        this.setState({ modal1Visible: true, record });
    }

    getCom = (record, viewModel) => {           
        switch(record.businessType) {
            case ProcessBizType.customerUpdate:
                return viewModel=='edit'
                    ? <MerchantEditAudit record={record} closeModal={this.closeModal} />
                    : <MerchantDetail record={record} closeModal={this.closeModal} />
            case ProcessBizType.customerCreate:
                return viewModel=='edit'
                    ? <MerchantAuditDetail record={record} closeModal={this.closeModal} />
                    : <MerchantDetail record={record} closeModal={this.closeModal} />                
            case ProcessBizType.deposit:
                return <DepositAuditDetail record={record} closeModal={this.closeModal} viewModel={viewModel}/>
            case ProcessBizType.withdraw:
            case ProcessBizType.fx:
            case ProcessBizType.adjustCommission:
            case ProcessBizType.rebatePost:
            case ProcessBizType.markup:
            case ProcessBizType.payee:
            case ProcessBizType.feeConf:
            case ProcessBizType.commissionFeePost:
            case ProcessBizType.deleteMccGroup:
            case ProcessBizType.chargeBackProcess:
            case ProcessBizType.payout:
                return <ModelComp 
                    record={record} 
                    closeModal={this.closeModal} 
                    viewModel={viewModel} 
                    viewName={record.businessType} 
                    taskName={record.taskName} />
            case ProcessBizType.kyc:
                return <TaskKyc record={record} closeModal={this.closeModal} />
            default:
                return <h1>无法处理的审批流，record.businessType={record.businessType}</h1>
        }
    }

    closeModal = () => {
        this.setState({ modal1Visible: false });
        this.listRef.current.reloadData();
    }

    // 查询 Task list
    queryTaskList = async (pagination, filter) => {        
        const { title } = this.props;        
        const params = {
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
            ...filter
        }
        const res = await diffs[title].queryApi(params);
        const { code, message, result } = res;
        if(code !== '000000' || !result) {
            throw new Error('data is empty');
        } 
        const { data: list, count: total } = result;
        return { list, total }
    }

    // 渲染
    render() {
        const { record } = this.state;  
        // 【待审批】，【我的审批】，【我的提交】三个菜单公用这个组件，利用`title`属性区分      
        const { title }  = this.props;
        const tableCols = diffs[title].tableCols.concat({
            title: '操作',
            render: record => (
                <div>
                    <Button type="primary" onClick={() => this.showDetail(record)}>详情</Button>
                </div>
            )
        })

        return (
            <>
                <List 
                    ref={this.listRef}
                    filterForm={<SearchParam />}
                    rowKey={record => record.processInstanceId} 
                    columns={tableCols}
                    fetchData={this.queryTaskList}
                />
                <Modal
                    title={title + "详情"}
                    style={{ top: 20 }}
                    visible={this.state.modal1Visible}
                    width="960px"
                    maskClosable={false}
                    destroyOnClose
                    onCancel={() => this.setState({ modal1Visible: false })}
                    footer={null}>
                    {
                        this.getCom(record, title === '待审批' ? 'edit' : 'view')
                    }
                </Modal>
            </>
        )
    }
}