/*
  [
    {
    "path": "/acl",       路径
    "component": "",      组件
    "name": "权限管理",    名称
    "icon": "lock",       图标
    "redirect": "/acl/user/list", 重定向地址
    "hidden": false,     侧边栏是否隐藏（不隐藏）
    "children": [  子菜单
        {
            "path": "/user/list", 子菜单访问路径 = 父级菜单.path + 子菜单.path
            "component": "User",
            "name": "用户管理",
            "icon": "",
            "redirect": "noredirect",
            "hidden": false   侧边栏是否隐藏（不隐藏）
        },
        {
            "path": "/user/add",
            "component": "AddOrUpdateUser",
            "name": "添加",
            "icon": "",
            "redirect": "noredirect",
            "hidden": true  侧边栏是否隐藏（隐藏）：侧边栏是不会显示按钮，所以按钮要隐藏
        },
        {
            "path": "/user/update/:id",
            "component": "AddOrUpdateUser",
            "name": "修改",
            "icon": "",
            "redirect": "noredirect",
            "hidden": true
        },
        {
            "path": "",    // 没有组件和路径的，需要过滤。不需要显示
            "component": "",
            "name": "删除",
            "icon": "",
            "redirect": "noredirect",
            "hidden": true
        },
      }
    }
  ]
*/

import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import icons from "@conf/icons";

const { SubMenu } = Menu;
@withRouter
@connect((state) => ({
  permissionList: state.user.permissionList,
}))
class SideMenu extends Component {
  // 定义 获取展示数据的方法
  renderMenu = (menulist, parentPath = "") => {
    // 遍历 permissionList  并判断是否 含有children属性children是否有值 来确定是以及菜单还是二级菜单
    // 通过 hidden 的值 来过滤掉 不需要展示的数据 例如 按钮
    // console.log(menulist);

    return menulist.map((menu) => {
      // 获取数据
      const { path, name, children, icon, hidden } = menu;

      const Icon = icons[icon];
      //  如果 hidden 为 true 就return 不显示 说明是 按钮 属性
      if (hidden) return;
      //  判断是否 含有children -->  二级菜单
      if (children && children.length) {
        // 二级菜单
        return (
          <SubMenu key={path} icon={<Icon />} title={name}>
            {/* 递归调用 */}
            {this.renderMenu(children, path)}
          </SubMenu>
        );
      } else {
        // 一级菜单
        const currentPath = parentPath + path;
        return (
          <Menu.Item key={currentPath} icon={Icon ? <Icon /> : null}>
            <Link to={currentPath}>{name}</Link>
          </Menu.Item>
        );
      }
    });
  };

  getOpenKeys = (pathname) => {
    if (pathname === "/") return [];
    return ["/" + pathname.split("/")[1]]
  }

  render() {
    const {
      permissionList,
      location: { pathname },
    } = this.props;
    console.log(pathname);
    
    return (
      <Menu
        theme="dark"
        defaultSelectedKeys={[pathname]} // 默认选中的菜单（值是数组）
        defaultOpenKeys={this.getOpenKeys(pathname)} // 默认展开菜单（值是数组）
        mode="inline"
      >
        {/* 静态数据   首页 */}
        {/* {this.renderMenu(defaultRoutes)} */}
        {/* <Menu.Item key={defaultRoutes.path} >
              <Link to={defaultRoutes.path}>
                {defaultRoutes.name}
              </Link>
          </Menu.Item> */}
        {/* 动态数据 */}
        {this.renderMenu(permissionList)}
      </Menu>
    );
  }
}
export default SideMenu;
