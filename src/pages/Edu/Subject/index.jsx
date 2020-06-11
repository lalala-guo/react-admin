import React, { Component } from "react";

import { Button, Table, Tooltip, Input, message, Modal } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  FormOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import {
  getSubjectList,
  getSubsubjectList,
  updateSubject,
} from "./redux/actions";
import { reqDelSubject } from "@api/edu/subject";
import "./index.less";

const { confirm } = Modal;

@connect(
  (state) => ({
    subjectList: state.subjectList,
  }),
  { getSubjectList, getSubsubjectList, updateSubject }
)
class Subject extends Component {
  state = {
    // 初始化数据  展开项
    expandedRowKeys: [],
    subjectId: "", // 要更新商品分类id
    updateSubjectTitle: "", //  正在更新分类的标题
    subjectTitle: "", // 要更新商品分类标题
    current: 1, // 当前页数
    pageSize: 10, // 每页条数
  };
  componentDidMount() {
    this.getSubjectList(1, 10);
  }
  //
  handleExpandedRowsChange = (expandedRowKeys) => {
    // console.log("handleExpandedRowsChange", expandedRowKeys);

    // 长度
    const length = expandedRowKeys.length;

    // 如果最新长度大于之前的长度，说明就是展开~
    if (length > this.state.expandedRowKeys.length) {
      // 点击要展开的最后一项值~
      const lastKey = expandedRowKeys[length - 1];
      // 发送请求，请求要展开菜单的二级菜单数据
      this.props.getSubsubjectList(lastKey);
    }

    // 更新state --> 告诉Table哪个子菜单需要展开
    this.setState({
      expandedRowKeys,
    });
  };

  // // 点击展开一级菜单
  // handleExpand = (expanded, record) => {
  //   // 请求一级菜单对应二级菜单数据
  //   this.props.getSubsubjectList(record._id);

  // };

  // 删除成功后  要显示当前页  不能默认回到第一页 所以要定义一个函数 保存当前的page 和limit
  getSubjectList = (page, limit) => {
    this.setState({
      current: page,
      pageSize: limit,
    });
    return this.props.getSubjectList(page, limit);
  };

  getFirstPageSubjectList = (page, limit) => {
    this.getSubjectList(1, limit);
  };

  // 跳转添加页面
  showAddSubject = () => {
    this.props.history.push("/edu/subject/add");
  };

  // 点击 更新按钮 更改数据
  showUpdateSubject = (subject) => {
    // 更新 state 数据
    return () => {
      // 如果添加的 有subjectId 说明有未更新的数据  提示
      if (this.state.subjectId) {
        message.warning("请更新当前课程分类")
      }
      this.setState({
        subjectId: subject._id,
        subjectTitle: subject.title,
      });
    };
  };

  // 收集数据 更新state
  handleInputChange = (e) => {
    const value = e.target.value.trim();
    this.setState({
      updateSubjectTitle: value,
    });
  };

  // 确认 更新课程分类
  updateSubject = async () => {
    const { subjectId, updateSubjectTitle, subjectTitle } = this.state;
    if (!updateSubjectTitle) {
      message.warning("数据不能为空");
      return;
    }
    if (updateSubjectTitle === subjectTitle) {
      message.warn("输入更新课程分类标题不能与之前一样~");
      return;
    }
    // 发送异步请求
    await this.props.updateSubject(updateSubjectTitle, subjectId);
    // 成功 提示
    message.success("更新成功");
    // 调用cancel函数 返回
    this.cancel();
  };

  // 取消 更新
  cancel = () => {
    this.setState({
      subjectId: "",
      updateSubjectTitle: "",
    });
  };

  // 删除数据
  delSubject = (subject) => {
    return () => {
      confirm({
        title: (
          <p>
            你确定要删除 <span className="subject-del">{subject.title}</span>{" "}
            课程分类吗?
          </p>
        ),
        icon: <ExclamationCircleOutlined />,
        // content: 'Some descriptions',
        onOk: async () => {
          //  确认 发送请求 删除数据
          await reqDelSubject(subject._id);
          // 提示
          message.success("删除成功");

          const { current, pageSize } = this.state;

          // 删除成功后  要显示当前页  不能默认回到第一页
          // 当此时不是第一页 并且此页只有一条数据时, 回到上一页  但当删除的是最后一条数据的子数据时不应该跳转到上一页
          if (
            current > 1 &&
            this.props.subjectList.items.length === 1 &&
            subject.parentId === "0"
          ) {
            this.getSubjectList(current - 1, pageSize);
            return;
          }
          // 重新获取数据
          this.getSubjectList(current, pageSize);
        },
        onCancel() {
          // console.log('Cancel');
        },
      });
    };
  };

  render() {
    const { subjectList } = this.props;
    const { expandedRowKeys, current, pageSize } = this.state;
    const columns = [
      {
        title: "分类名称",
        dataIndex: "",
        key: "title",
        render: (subject) => {
          const { subjectId } = this.state;
          const id = subject._id;
          if (subjectId === id) {
            return (
              <Input
                className="subject-input"
                defaultValue={subject.title}
                onChange={this.handleInputChange}
              />
            );
          }
          return <span>{subject.title}</span>;
        },
      },
      {
        title: "操作",
        width: 200,
        dataIndex: "",
        key: "action",
        render: (subject) => {
          // console.log(subject)
          const { subjectId } = this.state;
          const id = subject._id;
          if (subjectId === id) {
            return (
              <>
                  <Button
                    type="primary"
                    className="subject-btn"
                    style={{ marginTop: "10px" }}
                    onClick={this.updateSubject}
                  >
                    确认
                  </Button>
                  <Button
                    type="danger"
                    className="subject-btn"
                    onClick={this.cancel}
                  >
                    取消
                  </Button>
              </>
            );
          }
          return (
            <>
              <Tooltip placement="top" title="更新课程分类">
                <Button
                  type="primary"
                  className="subject-btn"
                  style={{ marginTop: "10px" }}
                  onClick={this.showUpdateSubject(subject._id)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="删除课程分类">
                <Button
                  type="danger"
                  className="subject-btn"
                  onClick={this.delSubject(subject)}
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
      <div className="subject">
        <Button
          type="primary"
          className="subject-btn"
          style={{ marginBottom: "20px" }}
          onClick={this.showAddSubject}
        >
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns}
          // expandable内部会将children 作为默认值 并展开
          expandable={{
            expandedRowKeys, // 展开的行

            // 展开的行变化时触发的回调函数
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          // expandable={{
          //   expandedRowRender: (record) => {
          //     const children = record.children ? record.children : [];
          //     console.log(children);

          //     // return <p style={{ margin: 0 }}>{record.description}</p>
          //     return children.map((subSubject) => {
          //       return (
          //         <div key={subSubject._id} className="sub-subject-row">
          //           <div>{subSubject.title}</div>
          //           <div className="sub-subject-row-right">
          //             <Button type="primary">
          //               <FormOutlined />
          //             </Button>
          //             <Button type="danger" className="subject-btn">
          //               <DeleteOutlined />
          //             </Button>
          //           </div>
          //         </div>
          //       );
          //     });
          //   },
          //   // rowExpandable: (record) => record.name !== "Not Expandable",
          //   onExpand: this.handleExpand,
          // }}
          dataSource={subjectList.items} // 决定每一行显示的数据
          rowKey="_id" //   key
          pagination={{
            // 分页器
            current, // 当前页数
            pageSize, // 每页条数
            total: subjectList.total, // 总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: this.getFirstPageSubjectList,
          }}
        />
      </div>
    );
  }
}
export default Subject;
