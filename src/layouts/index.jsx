import React, { Component } from "react";

import { connect } from "react-redux";

import PrimaryLayout from "./PrimaryLayout";
import PublicLayout from "./PublicLayout";
import { Authorized } from "../components/Authorized";

@connect((state) => ({ token: state.token }))
class BasicLayout extends Component {

  render() {
    //  获取 token 
    const { token } = this.props;
    // 如果有token 就返回 权限 私有组件    如果没有  就返回公开组件
    if (token) {
      // render props技术
      // 提供一个B组件渲染到A组件内部，并传入props
      return (
        <Authorized
          render={(routes) => {
            return <PrimaryLayout routes={routes} />;
          }}
        />
      );
    }
    //  公开 组件
    return <PublicLayout />;
  }
}

export default BasicLayout;
