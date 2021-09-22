import Form from '$components/form'
import ActionsRow from '../common/actionsRow'
import { ActionPass, ActionCancel } from '../common/actions'
import { configProduct } from '$api/kyc'
import { message as messageAntd } from 'antd'
import ApproveLog from '../common/approveLog'
import KycInfo from './common/kycInfo'

const labelCol = { span: 6 }
const wrapperCol = { span: 12 }

/**
 * 配置产品
 */
export default function ConfigProduct(props) {
    const { taskId, processInstanceId, closeModal } = props;
    const initialValues = {
        selectedProduct: void 0,
        provisionBankCode: void 0,
        currencyList: void 0,
        transactionLimit: void 0,
        dayLimit: void 0
    }

    async function handleSubmit(values) {        
        try {
            const { 
                selectedProduct, 
                provisionBankCode, 
                currencyList, 
                transactionLimit, 
                dayLimit
            } = values;
            const { checkedKeys = [], halfCheckedKeys = [] } = selectedProduct;
            const productList = [].concat(checkedKeys, halfCheckedKeys);

            const { code, message } = await configProduct({                
                productList,
                provisionBankCode,
                currencyList,
                taskId,
                transactionLimit,
                dayLimit                
            })
            if(code !== '000000') {
                throw new Error(message)
            }
            messageAntd.success('提交成功');
            closeModal && closeModal();
        } catch(e) {
            console.error(e);
            messageAntd.error('提交失败');
        }
    }

    return (
        <div>
            <KycInfo processInstanceId={processInstanceId} taskId={taskId} />
            <div className="vcc-task-panel__title">配置产品</div>
            <Form 
                initialValues={initialValues}
                onSubmit={handleSubmit} 
                labelCol={labelCol} 
                wrapperCol={wrapperCol}>
                {
                    ({ values, setFieldValue }) => {

                        function handleProvisionBankChange() {
                            setFieldValue('currencyList', [], false);
                        }

                        return (
                            <>
                                <Form.Item.SelectProduct label="产品配置" name="selectedProduct" />
                                <Form.Item.SelectProvisionBank 
                                    label="备付金银行" 
                                    name="provisionBankCode"
                                    onChange={handleProvisionBankChange}
                                    required />
                                <Form.Item.SelectProvisionBankCurrency 
                                    label="开户币种" 
                                    name="currencyList"
                                    mode="multiple" 
                                    provisionBankCode={values.provisionBankCode}
                                    required />
                                <Form.Item label="单笔限额（CNY）" name="transactionLimit" required />
                                <Form.Item label="单日限额（CNY）" name="dayLimit" required />
                                <ApproveLog processInstanceId={processInstanceId} />
                                <ActionsRow>
                                    <ActionPass htmlType="submit" skipConfirm/>
                                    <ActionCancel onClick={closeModal} />
                                </ActionsRow>
                            </>
                        )
                    }
                }
            </Form>
        </div>
    );
}