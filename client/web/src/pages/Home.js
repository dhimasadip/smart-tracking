import React, { Component } from 'react'
import './Home.css';
import VehicleList from './VehicleList'

export default class Home extends Component {
  render() {
    return (
      <div>
      {/* <h1 class="title">Vehicle List</h1> */}
      <h1 className="display-4">Vehicle List</h1>

      <div class="containerHome">
        <VehicleList/>
      </div>
      </div>
    )
  }
}
