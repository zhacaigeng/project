import { useState, useRef } from 'react'
import List from '$components/common/list'
import SearchParam from './searchParam'
import { queryKycUserList } from '$api/kyc'
import KycStatus from '$src/enums/kycStatus'
import { Button } from 'antd'
import AddEditModal from '../addEditModal'
import KycInfoDetail from '../detail'

export default function KycList() {
    const [addModalVisible, setAddModalVisibale] = useState();
    const [detailVisible, setDetailVisible] = useState();

    const currentSelectedCutomerId = useRef();
    const listRef = useRef();

    function hideAddModal() {
        setAddModalVisibale(false);
    }

    function handleFillKycInfo(customerId) {
        currentSelectedCutomerId.current = customerId;
        setAddModalVisibale(true);
    }

    function handleFinalCommit() {
        hideAddModal();
        listRef.current.reloadData();
    }

    function handleShowDetail(customerId) {
        debugger
        currentSelectedCutomerId.current = customerId;
        setDetailVisible(true);
    }

    function handleHideDetail() {
        setDetailVisible(false);
    }

    const tableColumns = [
        {
            title: '商户简称',
            dataIndex: 'customerAbbr'
        },
        {
            title: 'KYC状态',
            dataIndex: 'status',
            render: status => KycStatus.getDesc(status)
        },
        {
            title: '操作',
            render: ({ status, customerId }) => {
                return status === KycStatus.willCommit
                    ? <Button type="link" size="small" onClick={() => handleFillKycInfo(customerId)}>提交</Button>
                    : <Button type="link" size="small" onClick={() => handleShowDetail(customerId)}>详情</Button>
            }
        }
    ]
    
    return (
        <div>
            <List
                ref={listRef}
                rowKey={({ customerId }) => customerId }
                columns={tableColumns}
                filterForm={<SearchParam />}
                fetchData={doQueryKycUserList}
            />
            <AddEditModal 
                customerId={currentSelectedCutomerId.current}
                visible={addModalVisible} 
                onCancel={hideAddModal} 
                onFinalCommit={handleFinalCommit}
                />
            <KycInfoDetail 
                customerId={currentSelectedCutomerId.current}
                visible={detailVisible} 
                onClose={handleHideDetail}
                />
        </div>
    )
}

async function doQueryKycUserList(pagination, filter) {    
    const { createTimeRange, updateTimeRange, ...rest } = filter || {};
    const [createDateStart, createDateEnd] = createTimeRange || [];
    const [updateDateStart, updateDateEnd] = updateTimeRange || [];
    const params = {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
        createDateStart,
        createDateEnd,
        updateDateStart,
        updateDateEnd,
        ...rest
    }
    const res = await queryKycUserList(params);
    const { code, message, result } = res;
    if(code !== '000000' || !result || !result.data) {
        throw new Error('data is empty');
    }        
    const { kycCustomerVoList: list, totalCount: total } = result.data;
    return { list, total }
}