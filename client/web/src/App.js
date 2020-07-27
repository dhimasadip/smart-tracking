import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MapsHistory from './pages/MapsHistory';
import LiveLocation from './pages/LiveLocation';
import ListDevice from './pages/ListDevice';
import AddDevice from './pages/AddDevice';
import store from './store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav  className="navbar navbar-expand-lg navbar-light bg-light">
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
                    Device
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to="/devices/list">List Device</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/devices/add">Add Device</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/devices/live-location">Live Location Device</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/devices/history">History Tracking Device</Link>
                  </div>
                </li>
              </ul>

              <div className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    User
                  </a>
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
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/devices/history">
              <MapsHistory />
            </Route>
            <Route path="/devices/live-location">
              <LiveLocation />
            </Route>
            <Route path="/devices/list">
              <ListDevice />
            </Route>
            <Route path="/devices/add">
              <AddDevice />
            </Route>
            
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

