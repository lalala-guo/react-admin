import React, { Component } from "react";

import { Button, Table } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import {reqGetSubjectList} from '@api/edu/subject'

import "./index.less";
export default class Subject extends Component {

  state = {
    subjects: {
      total: 0,
      items: [],
    },
  }

  componentDidMount(){
    this.getSubjectList(1, 10)
  }

  getSubjectList = async (page, limit) => {
    const result = await reqGetSubjectList(page, limit)
    // 更新数据
    this.setState({
      subjects: result
    })
  }
  changeSizeList = (current, size) => {

  }

  render() {
    const {subjects} = this.state
    
    const columns = [
      { 
        title: "分类名称",
        dataIndex: "title",
        key: "title" 
      },
      {
        title: "操作",
        width: 200,
        dataIndex: "",
        key: "action",
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
          dataSource={subjects.items}  // 决定每一行显示的数据
          rowKey="_id"   //   key
          pagination = {{
            total: subjects.total, // 总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: this.changeSizeList
          }}
        />
        ,
      </div>
    );
  }
}
