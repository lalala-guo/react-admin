import React, { Component } from 'react'

//  引入 BrowserRouter  给后代组件传递三大属性
import { BrowserRouter} from 'react-router-dom'

import Layout from "./layout"

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        )
    }
}
