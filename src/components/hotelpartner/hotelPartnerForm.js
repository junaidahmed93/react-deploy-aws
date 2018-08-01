import React from 'react';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import GlobalStyle from '../../utils/Styles';
import InputBox from '../shared/forms/InputBox';
import InputSelect from '../shared/forms/InputSelect';
import InputDate from '../shared/forms/InputDate';
import { getCountries, getAirports } from '../../utils/Helpers';

export default class HotelPartnerForm extends React.Component {
  constructor(props) {
    super(props);
    const countryList = getCountries();
    this.selectAirportId = getAirports();
    this.selectCountry = countryList[0];
    this.selectNationality = countryList[1];
  }
  render() {
    const { setValue } = this.props;
    return (
      <form className="form-validation">
        <h2 style={GlobalStyle.formHeadings}>Create new hotel</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="hotelName"
                setValue={setValue}
                label="Hotel Name"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="bookingLimit"
                setValue={setValue}
                label="Booking Limit"
                type="number"
              />

            </Col>
            <Col md={4}>
              <InputBox
                id="hotelAddress"
                setValue={setValue}
                label="Address"
                type="text"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="hotelAddressLat"
                setValue={setValue}
                label="Latitude"
                type="number"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="hotelAddressLong"
                setValue={setValue}
                label="Longitude"
                type="number"
              />
            </Col>
            <Col md={4} />
          </Row>
        </Grid>
        <br />
        <h2 style={GlobalStyle.formHeadings} >User Details</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="emiratesId"
                hintText="784-1984-1234567-1"
                setValue={setValue}
                label="National Identity No"
                type="number"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="fullName"
                setValue={setValue}
                label="Full Name"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputDate
                id="dateOfBirth"
                setValue={setValue}
                label="Date of Birth"
                type="date"
                fixedFloat
              />
            </Col>
          </Row>
        </Grid>
        <br />
        <h2 style={GlobalStyle.formHeadings} >User Details</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="emiratesId"
                hintText="784-1984-1234567-1"
                setValue={setValue}
                label="National Identity No"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="fullName"
                setValue={setValue}
                label="Full Name"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputDate
                id="dateOfBirth"
                setValue={setValue}
                label="Date of Birth"
                type="date"
                fixedFloat
              />
            </Col>
          </Row>

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="city"
                setValue={setValue}
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
                setValue={setValue}
                label="Nationality"
                type="text"
              />
            </Col>
          </Row>

          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="emailAddress"
                setValue={setValue}
                label="Email Address"
                type="email"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="password"
                setValue={setValue}
                label="Password"
                type="password"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="contactNumber"
                setValue={setValue}
                label="Contact Number"
                hintText="+971234578900"
                type="text"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="emailAddress"
                setValue={setValue}
                label="Email Address"
                type="email"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="password"
                setValue={setValue}
                label="Password"
                type="password"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="contactNumber"
                hintText="+971234578900"
                setValue={setValue}
                label="Contact Number"
                type="text"
              />
            </Col>

          </Row>

        </Grid>
        <h2 style={{ ...GlobalStyle.formHeadings, ...GlobalStyle.formHeadingExtraSpacing }}>Emergency Contact</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="emergencyName"
                setValue={setValue}
                label="Emergency Contact Name"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="relation"
                setValue={setValue}
                label="Relation"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="emergencyNumber"
                hintText="+971234578900"
                setValue={setValue}
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
