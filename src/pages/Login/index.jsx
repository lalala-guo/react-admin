import React, { Component } from "react";
import LoginForm from "./components/LoginForm"

import { CopyrightOutlined } from "@ant-design/icons"

import logo from "@assets/images/logo.png"
import "./index.less";
export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <div className="login-wrap">
          
          <div className="login-header">
              <img src={logo} alt="logo"/>
              <h2>硅谷教育管理系统</h2>
          </div>
          <div className="login-container">
              <LoginForm />
          </div>
          <div className="login-footer">
              <span>尚硅谷</span>
              <span>Copyright<CopyrightOutlined />2020尚硅谷前端技术部出品 </span>
          </div>
        </div>
      </div>
    );
  }
}
