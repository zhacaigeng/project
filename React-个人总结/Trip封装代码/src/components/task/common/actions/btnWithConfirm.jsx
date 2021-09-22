import { useState } from 'react'
import { Popconfirm, Button } from 'antd'

BtnWithConfirm.defaultProps = {
    confirmTitle: '确定要执行该操作吗？',
    skipConfirm: false
}

export default function BtnWithConfirm(props) {
    const {         
        skipConfirm,
        confirmTitle, 
        confirmDisabled, 
        confirmCancelText,
        confirmOkText,
        confirmOkType,
        confirmOnCancel,
        confirmIcon,
        onClick, 
        ...rest 
    } = props;
    const [loading, setLoaing] = useState();

    async function handleClick(evt) {
        try {
            setLoaing(true);
            await onClick && onClick(evt);
        } finally {
            setLoaing(false);
        }
    }

    return skipConfirm 
        ? <Button loading={loading} {...rest} onClick={onClick} />
        : (
            <Popconfirm
                title={confirmTitle}
                onConfirm={handleClick}
                disabled={confirmDisabled}
                cancelText={confirmCancelText}
                okText={confirmOkText}
                okType={confirmOkType}
                onCancel={confirmOnCancel}
                icon={confirmIcon}
                >
                <Button loading={loading} {...rest} />
            </Popconfirm>
        )
}