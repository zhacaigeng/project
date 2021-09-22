import React from "react";
import App, { Container } from "@ctrip/nfes/next/app";
import Head from "@ctrip/nfes-next/head";
import { ConfigProvider, message } from 'antd';
import { AppContextProvider } from '$src/context/appContext'
import { TabPages, Initing, TriplinkLayout } from '$components/app'
import { userSigIn } from '$api/commonApi'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import '$src/style/index.scss'

export default class TripLinkApp extends App {

    constructor(props) {
        super(props);
        this.state = {            
            didInitialize: false,
            initializeError: false,
            userName: '',
            menuList: void 0,
            selectedMenu: void 0,
            defaultOpenMenuKey: void 0
        }
    }

    static async getInitialProps({ Component, ctx, renderPage }) {
        let pageProps;
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        return {
            pageProps
        }
    }

    async componentDidMount() {
        //获取菜单
        const state = await getMenuInfo();
        this.setState(state);
    }

    handleUpdateSelectedMenu = (selectedMenu) => {
        this.setState({ selectedMenu });
    }

    render() {
        const { pageProps = {} } = this.props;        
        const { didInitialize, initializeError } = this.state;
        const appContextValue = {
            ...this.state, 
            updateSelectedMenu: this.handleUpdateSelectedMenu
        }

        return (
            <ConfigProvider locale={zh_CN}>
                <Container>
                    <Head>
                        <title>TripLink运营管理平台</title>
                    </Head>
                    <AppContextProvider value={appContextValue}>                       
                        <Choose>                            
                            <When condition={didInitialize && !initializeError}>
                                <TriplinkLayout> 
                                    <TabPages {...pageProps}/>
                                </TriplinkLayout>
                            </When>
                            <Otherwise>                                
                                <Initing error={initializeError}/>
                            </Otherwise>
                        </Choose>
                    </AppContextProvider>                    
                </Container>
            </ConfigProvider>
        )
    }
}

async function getMenuInfo() {
    let menuInfo, userName, initializeError;
    try {
        const { result } = await userSigIn();                         
        userName = result.userName;
        menuInfo = parseMenuInfo(result.menuInfo);
    } catch(e) {
        console.error(e);
        initializeError = true;
    } finally {
        return Object.assign({
            userName,
            initializeError,
            didInitialize: true
        }, menuInfo);
    }
}

function parseMenuInfo(menuInfo) {
    const initialMenuKey = decodeURIComponent(window.location.hash.replace(/^#/, ''));    
    let selectedMenu, defaultOpenMenuKey;
    const menuList = (menuInfo || []).map(menu => parseMenuItem(menu));
    return {
        menuList,
        selectedMenu,
        defaultOpenMenuKey
    }

    function parseMenuItem(menu, parentMenuKey = '') {
        if(!menu) {
            return;
        }
        const { icon, menuId, menuName, subMenu, buttons } = menu;
        const parsedMenu = {
            icon,
            menuId,
            menuName,
            menuKey: `${parentMenuKey}${menuId || menuName}`, //父菜单无menuId
            children: subMenu && subMenu.map(menu => parseMenuItem(menu, menuName)),
            buttons // Btn级别是权限控制
        }
        if(parsedMenu.menuKey === initialMenuKey) {
            selectedMenu = parsedMenu;
            defaultOpenMenuKey = parentMenuKey;
        }
        return parsedMenu;
    }
}