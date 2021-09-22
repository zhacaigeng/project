import React from 'react';
import { Form, Row, Col, Icon, Input, Button, Radio, Select, DatePicker, Table, message, Checkbox, Descriptions  } from 'antd';
import moment from 'moment'
const { MonthPicker, RangePicker, WeekPicker } = DatePicker
let timer;
class FormComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

    }
    componentDidMount() {
    }
    handleValidator=(rule, val, callback, v )=>{
        timer && window.clearTimeout(timer);
        if(v.pattern && !v.pattern.test(val) ){
            timer = setTimeout(() => {
                // 判断正则
                callback( ('请输入正确的'+ v.title) );
                
            }, 1000);
        }else if(v.minLength && val.length < v.minLength ){
            // 判断最小长度
            timer = setTimeout(() => {
                // 判断正则
                callback(v.title + '的长度为' + v.minLength )
                
            }, 1000);
            
        }else{
            callback()
        }
    }
    handleSubmit = (e) => {
        const {columns} = this.props;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            // 必填项校验通过了
            if (!err) {
                // 第三方布尔值
                let bool = true, 
                    geaterList = ['amount', 'startAmount', 'endAmount'], 
                    newVal = values ;
                // 最低金额为0的问题
                geaterList.map(key=>{
                    if(values[key] && (values[key] <= 0) ){
                        bool = false;
                        const label = columns.filter(v=>v['key'] == key)[0] && columns.filter(v=>v['key'] == key)[0]['label'] || ''
                        return message.error( label + '须大于0')
                    }
                })
                if(bool) {
                    for (let key in newVal) {
                        newVal[key] = newVal[key] == undefined ? '': newVal[key]
                        // 分割rangepicker
                        if(key.includes('rangepicker')){
                            const obj =  columns.filter(v=>v.key == key)[0];
                            const keys = obj['keys'];
                            const format = obj['format']||'YYYY-MM-DD';
                            newVal[keys[0]] = newVal[key] && newVal[key][0]? moment(newVal[key][0]).format(format) : '';
                            newVal[keys[1]] = newVal[key] && newVal[key][1]? moment(newVal[key][1]).format(format) : '';
                            delete(newVal[key])
                        }
                        // 月份格式化问题
                        if(this.props.columns.find(v => key == v.key && v.type == 'MonthPicker') && newVal[key]){
                            newVal[key] = moment(newVal[key]).format('YYYY-MM')
                        }
                        
                    }
                    this.props.sucCB && this.props.sucCB(newVal)
                    
                }
                
            }
        });
    }
    // 清空
    handleReset = () => this.props.form.resetFields()
    // 渲染
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            columns=[], 
            layout={}, 
            submitTitle, 
            clearTitle, 
            style={}, 
            anotherButtonText='', 
            ColSpan = 8, 
            record={}, 
            handleReset, 
            handleSubmit, 
            otherButton, 
            radioCB = e=>{}, 
            inputCB =e=>{}, 
            okTxt, 
            monthPickerCB = e => e 
        } = this.props;
        
        const tailLayout = {
            wrapperCol: { offset: 2, span: 16 },
        };
        return <div className='FormCompParent' style={{
            minHeight: '1px',
            ...style,
        }}>
            <Form
            {...layout}
            onSubmit={this.handleSubmit}
        >
            {/* 后面单独封装表单类型 日期选择框，日历选择框，下拉选择 输入 单选 多选 大活 */}
            {
                columns.map((v, i)=>{
                    return v.label != '操作' &&  <Col span={ColSpan} key={i}>
                        {

                        
                        v.type == 'Descriptions'?
                        <Descriptions title={v.title||''} style={{ textAlign: 'left', }} ></Descriptions>:
                        <Form.Item label={v.label||v.title||""}>
                        {getFieldDecorator(v.key, {
                            rules: [
                                { required: v.required||false, message: '必填项'},
                                ...(v.minLength|| v.pattern) ? [
                                    {
                                        validator:(rule, val, callback)=>this.handleValidator(rule, val, callback, v)
                                    }
                                ]:[]
                            ],
                            initialValue: 
                            v.type == 'checkbox'? 
                            (record[v.key] || []): 
                            v.valueType == 'bool'? 
                            (record[v.key]||false): 
                            v.manyMode ?
                            (record[v.key]||[]):
                            (record[v.key]||v.initialValue|| '')
                        })(
                            v.type == 'checkbox' ? 
                            <Checkbox.Group
                                options={v.options}
                            /> :
                            v.type == 'radio'?
                            <Radio.Group onChange={e=>radioCB(e.target.value, v.key)} disabled={v.disabled||false}>
                                {
                                    v.options && v.options.map((v_child, i_child)=><Radio value={v_child.constructor == Object && String(v_child.value)||v_child||''} key={i_child} >{v_child.label||v_child||''}</Radio>)
                                }
                            </Radio.Group>:
                            v.type == 'rangepicker'?
                            <RangePicker
                                // disabledDate={disabledDate}
                                // disabledTime={disabledRangeTime}
                                showTime={
                                    v.showTime ? {
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                    }:{}
                                }
                                format={v.format || "YYYY-MM-DD"}
                            />:
                            v.type == 'dateSelect'?
                            <DatePicker />:
                            v.type == 'select'?
                            <Select
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) >= 0}
                            
                            disabled={v.disabled||false}
                                onChange={e=>this.props.selectCB && this.props.selectCB(e, v.key)}
                                mode={v.manyMode===true?"multiple":null}
                            >{
                                v.options && 
                                v.options.map((v_son, i_son)=><Select.Option
                                    value={v.valueKey && v_son[v.valueKey] || v_son.constructor == Object && String(v_son.value) || String(v_son)} 
                                    key={i_son}
                                    >
                                    {v_son.constructor == String && String(v_son) || v.labelKey && v_son[v.labelKey] ||  v_son.label||''}
                                </Select.Option>)
                            }
                          </Select>:
                          v.type == 'MonthPicker'?
                          <MonthPicker format={'YYYY/MM'} onChange={e=>monthPickerCB(moment(e).format('YYYY/MM'), v.key)} />
                          :
                            <Input
                            onChange={e=>inputCB(e.target.value, v.key)}
                            addonAfter={v.addonAfter||''}
                            disabled={v.disabled||false}
                            placeholder="请输入"
                            maxLength = {v.maxLength||255}
                            />,
                        )}
                        </Form.Item>
                        }
                    </Col> 
                })
            }
            <Col span={ColSpan} style={{
                // textAlign: 'center'
            }} >
                {
                    this.props.children || 
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">{okTxt||'查询'}</Button>
                        &nbsp;&nbsp;
                        {
                            handleReset||<Button type="primary" onClick={this.handleReset}>重置</Button>
                        }
                        &nbsp;&nbsp;&nbsp;
                        {
                            anotherButtonText && <Button type="primary" onClick={this.props.anotherButtonFun|| (()=>{}) }>{anotherButtonText}</Button>
                        }
                        {
                            otherButton && otherButton
                        }
                    </Form.Item>
                }
            </Col>
            
        </Form>
        </div>
    }
}
// 为了继承getFieldDecorator
const FormCompView = Form.create({ name: 'formComp' })(FormComp);
export default FormCompView