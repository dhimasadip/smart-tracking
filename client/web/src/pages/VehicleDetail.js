import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import './VehicleDetail.css';
import {
    Link
} from "react-router-dom";
import smartTracking from '../assets/img/Smart-tracking.png';

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="display-4">Vehicle 1</h1>
                <div class="containerVehicle">
                    <div className="row">
                        <div className="col-lg-6 text-center">
                            <Card className="vehicleDetailCard" style={{ background: `#36c3d0` }}>
                                <Card.Img variant="top" src={smartTracking} />
                                <Card.Body>
                                    <Link to="/devices/1/current" >
                                        <Button variant="info">Get current location</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <br />
                        <div className="col-lg-6 text-center">
                            <Card className="vehicleDetailCard" style={{ background: `#36c3d0` }}>
                                <Card.Img variant="top" src={smartTracking} />
                                <Card.Body>
                                    <Link to="/devices/1/histories">
                                        <Button variant="info">Vehicle location history</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                        <br />
                        <div className="col-lg-6 text-center">
                            <Card className="vehicleDetailCard" style={{ background: `#36c3d0` }}>
                                <Card.Img variant="top" src={smartTracking} />
                                <Card.Body>
                                    <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal">
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
                                                    <h2>110</h2>
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
                            <Card className="vehicleDetailCard" style={{ background: `#36c3d0` }}>
                                <Card.Img variant="top" src={smartTracking} />
                                <Card.Body>
                                    <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalAlarm">
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
                                                    <button type="button" class="btn btn-dark" data-dismiss="modal">Turn off alarm</button>
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
