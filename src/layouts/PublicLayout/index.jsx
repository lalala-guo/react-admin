import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { constantRoutes } from "@conf/routes";

class PublicLayout extends Component {
  // 定义一个方法接收 routes    遍历展示   常量组件 --> 公开组件
  renderRoute = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={true}
        />
      );
    });
  };

  render() {
    return <Switch>{this.renderRoute(constantRoutes)}</Switch>;
  }
}

export default PublicLayout;
