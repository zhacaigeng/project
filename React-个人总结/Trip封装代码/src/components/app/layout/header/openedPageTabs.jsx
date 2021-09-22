import { useState, useEffect } from 'react';
import useAppContext from '$src/context/appContext';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

OpenedPageTabs.defaultProps = {
    maxCount: 6
}

export default function OpenedPageTabs(props) {
    const { maxCount } = props;
    const [tabs, setTabs] = useState([]);
    const { selectedMenu, updateSelectedMenu } = useAppContext();
    const { menuKey } = selectedMenu || {};

    useEffect(() => {
        const { menuKey } = selectedMenu || {};
        if(!menuKey) {
            return;
        }
        if(!tabs.find(tab => tab.menuKey === menuKey)) {
            setTabs([...tabs, selectedMenu].slice(-maxCount));
        }
    }, [selectedMenu]);

    const onChange = menuKey => {   
        const currentMenu = tabs.find(tab => tab.menuKey === menuKey);
        updateSelectedMenu(currentMenu);
    }

    const onDel = targetKey => {
        const computedTabs = tabs.filter(tab => tab.menuKey !== targetKey);
        setTabs(computedTabs);
    }

    return (
        <div className="vcc-header__open-page-tabs">
            <Tabs
                hideAdd
                activeKey={menuKey}
                type="editable-card"
                onChange={onChange}
                onEdit={onDel}
            >
                <For each="menuData" of={tabs}>
                    <TabPane key={menuData.menuKey} tab={menuData.menuName} />
                </For>
            </Tabs>
        </div>
    )
}