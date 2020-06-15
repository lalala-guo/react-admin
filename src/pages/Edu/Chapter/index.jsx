import React, { Component } from 'react'
import Search from './components/Search'
import List from './components/List'
export default class Chapter extends Component {
  //  利用ref 将数据 传给子元素
  fullscreenRef = React.createRef();

  render() {
    return (
      <div  ref={this.fullscreenRef} style={{backgroundColor: "white"}}>
        <Search />
        <List  fullscreenRef={this.fullscreenRef} />
      </div>
    )
  }
}
