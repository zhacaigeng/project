import { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Icon } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import useAppContext from '$src/context/appContext';
import './index.scss';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function LeftLayout() {
	const [collapsed, setCollapsed] = useState();
	
	return (
		<Sider 
			collapsible
			collapsed={collapsed}
			onCollapse={setCollapsed}
			>
			<div className="title">
				{
					collapsed ? 'T' : 'TripLink'
				}
			</div>
			<TripLinkMenu />			
		</Sider>
	)
}

function TripLinkMenu() {		
	const { 
		menuList, 
		selectedMenu, 
		defaultOpenMenuKey, 
		updateSelectedMenu 
	} = useAppContext();
	const defaultOpenMenuKeyRef = useRef();
	const [openKeys, setOpenKeys] = useState();	
	const { menuKey } = selectedMenu || {};
	if(defaultOpenMenuKeyRef.current !== defaultOpenMenuKey) {
		defaultOpenMenuKeyRef.current = defaultOpenMenuKey;
		setOpenKeys([defaultOpenMenuKey])
	}

	function handleOpenChange(openKeys) {		
		setOpenKeys(openKeys);
	}

	return (
		<Menu 
			mode="inline" 
			theme="dark" 
			openKeys={openKeys} 
			selectedKeys={[menuKey]}
			onOpenChange={handleOpenChange}
			>
			<For each="menu" of={menuList || []}>
				<Choose>
					<When condition={menu.children && menu.children.length}>
						<SubMenu
							key={menu.menuKey} 
							title={<span><Icon type="mail" /><span>{menu.menuName}</span></span>}
						>
							<For each="subMenu" of={menu.children}>
								<MenuItem key={subMenu.menuKey} onClick={() => updateSelectedMenu(subMenu)}>
									<MenuItemTitle 
										title={subMenu.menuName}
										iconType={subMenu.icon || 'appstore'} />
								</MenuItem>
							</For>
						</SubMenu>
					</When>
					<Otherwise>
						<MenuItem key={menu.menuKey} onClick={() => updateSelectedMenu(menu)}>
							<MenuItemTitle title={menu.menuName} iconType={menu.icon} />
						</MenuItem>
					</Otherwise>
				</Choose>
			</For>
		</Menu>
	)
}

function MenuItemTitle({ title, iconType = 'mail' }) {
	return (
		<span>
			<Icon type={iconType} />
			<span>{title}</span>
		</span>
	)
}
