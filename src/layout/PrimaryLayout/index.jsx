import React, { Component } from "react";
import { matchPath } from "react-router";

import { Layout, Breadcrumb } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SideMenu from "../SideMenu";

import { defaultRoutes } from "@conf/routes";
import AuthorizedRouter from "@comps/Aothrized/AuthorizedRouter";
import logo from "@assets/images/logo.png";
import "./index.less";

const { Header, Content, Footer, Sider } = Layout;
@withRouter
@connect((state) => ({
  user: state.user,
}))
class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
    console.log(this.state.collapsed);
  };

  // 获取当前路由配置
  getCurrentRoute = (permissionList, pathname) => {
    // for循环 遍历 permissionList
    for (let i = 0; i < permissionList.length; i++) {
      // 获取一级菜单
      const route = permissionList[i];
      // 判断 如果 routes.path 和 pathname 相等 就是一级菜单 返回 并 设置 children 属性为undefined
      // 用来区分 是 一级菜单 还是 二级菜单
      if (route.path === pathname) {
        return {
          ...route,
          children: undefined,
        };
      }
      // 取到 children
      const { children } = route;
      // 如果 有二级菜单并且有数据 就是二级菜单
      if (children && children.length) {
        // 遍历children
        for (let j = 0; j < children.length; j++) {
          const item = children[j];
          
          // 删除按钮是没有路径，不需要处理~
          // 过滤删除按钮
          if (!item.path) continue;

          // 拼路径  父级路径 + 子路径
          const currentPath = route.path + item.path;
          const currentRoute = {
            ...item,
            path: currentPath,
          };
          /*
            currentPath acl/user/update/:id
            pathname /acl/user/update/5ee9af3b08cbda2ab083f906
          */
          // matchPath(当前路由路径, 路由配置对象) 返回值是布尔值
          // 代表当前路由路径有没有匹配上路由~
          const match = matchPath(pathname, currentRoute);

          if (match) {
            return {
              ...route,
              children: currentRoute,
            };
          }

          // // 如果 currentPath 与 pathname相等
          // if (currentPath === pathname) {
          //   return {
          //     ...route,
          //     children: item,
          //   };
          // }
        }
      }
    }
  };

  render() {
    const { collapsed } = this.state;
    const {
      user,
      location: { pathname },
    } = this.props;
    console.log(user);

    // 路由导航 显示
    // 定义变量   看是否是 私有路由
    // 静态路由
    let currentRoute = this.getCurrentRoute(defaultRoutes, pathname);

    // 如果不是静态路由
    if (!currentRoute) {
      // 再去找动态请求私有路由
      currentRoute = this.getCurrentRoute(user.permissionList, pathname);
      console.log(user);
    }

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="sider-header">
            <img src={logo} alt="logo" />
            {collapsed ? null : <h3>硅谷教育管理系统</h3>}
          </div>
          <div className="logo" />
          <SideMenu currentRoute={currentRoute} />
        </Sider>
        <Layout className="layout">
          <Header className="layout-header">
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
            <div className="layout-header-right">
              <img src={user.avatar} alt="logo" />
              <span>{user.name}</span>
              <GlobalOutlined />
            </div>
          </Header>
          <Content>
            <div className="layout-container">
              {currentRoute.children && (
                <Breadcrumb>
                  <Breadcrumb.Item>{currentRoute.name}</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    {currentRoute.children.name}
                  </Breadcrumb.Item>
                </Breadcrumb>
              )}
              <h3>
                {currentRoute.children
                  ? currentRoute.children.name
                  : currentRoute.name}
              </h3>
            </div>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <AuthorizedRouter permissionList={user.permissionList} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©2020课程版权均归硅谷教育管理系统所有
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default PrimaryLayout;
