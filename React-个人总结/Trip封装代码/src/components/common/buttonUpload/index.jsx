import React from 'react';
import { Button } from 'antd';
import urlConfig from '$config/url';

export default class ButtonUpload extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
    }

    // 渲染
    render() {
        const {downApi, params, txt} = this.props;
        return <Button type='primary' onClick={()=>window.open(urlConfig.cppapi + downApi)}>{txt||'下载'}</Button>
    }
}
