import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSubjectList } from "../../redux";
import { reqAddSubject } from "@api/edu/subject";

import "./index.less";

// 获取select 中的 option
const { Option } = Select;

// 定义变量  用来标识几页数据
let page = 1;

// 通过 解构赋值 得到 props 中的数据
function AddSubject({ total, getSubjectList, history }) {
  //   console.log(total);

  // 初始化数据
  const [subjects, setSubjects] = useState([]);
  // console.log(subjects);

  const onFinish = async (values) => {
    // values : 收集到的表单数据
    // 从values中 解构赋值 获取表单中的 title 和 parentId
    const { title, parentId } = values;

    // 异步请求 添加数据
    await reqAddSubject(title, parentId);
    // 提示添加数据成功 提示 通过 antd 中的 message
    message.success("添加课程分类数据成功~");
    // 成功之后 返回 课程分类页面
    history.push("/edu/subject/list");
  };
  // 表单校验失败
  //   const onFinishFailed = (errorInfo) => {
  //     console.log("Failed:", errorInfo);  };

  //   工厂函数的 componentDidMount
  useEffect(() => {
    //   useEffect 中不能之后传入异步函数  要自己定义一个函数 为 异步函数  并调用 否则会报错
    const fetchData = async () => {
      const items = await getSubjectList(page++, 10);
      setSubjects(items);
    };
    fetchData();
  }, [getSubjectList]);

  //   样式
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 5 },
  };

  // 点击加载更多数据
  const loadMore = async () => {
    //     const items = await getSubjectList(page++, 10);
    //     // 更新一份全新数据~
    //     setSubjects([...subjects, ...items]);
  };

  return (
    <Card
      title={
        <>
          {/* 点击箭头  返回 展示课程分类列表页面 */}
          <Link to="/edu/subject/list">
            <ArrowLeftOutlined />
          </Link>
          <span className="title">添加课程分类</span>
        </>
      }
    >
      <Form
        //   样式 通过 ...展开
        {...layout}
        // name="basic"
        // 添加成功 的 回调
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="课程分类名称"
          name="title" // 指定当前表单项将来收集数据的key属性
          rules={[{ required: true, message: "请输入课程分类名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="父级分类名称"
          name="parentId"
          rules={[{ required: true, message: "请选择父级分类名称!" }]}
        >
          <Select
            // 在列表的最后添加额外元素
            dropdownRender={(menu) => (
              <div>
                    {/* 数据展示 */}
                {menu}
                    {/* 判断总长度 和请求回来数据的长度  如果大于等于总长度就 表示 已经将数据展示完毕 
                        就不能再次点击获取 提示 没有更多数据 否则就显示按钮 可以再次获取 */}
                {total <= subjects.length ? (
                  "没有更多数据了~"
                ) : (
                  <Button type="link" onClick={loadMore}>
                    加载更多数据~
                  </Button>
                )}
              </div>
            )}
          >
            <Option key={0} value="0">
              一级分类
            </Option>
            {/* 遍历 获取的数据 subjects 展示  此时是要在 数据的后面 追加  所以可以用 index */}
            {subjects.map((subject, index) => {
              return (
                <Option key={index + 1} value={subject._id}>
                  {subject.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          {/* 添加 按钮 */}
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
// 通过 connect 获取数据 要调用两次  第一次获取数据 第二次暴露 工厂函数
export default connect((state) => ({ total: state.subjectList.total }), {
  getSubjectList,
})(AddSubject);
