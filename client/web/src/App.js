import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MapsHistory from './pages/MapsHistory';
import LiveLocation from './pages/LiveLocation';
import VehicleList from './pages/VehicleList';
import store from './store';
import { Provider } from 'react-redux';
import About from './pages/About'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import VehicleAdd from './pages/VehicleAdd'
import VehicleDetail from './pages/VehicleDetail'


export default function App() {

  return (
    <Provider store={store}>
      <Router>
          <nav className="mb-4 navbar navbar-expand-lg navbar-light bg-info">
            <div className="navbar-brand">SmartTracking</div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">

              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Vehicle
                  </a>
                  {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/devices/add">Add Vehicle</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/devices/live-location">Live Location Device</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/devices/history">History Tracking Device</Link>
                  </div> */}
                </li>
              </ul>

              <div className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  User
                  </div>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <Link className="dropdown-item" to="/users">Logout</Link>
                </div>
              </div>
            </div>
          </nav>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/devices/:id/histories">
              <MapsHistory />
            </Route>
            <Route path="/devices/:id/current">
              <LiveLocation />
            </Route>
            <Route path="/devices/list">
              <VehicleList />
            </Route>
            <Route path="/devices/add">
              <VehicleAdd />
            </Route>
            <Route path="/devices/:id">
              <VehicleDetail />
            </Route>
          </Switch>
      </Router>
    </Provider>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

function Users() {
  return <h2>Users</h2>;
}

