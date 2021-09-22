import getRequestEnv from '@ctrip/nfes/util/getRequestEnv';
import { getEnv } from '$utils/utils';

const ENV_URL_CONFIG = {};
let curEnv = 'prod';

if(__CLIENT__){
    curEnv = getEnv();
}else{
    curEnv = getRequestEnv();
}

addProfile('local', {
    //  mock: `https://yagoservice.fat3144.qa.nt.ctripcorp.com`, // 测试服务器IP
    mock: `http://yapi.corp.qunar.com/mock/6497`, 
    cppapi: `http://cpp.fat3672.qa.nt.ctripcorp.com`,
});

addProfile('dev', {
    mock: `http://yapi.corp.qunar.com/mock/6497`, 
    cppapi: `http://cpp.fat3144.qa.nt.ctripcorp.com`,
});

addProfile('fat', {
    mock: `http://yapi.corp.qunar.com/mock/6497`, 
    cppapi: `http://cpp.fat3144.qa.nt.ctripcorp.com`,
});
addProfile('fat18', {
    mock: `http://yapi.corp.qunar.com/mock/6497`, 
    cppapi: `http://cpp.fat18.qa.nt.ctripcorp.com`,
});
addProfile('fat3672', {
    mock: `http://yapi.corp.qunar.com/mock/6497`, 
    cppapi: `http://cpp.fat3672.qa.nt.ctripcorp.com`,
});

addProfile('fws', {
    mock: `http://yapi.corp.qunar.com/mock/6497`, 
    cppapi: `http://cppservice.fws.qa.nt.ctripcorp.com`,
});

addProfile('uat', {
    yapi: `http://yapi.corp.qunar.com/mock/6497`,
    cppapi: 'https://yago.fat.m.qa.nt.ctripcorp.com',
});

addProfile('prod', {
    yapi: `http://yapi.corp.qunar.com/mock/6497`,
    cppapi: 'https://cppservice.ccard.ctripcorp.com',
});

function addProfile(env, config) {
    ENV_URL_CONFIG[env] = config
}

export default ENV_URL_CONFIG[curEnv]
