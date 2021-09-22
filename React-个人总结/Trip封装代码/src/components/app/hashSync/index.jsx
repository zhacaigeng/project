import { useEffect } from 'react'
import useAppContext from '$src/context/appContext'

export default function HashSync() {
    const { 
        menuList, 
        selectedMenu, 
        updateSelectedMenu 
    } = useAppContext();
    const { menuKey } = selectedMenu || {};
    
    // 更新Hash
    useEffect(() => {
        if(!!menuKey) {
            window.location.href = `#${menuKey}`
        }        
    }, [menuKey])

    return null;
}