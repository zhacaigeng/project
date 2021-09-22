import React, { Component } from 'react';
import useAppContext from '$src/context/appContext';
import HashSync from '../hashSync'
import Welcome from './welcome'
import CustomerDetail from "$components/customer/customerDetail"
import MerchantApply from "$components/merchant/merchantApply"
import MoneyMrgIndex from "$components/merchant/index"
import Withdraw from '$components/moneyMrg/withdraw'
import Exchange from '$components/moneyMrg/exchange'
import Credit from '$components/moneyMrg/credit'
import Balance from '$components/moneyMrg/balance'
import BalanceBusiness from '$components/moneyMrg/balanceBusiness'
import ProvisionAccount from '$components/moneyMrg/provisionAccount'
import AuditList from "$components/task/auditList"
import DepositIndex from "$components/deposit"
import CardHolder from '$components/permission/cardHolder'
import ExchangeConf from '$components/configMrg/exchangeConf'
import PayeeConf from '$components/configMrg/payeeConf'
import Payment from '$components/moneyMrg/payment'
import ReturnComm from '$components/commission/returnComm'
import ConfigComm from '$components/commission/configComm'
import PaymentRateConf from '$components/configMrg/paymentRateConf'
import MccConfig from '$components/mcc/mccConfig'
import MccGroup from '$components/mcc/mccGroup'
import MccDefault from '$components/mcc/mccDefault'
import UserOptLog from '$components/permission/userlog'
import KYCList from '$components/kycManagement/list'
import AccountManager from '$components/accountManager/index';
import VccConf from '$components/configMrg/vccConf'  
import ProcessLog from '$components/sysOperation/processLog'
import Screen from '$components/risk/screen'
import BatchCardOpening from '$components/configMrg/batchCardOpening'
import './index.scss'

export function TabPages(props) {
    const { pageProps } = props;
    const { selectedMenu } = useAppContext();
    const { menuName } = selectedMenu || {};
    const Page = getPage(menuName);

    return (
        <div className="vcc-tab-page-content">
            <HashSync />
            <Choose>
                <When condition={!!Page}>
                    {/*存在多个menuName对应同一个组件，故要加个key*/}
                    <Page {...pageProps} title={menuName} key={menuName} menuInfo={selectedMenu} />
                </When>
                <Otherwise>
                    <Welcome />
                </Otherwise>
            </Choose>
        </div>
    )
}

/**
 * 根据menu title映射？！
 */
function getPage(menuName) {
    switch (menuName) {
        case 'customerDetail':
            return CustomerDetail;
        case '商户创建':
            return MerchantApply;
        case "我的审批":
        case "我的提交":
        case "待审批":
            return AuditList;
        case "商户查询":
            return MoneyMrgIndex;
        case "充值":
            return DepositIndex;
        case '提现':
            return Withdraw;
        case 'VCC授信充值':
            return Credit;
        case '换汇':
            return Exchange;
        case '备付金账户':
            return ProvisionAccount;
        case '内部账户':
            return BalanceBusiness;
        case '商户账户':
            return ProvisionAccount;
        case '账户余额':
        case '账务流水查询':
            return AccountManager;
        case '权限管理':
            return CardHolder;
        case '换汇配置':
            return ExchangeConf;
        case '奖励金查询':
            return ReturnComm;
        case '费用管理配置':
            return ConfigComm;
        case 'MCC管理':
            return MccConfig;
        case 'MCC组配置':
            return MccGroup;
        case '默认MCC组配置':
            return MccDefault;
        case '收款方管理':
            return PayeeConf;
        case '付款':
            return Payment;
        case '付款费率配置':
            return PaymentRateConf;
        case 'Auth手续费':
            return VccConf;
        case '用户操作日志':
            return UserOptLog; 
        case '卡操作日志':
            return ProcessLog;
        case '排黑审查':
            return Screen;
        case 'KYC管理':
            return KYCList;    
        case '批量开卡':
            return BatchCardOpening
    }
}