import Form from '$components/form'
import { Modal, Button, Row, Col, message } from 'antd'
import { batchCreateCard } from '$api/configMrg'

export default function AddBatch(props) {
    const { visible, onCancel, onDidAdd } = props;
    const initialValues = {
        customerId: '',
        settleCurrency: '',
        cardCurrency: '',
        cardAmount: '',
        cardNum: ''
    }

    function validate(values) {
        const errors = {};
        const { cardNum } = values;        
        if(cardNum && +cardNum <= 0) {
            errors.cardNum = '必须大于0'
        }
        return errors;
    }

    async function handleSubmit(values) {
        try {
            const res = await batchCreateCard(values);
            const { code } = res;
            if(code !== '000000') {
                throw res;
            }
            message.success('新增成功');
            onCancel();
            onDidAdd && onDidAdd();
        } catch(e) {
            console.error(e);
            message.error(e.message);
        }
    }

    return (
        <Modal
            title="新增批量开卡"
            visible={visible}
            onCancel={onCancel}
            onSubmit={handleSubmit}
            width="640px"
            footer={false}
            destroyOnClose    
        >
            <Form
                initialValues={initialValues}
                onSubmit={handleSubmit}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 12 }}
                validate={validate}
            >
                {
                    ({ values }) => {
                        const { customerId } = values;                        
                        return (
                            <>
                                <Form.Item.SelectVccCustomer required/>
                                <Form.Item.SelectVccCustomerCardCurrency customerId={customerId} required/>
                                <Form.Item.SelectVccCustomerSettleCurrency customerId={customerId} required/>
                                <Form.Item label="卡片额度" name="cardAmount" required/>
                                <Form.Item label="开卡数量" name="cardNum" required/>
                                <Form.ItemShell>
                                    <Row gutter={8} type="flex">
                                        <Col>
                                            <Button onClick={onCancel}>取消</Button>
                                        </Col>
                                        <Col>
                                            <Form.SubmitButton>保存</Form.SubmitButton>  
                                        </Col>                                        
                                    </Row>                                                  
                                </Form.ItemShell>
                            </>
                        )
                    }
                }
            </Form>
        </Modal>
    )
    
}