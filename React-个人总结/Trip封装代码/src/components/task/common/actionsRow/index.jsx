import React from 'react'
import { Row, Col } from 'antd'
import classNames from 'classnames'
import './index.scss'

ActionsRow.defaultProps = {
    gutter: 16,
    type: 'flex',
    justify: 'center'
}

export default function ActionsRow(props) {
    const { children, className, ...rest } = props;
    const rowClassName = classNames('vcc-actions-row', className)
    return (
        <Row className={rowClassName} {...rest}>
            {
                React.Children.map(children, (child, index) => {
                    return (
                        <Col key={child.key}>
                            {
                                child
                            }
                        </Col>
                    )
                })
            }
        </Row>
    )
}