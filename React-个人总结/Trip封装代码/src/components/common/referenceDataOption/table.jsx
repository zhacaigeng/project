import React from 'react';
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, message, Checkbox, Descriptions  } from 'antd';
import {
    formatAmount,
    canFormatAmountRegExp
} from '$utils/utils'
export default class TableComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }
    componentDidMount() {
    }
    // 渲染
    render() {
        console.log(this.props)
        let props = {
            ...this.props
        }
        props.columns && props.columns.map(v=>{
            v.title && canFormatAmountRegExp.test(v.title) && (v.render = (txt, record)=> formatAmount(txt))
        })
        return  <Table {...props} /> 
    }
}
