import React, {useEffect} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col, Image, Button } from 'react-bootstrap';

function VehicleList(){
  return (
    <div>
      <div >
        <div className="row">
          
          <div className="col-lg-4 text-center">
            <Card >
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1593642632505-1f965e8426e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=925&q=80" />
              <Card.Body>
                <Card.Title>Vehicle 1</Card.Title>
                <Card.Text>
                  Cureent Location data
                </Card.Text>
                <Button variant="primary" href="/devices/1">Detail</Button>
              </Card.Body>
            </Card>
          </div>
          
        </div>
        
      </div>
    </div>
  )
}

export default VehicleList;
