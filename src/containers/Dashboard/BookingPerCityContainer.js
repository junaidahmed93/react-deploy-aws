import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Converters from '../../utils/Converters';
import BookingPerCity from '../../components/dashboard/BookingPerCity';
import * as actions from '../../actions/DashboardActions';

class BookingPerCityContainer extends Component {
  constructor(props) {
    super(props);
    this.placeholderDate = new Date().getTime() - (60000 * 60 * 24 * 7);
  }

  componentDidMount() {
    const timeInMiliseconds = Converters.pickerDateToUTCmili(this.placeholderDate);
    const chartData = {
      fromDate: timeInMiliseconds,
      regionId: '3,4',
    };
    this.props.actions.getBookingPerCity(chartData);
  }

    graphDetail = (selectedDay, selectedCity) => {
      const timeInMiliseconds = Converters.pickerDateToUTCmili(selectedDay);
      const chartData = {
        fromDate: timeInMiliseconds,
        regionId: selectedCity,
      };
      this.props.actions.getBookingPerCity(chartData);
    }

    resetFilters = () => {
      const timeInMiliseconds = Converters.pickerDateToUTCmili(this.placeholderDate);
      const chartData = {
        fromDate: timeInMiliseconds,
        regionId: '3,4',
      };
      this.props.actions.getBookingPerCity(chartData);
    }


    render() {
      return (
        <BookingPerCity bookingsPerCity={this.props.bookingsPerCity} graphDetail={this.graphDetail} resetFilters={this.resetFilters} />
      );
    }
}

function mapStateToProps(state) {
  return {
    bookingsPerCity: state.DashboardReducer.bookingsPerCity,
  };
}

function mapDispatchToProps(dispatch) {
  dispatch(actions.getBookingsPerCitySuccessAfter());
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingPerCityContainer);

