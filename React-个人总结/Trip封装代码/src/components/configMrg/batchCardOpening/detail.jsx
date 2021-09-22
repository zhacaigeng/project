import List from '$components/common/list'
import { Modal } from 'antd';
import { queryBatchDetail } from '$api/configMrg'
import thousandify from 'thousandify'

/**
 * 
 * @param {*} props 
 */
export default function ViewDetial(props) {    
    const { visible, batchNo, onCancel } = props;

    async function getBatchDetail() {        
        const res = await queryBatchDetail(batchNo);
        const { code, message, result } = res;        
        if(code !== '000000' || !result || !result.data) {
            throw new Error('data is empty');
        }        
        const { batchCardInfoVoList: list } = result.data;
        return { list }
    }

    const tableColumns = [
        { 
            title: '开卡币种',
            dataIndex: 'cardCurrency'
        },
        { 
            title: '结算币种',
            dataIndex: 'settleCurrency'
        },
        { 
            title: '卡号',
            dataIndex: 'cardNum'
        },        
        { 
            title: '有效期',
            dataIndex: 'activeDate'
        },        
        { 
            title: 'CVV2',
            dataIndex: 'cvv2'
        },        
        { 
            title: '卡额度',
            dataIndex: 'cardAmount',
            render: thousandify
        },        
        { 
            title: '开卡结果',
            dataIndex: 'createStatus'
        }
    ]
    
    return (
        <Modal 
            title="批量开卡详情"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose
            width="70%"   
        >
            <If condition={visible}>
                <List
                    columns={tableColumns}
                    fetchData={getBatchDetail}
                    rowKey={record => record.cardNo}
                    pagination={false}
                />
            </If>      
        </Modal>
    )
}