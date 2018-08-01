import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Checkbox from 'material-ui/Checkbox';
import { List, ListItem } from 'material-ui/List';
import * as actions from '../../actions/DashboardActions';
import DriporterMap from '../../components/map/DriporterMap';

class DashboadMapContainer extends Component {
  constructor(props) {
    super(props);
    this.searchedArea = '';
    this.interval = '';
    this.state = {
      customerLocation: false,
      driporterLocation: false,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.props.actions.getDriportersLocation();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
    setValue = (key, value) => {
      if (!(value === this.searchedArea)) {
        let interval;
        clearInterval(interval);
        this.searchedArea = value;
        interval = setInterval(() => {
          this.props.actions.getDriportersLocation();
        }, 30000);
      }
    }


    showBookingPickup = () => {
      this.setState({
        customerLocation: !this.state.customerLocation,
      });
    }

    showDriporterOnMap = () => {
      this.setState({
        driporterLocation: !this.state.driporterLocation,
      });
    }

    render() {
      return (
        <div>
          <Grid>
            <Row>
              <Col md={4}>
                <List>
                  <ListItem
                    leftCheckbox={<Checkbox onClick={this.showBookingPickup} checked={this.state.customerLocation} />}
                    primaryText="Customer Location"
                  />
                </List>
              </Col>
              <Col md={4}>
                <List>
                  <ListItem
                    leftCheckbox={<Checkbox onClick={this.showDriporterOnMap} checked={this.state.driporterLocation} />}
                    primaryText="Driporter Location"
                  />
                </List>
              </Col>
              <Col md={4}>
                {/* <List>
                  <ListItem
                    leftCheckbox={<Checkbox />}
                    primaryText="Driporter Location"
                  />
                </List> */}
              </Col>
            </Row>
          </Grid>
          {/* <Checkbox onClick={this.showBookingPickup} checked={this.state.customerLocation} /> <span>Map Filter </span> */}

          <div>
            <DriporterMap
              isMarkerShown
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: '100%' }} />}
              containerElement={<div style={{ height: '200px' }} />}
              mapElement={<div style={{ height: '100%' }} />}
              driporterLocations={this.state.driporterLocation ? this.props.driporterLocations : []}
              bookings={this.state.customerLocation ? this.props.bookings : []}
            />
          </div>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    driporterLocations: state.DashboardReducer.driporterLocations,
    driporterLocationsSuccess: state.DashboardReducer.driporterLocationsSuccess,
    bookings: state.bookingReducer.bookings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboadMapContainer);
// export default DashboaradContainer;
