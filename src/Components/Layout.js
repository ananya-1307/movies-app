import React, { Component } from 'react'
import Banner from './Banner'
import Movies from './Movies'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Banner/>
        <Movies/>
      </div>
    )
  }
}
