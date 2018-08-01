import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import momentTZ from 'moment-timezone';
import BookingsPerChannel from '../../components/dashboard/BookingsPerChannel';
import * as actions from '../../actions/DashboardActions';

class BookingPerChannelContainer extends Component {
  constructor(props) {
    super(props);
    this.placeholderDate = new Date().getTime() - (60000 * 60 * 24 * 7);
  }

  componentDidMount() {
    const chartData = {
      fromDate: new Date(this.placeholderDate).getTime(),
      regionId: 3,
    };
    // this.props.actions.getBookingPerCity(chartData);
  }

    graphDetail = (selectedDay, selectedCity) => {
      const chartData = {
        fromDate: selectedDay,
        regionId: selectedCity,
      };
      // this.props.actions.getBookingPerCity(chartData);
    }

    resetFilters = () => {
      const chartData = {
        fromDate: new Date(this.placeholderDate).getTime(),
        regionId: 3,
      };
      // this.props.actions.getBookingPerCity(chartData);
    }


    render() {
      return (
        <BookingsPerChannel bookingsPerChannel={this.props.bookingsPerChannel} graphDetail={this.graphDetail} resetFilters={this.resetFilters} />
      );
    }
}

function mapStateToProps(state) {
  return {
    bookingsPerChannel: state.DashboardReducer.bookingsPerChannel,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.getBookingsPerChannelSuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPerChannelContainer);

