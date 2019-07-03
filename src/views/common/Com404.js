/**
 * Author: tristan.dong
 *
 * Github: https://github.com/TristanDongMaster
 *
 * Last Modified:   18/03/20 
 *
 * 404页面
 */
import React, { Component } from 'react'
import Content from 'COMPONENTS/Layout/Content'
import Link from 'COMPONENTS/Link';

class Com404 extends Component {

  render() {
    let breadcrumb = [
      {name:'页面不存在'}
    ]
    return (
      <Content breadcrumb={breadcrumb} >
        <h1 style={{textAlign:'center'}}>404 , not found, back to <Link to="/mc-intl/index">home page</Link> </h1>
      </Content>
    )
  }
}


export default Com404

