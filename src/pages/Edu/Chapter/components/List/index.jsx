import React, { Component } from "react";
import screenfull from "screenfull"
import { Button, Tooltip, Alert, Table, Modal, message } from "antd";
import {
  PlusOutlined,
  FullscreenOutlined,
  SettingOutlined,
  ReloadOutlined,
  FormOutlined,
  DeleteOutlined,
  EyeOutlined,
  ExclamationCircleOutlined
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Player from "griffith";

import { getLessonList, batchRemoveLessonList, batchRemoveChapterList } from "../../redux";

import "./index.less";
const { confirm } = Modal;
// withRouter：给非路由组件传递路由组件的三大属性
@withRouter
@connect(
  (state) => ({
    chapters: state.chapter.chapters,
  }),
  { getLessonList, batchRemoveLessonList, batchRemoveChapterList }
)
class List extends Component {
  state = {
    expandedRowKeys: [],
    isShowVideo: false,
    lesson: {},
    selectedRowKeys: [],
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
  //  添加课时
  showAddLesson = (chapter) => {
    return () => {
      // 默认情况下不是路由组件，没有三大属性
      // 解决：需要三大属性 --> withRouter
      this.props.history.push("/edu/chapter/addlesson", chapter);
    };
  };

  // 预览
  showVideoModal = (lesson) => {
    // console.log(lesson);

    return () => {
      this.setState({
        isShowVideo: true,
        lesson,
      });
    };
  };

  // 取消
  handleCancel = () => {
    this.setState({
      isShowVideo: false,
      lesson: {},
    });
  };

  //  表格 可选择 的onChange回调
  selectChange = (selectedRowKeys) => {
    // 更新state中的数据
    this.setState({
      selectedRowKeys,
    });
  };

  // 批量删除
  batchRemove = async () => {
    // 要收集数据的id
    // 分开  章节  和  课时
    // 获取 selectedRowKeys
    const { selectedRowKeys } = this.state;
    // console.log(selectedRowKeys);   // selectedRowKeys  中 包含所有 选中的 key值  章节和课时
    // 获取chapters  并解构赋值
    const {
      chapters: { items: chapters },  // 解构赋值 并重命名
    } = this.props;

    // 将id分为章节id和课时id
    //  复制一份 选中的数据 key值
    const ids = Array.from(selectedRowKeys); 
    const chapterId = [];
    chapters.forEach((chapter) => {
      // 遍历所有的章节数据  并找到所有的章节id
      const index = ids.indexOf(chapter._id);
      if (index > -1) {
        // 找到了   就获取每一个id
        const [id] = ids.splice(index, 1);
        // 存入章节id中
        chapterId.push(id);
      }
    });

    confirm({
      title: "你确定要删除选中数据吗?",
      icon: <ExclamationCircleOutlined />,
      // content: 'Some descriptions',
      onOk: async () => {
         // 调用 方法 删除
        await this.props.batchRemoveLessonList(ids)
        await this.props.batchRemoveChapterList(chapterId)
        message.success("批量删除成功")
      },
      // onCancel() {
      //   console.log('Cancel');
      // },
    });

  };

  // 全屏
  screenfull = () => {
    // const element = document.getElementById('target');
    // 接收 父组件 传递过来的 ref 属性  获取真实 DOM
    const dom = this.props.fullscreenRef.current
    // 显示全屏  在 获取数据后 点击显示全屏  需要再次获取
    // screenfull.request(dom)
    // 切换全屏  将此页面切换至全屏  不用重新获取数据
    screenfull.toggle(dom);
  }

  // 刷新
  Refresh = () => {
    // 刷新 重新发送请求 获取数据
    this.props.getLessonList();
  }

  render() {
    const { chapters } = this.props;
    const {
      expandedRowKeys,
      isShowVideo,
      lesson,
      selectedRowKeys,
    } = this.state;
    // console.log(lesson);

    const columns = [
      {
        title: "名称",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "是否免费",
        dataIndex: "free",
        key: "free",
        render: (free) => {
          return free === undefined ? "" : free ? "是" : "否";
        },
      },
      {
        title: "视频",
        key: "video",
        render: (lesson) => {
          return (
            // 判断 lesson 是否含有视频 有 才显示预览
            "video" in lesson && (
              <Tooltip title="预览视频">
                <Button onClick={this.showVideoModal(lesson)}>
                  <EyeOutlined />
                </Button>
              </Tooltip>
            )
          );
        },
      },
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
              新增章节
            </Button>
            <Button type="danger" onClick={this.batchRemove}>
              批量删除
            </Button>
            <Tooltip title="全屏" onClick={this.screenfull}>
              <FullscreenOutlined />
            </Tooltip>
            <Tooltip title="刷新" onClick={this.Refresh}>
              <ReloadOutlined />
            </Tooltip>
            <Tooltip title="设置">
              <SettingOutlined />
            </Tooltip>
          </div>
        </div>
        <Alert
          message={`已选择${selectedRowKeys.length}项`}
          type="info"
          showIcon
        />
        <Table
          className="chapter-list-table"
          columns={columns}
          rowSelection={{
            selectedRowKeys,
            onChange: this.selectChange,
          }}
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
        <Modal
          title={lesson.title}
          visible={isShowVideo} // 是否显示
          onCancel={this.handleCancel} // 取消
          footer={null} // 不要下面的两个按钮
          centered // 垂直居中
          destroyOnClose={true} // 关闭时销毁子元素
        >
          <Player
            sources={{
              hd: {
                play_url: lesson.video,
                // play_url: "http://qbsk1mwoi.bkt.clouddn.com/2cYQIkj2if",
              },
            }}
          />
        </Modal>
      </div>
    );
  }
}
export default List;
