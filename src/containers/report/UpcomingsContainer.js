import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import momentTZ from 'moment-timezone';
import Divider from 'material-ui/Divider';
import { bindActionCreators } from 'redux';
import { store } from '../../store';
import * as bookingActions from '../../actions/bookingActions';
import UpcomingPickup from '../../components/reports/UpcomingPickup';
import UpcomingDropoff from '../../components/reports/UpcomingDropoff';

const shortSheets = {
  width: '48%',
  textAlign: 'center',
  display: 'inline-block',
  margin: '1rem 1rem',
};

class UpcomingsContainer extends Component {
  constructor() {
    super();
    this.state = {
      upcomingPickups: {},
      upcomingDropoff: {},
      storePickupsBooking: [],
      storeDropoffBooking: [],
    };
    this.interval = () => { };
  }
  componentDidMount() {
    this.props.bookingActions.getAllBookings('showLoader');
    const bookings = store.getState().bookingReducer.bookings;
    this.setState({ bookings });
    this.interval = setInterval(() => {
      this.props.bookingActions.getAllBookings();
    }, 10000);
  }

  componentWillMount() {
    clearInterval(this.interval);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.bookings) {
      const filterDropoffBooking = [];
      const filterPickupBooking = []; // 2018, 4, 5, 16, 31, 30, 0
      nextProps.bookings.forEach((element) => {
        const dropTime = new Date(momentTZ.tz(element.dropOffTime, element.serviceAreaDto.timeZone).format()).getTime();
        const currentTime = new Date(momentTZ.tz(new Date(), element.serviceAreaDto.timeZone).format()).getTime();
        const pickupTime = new Date(momentTZ.tz(element.requestedPickupTime, element.serviceAreaDto.timeZone).format()).getTime();
        if (dropTime > currentTime) {
          if (element.status === 'enroute-airport' || element.status === 'arrived-airport') {
            const e = Object.assign({}, element, { dropTime, currentTime });
            filterDropoffBooking.push(e);
          }
        }

        if (pickupTime > currentTime) {
          if (element.status === 'pending' || element.status === 'enroute-customer') {
            const a = Object.assign({}, element, { pickupTime, currentTime });
            filterPickupBooking.push(a);
          }
        }
      });
      this.sorting(filterDropoffBooking, 'dropTime');
      this.sorting(filterPickupBooking, 'pickupTime');
      this.setState({
        upcomingPickups: filterPickupBooking,
        upcomingDropoff: filterDropoffBooking,
        storePickupsBooking: filterPickupBooking,
        storeDropoffBooking: filterDropoffBooking,
      });
    }
  }


  sorting(a, sortBase) {
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < a.length - 1; i++) {
        if (sortBase === 'pickupTime') {
          if (a[i].pickupTime > a[i + 1].pickupTime) {
            const temp = a[i];
            a[i] = a[i + 1];
            a[i + 1] = temp;
            swapped = true;
          }
        } else if (a[i].dropTime > a[i + 1].dropTime) {
          const temp = a[i];
          a[i] = a[i + 1];
          a[i + 1] = temp;
          swapped = true;
        }
      }
    } while (swapped);
  }

  render() {
    const { upcomingPickups, upcomingDropoff } = this.state;
    return (
      <div className="dashboardContainer">
        <div style={{ display: 'flex' }}>
          <Paper style={shortSheets} zDepth={0} >

            <Grid>
              <Row style={{ height: '30px', padding: '10px' }}>
                <Col md={4} />
                <Col md={4}>
                  <span style={{ fontSize: '20px' }}>Upcoming Pickups</span>
                </Col>
                <Col md={4} />

              </Row>
            </Grid>
            <Divider className="paper-divider m-top-bottom-07em bold-hr" />
            <Grid>
              <Row style={{ height: '500px', padding: '10px' }}>
                {upcomingPickups && upcomingPickups.length > 0 ? <UpcomingPickup bookings={upcomingPickups} /> : <div style={{
 marginLeft: '37%', marginTop: '2%', fontSize: '20px', color: 'gray',
}}
                >No active booking
                                                                                                                 </div>}
              </Row>
              <Row>
                <Col md={4} />
                <Col md={4} />
                <Col md={4} />
              </Row>
            </Grid>
            <br />

          </Paper>
          <Paper style={shortSheets} zDepth={0} >

            <Grid>
              <Row style={{ height: '30px', padding: '10px' }}>
                <Col md={4} />
                <Col md={4}>
                  <span style={{ fontSize: '20px' }}>Upcoming Drop off</span>
                </Col>
                <Col md={4} />
              </Row>
            </Grid>
            <Divider className="paper-divider m-top-bottom-07em bold-hr" />
            <Grid>
              <Row style={{ height: '500px', padding: '10px' }}>
                {upcomingPickups && upcomingPickups.length > 0 ? <UpcomingDropoff bookings={upcomingDropoff} /> : <div style={{
 marginLeft: '37%', marginTop: '2%', fontSize: '20px', color: 'gray',
}}
                >No active booking
                                                                                                                  </div>}
              </Row>
              <Row>
                <Col md={4} />
                <Col md={4} />
                <Col md={4} />
              </Row>
            </Grid>
            <br />
          </Paper>
        </div>
        {/* <Paper style={style} zDepth={0}>

        </Paper> */}
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    bookings: state.bookingReducer.bookings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    bookingActions: bindActionCreators(bookingActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingsContainer);
