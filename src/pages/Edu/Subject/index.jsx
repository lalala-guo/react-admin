import React, { Component } from "react";

import { Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";
export default class Subject extends Component {
  render() {
    const columns = [
      { title: "分类名称", dataIndex: "name", key: "name" },
      {
        title: "操作",
        width: 200,
        dataIndex: "",
        key: "x",
        render: () => (
          <>
            <Button type="primary" className="subject-btn">
              <EditOutlined />
            </Button>
            <Button type="danger" className="subject-btn">
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];

    const data = [
      {
        key: 1,
        name: "John Brown",
        age: 32,
        address: "New York No. 1 Lake Park",
        description:
          "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
      },
      {
        key: 2,
        name: "Jim Green",
        age: 42,
        address: "London No. 1 Lake Park",
        description:
          "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
      },
      {
        key: 3,
        name: "Not Expandable",
        age: 29,
        address: "Jiangsu No. 1 Lake Park",
        description: "This not expandable",
      },
      {
        key: 4,
        name: "Joe Black",
        age: 32,
        address: "Sidney No. 1 Lake Park",
        description:
          "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
      },
    ];
    return (
      <div className="subject">
        <Button type="primary" className="subject-btn">
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={data}
        />
        ,
      </div>
    );
  }
}
