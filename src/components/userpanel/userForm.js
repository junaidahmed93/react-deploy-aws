import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GlobalStyle from '../../utils/Styles';
import InputBox from '../shared/forms/InputBox';
import InputSelect from '../shared/forms/InputSelect';
import InputDate from '../shared/forms/InputDate';
import { getCountries, getAirports } from '../../utils/Helpers';

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.selectRoleType = ['Admin'];
    const countryList = getCountries();
    this.selectAirportId = getAirports();
    this.selectCountry = countryList[0];
    this.selectNationality = countryList[1];
  }
  render() {
    return (
      <form className="form-validation">
        <h2 style={GlobalStyle.formHeadings}>Create new admin user</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                hintText="784-1984-1234567-1"
                id="emiratesId"
                setValue={this.props.setValue}
                label="National Identity No"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputSelect
                id="userRole"
                values={this.selectRoleType}
                setValue={this.props.setValue}
                label="User Role"
                buttonRestriction={this.props.buttonRestriction}
              />
              {/* <InputBox
                                id="userRole"
                                setValue={this.props.setValue}
                                label="User Role"
                                type="text"
                                /> */}
            </Col>
            <Col md={4}>
              <InputBox
                id="contactNumber"
                hintText="+971234578900"
                setValue={this.props.setValue}
                label="Contact Number"
                type="text"
              />
            </Col>
          </Row>

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="fullName"
                setValue={this.props.setValue}
                label="Full Name"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="emailAddress"
                setValue={this.props.setValue}
                label="Email Address"
                type="email"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="password"
                setValue={this.props.setValue}
                label="Password"
                type="password"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={12}>
              <InputBox
                id="address"
                setValue={this.props.setValue}
                label="Address"
                type="text"
              />
            </Col>
          </Row>

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="city"
                setValue={this.props.setValue}
                label="City"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputSelect
                id="country"
                values={this.selectCountry}
                setValue={this.props.setValue}
                label="Country"
              />
            </Col>
            <Col md={4}>
              <InputSelect
                id="nationlaity"
                values={this.selectNationality}
                setValue={this.props.setValue}
                label="Nationality"
              />
            </Col>
          </Row>

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputDate
                id="dateOfBirth"
                setValue={this.props.setValue}
                label="Date of Birth"
                type="date"
                buttonRestriction={this.props.buttonRestriction}
                fixedFloat
              />
              {/* <UserDatePicker
                                id="dateOfBirth"
                                setValue={this.props.setValue}
                                label="Date of Birth"
                                /> */}
            </Col>

          </Row>
        </Grid >
        <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Emergency Contact</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="emergencyName"
                setValue={this.props.setValue}
                label="Emergency Contact Name"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="relation"
                setValue={this.props.setValue}
                label="Relation"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="emergencyNumber"
                hintText="+971234578900"
                setValue={this.props.setValue}
                label="Emergency Contact Number"
                type="text"
              />
            </Col>
          </Row>
        </Grid>
      </form >
    );
  }
}
