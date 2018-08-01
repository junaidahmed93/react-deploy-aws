import React from 'react';
import { Link, browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import * as actions from '../../../actions/HotelNewBookingActions';
import * as flightStatsActions from '../../../actions/FlightStatsActions';
import HotelbookingForm from '../../../components/hotel/hotelBooking/HotelBookingForm';
import { formsValidation } from '../../../utils/Helpers';
import GlobalStyle from '../../../utils/Styles';
import { calculatePickupTime, calculateDropoffTime } from '../../../utils/FlightStats';
import { loadState } from '../../../utils/StorageUtils';

class BookingAddContainer extends React.Component {
  constructor(props) {
    super(props);
    this.bookingData = {};
    this.refresh = this.refresh.bind(this);
    this.findFlight = this.findFlight.bind(this);
    this.state = {
      errorText: '',
      errorClass: '',
      showErrorTemplate: false,
      currentFlightStats: {
        dropOffTime: [],
        FlightInfoReq: false,
        fieldErr: '',
      },
      open: false,
      flightFound: false,
      bookingNotAllowed: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.bookingSaved) {
      browserHistory.push('/home/hotel/bookings');
    }

    if (nextProps && nextProps.flightStatsSuccess && nextProps.flightDetails) {
      this.fetchFlightStats = true;
      const currentFlightStats = nextProps.flightDetails;
      const actualFlightTime = new Date(currentFlightStats.originalDate).getTime();

      // According to business login Flight must be created 5 hour ahead.
      // Which means at least 6 hour must required to create a booking.
      const currentSystemTime = new Date().getTime() + (3600000 * 6);
      const filteredPickUpWindow = calculatePickupTime(currentFlightStats.originalDate);
      const luggageDropOff = calculateDropoffTime(currentFlightStats.originalDate);

      // Valid flight IF currents system time is 5+ the flight departure time.
      if (actualFlightTime > currentSystemTime) {
        const flightObj = Object.assign({}, currentFlightStats, { pickupTime: filteredPickUpWindow, dropOffTime: luggageDropOff });
        this.setState({ currentFlightStats: flightObj, flightFound: false, bookingNotAllowed: false });
      } else {
        this.setState({ currentFlightStats: {}, flightFound: false, bookingNotAllowed: true });
      }
    }

    // FLight Status fail while in respond
    // eslint-disable-next-line
    if (nextProps && nextProps.flightStatsSuccess === false && nextProps.flightError != ' ') {
      this.setState({ currentFlightStats: {}, flightFound: true, bookingNotAllowed: false });
    }
  }

  setValue = (key, value) => {
    this.bookingData[key] = value;
    const dropOffArr = [];
    if (key === 'pickupTime') {
      let dropTime = new Date(value).getTime();
      const coeff = 1000 * 60 * 5;
      for (let i = 0; i < 3; i++) {
        let a;
        if (i === 0) {
          // Add an hour in dropOff w.r.t to PickupTime
          a = new Date(new Date(Math.round(dropTime / coeff) * coeff).getTime() + (3600000));
          dropTime = new Date(dropTime).getTime() + (3600000);
        } else {
          a = new Date(new Date(Math.round(dropTime / coeff) * coeff).getTime() + (900000));
          dropTime = new Date(dropTime).getTime() + (900000);
        }
        dropOffArr.push(a.toString());
      }
      // eslint-disable-next-line
      this.state.currentFlightStats.dropOffTime = dropOffArr;
      this.setState({ currentFlightStats: this.state.currentFlightStats });
    }
  };

  submit = () => {
    let deptTerminal;
    if (this.state && this.state.currentFlightStats && this.state.currentFlightStats.departureTerminal) {
      // TODO: case Need to be implement
      deptTerminal = this.state.currentFlightStats.departureTerminal;
    } else {
      deptTerminal = '1';
    }
    const booking = Object.assign({}, this.bookingData, { flightTime: this.state.currentFlightStats.departureTime, dropoffTerminal: deptTerminal });
    const fieldResult = formsValidation(booking, 'AddHotelBooking');
    if (fieldResult.warning === false) {
      // alert("booking ready")
      const localData = loadState();
      // let tempBooking = Object.assign({}, this.bookingData, { 'pickupAddress': 'Current Hotel', 'pickupLat': '28.12345678', 'pickupLong': '64.54325421' })
      const tempBooking = Object.assign({}, booking, { pickupAddress: localData.hoteladdress.toString(), pickupLat: localData.latitude.toString(), pickupLong: localData.longitude.toString() });
      this.props.actions.addNewBooking(tempBooking);
    } else {
      this.setState({
        showErrorTemplate: true,
        errorText: fieldResult.template,
        errorClass: 'alert alert-danger',
      });
    }
  }

  refresh = () => {
    this.fetchFlightStats = false;
    this.setState({ currentFlightStats: {} });
  }


  findFlight() {
    if (this.bookingData.flightNumber && this.bookingData.flightDate && this.bookingData.dropoffAirport) {
      const flightInput = this.bookingData;
      if (flightInput.flightNumber.length >= 4 && flightInput.flightNumber.length < 7) {
        if (Number(flightInput.flightDate.substr(0, 4)) >= new Date().getFullYear()) {
          this.setState({ currentFlightStats: {}, flightFound: false, bookingNotAllowed: false });
          this.props.flightStatsActions.getFlightStats(flightInput);
        }
      } else {
        this.setState({ currentFlightStats: Object.assign({}, this.state.currentFlightStats, { FlightInfoReq: true, fieldErr: 'Flight number invalid' }) });
      }
    } else {
      this.setState({ currentFlightStats: Object.assign({}, this.state.currentFlightStats, { FlightInfoReq: true, fieldErr: 'Required Fileds: Flight Number, Flight Date and Airport' }) });
    }
  }

  render() {
    const actionsButton = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={() => { this.setState({ showErrorTemplate: false }); }}
      />,
    ];
    return (
      <div id="vehicleContainer">
        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <HotelbookingForm
            setValue={this.setValue}
            currentFlightStats={this.state.currentFlightStats}
            selectPickupTime={this.state.selectPickupTime}
            refresh={this.refresh}
            flightFound={this.state.flightFound}
            bookingNotAllowed={this.state.bookingNotAllowed}
            findFlight={this.findFlight}
          />
        </Paper>
        <Grid fluid style={GlobalStyle.containerHeader}>
          <Row>
            <Col xsOffset={9} md={3}>
              {/* <FlatButton label="Add" onClick={this.submit} className="add-button float-right" /> */}
              <Link to="/home/hotel/bookings">
                <FlatButton label="Cancel" className="add-button float-right" />
              </Link>
            </Col>
          </Row>
        </Grid>
        <Dialog
          title="Required"
          actions={actionsButton}
          modal={false}
          open={this.state.showErrorTemplate}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div className={this.state.errorClass} dangerouslySetInnerHTML={{ __html: this.state.errorText }} />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bookingSaved: state.HotelNewBookingReducer.bookingSaved,
    flightStatsSuccess: state.FlightStatsReducer.flightStatsSuccess,
    flightDetails: state.FlightStatsReducer.flightDetails,
    flightError: state.FlightStatsReducer.error,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.addHotelBookingSuccessAfter());
  dispatch(flightStatsActions.flightStatsSuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
    flightStatsActions: bindActionCreators(flightStatsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingAddContainer);
