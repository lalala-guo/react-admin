// 公开路由组件

import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { constantRoutes } from "@conf/routes";

// import loading from '@src/loading'
const loading = <div>loading...</div>;
export default class PublicLayout extends Component {
  // 定义方法 获取routes  遍历  显示  Route组件
  renderRoutes = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact // 严格模式
        />
      );
    });
  };
  render() {
    return (
      //  Switch作用：确保其中的路由组件只有一个能够加载~ 不要同时加载多个
      <Suspense fallback={loading}>
        <Switch>{this.renderRoutes(constantRoutes)}</Switch>
      </Suspense>
    );
  }
}
