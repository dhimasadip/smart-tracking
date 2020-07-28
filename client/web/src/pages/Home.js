import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import './Home.css';
import VehicleList from './VehicleList'

export default class Home extends Component {
  render() {
    return (
      <div>
      <h1 class="title">Vehicle List</h1>
      <div class="containerHome">
        <VehicleList/>
      </div>
      </div>
    )
  }
}
