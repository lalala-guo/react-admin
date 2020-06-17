import React, { Component } from 'react'
import { connect } from 'react-redux'
import {loginSuccessSync} from "@redux/actions/login"


@connect(null, {loginSuccessSync})
class Oauth extends Component {
    componentDidMount(){
        console.log(this.props.location);
    // 获取 token
        const token = this.props.location.search.split("=")[1]
        console.log(token)
    // 登录发送请求  token  保存在redux中
        this.props.loginSuccessSync(token)
    // 将token保存在本地
        localStorage.setItem("user_token", token)
    // 跳转到主页
        this.props.history.replace("/")
    }
    render() {
        return (
            <div>
                授权登录中........
            </div>
        )
    }
}
export default Oauth