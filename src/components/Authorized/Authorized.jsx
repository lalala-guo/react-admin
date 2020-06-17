import React, { Component } from "react";
import { connect } from "react-redux";

import Loading from "../Loading";
import { getAccessRoutes, getUserInfo } from "./redux";
import { updateLoading } from "@redux/actions/loading";

@connect(
  (state) => ({
    user: state.user,
    loading: state.loading,
  }),
  { getAccessRoutes, getUserInfo, updateLoading }
)
class Authorized extends Component {
  componentDidMount() {
    // 发送请求，请求roles和permissionList
    const {
      user: { roles, permissionList },
      getUserInfo,
      getAccessRoutes,
      updateLoading,
    } = this.props;

    const promises = [];

    if (!roles.length) {
      promises.push(getUserInfo());
    }

    if (!permissionList.length) {
      promises.push(getAccessRoutes());
    }

    Promise.all(promises).finally(() => {
      updateLoading(false);
    });
  }

  render() {
    const {
      user: { permissionList },
      render,
    } = this.props;

    //  包裹一个 loading 组件 在请求到数据 显示之前  显示loading组件
    return <Loading>{render(permissionList)}</Loading>;
  }
}

export default Authorized;
