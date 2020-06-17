import React, { Component } from 'react'
import { connect } from 'react-redux'

// 引入 公开组件 和 私有组件
import PrimaryLayout from './PrimaryLayout'
import PublicLayout from './PublicLayout'

@connect((state) => ({token: state.token}), null)
class Layout extends Component {
     render() {
        const token = this.props
        return token ? <PrimaryLayout /> : <PublicLayout />
    }
}
export default Layout