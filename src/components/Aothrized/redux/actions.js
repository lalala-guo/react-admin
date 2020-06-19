import { reqGetMenu, reqGetUserInfo } from "@api/acl/login";

import { GET_USER_INFO, GET_MENU } from "./constants";

// 获取用户信息
const getUserinfoSync = (user) => ({
  type: GET_USER_INFO,
  data: user,
});

export const getUserinfo = () => {
  return (dispatch) => {
    return reqGetUserInfo().then((response) => {
      dispatch(getUserinfoSync(response));
      return response;
    });
  };
};

// 获取权限列表数据 / 私有路由表
const getMenuSync = (permissionList) => ({
  type: GET_MENU,
  data: permissionList,
});

export const getMenu = () => {
  return (dispatch) => {
    return reqGetMenu().then((response) => {
      console.log(response);
      
      dispatch(getMenuSync(response.permissionList));
      return response.permissionList;
    });
  };
};
