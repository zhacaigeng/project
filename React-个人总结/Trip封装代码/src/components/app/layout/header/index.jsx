import { Layout, Menu, Icon, Dropdown, Button } from 'antd';
import OpenedPageTabs from './openedPageTabs'
import UserInfo from './userInfo'
import './index.scss';

export default function HeaderComponents(props) {      
    return (
        <Layout.Header className="vcc-header">
            <div className="vcc-header__item vcc-header__item-page-tabs">
                <OpenedPageTabs />
            </div>
            <div className="vcc-header__item">
                <UserInfo />            
            </div>
        </Layout.Header>
    )
}