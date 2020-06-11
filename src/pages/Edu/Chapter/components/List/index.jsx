import React, { Component } from "react";
import { Button, Tooltip, Alert, Table } from "antd";
import {
  PlusOutlined,
  FullscreenOutlined,
  SettingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

import './index.less'

export default class List extends Component {
    
  render() {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Age', dataIndex: 'age', key: 'age' },
        { title: 'Address', dataIndex: 'address', key: 'address' },
        {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: () => <a>Delete</a>,
        },
      ];
      const data = [
        {
          key: 1,
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
          description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
        },
        {
          key: 2,
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
          description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
        },
        {
          key: 3,
          name: 'Not Expandable',
          age: 29,
          address: 'Jiangsu No. 1 Lake Park',
          description: 'This not expandable',
        },
        {
          key: 4,
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
        },
      ];
    return (
      <div className="chapter-list">
        <div className="chapter-list-header">
          <h3>章节列表</h3>
          <div >
            <Button type="primary">
              <PlusOutlined />
              新增
            </Button>
            <Button type="danger">批量删除</Button>
            <Tooltip title="全屏">
              <FullscreenOutlined />
            </Tooltip>
            <Tooltip title="刷新">
              <ReloadOutlined />
            </Tooltip>
            <Tooltip title="设置">
              <SettingOutlined />
            </Tooltip>
          </div>
        </div>
        <Alert
            message="已选择 0 项"
            type="info"
            showIcon
          />
          <Table
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.description}</p>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
            dataSource={data}
          ></Table>
      </div>
    );
  }
}
