import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import './VehicleDetail.css';
import VehicleList from './VehicleList'

export default class Home extends Component {
  render() {
    return (
      <div>
      <h1 class="titleVehicle">Features</h1>
        <div class="containerVehicle">
            <div className="row">
                <div className="col-lg-6 text-center">
                    <Card className="vehicleDetailCard">
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1593642632505-1f965e8426e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80" />
                    <Card.Body>
                        <Button to="/devices/:id" variant="primary">Get current location</Button>
                    </Card.Body>
                    </Card>
                </div>
                <br/>
                <div className="col-lg-6 text-center">
                    <Card className="vehicleDetailCard">
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1593642632505-1f965e8426e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80" />
                    <Card.Body>
                        <Button to="/devices/:id" variant="primary">Vehicle location history</Button>
                    </Card.Body>
                    </Card>
                </div>
                <br/>
                <div className="col-lg-6 text-center">
                    <Card className="vehicleDetailCard">
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1593642632505-1f965e8426e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80" />
                        <Card.Body>
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                                Police Number
                                </button>

                                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Police Number</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <h2>112</h2>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card.Body> 
                    </Card>
                </div>
                <div className="col-lg-6 text-center">
                    <Card className="vehicleDetailCard">
                    <Card.Img variant="top" src="https://images.unsplash.com/photo-1593642632505-1f965e8426e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80" />
                    <Card.Body>
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalAlarm">
                                Turn on Alarm
                                </button>

                                <div class="modal fade" id="modalAlarm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                        </div>
                                        <div class="modal-body">
                                            <h3>Alarm turned on!</h3>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal">Turn off alarm</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
