import React from 'react';
import BasePage from "../../../../pages/BasePage";
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, Modal, Divider, Steps, Tabs, Tag   } from 'antd';
import { getDemoList, deleteGoods } from '$api/demo';
import { formatAmount } from '$utils/utils';
import FormComp from '../../common/referenceDataOption/formComp'
import {queryUserOperationLog} from '$api/permission'
import LogDetail from './logDetail';
const { TabPane } = Tabs;
import ReqCol from './reqCol';
import "./index.scss";

let queryUserOperationLog_params = {
    loginName: '',
    customerId: '',
    optType: '',
    req: '',
    operateTimeStart: '',
    operateTimeEnd: '',
}
const columns = [
    {
        title: '登录名',
        dataIndex: 'loginName',
        key: 'loginName',
        width: 150
    },
    {
        title: '来源',
        dataIndex: 'source',
        key: 'source',
        width: 80
    },
    {
        title: '客户Id',
        dataIndex: 'customerId',
        key: 'customerId',
        width: 240
    },    
    {
        title: '接口名称',
        key: 'optType',
        dataIndex: 'optType'
    },
    {
        title: '请求参数',
        className: 'vcc-userlog-list__col-req',
        render: ({ req }) => <ReqCol req={req} />
    },
    {
        title: '请求时间',
        key: 'operateTime',
        dataIndex: 'operateTime',        
        width: 220
    },
    {
        title: '操作',
        width: 150,
        render: record => {
            return <LogDetail {...record} />
        }
    }
]

class UserLogIndex extends BasePage {
    static viewName = 'UserLogIndex'; // 与路由名称保持一致
    constructor(props) {
        super(props);
        this.state = {
            userOptLog: {},
        };

    }    
    handleSubmit = (e) => {
        e.preventDefault();
    };
    queryUserOperationLog = (pageNum, params) => {
        console.log(params)
        params && (queryUserOperationLog_params = params);
        queryUserOperationLog({
            params: {
                ...queryUserOperationLog_params,
                pageNum,
                pageSize: 10 
            }
        }).then(res=>{
            const {code, message, result} = res;
            code == '000000' &&  result.userOptLog ? 
            this.setState({
                pageNum,
                userOptLog: result.userOptLog
            }):
            this.msgError(message||'系统异常') 
            
        })


    }
    // 渲染
    render() {
        const {data_a=[]} = this;
        const {pageNum, userOptLog} = this.state;
        const layout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 12 },
        };
        const tailLayout = {
            wrapperCol: { offset: 2, span: 16 },
        };
        return (
            <div className="vcc-userlog-list">
                <Tabs defaultActiveKey="2" onChange={this.callback}>
                    <TabPane tab="用户操作日志" key="2">
                        <div style={{height: '200px'}}>
                        {
                            // antd Form组件源码横向全都用float，造成严重干扰
                            <FormComp 
                                // 成功回调 
                                sucCB={(Obj)=>this.queryUserOperationLog(1, Obj)}
                                // key和title 
                                columns={[
                                    {key: 'loginName', label: '登录名', type: 'input', require: true},
                                    {key: 'customerId', label: '客户Id', type: 'input', require: true},
                                    {key: 'optType', label: '接口名称', type: 'input', require: true},
                                    {key: 'req', label: '请求参数', type: 'input', require: true},
                                    {
                                        key: 'rangepicker', 
                                        label: '请求时间', 
                                        type: 'rangepicker', 
                                        require: true, 
                                        format: 'YYYY-MM-DD HH:mm:ss',
                                        showTime: true,
                                        keys: ['operateTimeStart', 'operateTimeEnd']
                                    },        
                                ]} 
                                // 栅格布局
                                layout={{
                                    labelCol: { span: 5 },
                                    wrapperCol: { span: 12}
                                }}>
                            </FormComp>
                        }
                        </div>
                        <this.Table 
                            columns={columns} 
                            dataSource={ userOptLog['userOptLogList']|| []} 
                            pagination={{
                                'total': userOptLog['totalCount']||0,
                                'onChange': i => this.queryUserOperationLog(i),
                                'current': pageNum || 1
                            }} 
                            />
                        
                    </TabPane>
                </Tabs>
                
            </div>
        )
    }
}
const UserLogIndexView = Form.create({ name: 'userLogIndex' })(UserLogIndex);
export default UserLogIndexView