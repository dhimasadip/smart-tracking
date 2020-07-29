import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, CardColumns } from 'react-bootstrap';
import smartTracking from '../assets/img/Smart-tracking.png';
import {
  Link
} from "react-router-dom";

function VehicleList() {
  return (
    <div>

      <Container>
        <CardColumns >
          <Card className="text-center" style={{ background: `#36c3d0` }}>
            <Card.Img variant="top" src={smartTracking} />
            <Card.Body>
              <Card.Title>Vehicle 1</Card.Title>
              <Link to="/devices/1">
                <Button variant="dark" size="lg">Detail</Button>
              </Link>
            </Card.Body>
          </Card>
        </CardColumns>
      </Container>
    </div>
  )
}

export default VehicleList;
