import { useRef, useEffect, useState } from 'react'
import Form from '$components/form'
import { Modal, Button, Radio, message } from 'antd'
import { createUserInfo, updateUserInfo, queryUserDetail } from '$api/permission'
import { createKycUser, updateKycUser, queryKycUser } from '$api/kyc'
import pick from 'lodash/pick'

export default function(props) {
    const { currentUserInfo } = props; 
    const { customerId, kyc } = currentUserInfo || {};
    
    const Comp = !customerId
        ? AddModal
        : kyc
        ? EditModalKYC 
        : EditModal;
    return <Comp {...props} />
}

function pickFormValues(values) {
    return pick(values, 'customerId loginName userName email enable roles'.split(' '));
}

function pickFormValuesKYC(values) {
    const {
        customerId,
        customerBriefName,
        customerNameCN,
        customerNameEN,
        mainLandRelativeName,
        authorizerName,
        authorizerEmail,
        authorizerPhone,
        authorizerPosition
    } = values;

    return {
        customerId,
        customerAbbr: customerBriefName,
        chineseName: customerNameCN,
        englishName: customerNameEN,
        mainlandRelateName: mainLandRelativeName,
        authorizerName,
        authorizerEmail,
        authorizerPhone,
        authorizerPosition
    }
}

AddModal.defaultProps = {
    title: '新增'
}
function AddModal(props) {
    function submitAction(values) {
        const { chooseCustomer } = values;
        if(chooseCustomer) {
            const params = pickFormValues(values);
            return createUserInfo(params);             
        }
        // KYC 用户
        const params = pickFormValuesKYC(values);
        return createKycUser(params);
    }
    return <AddEditModal submitAction={submitAction} {...props} />
}

EditModal.defaultProps = {
    title: '编辑'
}
function EditModal(props) {
    const chooseCustomer = true;
    const [initialValues, setInitialValues] = useState({ chooseCustomer });
    const { currentUserInfo, visible } = props;
    const { customerId, loginName, email } = currentUserInfo;

    function submitAction(values) {        
        const params = pickFormValues(values);
        return updateUserInfo(params);
    }
    
    // 获取详细
    useEffect(() => {        
        let unmount = false;
        if(!visible) {
            return;
        }       
        const params = { loginName, customerId };
        ;(async () => {
            try {                
                const { code, message, result } = await queryUserDetail(params);
                if(code !== '000000') {
                    throw new Error(`code=${code}`);
                }
                if(!result || !result.data) {
                    throw new Error(`result or data is null`);
                }
                const { 
                    loginName,
                    userName,
                    enable,
                    roles 
                } = result.data;

                setInitialValues({                    
                    chooseCustomer,
                    loginName,
                    userName,  
                    customerId,
                    email, // 注意：邮箱字段取列表页，因为详情接口返回的email是掩码的。
                    enable,
                    roles: (roles || []).map(({ roleCode }) => roleCode)
                });
            } catch(e) {
                console.error(e);
                message.error('系统异常，请重试');
            }
        })()

        return () => {
            unmount = true;
        }
    }, [visible, customerId, loginName, email])
    
    return <AddEditModal isEdit submitAction={submitAction} initialValues={initialValues} {...props} />
}

EditModalKYC.defaultProps = {
    title: '编辑KYC用户'
}
function EditModalKYC(props) {
    const chooseCustomer = false;
    const [initialValues, setInitialValues] = useState({ chooseCustomer });
    const { currentUserInfo, visible } = props;
    const { customerId } = currentUserInfo;
    
    function submitAction(values) {
        const params = pickFormValuesKYC(values);
        return updateKycUser(params);
    }

    // 获取详细
    useEffect(() => {        
        let unmount = false;  
        if(!visible) {
            return;
        }
        ;(async () => {
            try {                
                const { code, message, result } = await queryKycUser(customerId);
                if(code !== '000000') {
                    throw new Error(`code=${code}`);
                }
                if(!result || !result.data) {
                    throw new Error(`result or data is null`);
                }
                const {
                    customerAbbr,
                    chineseName,
                    englishName,
                    mainlandRelateName,
                    authorizerName,
                    authorizerEmail,
                    authorizerPhone,
                    authorizerPosition
                } = result.data;

                setInitialValues({ 
                    customerId,
                    chooseCustomer,
                    customerBriefName: customerAbbr,
                    customerNameCN: chineseName,
                    customerNameEN: englishName,
                    mainLandRelativeName: mainlandRelateName,
                    authorizerName,
                    authorizerEmail,
                    authorizerPhone,
                    authorizerPosition
                });
            } catch(e) {
                console.error(e);
                message.error('系统异常，请重试')
            }
        })()

        return () => {
            unmount = true;
        }
    }, [visible, customerId])
    
    return <AddEditModal isEdit submitAction={submitAction} initialValues={initialValues} {...props} />
}

AddEditModal.defaultProps = {
    initialValues: {
        chooseCustomer: true,
        loginName: '',
        userName: '',
        customerId: '',
        email: '',
        roles: [],
        // KYC 用户
        customerBriefName: '',
        customerNameCN: '',
        customerNameEN: '',
        mainLandRelativeName: '',
        authorizerName: '',
        authorizerEmail: '',
        authorizerPhone: '',
        authorizerPosition: ''
    }
}

function AddEditModal(props) {    
    const {
        title,
        initialValues,
        isEdit,
        visible,
        onCancel,
        onSuccss,
        submitAction
    } = props;
    const formRef = useRef();

    async function handleSubmit(values) {        
        try {
            const { code } = await submitAction(values);            
            // KYC授权人邮箱重复(邮箱作为登录名)
            if(code === '100103') {
                throw new Error(`${values.chooseCustomer ? '登录名' : '授权人邮箱'}已存在`);                
            }
            // 商户简称重复
            if(code === '100010') {
                throw new Error(`商户简称已存在`);
            }
            if(code !== '000000') {
                throw new Error(`${title}失败，请重试`);
            }
            message.success(`${title}成功`);
            onCancel();
            // 重新加载list数据
            onSuccss && onSuccss();            
        } catch(e) {
            console.error(e);
            message.error(e.message);
        }
    }

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            destroyOnClose            
        >
            <div className="card-holder-form__wrapper">
                <Form 
                    ref={formRef}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize
                    labelCol={{span: 7}}
                    wrapperCol={{span: 16}}
                    >
                    {
                        ({ values }) => (
                            <>
                                <If condition={!isEdit}>
                                    <Form.Item.Switch label="关联已有商户" name="chooseCustomer" />
                                </If>                                
                                <Choose>
                                    <When condition={values['chooseCustomer']}>
                                        <FormItemsWithCustomer isEdit={isEdit} formRef={formRef} />                                        
                                    </When>
                                    <Otherwise>
                                        <FormItemsWithoutCustomer isEdit={isEdit} />
                                    </Otherwise>
                                </Choose>
                                <Form.ItemShell>
                                    <Button onClick={onCancel} className="vcc-user-mgr__modal-cancel-btn">取消</Button>
                                    <Form.SubmitButton>保存</Form.SubmitButton>                
                                </Form.ItemShell>
                            </>
                        )
                    }
                </Form>
            </div>
        </Modal>
    )
}

function FormItemsWithCustomer({ isEdit, formRef }) {
    // 商户变更，清空已选择的角色
    function handleCustomerChange() {        
        formRef.current.setFieldValue('roles', []);
    }

    return (
        <>
            <Form.Item required disabled={isEdit} label="登录名" name="loginName" />
            <Form.Item required label="用户名" name="userName" />
            <Form.Item.SelectCustomer 
                required 
                disabled={isEdit} 
                onChange={handleCustomerChange} 
                />
            {/* 编辑时邮箱返显的是密文，不校验格式*/}
            <Form.Item.Email required formatValidate={!isEdit}/>
            <If condition={isEdit}>
                <Form.Item.Switch required label="启用" name="enable" />
            </If>
            <Form.Item.SelectRole />
        </>
    )
}

function FormItemsWithoutCustomer({ isEdit }) {
    return (
        <>
            <Form.Item required label="商户简称" name="customerBriefName" />
            <Form.Item label="商户名称（中文）" name="customerNameCN" />
            <Form.Item required label="商户名称（英文）" name="customerNameEN" />
            <Form.Item label="大陆关联主体名称" name="mainLandRelativeName" />
            <Form.Item required label="授权人姓名" name="authorizerName" />
            {/* 编辑时邮箱返显的是密文，不校验格式*/}
            <Form.Item.Email disabled={isEdit} required formatValidate={!isEdit} label="授权人邮箱" name="authorizerEmail" />
            <Form.Item required label="授权人电话" name="authorizerPhone" />
            <Form.Item required label="授权人职位" name="authorizerPosition" />
        </>
    )
}