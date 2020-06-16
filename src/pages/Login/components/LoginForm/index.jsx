import React, { useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Form, Input, Button, Checkbox, Tabs, Row, Col, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MobileOutlined,
  MailOutlined,
  GithubOutlined,
  WechatOutlined,
  QqOutlined,
} from "@ant-design/icons";

import { login, mobileLogin } from "@redux/actions/login";
import { reqSendCode } from "@api/acl/oauth.js";

import "./index.less";

const { TabPane } = Tabs;
// 设置倒计时时间
const TOTAL_TIME = 60;
let countingDownTime = TOTAL_TIME;

function LoginForm({ login, history }) {
  // Form表单提供form对象，对表单进行更加细致的操作
  const [form] = Form.useForm();
  const [isSendCode, setIsSendCode] = useState(false);
  const [, setCountingDownTime] = useState(0);
  const [activeKey, setActiveKey] = useState("password");

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  const onFinish = async (values) => {
    // console.log(values);
    // 如果是 password 账号密码登录  验证
    if (activeKey === "password") {
      //  验证 用户名 密码 记住密码
      form
        .validateFields(["username", "password", "rem"])
        .then(async (values) => {
          const { username, password, rem } = values;
          const token = await login(username, password);
          //  如果都选记住密码  就保存在本地
          if (rem) {
            localStorage.setItem("user_token", token);
          }
          // 并且 跳转到主页
          history.replace("/");
        });
      return;
    }

    //  手机号   登录
    form.validateFields(["mobile", "code", "rem"]).then(async (values) => {
      const { mobile, code, rem } = values;
      console.log(values);

    //   const token = await mobileLogin(mobile, code);
    //   console.log(token);

    //   // 记住密码
    //   if (rem) {
    //     localStorage.getItem("user_token", token);
    //   }
      // 跳到首页
      history.replace("/");
    });
  };

  //  设置定时器  做 验证码倒计时
  const countingDown = () => {
    const timer = setInterval(() => {
      // 更新倒计时
      countingDownTime--;
      // 当 countingDownTime <=0 时, 清除定时器  并且将 isSendCode 改为 false
      if (countingDownTime <= 0) {
        clearInterval(timer);
        setIsSendCode(false);
      }

      //  调用方法 设置 countingDownTime 重新渲染组件
      setCountingDownTime(countingDownTime);
    }, 1000);
  };

  //   获取验证码
  const sendPhoneCode = () => {
    //   判断是否输入了手机号  手机号手否合法
    // form.validateFields  触发表单验证  返回的是promise
    form
      .validateFields(["mobile"])
      //   解构出来 mobile 发送请求
      .then(async ({ mobile }) => {
        await reqSendCode(mobile);
        // 发送成功  将isSendCode 改为true 将 按钮变为不可 点击
        setIsSendCode(true);
        // 调用定时器  显示时间
        countingDown();
        // 提示  验证码发送成功
        message.success("验证码发送成功");
      });
  };

  return (
    <>
      <Form name="basic" form={form} initialValues={{ remember: true }}>
        <div className="login-form-header">
          <Tabs activeKey={activeKey} onChange={handleTabChange}>
            <TabPane tab="账户密码登录" key="password">
              <Form.Item
                //   label="Username"
                name="username"
                rules={[
                  { required: true, message: "请输入账号" },
                  { max: 15, message: "长度不能超过15个字符" },
                  { min: 4, message: "长度不能低于4个字符" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "账号只能包含数字、英文和下划线",
                  },
                ]}
              >
                <Input placeholder="账号" prefix={<UserOutlined />} />
              </Form.Item>

              <Form.Item
                //   label="Password"
                name="password"
                rules={[
                  { required: true, message: "请输入密码" },
                  { max: 15, message: "长度不能超过15个字符" },
                  { min: 4, message: "长度不能低于4个字符" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "账号只能包含数字、英文和下划线",
                  },
                ]}
              >
                <Input placeholder="密码" prefix={<LockOutlined />} />
              </Form.Item>
            </TabPane>
            <TabPane tab="手机号登录" key="mobile">
              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: "请输入手机号" },
                  {
                    pattern: /^(((13[0-9])|(14[579])|(15([0-3]|[5-9]))|(16[6])|(17[0135678])|(18[0-9])|(19[89]))\d{8})$/,
                    message: "请输入正确的手机号",
                  },
                ]}
              >
                <Input placeholder="手机号" prefix={<MobileOutlined />} />
              </Form.Item>
              <Row justify="space-between">
                <Col>
                  <Form.Item
                    name="code"
                    rules={[
                      {
                        required: true,
                        message: "请输入验证码",
                      },
                      {
                        pattern: /^[0-9]{6}$/,
                        message: "请输入正确的验证码",
                      },
                    ]}
                  >
                    <Input placeholder="验证码" prefix={<MailOutlined />} />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    <Button onClick={sendPhoneCode} disabled={isSendCode}>
                      {isSendCode
                        ? `${countingDownTime}秒后可重发`
                        : "获取验证码"}
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
        <Row justify="space-between">
          <Col>
            <Form.Item name="rem" valuePropName="checked">
              <Checkbox name="checked">自动登录</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="link">忘记密码</Button>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" className="login-button" onClick={onFinish}>
            登录
          </Button>
        </Form.Item>
        <Form.Item className="login-type-contaner">
          {/* <div className="login-type-contaner"> */}
          <div className="login-type">
            <span>其他登录方式</span>
            <GithubOutlined />
            <WechatOutlined />
            <QqOutlined />
            <Button type="link">注册</Button>
          </div>
          {/* </div> */}
        </Form.Item>
      </Form>
    </>
  );
}
export default withRouter(connect(null, { login, mobileLogin })(LoginForm));
