import { useCallback } from 'react';
import { Table, message } from 'antd';
import { queryHistoricalActivities } from '$api/merchantApi';
import List from '$components/common/list'

const columns = [
    {
        title: '任务节点',
        dataIndex: 'activityName',
        width: '100px'
    },
    {
        title: '审批人',
        dataIndex: 'operator',
        width: '100px'
    },
    {
        title: '审批时间',
        dataIndex: 'endTime',
        width: '200px'
    },
    {
        title:'审批结果',
        dataIndex: 'approvedResult',
        render: v => (v ? '':'不') + '通过',  
        width: '100px'      
    },
    {
        title: '审批意见',
        dataIndex: 'comment',
        render: v =>  v && v.constructor == Array ? v.join(): v &&  JSON.stringify(v) || ''        
    }
]

export default function ApproveLog(props) {
    const { processInstanceId } = props;

    const fetchData = useCallback(async function () {
        const res = await queryHistoricalActivities(processInstanceId);
        const { code, message, result } = res;
        if(code !== '000000' || !result) {
            throw new Error('data is empty');
        } 
        const { activities: list } = result;
        return { list, total: 0 }
    }, [processInstanceId])

    return (
        <div>
            <div className="vcc-task-panel__title">审批日志</div>
            <List
                rowKey={record => record.taskId }
                columns={columns}
                fetchData={fetchData}
                pagination={false}
                />
        </div>
    )
}