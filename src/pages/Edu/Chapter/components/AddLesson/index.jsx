import React from "react";
import { Card, Form, Input, Button, Select, message, Switch } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Upload from "@comps/Upload"

import './index.less'


export default function AddLesson() {
     //   样式
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 5 },
  };
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
        // onFinish={onFinish}
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
        //   rules={[{ required: true, message: "请选择父级分类名称!" }]}
        // Form表单默认会接管组件value属性
          // 但是Switch组件不要value，需要的是checked
            valuePropName="checked"
        >
            {/* defaultChecked */}
             <Switch checkedChildren="是" unCheckedChildren="否"  />
        </Form.Item>

        <Upload />

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
