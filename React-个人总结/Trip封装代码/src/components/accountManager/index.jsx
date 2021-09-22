import React  from "react";
import BasePage from '$pages/BasePage'
import Balance from './balance'
import BalanceFlow  from './balanceFlow'
import {getSubjectList} from '$api/accountManager'
import { Result } from "antd";
export default class AccountManager extends BasePage{
    getView = (title) => {
         switch (title) {
            case '账户余额':
                return <Balance />
            case '账务流水查询':
                return <BalanceFlow  />  
            default: 
                return <div>555</div>                  
            
        }
    }
    render(){
        return <>
            {
                this.getView(this.props.title||'')
            }
        </>
        
    }
}