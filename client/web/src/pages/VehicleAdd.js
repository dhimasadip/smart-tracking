import React, { Component } from "react";
import "./VehicleAdd.css";

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class VehicleAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceCode: null,
      formErrors: {
        deviceCode: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        deviceCode: ${this.state.deviceCode}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <h2>Add Vehicle</h2>
        <div className="addForm-wrapper">
  
          <form class="loginForm" onSubmit={this.handleSubmit} noValidate>
            <div className="deviceCode">
              <label htmlFor="deviceCode">Please enter your device code here</label>
              <input
                className={formErrors.deviceCode.length > 0 ? "error" : null}
                placeholder="Device Code"
                type="string"
                name="deviceCode"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.deviceCode.length > 0 && (
                <span className="errorMessage">{formErrors.deviceCode}</span>
              )}
            </div>
            <div className="createVehicle">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default VehicleAdd;
