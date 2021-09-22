import { useState } from 'react';
import { Drawer, Button, Descriptions } from 'antd';
import ReqBeauty from './reqBeauyify';

export default function LogDetail(props) {
    const { 
        loginName, 
        source,
        customerId,
        sessionId,
        reqIp,
        url,
        optType,
        operateTime,        
        agent, 
        req,
        res
    } = props;
    const [drawerVisible, setDrawerVisibale] = useState();

    return (
        <>
            <Drawer
                width={812}
                className="vcc-uselog-detail"
                title="操作日志详情"
                visible={drawerVisible}
                onClose={() => setDrawerVisibale(false)}
            >
                <Descriptions size="middle" column={1} bordered >
                    <Descriptions.Item label="登录名">{loginName}</Descriptions.Item>
                    <Descriptions.Item label="来源">{source}</Descriptions.Item>
                    <Descriptions.Item label="客户Id">{customerId}</Descriptions.Item>                     
                    <Descriptions.Item label="SessionId">{sessionId}</Descriptions.Item>
                    <Descriptions.Item label="IP">{reqIp}</Descriptions.Item>                    
                    <Descriptions.Item label="接口名称">{optType}</Descriptions.Item>                  
                    <Descriptions.Item label="请求时间">{operateTime}</Descriptions.Item>     
                    <Descriptions.Item label="请求Url">{url}</Descriptions.Item>                             
                    <Descriptions.Item label="请求参数">
                        <ReqBeauty req={req} />
                    </Descriptions.Item>
                    <Descriptions.Item label="返回值">{res}</Descriptions.Item>
                </Descriptions>
            </Drawer>
            <Button type="link" onClick={() => setDrawerVisibale(true)}>查看详情</Button>
        </>
    )
}

