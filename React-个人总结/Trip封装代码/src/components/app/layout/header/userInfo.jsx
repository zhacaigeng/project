import getEnvByHost from '@ctrip/nfes-util/lib/getEnvByHost'
import { Menu, Icon, Dropdown } from 'antd';
import useAppContext from '$src/context/appContext';

export default function UserInfoMenu() {
    const { userName } = useAppContext();
    const userMenu = (
        <Menu>
            <Menu.Item onClick={logout}>
                <Icon type="logout" />
                <span>退出登录</span>
            </Menu.Item>
        </Menu>
    )

    return (
        <Dropdown overlay={userMenu} placement="bottomRight"> 
            <span className="vcc-header__user">
                <Icon type="user" className="vcc-header__avatar"/>
                <span>{userName}</span>
            </span>
        </Dropdown> 
    )
}

/**
 * [Offline 退出接入](http://conf.ctripcorp.com/pages/viewpage.action?pageId=141298272)
 */
function logout() {
    let logoutUrl;
    switch(getEnvByHost()) {
        case 'fat':
            logoutUrl = 'https://offlineplatform.fat466.qa.nt.ctripcorp.com/offlinelogin/logout';
            break;
        case 'uat':
        case 'uatqa':
            logoutUrl = 'https://offlineplatform.uat.qa.nt.ctripcorp.com/offlinelogin/logout';
            break;
        default:
            logoutUrl = 'https://offlineplatform.ctripcorp.com/offlinelogin/logout';
    }
    window.location = `${logoutUrl}?backurl=${encodeURIComponent(window.location.href)}`
}