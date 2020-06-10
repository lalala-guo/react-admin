import React, { Component } from "react";

import { Button, Table, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux"
import { getSubjectList } from "./redux/actions";
import "./index.less";

@connect(
  (state) => ({
    subjectList: state.subjectList,
  }),
  { getSubjectList }
)
class Subject extends Component {
  componentDidMount() {
    this.props.getSubjectList(1, 10);
  }

  render() {
    const { subjectList, getSubjectList } = this.props;

    const columns = [
      {
        title: "分类名称",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "操作",
        width: 200,
        dataIndex: "",
        key: "action",
        render: () => (
          <>
            <Tooltip placement="top" title="更新课程分类">
              <Button
                type="primary"
                className="subject-btn"
                style={{ marginTop: "10px" }}
              >
                <EditOutlined />
              </Button>
            </Tooltip>
            <Tooltip placement="top" title="删除课程分类">
              <Button type="danger" className="subject-btn">
                <DeleteOutlined />
              </Button>
            </Tooltip>
          </>
        ),
      },
    ];

    return (
      <div className="subject">
        <Button
          type="primary"
          className="subject-btn"
          style={{ marginBottom: "20px" }}
        >
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
          dataSource={subjectList.items} // 决定每一行显示的数据
          rowKey="_id" //   key
          pagination={{
            total: subjectList.total, // 总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: getSubjectList,
          }}
        />
        ,
      </div>
    );
  }
}
export default Subject;
