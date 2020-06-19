import React, { Component } from 'react'
import { connect } from 'react-redux'
import PrimaryLayout from "../../layout/PrimaryLayout"
import Loading from '../Loading'
import { getUserinfo, getMenu } from './redux'

@connect(null, { getUserinfo, getMenu })
 class Authrized extends Component {
    state = {
        isLoading: true
    }
    componentDidMount(){
        const { getUserinfo, getMenu } = this.props
        const promises = [ getUserinfo(), getMenu() ]
        Promise.all(promises).then(() => {
            this.setState({
                isLoading: false
            })
        })
    }
    render() {
        const {isLoading} = this.state
        return (
                isLoading ? <Loading /> : <PrimaryLayout />
        )
    }
}
export default Authrized