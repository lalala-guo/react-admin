import { reqLogin, reqLogout } from "@api/acl/login";
import { LOGIN_SUCCESS, REMOVE_TOKEN } from "../constants/login";

import { reqMobileLogin } from "@api/acl/oauth";

// 手机号登录 
export const mobileLogin = (mobile, code) => {
  return dispatch => {
    // console.log(mobile, code);
    return reqMobileLogin(mobile, code).then(({token}) => {
      // console.log(mobile, code)
      dispatch(loginSuccessSync(token))
      // console.log(token);
      return token
    })
  }
}

/**
 * 登陆
 */
export const loginSuccessSync = user => ({
  type: LOGIN_SUCCESS,
  data: user
});

export const login = (username, password) => {
  return dispatch => {
    return reqLogin(username, password).then(({token}) => {
      dispatch(loginSuccessSync(token));
      // 返回token，外面才能接受
      return token;
    });
  };
};

/**
 * 删除token
 */
export const removeToken = () => ({
  type: REMOVE_TOKEN
});

/**
 * 登出
 */
export const logout = () => {
  return dispatch => {
    return reqLogout().then(() => {
      dispatch(removeToken());
    });
  };
};


