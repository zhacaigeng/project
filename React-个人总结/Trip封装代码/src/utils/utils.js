
// 当前环境
export function getEnv() {
    const host = location.host;
    let curEnv = 'prod';
    if (/^ccpoffline\.ccard\.ctripcorp\.com/i.test(host)) {
        curEnv = 'prod';
    }
     else if (/\.uat\.qa/i.test(host)) {
        curEnv = 'uat';
    } else if (/\.fws\.qa/i.test(host)) {
        curEnv = 'fws';
    } else if (/\.fat3144/i.test(host)) {
        curEnv = 'fat3144';
    } else if (/\.fat3672/i.test(host)) {
        curEnv = 'fat3672';
    } else if (/\.fat3335/i.test(host)) {
        curEnv = 'fat3335';
    } else if (/\.fat3339/i.test(host)) {
        curEnv = 'fat3339';
    } else if (/\.fat3143/i.test(host)) {
        curEnv = 'fat3143';
    } else if (/\.fat18/i.test(host)) {
        curEnv = 'fat18';
    } else if (/\.fat3338/i.test(host)) {
        curEnv = 'fat3338';
    }
    else if (/\.fat/i.test(host)) {
        curEnv = 'fat';
    } else if (/localhost|10|127/i.test(host)) {
        curEnv = 'local';
    } else {
        curEnv = 'dev';
    }
    return curEnv
}

// 是否为数组
export function isArray(obj) {
    return Array.isArray(obj)
    // return obj instanceof Array
}

// 是否为对象
export function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

// 是否为空对象
export function isEmptyObject(obj) {
    try {
        return JSON.stringify(obj) === '{}';
    } catch (e) {
        return false;
    }
};

// 是否为undefined
export function isUndefined(obj) {
    return typeof obj === 'undefined'
};

// 是否为空字符
export function isEmptyStr(obj) {
    try {
        return obj === undefined || obj === null || obj === "";
    } catch (e) {
        return false;
    }
};

// 是否为函数
export function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]'
}

// 千分位,可保留两位小数
export function formatDecimal(val, precision) {
    let num = +val;
    if (Number.isNaN(num) || typeof num !== 'number') {
        return val;
    }
    val = val + '';
    let isNegative = num < 0;
    if (isNegative) { // 剔除负号
        val = val.substr(1);
    }
    let numParts = val.split('.');
    // int part
    numParts[0] = reverse(reverse(numParts[0]).replace(/(\d{3})/g, '$1,')).replace(/^,/, '');
    if (precision >= 0) {
        let preStr = (numParts[1] || '') + (new Array(precision + 1)).join('0');
        numParts[1] = preStr.substr(0, precision);
    }
    if (numParts[1] === '') {
        numParts.length = 1;
    }
    return (isNegative ? '-' : '') + numParts.join('.');
    function reverse(num) {
        return num.split('').reverse().join('');
    }
}

// 将后端接口返回的字符串类型数字加千分位
export function formatAmount(str) {
    try {
        if (typeof str === 'string' && /^\-?[0-9]+\.[0-9]+$/.test(str)) {
            return formatDecimal(Number(str), 2);
        }
        if (typeof str === 'string' && /^\-?[0-9]+$/.test(str)) {
            return formatDecimal(Number(str));
        }
        if (typeof str === 'number' && !Number.isNaN(str)) {
            return formatDecimal(str);
        }
    } catch (e) {
        console.log(e)
    }
    return str
}

// 分割卡号
export function splitCardNumberArr(num) {
    if (!num) {
        return []
    }
    let arr = []
    for (let i = 0; i < 4; i++) {
        arr.push(num.substr(i * 4, 4));
    }
    return arr;
}

// 下载文件
export function downFile(url, params){
    let search = null, href = null;
    if(isObject(params) && !isEmptyObject(params)){
        search = Object.keys(params).map(key => `${key}=${encodeURIComponent(isUndefined(params[key]) ? '' : params[key])}`).join('&');
    }
    if(search){
        href = `${url}?${search}`;
    }else{
        href = `${url}`;
    }
    console.log(href)
    const tempLink = document.createElement('a');
    tempLink.style.display = 'none';
    tempLink.href = href;
    document.body.appendChild(tempLink);
    tempLink.click()
    document.body.removeChild(tempLink);
}

// json转arr
export function transJsonToArr(json, keyName, valueName){
    debugger;
    let arr = [];
    keyName = keyName || 'key';
    valueName = valueName || 'value';

    if(isObject(json) && !isEmptyObject(json)){
      for(let key in json){
        if(json.hasOwnProperty(key)){
          let j = {};
          j[keyName] = key;
          j[valueName] = json[key];
          arr.push(j)
        }
      }
    }
    return arr
}

export const canFormatAmountRegExp = /金额|余额|限额|Amount|amount|Amt/
export const columnsFormat = arr =>{
    // [title, dataIndex, key, render, type, options]
    return arr.map(v=>{
        if(v.constructor == Array ){
        const [
            title='', 
            dataIndex='',
            render=(e=>e), 
            type='input', 
            options=[],
            required = false,
            key='', 
            disabled = false,
        ] = v;

        return ({
            title,
            dataIndex,
            key: key||dataIndex||'',
            render,
            type, 
            options,
            required,
            disabled,
        })
    }else{
        return v
    }
    })
        
} 
