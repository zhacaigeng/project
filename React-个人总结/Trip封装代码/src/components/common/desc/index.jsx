import React from 'react';
import { Descriptions  } from 'antd';
import { formatAmount, canFormatAmountRegExp } from '$utils/utils'
export default class Desc extends React.Component {
    // 渲染
    render() {
        const {
            title='',
            options=[],
            data={},
            otherDescItem
        } = this.props
        return <Descriptions title={title} style={{ textAlign: 'left', }} >
        {
            options.map((v, i)=><Descriptions.Item label={v.label||''} key={i} span={v.span||1}>
                {
                    (
                        v.initialValue ?
                        v.initialValue:
                        v.options? 
                        (v.options.find(v_child=>v_child.value == data[v.key])||{}).label||'':
                        v.label && canFormatAmountRegExp.test(v.label) ?
                        formatAmount(data[v.key] ||''):
                        data[v.key] ||''
                    ) + (v.add||'')
                }
                </Descriptions.Item>)
        }
        {
            otherDescItem && otherDescItem
        }
    </Descriptions>
    }
}
