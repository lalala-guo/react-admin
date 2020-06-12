import React from "react";
import { Card, Form, Input, Button, Select, message, Switch } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Upload from "@comps/Upload";

import { reqAddLesson } from '@api/edu/lesson'

import "./index.less";

export default function AddLesson({location, history}) {
  //   样式
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 5 },
  };

    //   收集数据 添加课时
   const onFinish = async (values) => {
    console.log(values);  //values就是收集的数据  title free video
    // 但是  参数还需要 chapterId   在 this.props.location.state._id 
    // 取出 chapterId
    const chapterId = location.state._id
    // 发送请求
    await reqAddLesson({chapterId, ...values})
    // 成功
    message.success("添加课时成功")
    // 跳转到章节页面
    history.push("edu/chapter/list")
  }


  return (
    <Card
      title={
        <>
          {/* 点击箭头  返回 展示课程分类列表页面 */}
          <Link to="/edu/subject/addlesson">
            <ArrowLeftOutlined />
          </Link>
          <span className="title">添加课时</span>
        </>
      }
    >
      <Form
        //   样式 通过 ...展开
        {...layout}
        // name="basic"
        // 添加成功 的 回调
        onFinish={onFinish}
        initialValues={{ free: true }}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="课程名称"
          name="title" // 指定当前表单项将来收集数据的key属性
          rules={[{ required: true, message: "请输入课程分类名称!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否免费"
          name="free"
          rules={[{ required: true, message: "请选择是否免费!" }]}
          // Form表单默认会接管组件value属性
          // 但是Switch组件不要value，需要的是checked
          valuePropName="checked"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>

        <Form.Item
          name="video"
        //   rules={[{ required: true, message: "请上传视频!" }]}
        >
          <Upload />
        </Form.Item>
        <Form.Item>
          {/* 添加 按钮 */}
          <Button type="primary" htmlType="submit" className="add">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
