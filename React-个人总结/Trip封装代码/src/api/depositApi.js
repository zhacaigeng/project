import ApiServices, { post, ApiServicesComm } from './apiService';
import urlConfig from '$config/url';
import { post, get } from './apiService'
/**
 * KYC 相关的操作
 * 契约：http://conf.ctripcorp.com/pages/viewpage.action?pageId=660866314#id-37.CREDIC-10796%E5%9C%A8%E7%BA%BFKYC-%E6%8E%A5%E5%8F%A3%E4%BE%9D%E8%B5%96
 */


/**
 * 查询KYC详情
 * 一个客户只能有一个KYC用户
 * @returns 
 */
export function queryKycUser(customerId) {
    return get('/yagoUser/queryKYCCustomerInfo', { customerId });
}

// KYC 列表
export function queryKycUserList(query) {
    return post('/yagoUser/queryKYCCustomerList', query); 
}


/**
 * 运营端kyc信息提交（包含保存/提交）
 */
export function commitKycInfo(data) {
    return post('/kyc/commit', data);
}

/**
 * 契约http://conf.ctripcorp.com/pages/viewpage.action?pageId=676398404
 * @returns 
 */
export function queryDict() {
    return get('/kyc/dict');
}

/**
 * 根据taskId获取kyc信息【审批中心】
 * @param {*} taskId 
 */
export function getKycInfoByTaskId(instanceId, taskId) {
    return get('/kyc/kycTaskQuery', { instanceId, taskId })
}

/**
 * 初审Kyc信息
 * @returns 
 */
export function auditKycInfo(data) {
    return post('/kyc/approve', data); 
}



// 查询币种国家枚举值
export const queryPayoutSupport = async (customerId = '') => {
    const options = {params: {
        customerId
    }}
    let {data } = await ApiServicesComm('/payee/queryPayoutSupport', 'get', options)
    return data && {
        country: data.country && data.country.map(v=>({
            label: v.value,
            value: v.code
        }))||{},
        currency: data.currency && data.currency.map(v=>({
            label: v.code,
            value: v.code
        }))||{},
        iban: data.iban && data.iban.map(v=>({
            length: v.value||0,
            label: v.code,
            value: v.code
        }))||{},
    }
}
// 查询付款方式
export const queryPaymentType =  (options = {}) => ApiServicesComm('/payee/queryPaymentType', 'get', options)
// 触发付款
// export const addPayee =  (options = {}) => ApiServicesComm('/payee/addPayee', 'post', options) 
export const addPayee =  (options = {}) => new Promise((resolve, reject)=>{
    ApiServices.post(`${urlConfig.cppapi}/payee/addPayee`, options.params).then(res=>{
        const {code, result} = res;
        switch (code) {
            case '000000':
                resolve(result)
                break
            case '150013':
                message.error('商户简称重复')
                break
            case '150011':
                message.error('商户信息重复')
                break
            default:
                message.error(res.message || '系统异常')
                break
        }
    })
});

// 充值列表
export const queryDepositOrderList = (options = {}) => ApiServicesComm('/deposit/queryDepositOrderList', 'get', options)


// 充值审批详情
export const getDepositAuditDetail = (options = {}) => {
    ApiServices.get(`${urlConfig.cppapi}/deposit/depositQuery?taskId=`+options.params.taskId+"&instanceId="+options.params.instanceId)
    .then(res => {
        options.success && options.success(res);
    }).catch(function (err) {
        options.error && options.error(err)
    });
};



// 获取所有的商户
export const getCustomerAll = (options = {}) => new Promise((resolve, reject)=>{
    ApiServices
    .get(`${urlConfig.cppapi}/customer/all`)
    .then(res => {
        let { message, code, result={} } = res;
        if(code == '000000' && result.customerInfo){
            const list = result.customerInfo.map(v => ({
                label: v.chineseName,
                value: v.customerId,
                customerSimpleName: v.customerAbbreviation||''
            }))
            resolve(list)
        }
    }, reject)
});


/**
 * 文件上传
 * @param {*} file 
 * @returns 
 */
export function fileUpload(file, config) {
    const formData = new FormData();
    formData.append('file', file);
    const { headers } = config = config || {};
    config.headers = Object.assign({
        'Content-Type': 'multipart/form-data'
    }, headers);

    return post('/deposit/fileUpload', formData, config);
}


//用户list
export const queryCustomerList = (options = {}) => ApiServices.get(`${urlConfig.cppapi}/vcc/queryCustomerList`, {params:options.params});
//所有用户select
export const queryCustomerSelectList = e => new Promise((resolve,reject)=>{
    ApiServices.get(`${urlConfig.cppapi}/vcc/queryCustomerSelectList`, {params:{}}).then(res=>{
        const {code, message, result} = res;
        if(code == '000000'){
            let {customerIdList, customerNameList} = result.selectInfo;
            let _options = customerIdList.map((v, i)=>(
                {
                    label: customerNameList[i],
                    value: customerIdList[i]
                }
            ));
            resolve(_options)
        }
        reject(message)
    })
});
export const getMenusList = (options = {}) => {
    ApiServices.get(`${urlConfig.mock}/menu/list`, {})
    .then(response => {
        options.success && options.success(response)
    }).catch(function (error) {
        options.error && options.error(error)
    });
};

export const userSigIn = (options = {}) => ApiServices.get(`${urlConfig.cppapi}/user/queryMenuList`, {params: {
    sysMenu: 'ccp'
}});

export const getCurrencyList = (options = {}) => new Promise((resolve, reject)=>{
    ApiServices.get(
        `${urlConfig.cppapi}/customer/customerDict`, 
        {}
    ).then(res => {
        res.result && res.result.dict && res.result.dict && res.result.dict.currency ? 
        resolve(res.result.dict.currency): 
        reject('error')
    })
})
// 获取vcc可支持的币种
// 封装vcc获取 币种list
export const queryCusCurrencyInfo = customerId => new Promise((resolve, reject)=>ApiServicesComm('/card/queryCusCurrencyInfo', 'get', {
    params:{ customerId }
}).then(({ data={} })=>{
    resolve([
        data.cardCurrencySet && data.cardCurrencySet.map(v=>Object.assign({}, v, {
            label: v.currencyEnName || '',
            value: v.currencyCode || ''
        }))||[],
        data.settleCurrencySet && data.settleCurrencySet.map(v=>Object.assign({}, v, {
            label: v.currencyEnName || '',
            value: v.currencyCode || ''
        }))||[]
    ])
})) 

export const batchCreateCard = data => post('/card/batchCreateCard', data)
export const queryBatchCreateList = params => get('/card/queryBatchCreateList', params)
export const queryBatchDetail = batchNo => get('/card/queryBatchDetail', { batchNo })