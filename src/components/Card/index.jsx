import React from 'react'

import { Divider } from 'antd';
import {QuestionCircleOutlined} from "@ant-design/icons"


import "./index.less"
export default function Card({title, number, content, footer}) {
  return (
    <div className="card">
        <div className="card-header">
        {title}
        <QuestionCircleOutlined />
        </div>
        <div className="card-number">{number}</div>
        <div className="card-content">{content}</div>
        <Divider className="divaider" />
        <div className="card-footer">{footer}</div>
    </div>
  )
}
