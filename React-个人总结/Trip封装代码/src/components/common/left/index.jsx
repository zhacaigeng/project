import { Component } from 'react';
import { inject, observer } from "mobx-react";

import { Layout, Menu, Icon, Tabs, Avatar } from 'antd';

import './index.scss';
const { Sider } = Layout;
const { SubMenu } = Menu;
import getConfig from '@ctrip/nfes/next/config'
import MenuItem from 'antd/lib/menu/MenuItem';

const { publicRuntimeConfig } = getConfig()


function getMenuInfo(props) {
  const { menus } = props;
  let menuCode = "";
  let subMenuCode = "";
  let menuList = [];
  let subMenuList = [];

  if (menus && Array.isArray(menus)) {
    menuList = menus;

    if (menuCode) {
      const curMenus = menus.find((item) => { return item.menuCode === menuCode });
      if (curMenus) {
        subMenuList = curMenus.children || [];
      }
    }
  }
  return {
    menuCode,
    subMenuCode,
    menuList,
    subMenuList
  }
}


@inject('menuPanelStore')
@observer
export default class LeftLayout extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleClick = (e, v) => {
    const { menuPanelStore } = this.props;
    menuPanelStore.setCurrentMenuKeyData({ menuKey: e.key, menuTitle: v.menuTitle, buttons: JSON.stringify(v.buttons||[]), menuUrl: v.menuUrl });
  };


  static getDerivedStateFromProps(props, state) {
    const { pageProps } = props;
    const { menuCode, menuList } = state;

    // 初始设置state
    if (!menuCode || !menuList) {
      const { menuList, subMenuList, menuCode, subMenuCode } = getMenuInfo(pageProps);
      return { menuList, subMenuList, menuCode, subMenuCode }
    }
    // 更新state
    if (menuCode && Array.isArray(menuList)) {
      const curMenu = menuList.find(function (item) { return item.menuCode === menuCode });
      return { subMenuList: curMenu.children || [] }
    }
  }

  render() {
    const { menuList, subMenuList, menuCode, subMenuCode } = this.state;
    const { menuPanelStore = {}, pageProps } = this.props;
    const { currentMenuKeyData, menuDataList } = menuPanelStore;
    const { menuKey } = currentMenuKeyData;
    const { userName } = pageProps || {}
    console.log("------" + menuKey);
    return (
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{overflow: 'auto'}}>
        <div>
          {/* <div className="logo" style={{ color: '#fff' }}>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <label>ada</label>
            <div>
              <label style={{ paddingleft: 0 }}>在线</label>&nbsp;&nbsp;&nbsp;
              <label style={{ paddingleft: 0 }}>注销</label>
            </div>
          </div> */}
          {/* selectedKeys={[menuKey === undefined ? null : menuKey]} */}
          <Menu mode="inline" theme="dark" selectedKeys={[menuKey === undefined ? null : menuKey]} >
            {menuList.map((v, i)=> {
              return v.children ? <SubMenu key={v.id||i} title={<span>
                <Icon type="mail" /> <span>{v.menuTitle}</span></span>}>{
                  v.children.map((v2, i2)=> {
                    return <MenuItem onClick={(e) => { this.handleClick(e, v2) }} key={v2.id||i + 'ch' + i2} >
                      <span>
                        <Icon type={ v2.icon|| 'appstore'} />
                        <span>{v2.menuTitle}</span>
                      </span>
                    </MenuItem>
                  })
                }

              </SubMenu> : <MenuItem onClick={(e) => { this.handleClick(e, v) }} key={v.id||i} >
                  <span>
                    <Icon type="mail" /> <span>{v.menuTitle}</span></span>
                </MenuItem>
            })}
          </Menu>
        </div>
      </Sider>
    )
  }
}
