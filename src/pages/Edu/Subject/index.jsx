import React, { Component } from "react";

import { Button, Table, Tooltip } from "antd";
import { PlusOutlined,  DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { getSubjectList, getSubsubjectList } from "./redux/actions";
import "./index.less";

@connect(
  (state) => ({
    subjectList: state.subjectList,
  }),
  { getSubjectList, getSubsubjectList }
)
class Subject extends Component {
  state = {
    // 初始化数据  展开项
    expandedRowKeys: []  
  }
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
  }

  // // 点击展开一级菜单
  // handleExpand = (expanded, record) => {
  //   // 请求一级菜单对应二级菜单数据
  //   this.props.getSubsubjectList(record._id);
    
  // };

  // 跳转添加页面
  showAddSubject = () => {
    this.props.history.push("/edu/subject/add")
  }

  render() {
    const { subjectList, getSubjectList } = this.props;
    const { expandedRowKeys } = this.state
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
                <FormOutlined />
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
            onShowSizeChange: getSubjectList,
          }}
        />
        ,
      </div>
    );
  }
}
export default Subject;
