import React, { Component } from "react";
import { Button, Tooltip, Alert, Table } from "antd";
import {
  PlusOutlined,
  FullscreenOutlined,
  SettingOutlined,
  ReloadOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getLessonList } from "../../redux";

import "./index.less";

@withRouter
@connect(
  (state) => ({
    chapters: state.chapter.chapters,
  }),
  { getLessonList }
)
class List extends Component {
  state = {
    expandedRowKeys: [],
  };
  handleExpandedRowsChange = (expandedRowKeys) => {
    const length = expandedRowKeys.length;
    if (length > this.state.expandedRowKeys.length) {
      const lastKey = expandedRowKeys[length - 1];
      this.props.getLessonList(lastKey);
    }
    this.setState({
      expandedRowKeys,
    });
  };

  showAddLesson = (chapter) => {
    return () => {
      // 默认情况下不是路由组件，没有三大属性
      // 解决：需要三大属性 --> withRouter
      this.props.history.push("/edu/chapter/addlesson", chapter);
    };
  };

  render() {
    const { expandedRowKeys } = this.state;
    const { chapters } = this.props;
    // console.log(chapters);

    const columns = [
      { title: "名称", dataIndex: "title", key: "title" },
      { title: "是否免费", dataIndex: "free", key: "free" },
      {
        title: "操作",
        width: 280,
        dataIndex: "",
        key: "action",
        render: (data) => {
          return (
            <>
              {"free" in data ? null : (
                <Tooltip title="新增课时">
                  <Button
                    type="primary"
                    className="chapter-btn"
                    onClick={this.showAddLesson(data)}
                  >
                    <PlusOutlined />
                  </Button>
                </Tooltip>
              )}
              <Tooltip placement="top" title="更新">
                <Button
                  type="primary"
                  // className="subject-btn"
                  style={{ marginTop: "10px" }}
                  // onClick={this.showUpdateSubject(subject._id)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="删除">
                <Button
                  type="danger"
                  className="subject-btn"
                  // onClick={this.delSubject(subject)}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ];
    return (
      <div className="chapter-list">
        <div className="chapter-list-header">
          <h3>章节列表</h3>
          <div>
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
        <Alert message="已选择 0 项" type="info" showIcon />
        <Table
          className="chapter-list-table"
          columns={columns}
          expandable={{
            expandedRowKeys, // 展开的行

            // 展开的行变化时触发的回调函数
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          dataSource={chapters.items}
          rowKey="_id" //   key
          pagination={{
            // 分页器
            // current, // 当前页数
            // pageSize, // 每页条数
            total: chapters.total, // 总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            // onChange: this.getSubjectList, // 页码发生变化触发的回调
            // onShowSizeChange: this.getFirstPageSubjectList,
          }}
        ></Table>
      </div>
    );
  }
}
export default List;
