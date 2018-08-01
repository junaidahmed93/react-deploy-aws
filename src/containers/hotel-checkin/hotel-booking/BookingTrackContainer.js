import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import * as actions from '../../../actions/bookingActions';
import HotelBookingTrackList from '../../../components/hotel/hotelBooking/HotelBookingTrackList';
import GlobalStyle from '../../../utils/Styles';

/* eslint no-dupe-keys: "off" */
class BookingTraceContainer extends Component {
  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.selectedBooking = this.selectedBooking.bind(this);
    this.state = {
      data: [],
      bookingSelected: {},
      booked: false,
      onTheWay: false,
      arrived: false,
      delivered: false,
      activeStep: 0,
      viewStatus: false,
      selectedName: '',
    };
    this.filteredBooking = [];
    this.tempBooking = [];
  }

  componentDidMount() {
    this.setState({
      data: this.props.bookings,
    });
    this.tempBooking = this.props.bookings;
  }

  // componentWillReceiveProps(nextProps) {
  //     this.setState({
  //         data: nextProps.bookings
  //     })
  //     this.tempBooking = nextProps.bookings;
  // }

  onSearchChanged(object, value) {
    this.filteredBooking = [];
    if (value === '') {
      this.setState({ data: this.tempBooking });
      this.filteredBooking = [];
    } else {
      this.tempBooking.forEach((item) => {
        if (item.guestName.toLowerCase().search(value.toLowerCase()) !== -1) {
          this.filteredBooking.push(item);
        }
      });
      this.setState({ data: this.filteredBooking });
    }
  }

  selectedBooking(selectBooking) {
    this.setState({ selectedName: selectBooking.userName, viewStatus: true, activeStep: 0 });

    if (selectBooking.status === 'pending') {
      this.setState({ activeStep: 0 });
    }

    if (selectBooking.status === 'enroute-customer') {
      this.setState({ activeStep: 0, activeStep: 1 });
    }

    if (selectBooking.status === 'payment-pending') {
      this.setState({ activeStep: 1, activeStep: 2 });
    }
    // setTimeout(() => {

    // }, 2000);
    // setTimeout(() => {
    //     this.setState({ activeStep: 2 })
    // }, 4000);
    // setTimeout(() => {
    //     this.setState({ activeStep: 3 })
    // }, 6000);
    // setTimeout(() => {
    //     this.setState({ activeStep: 4 })
    // }, 8000);
  }

  render() {
    return (
      <div id="vehicleContainer">
        {this.state.viewStatus ?
          <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
            <h3>{this.state.bookingSelected.guestName}</h3>
            <div style={{ width: '100%', maxWidth: 1200, margin: 'auto' }}>
              <h4>Customer - {this.state.selectedName}</h4>
              <Stepper activeStep={this.state.activeStep}>
                <Step>
                  <StepLabel>Pending</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Enroute Customer</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Payment Pending</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Collected</StepLabel>
                </Step>
                <Step>
                  <StepLabel>Dropped</StepLabel>
                </Step>
              </Stepper>
            </div>
          </Paper> : null}


        <Paper style={GlobalStyle.containerPaperStyle} zDepth={0}>
          <Grid fluid className="container-no-padding">
            <Row between="xs">
              <Col xs={6} style={GlobalStyle.containerHeader}>
                <h2 className="paper-title">Bookings</h2>
              </Col>
              <Col xs={6}>
                <div style={{ float: 'right' }}>
                  <TextField
                    className="search-text-field"
                    hintText="Customer Name"
                    floatingLabelText="Search"
                    onChange={this.onSearchChanged}
                  />
                  {/* <Link to="/home/hotel/bookings/add">
                                        <FlatButton label="New Booking" className="add-button-on-header float-right" />
                                    </Link> */}
                </div>

              </Col>
            </Row>
          </Grid>
          <Divider className="paper-divider m-top-bottom-07em bold-hr" />
          <HotelBookingTrackList rows={this.props.bookings} selectedBooking={this.selectedBooking} />
        </Paper>

      </div>

    );
  }
}


function mapStateToProps(state) {
  return {
    bookings: state.HotelBookingReducer.hotelBookings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingTraceContainer);
