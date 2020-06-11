import React, { Component } from "react";

import { Button, Table, Tooltip, Input, message } from "antd";
import { PlusOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList, getSubsubjectList, updateSubject } from "./redux/actions";
import "./index.less";

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
    subjectId: "",
    updateSubjectTitle: "",
  };
  componentDidMount() {
    this.props.getSubjectList(1, 10);
  }
  //
  handleExpandedRowsChange = (expandedRowKeys) => {
    console.log("handleExpandedRowsChange", expandedRowKeys);

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

  getFirstPageSubjectList = (page, limit) => {
    this.props.getSubjectList(1, limit);
  };

  // 跳转添加页面
  showAddSubject = () => {
    this.props.history.push("/edu/subject/add");
  };

  // 点击 更新按钮 更改数据
  showUpdateSubject = (subjectId) => {
    // 更新 state 数据
    return () => {
      this.setState({
        subjectId,
      });
    };
  };

  // 收集数据 更新state
  handleInputChange = (e) => {
    const value = e.target.value.trim();
    // const {updateSubjectTitle} = this.state
    if (!value) {
      message.warning("数据不能为空");
      return;
    }
    // if(updateSubjectTitle === value){
    //   message.warning("数据要更改")
    // }
    this.setState({
      updateSubjectTitle: value,
    });
  };

  // 确认更新课程分类
  updateSubject = async() => {
    const { subjectId, updateSubjectTitle} = this.state
    // 发送异步请求
    await this.props.updateSubject(updateSubjectTitle, subjectId)
    if(!updateSubjectTitle) {
      message.warning("数据不能为空")
      return 
    }
    // 成功 提示
    message.success("更新成功")
    // 调用cancel函数 返回
    this.cancel();
  }

  // 取消
  cancel = () => {
    this.setState({
      subjectId: "",
      updateSubjectTitle: "",
    })
  }

  render() {
    const { subjectList, getSubjectList } = this.props;
    const { expandedRowKeys } = this.state;
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
                <Tooltip placement="top" title="更新课程分类">
                  <Button
                    type="primary"
                    className="subject-btn"
                    style={{ marginTop: "10px" }}
                    onClick = {this.updateSubject}
                  >
                    确认
                  </Button>
                </Tooltip>
                <Tooltip placement="top" title="删除课程分类">
                  <Button type="danger" className="subject-btn" onClick={this.cancel}>
                    取消
                  </Button>
                </Tooltip>
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
                <Button type="danger" className="subject-btn">
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
            total: subjectList.total, // 总数
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: this.getFirstPageSubjectList,
          }}
        />
        ,
      </div>
    );
  }
}
export default Subject;
