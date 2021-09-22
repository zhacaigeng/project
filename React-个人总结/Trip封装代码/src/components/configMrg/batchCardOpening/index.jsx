import { useState, useRef } from 'react'
import { Button, Descriptions, Tag } from 'antd'
import List from '$components/common/list'
import { batchCreateCard, queryBatchCreateList, queryBatchDetail } from '$api/configMrg'
import SearchParam from './searchParam'
import ProcessStratus from './statusEnum'
import ViewDetial from './detail'
import AddBatch from './addBatch'
import './index.scss'

export default function BatchCardOpening() {
    const listRef = useRef();
    const [detailBatchNo, setDetailBatchNo] = useState();
    const [addBatchVisible, setAddBatchVisible] = useState();
    
    async function queryBatchCardOpeningList(pagination, filter) {
        const { customerId, createTime } = filter || {};
        const [createTimeStart, createTimeEnd] = createTime || [];
        const params = {
            pageNo: pagination.current,
            pageSize: pagination.pageSize,
            createTimeStart,
            createTimeEnd,
            customerId
        }
        const res = await queryBatchCreateList(params);
        const { code, message, result } = res;        
        if(code !== '000000' || !result || !result.data) {
            throw new Error('data is empty');
        }
        const { batchCreateInfoVoList: list, totalCount: total } = result.data;
        return { list, total }
    }

    function handleAddBatch() {
        setAddBatchVisible(true);
    }

    function handleDidAddBatch() {
        listRef.current.reloadData();
    }

    const tableColumns = [
        {
            title: '客户ID',
            dataIndex: 'customerId'
        },
        {
            title: '客户名',
            dataIndex: 'customerName'
        },
        {
            title: '批次号',
            dataIndex: 'batchNo'
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: status => (
                <Tag color={ProcessStratus.DONE === status ? '#108ee9' : '#f50'}>
                    {
                        ProcessStratus.getDesc(status)
                    }
                </Tag>
            )
        },
        {
            title: '开卡数量',
            width: '150px',
            render: record => {
                const { totalNum, successNum, failNum, status } = record;
                const processDone = ProcessStratus.DONE === status;
                return (
                    <Descriptions 
                        column={1} 
                        size="small" 
                        className="ccp-batch-open-card__count-descs"
                    >
                        <Descriptions.Item label="总数">{totalNum}</Descriptions.Item>
                        <Descriptions.Item label="成功">{processDone ? successNum : '--'}</Descriptions.Item>
                        <Descriptions.Item
                            className={failNum > 0 ? 'error': ''}
                            label="失败">{processDone ? failNum : '--'}</Descriptions.Item>
                    </Descriptions>
                )
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createTime'
        },
        {
            title: '操作',
            render: ({ batchNo, status }) => {
                const processing = ProcessStratus.ING === status;
                return <Button 
                    type="link"
                    disabled={processing}
                    onClick={() => setDetailBatchNo(batchNo)}>查看</Button>
            }
        }
    ]

    return (
        <div>
            <List
                ref={listRef}
                columns={tableColumns}
                filterForm={<SearchParam onAddBatch={handleAddBatch}/>}
                fetchData={queryBatchCardOpeningList}
                rowKey="batchNo"
            />
            <ViewDetial 
                visible={!!detailBatchNo}
                batchNo={detailBatchNo}
                onCancel={() => setDetailBatchNo(null)}
            />
            <AddBatch 
                visible={addBatchVisible}
                onCancel={() => setAddBatchVisible(false)}
                onDidAdd={handleDidAddBatch}
            />
        </div>
    )
}