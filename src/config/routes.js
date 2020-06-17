// 引入 
import {lazy} from "react"

//  按需加载
const Login = lazy(() => import ("@pages/Login"))
const Oauth = lazy(() => import ("@pages/Login/components/Oauth"))
const NotFound = lazy(() => import ("@pages/404"))
const Admin = lazy(() => import ("@pages/Admin"))

 const constantRoutes = [
  {
    title: "登录",
    path: "/login",
    component: Login,
  },
  // 授权登录
  {
    title: "授权登录",
    path: "/oauth",
    component: Oauth,
  },
  // 404
  {
    title: "404",
    path: "*",
    component: NotFound,
  },
];

 const defaultRoutes = [
  {
    title: "首页",
	path: "/",
	component: Admin
  },
];
export default {
	constantRoutes,
	defaultRoutes
}