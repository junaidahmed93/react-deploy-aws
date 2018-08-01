import React from 'react';
// import InputBox from './InputBox';
import Divider from 'material-ui/Divider';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Replay from 'material-ui/svg-icons/action/flight-takeoff';
import IconButton from 'material-ui/IconButton';
import InputBox from '../../../components/shared/forms/InputBox';
import FlightDate from '../../shared/booking-form/FlightDate';
import InputSelect from '../../../components/shared/forms/InputSelect';
import { getCountries, getAirports } from '../../../utils/Helpers';
import BookingInputSelect from '../../shared/booking-form/BookingInputSelect';
import FlightField from '../../shared/booking-form/FlightField';
import GlobalStyle from '../../../utils/Styles';

export default class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.refreshFlight = this.refreshFlight.bind(this);
    const countryList = getCountries();
    this.selectAirportId = getAirports();
    this.selectCountry = countryList[0];
  }

  refreshFlight() {
    this.setState({ resetFlightField: true });
    this.props.findFlight();
  }


  render() {
    return (
      <form className="form-validation">
        <h2 style={GlobalStyle.formHeadings}>Customer Details</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="guestName"
                setValue={this.props.setValue}
                label="Guest Name"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="contactNumber"
                setValue={this.props.setValue}
                label="Contact Number"
                hintText="+971234578900"
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
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputSelect
                id="country"
                values={this.selectCountry}
                setValue={this.props.setValue}
                label="Country"
              />
            </Col>
            <Col md={4}>
              {/* <InputBox
                                id="emailAddress"
                                setValue={this.props.setValue}
                                label="Email Address"
                                type="email" /> */}
            </Col>
          </Row>

        </Grid>
        <h2 className="paper-title heading-spacing" style={{ display: 'inline-block' }}>
          Flight Information
        </h2>
        {this.props && this.props.currentFlightStats && this.props.currentFlightStats.FlightInfoReq ? <span style={{ color: 'red' }}>{this.props.currentFlightStats.fieldErr}</span> : ''}
        <Divider className="paper-divider" />
        {this.props.flightFound ? <span style={{ position: 'absolute', color: 'red' }}>No Scheduled flight.</span> : null}
        {this.props.bookingNotAllowed ? <span style={{ position: 'absolute', color: 'red' }}>Please ensure your flight departure time is 6 hours ahead of the current time</span> : null}
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <FlightField
                id="flightNumber"
                hintText="EJ590"
                setValue={this.props.setValue}
                label="Flight Number"
                type="text"
                fixedFloat
                prefilled={this.props.currentFlightStats.flightNumber}
              />
            </Col>
            <Col md={4}>
              <FlightDate
                id="flightDate"
                setValue={this.props.setValue}
                label="Flight Date"
                type="date"
                fixedFloat
              />
            </Col>
            <Col md={4}>
              <InputSelect
                id="dropoffAirport"
                values={this.selectAirportId}
                setValue={this.props.setValue}
                label="Airport"
              />
              <span>
                <IconButton
                  tooltip="Check Flight"
                  style={{
                    border: '1px solid green', marginBottom: '6px', marginLeft: '2px', cursor: 'pointer', borderRadius: '7px',
                  }}
                >

                  <Replay onClick={this.refreshFlight} style={{ color: 'green !important', height: '35px', width: '35px' }} />
                </IconButton>
              </span>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <InputBox
                id="flightTime"
                setValue={this.props.setValue}
                label="Flight Time"
                type="text"
                prefilled={this.props.currentFlightStats.departureTime ? this.props.currentFlightStats.departureTime : ' '}
                fixedFloat
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="dropoffTerminal"
                setValue={this.props.setValue}
                label="Terminal"
                type="text"
                prefilled={this.props.currentFlightStats && this.props.currentFlightStats.departureTerminal ? this.props.currentFlightStats.departureTerminal : ' '}
              />
            </Col>
          </Row>
        </Grid>

        <h2 className="paper-title heading-spacing">Pickup Luggage Information</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">

            <Col md={4}>
              <BookingInputSelect
                id="pickupTime"
                setValue={this.props.setValue}
                label="Pickup Time"
                type="time"
                fixedFloat
                values={this.props.currentFlightStats && this.props.currentFlightStats.pickupTime ? this.props.currentFlightStats.pickupTime : []}
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="luggages"
                setValue={this.props.setValue}
                label="Luggages"
                type="number"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="numberOfCompanions"
                setValue={this.props.setValue}
                label="Number of Companions"
                type="number"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="commentsForDriporter"
                setValue={this.props.setValue}
                label="Comments for Driporter"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="description"
                setValue={this.props.setValue}
                label="Description"
                type="text"
              />
            </Col>
            <Col md={4}>
              <InputBox
                id="flatOfficeNumber"
                setValue={this.props.setValue}
                label="Room No."
                type="text"
              />
            </Col>
          </Row>
          <Row className="form-row-spacing">
            <Col md={4}>
              <InputBox
                id="floorNumber"
                setValue={this.props.setValue}
                label="Floor No."
                type="text"
              />
            </Col>
          </Row>

        </Grid>

        <h2 className="paper-title heading-spacing">Dropoff Luggage Information</h2>
        <Divider className="paper-divider" />
        <Grid fluid>
          <Row className="form-row-spacing">
            <Col md={4}>
              <BookingInputSelect
                id="dropoffTime"
                setValue={this.props.setValue}
                label="Time"
                fixedFloat
                values={this.props && this.props.currentFlightStats && this.props.currentFlightStats.dropOffTime ? this.props.currentFlightStats.dropOffTime : []}
              />
            </Col>
          </Row>

        </Grid>
      </form>
    );
  }
}
