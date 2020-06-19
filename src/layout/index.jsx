import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aothrized from '@comps/Aothrized'
// 引入 公开组件 和 私有组件
import PrimaryLayout from './PrimaryLayout'
import PublicLayout from './PublicLayout'

@connect((state) => ({token: state.token}), null)
class Layout extends Component {
     render() {
        const token = this.props
        return token ? <Aothrized /> : <PublicLayout />
    }
}
export default Layout

{/* <Aothrized><PrimaryLayout /></Aothrized> */}