import { Spin, Button } from 'antd';
import './index.scss'

export function Initing({ error }) {

    function handleRefresh() {
        window.location.reload();
    }

    return (
        <div className="vcc-app-loading">
            <Choose>
                <When condition={error}>
                    <div className="vcc-app-loading__error">
                        <img src="//pic.c-ctrip.com/platform/h5/component/empty-state/empty-error.png" />
                        <p className="vcc-app-loading__error-tip">系统异常，赶紧找开发小哥哥排查</p>
                        <Button onClick={handleRefresh}>刷新试试</Button>
                    </div>
                </When>
                <Otherwise>
                    <Spin size="large" />
                </Otherwise>
            </Choose>
        </div>
    )
}