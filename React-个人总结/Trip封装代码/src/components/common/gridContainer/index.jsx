import React from 'react'
import { Row, Col } from 'antd'

/**
 * 多列的均分布局，可以用于表单多列字段
 * @param {*} props 
 * @returns 
 */
const GridContainer = React.memo(function GridContainer(props) {
    const { colCount, children } = props;
    const childrenArray = React.Children.toArray(children);
    const childCount = childrenArray.length;
    const colSpan = Math.floor(24 / colCount);
    const rowCount = Math.ceil( childCount / colCount);

    return Array.from({ length: rowCount }).map((_, rowIndex) => {
        const renderedCount = rowIndex * colCount;
        const currentColCount = Math.min(colCount, childCount - renderedCount);
        return (
            <Row key={rowIndex}>
                {
                    Array.from({ length: currentColCount }).map((_, colIndex) => {
                        const childIndex = renderedCount + colIndex;
                        return (
                            <Col key={colIndex} span={colSpan}>
                                {
                                    childrenArray[childIndex]
                                }
                            </Col>
                        )
                    })
                }
            </Row>
        )
    })
})

GridContainer.defaultProps = {
    colCount: 2
}

export default GridContainer;