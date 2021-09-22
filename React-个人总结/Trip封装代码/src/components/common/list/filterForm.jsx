import React from 'react'
import { Row, Col } from 'antd'
import Form from '$components/form'
import { SearchBtn, ResetFormBtn } from '$components/common/actionBtns'
import { useListContext } from '$components/common/list'
import classNames from 'classnames'
import './filterForm.scss'

/**
 * List的搜索表单，需要配置List使用
 */
export const FilterForm = React.forwardRef(function FilterForm(props, ref) {    
    const { 
        className,
        initialValues, 
        wrapperCol,
        labelCol,
        colCount, 
        resetBtn, 
        submitBtn, 
        children,
        extraAction,
        actionsColScale
    } = props;
    const childrenArray = React.Children.toArray(children);
    const lastFieldIndex = childrenArray.length;
    const fieldCount = lastFieldIndex + 1; // +1是为了放置操作按钮
    const rowCount = Math.ceil(fieldCount / colCount); 
    const colSpan = Math.floor(24 / colCount);
    const listContext = useListContext();
    
    function handleSubmit(values) {        
        listContext.reloadData(values);
    }

    return (
        <div className={classNames('vcc-search-param', className)}>
            <Form
                ref={ref}
                initialValues={initialValues}
                onSubmit={handleSubmit}   
                labelCol={labelCol}
                wrapperCol={wrapperCol}
                >
                {
                    Array.from({ length: rowCount}).map((_, index) => {
                        const currColCount = Math.min(colCount, fieldCount - index * colCount);
                        return (
                            <Row 
                                key={index} 
                                type="flex" 
                                justify="end" 
                                align="bottom" 
                                gutter={16} 
                                className="vcc-search-param__row"
                                >
                                {
                                    Array.from({ length: currColCount }).map((_, colIndex) => {
                                        const childIndex = index * colCount + colIndex;
                                        const isLastField = childIndex === lastFieldIndex;
                                        const span = isLastField 
                                            ? currColCount === 1
                                                ? 24
                                                : !actionsColScale
                                                ? void 0 
                                                : colSpan
                                            : colSpan;
                                        const colClassName = classNames({
                                           'vcc-search-param__col': true,
                                           'vcc-search-param__col--actions': isLastField,
                                        })
                                        return (
                                            <Col 
                                                key={colIndex} 
                                                span={span}
                                                className={colClassName}>
                                                <Choose>
                                                    <When condition={isLastField}>
                                                        <Actions children={[resetBtn, submitBtn, extraAction]} />                    
                                                    </When>
                                                    <Otherwise>
                                                       {
                                                           childrenArray[childIndex]
                                                       }
                                                    </Otherwise>
                                                </Choose>
                                            </Col>
                                       )
                                   })
                                }
                            </Row>
                        )
                    })
                }
            </Form>
        </div>        
    )
});

FilterForm.defaultProps = {
    resetBtn: <ResetFormBtn />,
    submitBtn: <SearchBtn />,
    labelCol: {},
    wrapperCol: {},
    colCount: 3,
    actionsColScale: true // 操作按钮那列是否缩放
}

function Actions({ children }) {    
    return (
        <Row type="flex" justify="end" gutter={16}>
            {
                React.Children.map(children, (child, index) => (
                    <If key={index} condition={child}>
                        <Col>{child}</Col>
                    </If>                
                ))
            }
        </Row>
    )
}