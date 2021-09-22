import React from 'react';
import BasePage from "../../../../pages/BasePage";
import { Table, Tag, Button, Row, Col } from 'antd';
import { pageQueryYagoUser, resetPassword } from '$api/permission'
import Role from '../role'
import AddEditFormModal from './addEditModal'
import SearchParam from './searchParam';
import List from '$components/common/list'
import "./index.scss";

export default class MoneyMrgIndex extends BasePage {
    
    constructor(props) {
        super(props);
        this.state = {
            record: {},
            addEditModalVisible: false,
            showRole: false
        };
        this.listRef = React.createRef();
    }

    reloadPageData = () => {
        this.listRef.current.reloadData();
    }

    showAddEditModal = record => {            
        this.setState({
            addEditModalVisible: true,
            record,
        });
    }

    // 查询list
    queryYagoUserList = async (pagination, filter) => {
        const params = {
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
            ...filter
        }
        const res = await pageQueryYagoUser({ params });
        const { code, message, result } = res;
        if(code !== '000000' || !result || !result.data) {
            throw new Error('data is empty');
        }        
        const { list, totalCount: total } = result.data;
        return { list, total }
    }

    handleResetPassword = record => {
        const { loginName = ''} = record;
        resetPassword({ params: { loginName } })
        .then(res => res.code == '000000' && this.msgSucc('密码重置成功') ) 
    }

    // 渲染
    render() {
        const { record, showRole } = this.state;
        const tableColumns = [
            {
                title: '登录名',
                dataIndex: 'loginName'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title:'商户简称',
                dataIndex: 'customerSimpleName'

            },            
            {
                title:'客户ID',
                dataIndex: 'customerId'

            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '掩码邮箱',
                dataIndex: 'maskEmail'
            },            
            {
                title:'上次修改时间',
                dataIndex: 'modifyDate'

            },
            {
                title:'状态',
                render: ({ enable, kyc }) => {                    
                    return kyc
                        ? <Tag color="red">KYC</Tag>
                        : enable
                        ? <Tag color="blue">已启用</Tag>
                        : <Tag color="green">未启用</Tag>                    
                }
            },
            {
                title: '操作',
                render: (text, record) => (
                    <Row type="flex">
                        <Col>
                            <Button type="link" size="small" onClick={()=>this.setState({
                                showRole: true,
                                record,
                            })}>查看角色</Button>
                        </Col>
                        <Col>
                            <Button type="link" size="small" onClick={() => this.showAddEditModal(record)}>编辑</Button>
                        </Col>
                        <Col>
                            <Button type="link" size="small" onClick={() => this.handleResetPassword(record)}>密码重置</Button>
                        </Col>                                            
                    </Row>
                )
            }
        ];

        return (
            <Choose>
                <When condition={showRole}>
                    <Role record={record} CB_01={() => this.setState({showRole: false})} />
                </When>
                <Otherwise>
                    <div className="vcc-user-mgr">                        
                        <List
                            ref={this.listRef}
                            filterForm={<SearchParam onAddUser={this.showAddEditModal} />}
                            rowKey={record => record.customerId + record.loginName} 
                            columns={tableColumns}
                            fetchData={this.queryYagoUserList}
                            />
                        <AddEditFormModal 
                            visible={this.state.addEditModalVisible}
                            onCancel={() => this.setState({ addEditModalVisible: false })}
                            onSuccss={this.reloadPageData}
                            currentUserInfo={record}
                            />
                    </div>
                </Otherwise>
            </Choose>
        )
    }
}